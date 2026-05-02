import { ScrollView, StyleSheet, Text, View } from "react-native";

import Card from "@/components/Card";
import ForgeCore from "@/components/ForgeCore";
import ProgressBar from "@/components/ProgressBar";
import { theme } from "@/constants/theme";
import { regions } from "@/data/regions";
import { useProgressStore } from "@/store/useProgressStore";

export default function ProgressScreen() {
  const xp = useProgressStore((state) => state.xp);
  const streak = useProgressStore((state) => state.streak);
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const getAccuracy = useProgressStore((state) => state.getAccuracy);
  const getRegionMastery = useProgressStore((state) => state.getRegionMastery);
  const getRank = useProgressStore((state) => state.getRank);

  const accuracy = getAccuracy();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <ForgeCore state="idle" size={46} />
        <View style={styles.headerTextWrap}>
          <Text style={styles.title}>Operator Telemetry</Text>
          <Text style={styles.subtitle}>
            Live performance overview from recent calibrations.
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <Card style={styles.metricCard} glowColor={theme.colors.neon}>
          <Text style={styles.metricLabel}>Total Energy</Text>
          <Text style={styles.metricValue}>{xp}</Text>
        </Card>
        <Card style={styles.metricCard} glowColor={theme.colors.warning}>
          <Text style={styles.metricLabel}>Streak</Text>
          <Text style={styles.metricValue}>{streak} days</Text>
        </Card>
      </View>

      <View style={styles.metricsRow}>
        <Card style={styles.metricCard} glowColor={theme.colors.neonAlt}>
          <Text style={styles.metricLabel}>Calibrations Completed</Text>
          <Text style={styles.metricValue}>{completedLessons.length}</Text>
        </Card>
        <Card style={styles.metricCard} glowColor={theme.colors.success}>
          <Text style={styles.metricLabel}>Diagnostics Accuracy</Text>
          <Text style={styles.metricValue}>{accuracy}%</Text>
        </Card>
      </View>

      <View style={styles.rankCard}>
        <Text style={styles.rankLabel}>Current Operator Rank</Text>
        <Text style={styles.rankValue}>{getRank()}</Text>
      </View>

      <Text style={styles.sectionTitle}>Region Mastery</Text>
      {regions.map((region) => {
        const mastery = getRegionMastery(region.id);
        return (
          <View key={region.id} style={styles.masteryCard}>
            <View style={styles.masteryHeader}>
              <Text style={styles.masteryTitle}>{region.name}</Text>
              <Text style={styles.masteryPercent}>{mastery}%</Text>
            </View>
            <ProgressBar
              value={mastery}
              max={100}
              accentColor={region.accentColor}
            />
          </View>
        );
      })}
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
    gap: 8,
    paddingBottom: 120,
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
    fontFamily: theme.typography.h2.fontFamily,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
  },
  subtitle: {
    fontFamily: theme.typography.body.fontFamily,
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    padding: 12,
  },
  metricLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  metricValue: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
  },
  rankCard: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.neon,
    backgroundColor: "rgba(29,211,176,0.15)",
    padding: 14,
    marginTop: 6,
    marginBottom: 16,
  },
  rankLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  rankValue: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  masteryCard: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 12,
    marginBottom: 10,
  },
  masteryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  masteryTitle: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
    marginRight: 6,
  },
  masteryPercent: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
});
