import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import Button from "@/components/Button";
import ForgeCore from "@/components/ForgeCore";
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
        <View style={styles.headRow}>
          <ForgeCore state="idle" size={44} />
          <View style={styles.headTextWrap}>
            <Text style={styles.kicker}>GearForge Auth</Text>
            <Text style={styles.title}>Sign in to sync your progress</Text>
          </View>
        </View>
        <Text style={styles.body}>
          Email, Google, and Apple sign-in are available for secure cloud sync.
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

        <Button label="Sign In" onPress={onLogin} disabled={loading} />

        <Button
          label="Continue as Guest"
          variant="secondary"
          disabled={loading}
          onPress={() => continueAsGuest()}
          style={styles.buttonGap}
        />

        <Button
          label="Continue with Google"
          variant="secondary"
          disabled={!request || loading}
          onPress={() => promptAsync()}
          style={styles.buttonGap}
        />

        <Button
          label="Continue with Apple"
          variant="secondary"
          disabled={loading}
          onPress={onAppleLogin}
          style={styles.buttonGap}
        />

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
    shadowColor: theme.colors.neonAlt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headTextWrap: {
    flex: 1,
  },
  kicker: {
    color: theme.colors.neon,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: theme.typography.h2.fontFamily,
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 6,
  },
  body: {
    fontFamily: theme.typography.body.fontFamily,
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
  buttonGap: {
    marginTop: 10,
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
