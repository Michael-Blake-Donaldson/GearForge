import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
import {
    cancelAllNotifications,
    requestPermissions,
    scheduleDailyReminder,
} from "@/utils/notifications";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.colors.bg,
      card: theme.colors.surface,
      border: theme.colors.border,
      text: theme.colors.textPrimary,
      primary: theme.colors.neon,
      notification: theme.colors.neonAlt,
    },
  };

  // Read onboarding flag from persisted store.
  // If the user has never completed onboarding, redirect them there before
  // showing the main tab navigator.
  const hasOnboarded = useProgressStore((s) => s.hasOnboarded);
  const hasTakenMechanicTest = useProgressStore((s) => s.hasTakenMechanicTest);
  const authLoading = useAuthStore((s) => s.loading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isGuest = useAuthStore((s) => s.isGuest);
  const initializeAuthListener = useAuthStore((s) => s.initializeAuthListener);
  const hasAccess = isAuthenticated || isGuest;

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, []);

  // Notification-related store fields and actions
  const notificationPermission = useProgressStore(
    (s) => s.notificationPermission,
  );
  const notificationHour = useProgressStore((s) => s.notificationHour);
  const streak = useProgressStore((s) => s.streak);
  const launchCount = useProgressStore((s) => s.launchCount);
  const incrementLaunchCount = useProgressStore((s) => s.incrementLaunchCount);
  const setNotificationPermission = useProgressStore(
    (s) => s.setNotificationPermission,
  );

  useEffect(() => {
    // Increment cold-start counter once on every app launch.
    incrementLaunchCount();
  }, []);

  useEffect(() => {
    // Only run after the initial incrementLaunchCount has resolved (launchCount >= 1)
    // and only if onboarding is complete.
    if (!hasOnboarded || launchCount < 1 || !hasAccess) return;

    (async () => {
      if (notificationPermission === "undecided" && launchCount >= 2) {
        // Day-2+ prompt: ask for notification permission without being pushy
        // on the very first launch.
        const result = await requestPermissions();
        setNotificationPermission(result);

        if (result === "granted") {
          // Schedule the daily reminder immediately after granting.
          await scheduleDailyReminder(notificationHour, streak);
        }
      } else if (notificationPermission === "granted") {
        // Permission already granted — refresh the scheduled notification in
        // case the hour or streak count has changed since the last launch.
        await scheduleDailyReminder(notificationHour, streak);
      } else if (notificationPermission === "denied") {
        // User has revoked permission — cancel any orphaned notifications.
        await cancelAllNotifications();
      }
    })();
  }, [hasOnboarded, launchCount, notificationPermission]);

  if (authLoading) {
    return null;
  }

  return (
    <ThemeProvider value={navTheme}>
      {!hasAccess &&
        !pathname.startsWith("/auth") &&
        <Redirect href={"/auth" as never} />}

      {/* Redirect to onboarding on first launch */}
      {hasAccess && !hasOnboarded && <Redirect href="/onboarding" />}
      {hasOnboarded &&
        !hasTakenMechanicTest &&
        pathname !== "/mechanic-test" && <Redirect href="/mechanic-test" />}
      {hasAccess && pathname.startsWith("/auth") && <Redirect href="/(tabs)/learn" />}

      <Stack>
        <Stack.Screen
          name="auth/index"
          options={{ headerTitle: "Sign In", headerShown: true }}
        />
        <Stack.Screen
          name="auth/signup"
          options={{ headerTitle: "Create Account", headerShown: true }}
        />
        <Stack.Screen
          name="auth/forgot"
          options={{ headerTitle: "Reset Password", headerShown: true }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="mechanic-test"
          options={{
            headerTitle: "Mechanic Placement Test",
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.textPrimary,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="lesson-complete"
          options={{
            headerShown: false,
            // Prevent swipe-back so users intentionally choose their next action
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="lesson/[lessonId]"
          options={{
            headerTitle: "Lesson",
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.textPrimary,
          }}
        />
        <Stack.Screen
          name="quiz/[quizId]"
          options={{
            headerTitle: "Quiz",
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.textPrimary,
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{
            headerTitle: "Privacy Policy",
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.textPrimary,
          }}
        />
        <Stack.Screen
          name="terms"
          options={{
            headerTitle: "Terms of Use",
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.textPrimary,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
