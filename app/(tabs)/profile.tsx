import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import Badge from "@/components/Badge";
import { theme } from "@/constants/theme";
import { useProgressStore, validateUsername } from "@/store/useProgressStore";

export default function ProfileScreen() {
  const username = useProgressStore((state) => state.username);
  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const streak = useProgressStore((state) => state.streak);
  const streakFreezeTokens = useProgressStore((s) => s.streakFreezeTokens);
  const getRank = useProgressStore((state) => state.getRank);
  const badges = useProgressStore((state) => state.badges);
  const setUsername = useProgressStore((state) => state.setUsername);

  const [draftName, setDraftName] = useState(username);
  // Validation error message shown below the input field
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameSaved, setNameSaved] = useState(false);

  const handleSave = () => {
    const error = validateUsername(draftName);
    if (error) {
      setNameError(error);
      setNameSaved(false);
      return;
    }
    setNameError(null);
    setNameSaved(true);
    setUsername(draftName.trim());
    // Clear the "saved" confirmation after 2 seconds
    setTimeout(() => setNameSaved(false), 2000);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      {/* --- Username editor ------------------------------------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Username</Text>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          value={draftName}
          onChangeText={(text) => {
            setDraftName(text);
            // Clear error as soon as the user starts typing again
            if (nameError) setNameError(null);
          }}
          placeholder="Enter username"
          placeholderTextColor={theme.colors.textSecondary}
          maxLength={20}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Show validation error or "saved" confirmation */}
        {nameError ? (
          <Text style={styles.errorText}>{nameError}</Text>
        ) : nameSaved ? (
          <Text style={styles.successText}>Username saved!</Text>
        ) : null}

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Name</Text>
        </Pressable>
      </View>

      {/* --- Stats grid ------------------------------------------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streakFreezeTokens}</Text>
            <Text style={styles.statLabel}>Freezes</Text>
          </View>
        </View>
        <Text style={styles.rankLabel}>Rank</Text>
        <Text style={styles.rankValue}>{getRank()}</Text>
      </View>

      {/* --- Achievement badges --------------------------------------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Achievements ({badges.length})
        </Text>
        <View style={styles.badgesWrap}>
          {badges.length === 0 ? (
            <Text style={styles.empty}>
              Complete lessons to unlock achievements.
            </Text>
          ) : (
            badges.map((badge) => <Badge key={badge} label={badge} />)
          )}
        </View>
      </View>
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
    gap: 12,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 4,
  },
  inputError: {
    borderColor: "#ff5c5c",
  },
  errorText: {
    color: "#ff5c5c",
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    color: theme.colors.neon,
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: theme.radii.md,
    alignItems: "center",
    backgroundColor: theme.colors.neon,
    paddingVertical: 10,
  },
  saveText: {
    color: "#07191b",
    fontWeight: "800",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: theme.colors.neon,
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  rankLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  rankValue: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  badgesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  empty: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
});

