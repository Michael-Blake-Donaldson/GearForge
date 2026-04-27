import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { lessons } from '@/data/lessons';
import { theme } from '@/constants/theme';
import { useProgressStore } from '@/store/useProgressStore';

export default function LessonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lessonId: string }>();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

  const lesson = lessons.find((item) => item.id === lessonId);

  const completedLessons = useProgressStore((state) => state.completedLessons);
  const isLessonUnlocked = useProgressStore((state) => state.isLessonUnlocked);

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Lesson not found.</Text>
      </View>
    );
  }

  const completed = completedLessons.includes(lesson.id);
  const unlocked = isLessonUnlocked(lesson.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.summary}>{lesson.shortExplanation}</Text>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Lesson Content</Text>
        <Text style={styles.body}>{lesson.content}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Real-world Context</Text>
        <Text style={styles.body}>{lesson.realWorldContext}</Text>
      </View>

      <View style={styles.takeaway}>
        <Text style={styles.blockTitle}>Key Takeaway</Text>
        <Text style={styles.body}>{lesson.keyTakeaway}</Text>
      </View>

      <Pressable
        style={[styles.button, !unlocked && styles.disabledButton]}
        disabled={!unlocked}
        onPress={() => router.push(`/quiz/${lesson.quizId}`)}>
        <Text style={styles.buttonText}>{completed ? 'Retake Quiz' : 'Start Quiz'}</Text>
      </Pressable>
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
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg,
  },
  notFound: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  summary: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 14,
  },
  block: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 12,
  },
  takeaway: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.neon,
    backgroundColor: 'rgba(29,211,176,0.12)',
    padding: 14,
    marginBottom: 18,
  },
  blockTitle: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.neon,
    alignItems: 'center',
    paddingVertical: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#051b1d',
    fontWeight: '800',
    fontSize: 14,
  },
});
