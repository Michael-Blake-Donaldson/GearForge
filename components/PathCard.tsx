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

export default function PathCard({
  region,
  masteryPercent,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
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
}

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
