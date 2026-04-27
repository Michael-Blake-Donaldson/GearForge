import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  xp: number;
  level: number;
};

export default function XPDisplay({ xp, level }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.xp}>{xp} XP</Text>
      <Text style={styles.level}>Level {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  xp: {
    color: theme.colors.neon,
    fontSize: 14,
    fontWeight: "700",
  },
  level: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
});
