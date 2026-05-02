import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { theme } from "@/constants/theme";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  glowColor?: string;
}>;

export default function GlowContainer({
  children,
  style,
  glowColor = theme.colors.neon,
}: Props) {
  return (
    <View
      style={[
        styles.base,
        {
          shadowColor: glowColor,
          borderColor: `${glowColor}66`,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
});
