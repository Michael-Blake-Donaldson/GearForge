import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";

WebBrowser.maybeCompleteAuthSession();

export default function AuthLoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest);
  const loginWithGoogleIdToken = useAuthStore((s) => s.loginWithGoogleIdToken);
  const loginWithAppleIdentityToken = useAuthStore(
    (s) => s.loginWithAppleIdentityToken,
  );
  const error = useAuthStore((s) => s.error);
  const loading = useAuthStore((s) => s.loading);

  const oauth =
    (
      Constants.expoConfig?.extra as
        | {
            oauth?: {
              googleWebClientId?: string;
              googleIosClientId?: string;
              googleAndroidClientId?: string;
            };
          }
        | undefined
    )?.oauth ?? {};

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: oauth.googleWebClientId,
    iosClientId: oauth.googleIosClientId,
    androidClientId: oauth.googleAndroidClientId,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const ok = await login(email, password);
    if (ok) router.replace("/onboarding");
  };

  useEffect(() => {
    const maybeHandleGoogle = async () => {
      if (response?.type !== "success") return;

      const idToken =
        response.authentication?.idToken ?? response.params?.id_token;
      if (!idToken) return;

      const ok = await loginWithGoogleIdToken(idToken);
      if (ok) router.replace("/onboarding");
    };

    maybeHandleGoogle();
  }, [response]);

  const onAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) return;
      const ok = await loginWithAppleIdentityToken(credential.identityToken);
      if (ok) router.replace("/onboarding");
    } catch {
      // user canceled or provider failed; auth store displays actionable errors.
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.kicker}>GearForge Auth</Text>
        <Text style={styles.title}>Sign in to sync your progress</Text>
        <Text style={styles.body}>
          Email authentication is live. Google and Apple sign-in are included in
          the next iteration.
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.primaryButton, loading && styles.disabled]}
          disabled={loading}
          onPress={onLogin}
        >
          <Text style={styles.primaryText}>Sign In</Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryButton, loading && styles.disabled]}
          disabled={loading}
          onPress={() => continueAsGuest()}
        >
          <Text style={styles.secondaryText}>Continue as Guest</Text>
        </Pressable>

        <Pressable
          style={[styles.oauthButton, (!request || loading) && styles.disabled]}
          disabled={!request || loading}
          onPress={() => promptAsync()}
        >
          <Text style={styles.oauthText}>Continue with Google</Text>
        </Pressable>

        <Pressable
          style={[styles.oauthButton, loading && styles.disabled]}
          disabled={loading}
          onPress={onAppleLogin}
        >
          <Text style={styles.oauthText}>Continue with Apple</Text>
        </Pressable>

        <View style={styles.linksRow}>
          <Link href={"/auth/signup" as never} style={styles.link}>
            Create account
          </Link>
          <Link href={"/auth/forgot" as never} style={styles.link}>
            Reset password
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 16,
  },
  kicker: {
    color: theme.colors.neon,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 6,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 14,
  },
  input: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
    marginBottom: 10,
  },
  primaryButton: {
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.neon,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  primaryText: {
    color: "#031312",
    fontSize: 14,
    fontWeight: "800",
  },
  secondaryButton: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 12,
  },
  secondaryText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  oauthButton: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    paddingVertical: 11,
    marginBottom: 10,
  },
  oauthText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.6,
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: theme.colors.neonAlt,
    fontSize: 13,
    fontWeight: "700",
  },
});
