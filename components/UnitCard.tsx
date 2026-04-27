import { Pressable, StyleSheet, Text, View } from "react-native";

import ProgressBar from "@/components/ProgressBar";
import { theme } from "@/constants/theme";
import { Unit } from "@/types/Unit";

type Props = {
  unit: Unit;
  completed: number;
  total: number;
  isUnlocked: boolean;
  onPress: () => void;
};

export default function UnitCard({
  unit,
  completed,
  total,
  isUnlocked,
  onPress,
}: Props) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Pressable
      style={[styles.card, !isUnlocked && styles.lockedCard]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{unit.title}</Text>
        {!isUnlocked && <Text style={styles.locked}>Locked</Text>}
      </View>

      <Text style={styles.description}>{unit.description}</Text>
      <View style={styles.progressWrap}>
        <ProgressBar value={progress} max={100} />
      </View>
      <Text style={styles.progressText}>
        {completed}/{total} lessons completed
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 12,
  },
  lockedCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  locked: {
    color: theme.colors.warning,
    fontSize: 11,
    fontWeight: "700",
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  progressWrap: {
    marginTop: 10,
  },
  progressText: {
    marginTop: 8,
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
});
