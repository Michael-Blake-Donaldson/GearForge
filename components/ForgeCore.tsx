import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { theme } from "@/constants/theme";

type Props = {
  state?: "idle" | "success" | "error" | "speaking";
  size?: number;
};

export default function ForgeCore({ state = "idle", size = 62 }: Props) {
  const pulse = useSharedValue(0);
  const burst = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 950, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 950, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [pulse]);

  useEffect(() => {
    if (state === "success") {
      burst.value = withSequence(
        withTiming(1, { duration: 220 }),
        withTiming(0, { duration: 220 }),
      );
    }
    if (state === "error") {
      burst.value = withSequence(
        withTiming(-1, { duration: 120 }),
        withTiming(1, { duration: 120 }),
        withTiming(0, { duration: 120 }),
      );
    }
    if (state === "speaking") {
      burst.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 180 }),
          withTiming(0, { duration: 180 }),
        ),
        6,
        false,
      );
    }
  }, [burst, state]);

  const auraStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.17]);
    const opacity = interpolate(pulse.value, [0, 1], [0.28, 0.62]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const orbStyle = useAnimatedStyle(() => {
    const x = state === "error" ? burst.value * 4 : 0;
    const scale = state === "success" ? 1 + burst.value * 0.08 : 1;
    return {
      transform: [{ translateX: x }, { scale }],
    };
  });

  return (
    <View
      style={[styles.container, { width: size + 24, height: size + 24 }]}
      accessibilityLabel={`Forge core ${state}`}
    >
      <Animated.View
        style={[
          styles.aura,
          {
            width: size + 18,
            height: size + 18,
            borderRadius: (size + 18) / 2,
            backgroundColor:
              state === "error"
                ? `${theme.colors.danger}50`
                : `${theme.colors.neonAlt}55`,
          },
          auraStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor:
              state === "error" ? theme.colors.danger : theme.colors.neon,
          },
          orbStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  aura: {
    position: "absolute",
  },
  orb: {
    borderWidth: 2,
    backgroundColor: theme.colors.surfaceAlt,
    shadowColor: theme.colors.neon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
});
