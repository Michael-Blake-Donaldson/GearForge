import { ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

export default function TermsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Terms of Use</Text>
      <Text style={styles.subtitle}>Last updated: 2026-05-02</Text>

      <Section
        title="1. Educational Use"
        body="GearForge provides educational automotive learning content only. It is not a substitute for licensed mechanical diagnosis, safety inspections, or certified repair services."
      />
      <Section
        title="2. Safety Responsibility"
        body="You are responsible for following all manufacturer guidance, local law, and proper safety procedures before attempting real-world vehicle work."
      />
      <Section
        title="3. Account and Progress Data"
        body="Progress, quiz history, and settings are stored locally on-device unless cloud sync is introduced in future releases. Deleting app data can permanently remove this progress."
      />
      <Section
        title="4. No Warranty"
        body="Content is provided as-is for learning purposes. GearForge does not guarantee outcomes from any repair or maintenance action performed outside the app."
      />
      <Section
        title="5. Acceptable Use"
        body="You agree not to misuse, copy, or redistribute proprietary app content in ways that violate applicable law or platform policies."
      />
      <Section
        title="6. Contact"
        body="For terms questions, contact support at support@gearforge.app."
      />
    </ScrollView>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 26,
    fontWeight: "900",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 14,
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});
