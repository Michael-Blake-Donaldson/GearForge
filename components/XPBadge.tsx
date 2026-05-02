import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  energy: number;
  level: number;
};

function XPBadgeComponent({ energy, level }: Props) {
  return (
    <View
      style={styles.container}
      accessibilityLabel={`Energy ${energy}, level ${level}`}
    >
      <Text style={styles.energy}>{energy} Energy</Text>
      <Text style={styles.level}>Lvl {level}</Text>
    </View>
  );
}

export default memo(XPBadgeComponent);

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: `${theme.colors.neon}70`,
    backgroundColor: `${theme.colors.neon}18`,
    paddingHorizontal: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  energy: {
    color: theme.colors.neon,
    fontSize: 14,
    fontWeight: "800",
  },
  level: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
});
