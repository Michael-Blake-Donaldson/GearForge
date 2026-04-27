import { Pressable, StyleSheet, Text } from "react-native";

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

  return (
    <Pressable
      style={[
        styles.option,
        selected && styles.selected,
        isCorrect && styles.correct,
        isIncorrect && styles.incorrect,
      ]}
      onPress={onPress}
      disabled={Boolean(revealState)}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
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
