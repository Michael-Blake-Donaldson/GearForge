import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthForgotScreen() {
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const [email, setEmail] = useState("");

  const onReset = async () => {
    const ok = await resetPassword(email);
    if (ok) {
      Alert.alert(
        "Reset Email Sent",
        "If this account exists, a password reset email has been sent.",
      );
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.body}>
        Enter your email and we will send reset instructions.
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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.button, loading && styles.disabled]}
        disabled={loading}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Send Reset Email</Text>
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
