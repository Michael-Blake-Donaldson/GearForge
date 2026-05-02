import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthSignupScreen() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async () => {
    const ok = await signup(email, password);
    if (ok) router.replace("/onboarding");
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.body}>
        Start syncing progress to cloud and protect your learning history.
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
        placeholder="Password (min 6 chars)"
        placeholderTextColor={theme.colors.textSecondary}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.button, loading && styles.disabled]}
        disabled={loading}
        onPress={onSignup}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 16,
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
  button: {
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.neon,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
  buttonText: {
    color: "#031312",
    fontSize: 14,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.6,
  },
});
