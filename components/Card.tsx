import { PropsWithChildren } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { motion } from "@/constants/motion";
import { theme } from "@/constants/theme";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  pressable?: boolean;
  onPress?: () => void;
  glowColor?: string;
  accessibilityLabel?: string;
}>;

export default function Card({
  children,
  style,
  pressable,
  onPress,
  glowColor = theme.colors.neonAlt,
  accessibilityLabel,
}: Props) {
  if (pressable && onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.base,
          styles.glow,
          {
            borderColor: `${glowColor}55`,
            transform: [{ scale: pressed ? motion.scale.pressed : 1 }],
          },
          style,
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.base,
        styles.glow,
        { borderColor: `${glowColor}40` },
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
    padding: theme.spacing.md,
  },
  glow: {
    shadowColor: theme.colors.neonAlt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
});
