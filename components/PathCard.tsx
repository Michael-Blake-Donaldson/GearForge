import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ProgressBar from "@/components/ProgressBar";
import { theme } from "@/constants/theme";
import { Region } from "@/types/Region";

type Props = {
  region: Region;
  masteryPercent: number;
  selected: boolean;
  onPress: () => void;
};

// React.memo prevents the entire PathCard row from re-rendering when only the
// selected region or one region's mastery changes.
const PathCard = memo(function PathCard({
  region,
  masteryPercent,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${region.name}, ${masteryPercent}% mastery`}
      accessibilityState={{ selected }}
      accessibilityHint="Tap to select this learning path"
    >
      <Text style={styles.title}>{region.name}</Text>
      <Text style={styles.description}>{region.description}</Text>

      <View style={styles.progressWrap}>
        <ProgressBar
          value={masteryPercent}
          max={100}
          accentColor={region.accentColor}
        />
      </View>

      <Text style={styles.mastery}>{masteryPercent}% mastery</Text>
    </Pressable>
  );
});

export default PathCard;

const styles = StyleSheet.create({
  card: {
    width: 250,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 16,
    marginRight: 12,
  },
  selected: {
    borderColor: theme.colors.neon,
    backgroundColor: "#122038",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  progressWrap: {
    marginTop: 12,
  },
  mastery: {
    marginTop: 8,
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
});
