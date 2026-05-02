import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import ForgeCore from "@/components/ForgeCore";
import QuizOption from "@/components/QuizOption";
import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { quizzesById } from "@/data/quizzes";
import { useProgressStore } from "@/store/useProgressStore";
import { feedback } from "@/utils/feedback";

export default function QuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ quizId: string }>();
  const quizId = Array.isArray(params.quizId)
    ? params.quizId[0]
    : params.quizId;

  const quiz = quizId ? quizzesById[quizId] : undefined;
  const submitQuizResult = useProgressStore((state) => state.submitQuizResult);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>(
    [],
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const question = useMemo(
    () => quiz?.questions[currentIndex],
    [quiz, currentIndex],
  );
  const progressPercent = quiz
    ? Math.round(((currentIndex + 1) / quiz.questions.length) * 100)
    : 0;

  if (!quiz || !question) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Quiz not found.</Text>
      </View>
    );
  }

  const onCheck = () => {
    if (selectedIndex === null) return;

    const isCorrect = selectedIndex === question.correctAnswerIndex;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      feedback.correct();
    } else {
      setIncorrectQuestionIds((prev) => [...prev, question.id]);
      feedback.incorrect();
    }
    setShowFeedback(true);
  };

  const onNext = () => {
    const isLast = currentIndex >= quiz.questions.length - 1;

    if (isLast) {
      if (!quizSubmitted) {
        const lessonIdForProgress =
          quiz.lessonId ?? quiz.referenceLessonId ?? lessons[0]?.id;

        if (!lessonIdForProgress) return;

        // Submit once to avoid duplicate XP when component rerenders.
        submitQuizResult({
          quizId: quiz.id,
          lessonId: lessonIdForProgress,
          correct: correctCount,
          total: quiz.questions.length,
          incorrectQuestionIds,
        });
        setQuizSubmitted(true);
      }
      // Look up lesson xpReward to pass to the celebration screen.
      const lesson = lessons.find(
        (l) => l.id === (quiz.lessonId ?? quiz.referenceLessonId),
      );
      const xp = lesson?.xpReward ?? 0;

      // Route to lesson-complete celebration screen with result params.
      router.replace(
        `/lesson-complete?lessonId=${lesson?.id ?? "am-l1"}&xp=${xp}&correct=${correctCount}&total=${quiz.questions.length}`,
      );
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setShowFeedback(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <ForgeCore state={showFeedback ? (selectedIndex === question.correctAnswerIndex ? "success" : "error") : "speaking"} size={46} />
        <View style={styles.topTextWrap}>
          <Text style={styles.title}>{quiz.title}</Text>
          <Text style={styles.progress}>
            Diagnostics {currentIndex + 1}/{quiz.questions.length} · {progressPercent}%
          </Text>
        </View>
      </View>
      <Text style={styles.progress}>
        {showFeedback
          ? "Feedback locked. Review and continue."
          : "Select one response for evaluation."}
      </Text>

      <Text style={styles.questionTypeLabel}>
        {question.questionType.replace("-", " ").toUpperCase()}
      </Text>

      <View style={styles.card}>
        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.optionsWrap}>
          {question.options.map((option, index) => {
            let revealState: "correct" | "incorrect" | undefined;
            if (showFeedback) {
              if (index === question.correctAnswerIndex)
                revealState = "correct";
              if (
                index === selectedIndex &&
                index !== question.correctAnswerIndex
              )
                revealState = "incorrect";
            }

            return (
              <QuizOption
                key={option}
                text={option}
                selected={selectedIndex === index}
                revealState={revealState}
                onPress={() => {
                  if (!showFeedback) {
                    feedback.selection();
                  }
                  setSelectedIndex(index);
                }}
              />
            );
          })}
        </View>

        {showFeedback && (
          <Text style={styles.explanation}>{question.explanation}</Text>
        )}
      </View>

      {!showFeedback ? (
        <Button
          label="Check Response"
          onPress={onCheck}
          disabled={selectedIndex === null}
        />
      ) : (
        <Button
          label={
            currentIndex === quiz.questions.length - 1
              ? "Finish Diagnostics"
              : "Next Diagnostic"
          }
          onPress={onNext}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    gap: 6,
    paddingBottom: 80,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topTextWrap: {
    flex: 1,
  },
  centered: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 21,
    fontWeight: "800",
  },
  progress: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },
  questionTypeLabel: {
    color: theme.colors.warning,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  question: {
    color: theme.colors.textPrimary,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  optionsWrap: {
    gap: 8,
  },
  explanation: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
});
