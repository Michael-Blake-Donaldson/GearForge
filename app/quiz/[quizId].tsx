import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import QuizOption from '@/components/QuizOption';
import { quizzesById } from '@/data/quizzes';
import { theme } from '@/constants/theme';
import { useProgressStore } from '@/store/useProgressStore';

export default function QuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ quizId: string }>();
  const quizId = Array.isArray(params.quizId) ? params.quizId[0] : params.quizId;

  const quiz = quizId ? quizzesById[quizId] : undefined;
  const submitQuizResult = useProgressStore((state) => state.submitQuizResult);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const question = useMemo(() => quiz?.questions[currentIndex], [quiz, currentIndex]);
  const progressPercent = quiz ? Math.round(((currentIndex + 1) / quiz.questions.length) * 100) : 0;

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
    } else {
      setIncorrectQuestionIds((prev) => [...prev, question.id]);
    }
    setShowFeedback(true);
  };

  const onNext = () => {
    const isLast = currentIndex >= quiz.questions.length - 1;

    if (isLast) {
      if (!quizSubmitted) {
        // Submit once to avoid duplicate XP when component rerenders.
        submitQuizResult({
          quizId: quiz.id,
          lessonId: quiz.lessonId,
          correct: correctCount,
          total: quiz.questions.length,
          incorrectQuestionIds,
        });
        setQuizSubmitted(true);
      }
      router.replace('/(tabs)/progress');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setShowFeedback(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{quiz.title}</Text>
      <Text style={styles.progress}>Question {currentIndex + 1}/{quiz.questions.length} · {progressPercent}%</Text>

      <View style={styles.card}>
        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.optionsWrap}>
          {question.options.map((option, index) => {
            let revealState: 'correct' | 'incorrect' | undefined;
            if (showFeedback) {
              if (index === question.correctAnswerIndex) revealState = 'correct';
              if (index === selectedIndex && index !== question.correctAnswerIndex) revealState = 'incorrect';
            }

            return (
              <QuizOption
                key={option}
                text={option}
                selected={selectedIndex === index}
                revealState={revealState}
                onPress={() => setSelectedIndex(index)}
              />
            );
          })}
        </View>

        {showFeedback && <Text style={styles.explanation}>{question.explanation}</Text>}
      </View>

      {!showFeedback ? (
        <Pressable style={[styles.button, selectedIndex === null && styles.buttonDisabled]} onPress={onCheck}>
          <Text style={styles.buttonText}>Check Answer</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>
            {currentIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </Pressable>
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
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 21,
    fontWeight: '800',
  },
  progress: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 8,
    marginBottom: 12,
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
    fontWeight: '700',
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
  button: {
    marginTop: 14,
    borderRadius: theme.radii.md,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: theme.colors.neon,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#051a17',
    fontWeight: '800',
    fontSize: 14,
  },
});
