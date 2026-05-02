import { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { theme } from "@/constants/theme";
import { encyclopediaEntries, EncyclopediaEntry } from "@/data/encyclopedia";

// All categories present in the expanded encyclopedia, plus an "All" sentinel.
const ALL_CATEGORIES = [
  "All",
  "Engine Types",
  "Transmission Types",
  "Systems",
  "Car Parts",
  "Suspension",
  "Brakes",
  "Electrical",
  "Tools",
  "Fluids",
  "Emissions",
] as const;

type FilterCategory = (typeof ALL_CATEGORIES)[number];

export default function EncyclopediaScreen() {
  const [search, setSearch] = useState("");
  // selectedCategory drives the horizontal filter chip row
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");

  // Memoised filtering: text search + category filter run in one pass
  const entries = useMemo<EncyclopediaEntry[]>(() => {
    const query = search.trim().toLowerCase();

    return encyclopediaEntries.filter((entry) => {
      // Category gate — skip if a specific category is active and doesn't match
      const categoryMatch =
        selectedCategory === "All" || entry.category === selectedCategory;
      if (!categoryMatch) return false;

      // Text search gate — skip if query is non-empty and nothing matches
      if (!query) return true;
      return (
        entry.name.toLowerCase().includes(query) ||
        entry.category.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query)
      );
    });
  }, [search, selectedCategory]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Systems Database</Text>
      <Text style={styles.subtitle}>
        Educational reference only. No diagnostics, no repair recommendations.
      </Text>

      {/* Search bar */}
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search parts, systems, tools..."
        placeholderTextColor={theme.colors.textSecondary}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

      {/* Category filter chip row — horizontal scroll so all chips are reachable */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipRow}
        contentContainerStyle={styles.chipRowContent}
      >
        {ALL_CATEGORIES.map((cat) => {
          const active = cat === selectedCategory;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Result count badge */}
      <Text style={styles.resultCount}>
        {entries.length} {entries.length === 1 ? "entry" : "entries"}
      </Text>

      {/* Entry cards */}
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

      {entries.length === 0 && (
        <Text style={styles.emptyState}>
          No entries match your search or filter.
        </Text>
      )}
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
    marginBottom: 10,
  },
  // Horizontal scrolling chip row container
  chipRow: {
    marginBottom: 10,
  },
  chipRowContent: {
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  chipActive: {
    borderColor: theme.colors.neon,
    backgroundColor: theme.colors.neon + "22", // 13% opacity tint
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: theme.colors.neon,
  },
  resultCount: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 10,
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
  emptyState: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
});
