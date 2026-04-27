import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  streak: number;
};

export default function StreakCounter({ streak }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔥</Text>
      <Text style={styles.value}>{streak} day streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    fontSize: 14,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
});
