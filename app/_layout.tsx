import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { theme } from "@/constants/theme";
import { useProgressStore } from "@/store/useProgressStore";

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

  return (
    <ThemeProvider value={navTheme}>
      {/* Redirect to onboarding on first launch */}
      {!hasOnboarded && <Redirect href="/onboarding" />}

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
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
      </Stack>
    </ThemeProvider>
  );
}
