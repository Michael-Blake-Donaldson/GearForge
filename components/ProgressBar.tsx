import { StyleSheet, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  value: number;
  max?: number;
  accentColor?: string;
  height?: number;
};

export default function ProgressBar({
  value,
  max = 100,
  accentColor = theme.colors.neon,
  height = 8,
}: Props) {
  const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          { width: `${percent}%`, backgroundColor: accentColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radii.pill,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  fill: {
    height: "100%",
    borderRadius: theme.radii.pill,
  },
});
