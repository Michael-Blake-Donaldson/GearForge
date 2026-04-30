import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

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

  // Animated value drives the fill width (0 → percent on mount/change)
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spring animation gives a satisfying bounce-in effect
    Animated.spring(animatedWidth, {
      toValue: percent,
      friction: 8,
      tension: 60,
      useNativeDriver: false, // 'width' is a layout property, can't use native driver
    }).start();
  }, [percent]);

  // Interpolate 0-100 to "0%"-"100%" string for the width style
  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[styles.track, { height }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
    >
      <Animated.View
        style={[
          styles.fill,
          { width: widthInterpolated, backgroundColor: accentColor },
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
