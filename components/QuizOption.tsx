import { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { theme } from "@/constants/theme";

type Props = {
  text: string;
  selected: boolean;
  revealState?: "correct" | "incorrect";
  onPress: () => void;
};

export default function QuizOption({
  text,
  selected,
  revealState,
  onPress,
}: Props) {
  const isCorrect = revealState === "correct";
  const isIncorrect = revealState === "incorrect";

  // Build a meaningful accessibility hint so screen-reader users know the
  // outcome of their selection when feedback is revealed.
  let accessibilityState: "selected" | "correct" | "incorrect" | undefined;
  if (isCorrect) accessibilityState = "correct";
  else if (isIncorrect) accessibilityState = "incorrect";
  else if (selected) accessibilityState = "selected";

  const anim = useSharedValue(0);

  useEffect(() => {
    if (revealState === "correct") {
      anim.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 250 }),
      );
    }
    if (revealState === "incorrect") {
      anim.value = withSequence(
        withTiming(-1, { duration: 60 }),
        withTiming(1, { duration: 60 }),
        withTiming(-1, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    }
  }, [anim, revealState]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: revealState === "incorrect" ? anim.value * 6 : 0 },
      { scale: revealState === "correct" ? 1 + anim.value * 0.03 : 1 },
    ],
    shadowColor:
      revealState === "correct" ? theme.colors.success : theme.colors.danger,
    shadowOpacity: revealState ? 0.35 : 0,
    shadowRadius: 8,
    backgroundColor:
      revealState === "correct"
        ? interpolateColor(
            anim.value,
            [0, 1],
            ["rgba(69,243,176,0.20)", "rgba(69,243,176,0.35)"],
          )
        : undefined,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[
          styles.option,
          selected && styles.selected,
          isCorrect && styles.correct,
          isIncorrect && styles.incorrect,
        ]}
        onPress={onPress}
        disabled={Boolean(revealState)}
        accessible
        accessibilityRole="radio"
        accessibilityLabel={text}
        accessibilityHint={
          revealState
            ? isCorrect
              ? "Correct answer"
              : "Incorrect answer"
            : "Tap to select this answer"
        }
        accessibilityState={{ selected: selected && !revealState }}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: 46,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  selected: {
    borderColor: theme.colors.neonAlt,
    backgroundColor: "rgba(57,160,255,0.2)",
  },
  correct: {
    borderColor: theme.colors.success,
    backgroundColor: "rgba(45,225,165,0.2)",
  },
  incorrect: {
    borderColor: theme.colors.danger,
    backgroundColor: "rgba(255,111,145,0.2)",
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
});
