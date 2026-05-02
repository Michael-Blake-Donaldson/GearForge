import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

export default function DeleteAccountScreen() {
  const router = useRouter();
  const deleteAccountWithReauth = useAuthStore((s) => s.deleteAccountWithReauth);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const isConfirmValid = confirmText.trim() === "DELETE";

  const onDelete = async () => {
    if (!isConfirmValid) {
      Alert.alert("Confirmation required", "Type DELETE to continue.");
      return;
    }

    const ok = await deleteAccountWithReauth(email, password);
    if (!ok) return;

    Alert.alert(
      "Account deleted",
      "Your account and cloud learning data have been removed.",
      [{ text: "OK", onPress: () => router.replace("/auth" as never) }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <ForgeCore state="error" size={44} />
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Delete Account</Text>
            <Text style={styles.subtitle}>Permanent action. Cannot be undone.</Text>
          </View>
        </View>

        <Text style={styles.body}>
          This removes your profile, progress, diagnostics history, badges, and
          cloud settings.
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Account email"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />

        <TextInput
          value={confirmText}
          onChangeText={setConfirmText}
          autoCapitalize="characters"
          placeholder='Type "DELETE" to confirm'
          placeholderTextColor={theme.colors.textSecondary}
          style={[styles.input, !isConfirmValid && confirmText.length > 0 && styles.inputInvalid]}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          label="Permanently Delete Account"
          onPress={onDelete}
          disabled={loading || !email || !password || !isConfirmValid}
        />

        <Button
          label="Cancel"
          variant="secondary"
          onPress={() => router.back()}
          style={styles.cancelButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: `${theme.colors.danger}66`,
    backgroundColor: theme.colors.surface,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  input: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
    minHeight: 44,
  },
  inputInvalid: {
    borderColor: theme.colors.danger,
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
});
