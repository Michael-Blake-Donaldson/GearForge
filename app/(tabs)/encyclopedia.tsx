import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { theme } from "@/constants/theme";
import { encyclopediaEntries } from "@/data/encyclopedia";

export default function EncyclopediaScreen() {
  const [search, setSearch] = useState("");

  const entries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return encyclopediaEntries;

    return encyclopediaEntries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.category.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Reference Encyclopedia</Text>
      <Text style={styles.subtitle}>
        Educational reference only. No diagnostics, no repair recommendations.
      </Text>

      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search parts, systems, tools..."
        placeholderTextColor={theme.colors.textSecondary}
      />

      {entries.map((entry) => (
        <View key={entry.id} style={styles.card}>
          <Text style={styles.name}>{entry.name}</Text>
          <Text style={styles.category}>{entry.category}</Text>
          <Text style={styles.description}>{entry.description}</Text>

          <Text style={styles.sectionHeader}>Function</Text>
          <Text style={styles.body}>{entry.function}</Text>

          <Text style={styles.sectionHeader}>Key Facts</Text>
          {entry.keyFacts.map((fact) => (
            <Text key={fact} style={styles.fact}>
              • {fact}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
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
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 8,
    marginBottom: 12,
  },
  search: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 12,
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: 17,
    fontWeight: "700",
  },
  category: {
    color: theme.colors.neon,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  sectionHeader: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 3,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  fact: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});
