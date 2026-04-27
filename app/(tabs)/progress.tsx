import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ProgressBar from '@/components/ProgressBar';
import { regions } from '@/data/regions';
import { theme } from '@/constants/theme';
import { useProgressStore } from '@/store/useProgressStore';

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
      <Text style={styles.title}>Progress Dashboard</Text>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total XP</Text>
          <Text style={styles.metricValue}>{xp}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Streak</Text>
          <Text style={styles.metricValue}>{streak} days</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Lessons Completed</Text>
          <Text style={styles.metricValue}>{completedLessons.length}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Quiz Accuracy</Text>
          <Text style={styles.metricValue}>{accuracy}%</Text>
        </View>
      </View>

      <View style={styles.rankCard}>
        <Text style={styles.rankLabel}>Current Rank</Text>
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
            <ProgressBar value={mastery} max={100} accentColor={region.accentColor} />
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
    paddingBottom: 120,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 12,
  },
  metricLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  metricValue: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
  },
  rankCard: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.neon,
    backgroundColor: 'rgba(29,211,176,0.15)',
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
    fontWeight: '800',
    marginTop: 6,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  masteryTitle: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    marginRight: 6,
  },
  masteryPercent: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
});
