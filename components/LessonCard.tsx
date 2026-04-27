import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { Lesson } from '@/types/Lesson';

type Props = {
  lesson: Lesson;
  isUnlocked: boolean;
  isCompleted: boolean;
  onPress: () => void;
};

export default function LessonCard({ lesson, isUnlocked, isCompleted, onPress }: Props) {
  return (
    <Pressable style={[styles.card, !isUnlocked && styles.lockedCard]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={[styles.state, isCompleted ? styles.complete : styles.locked]}>
          {isCompleted ? 'Completed' : isUnlocked ? 'Ready' : 'Locked'}
        </Text>
      </View>
      <Text style={styles.summary}>{lesson.shortExplanation}</Text>
      <Text style={styles.meta}>{lesson.xpReward} XP base reward</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    padding: 12,
    marginTop: 10,
  },
  lockedCard: {
    opacity: 0.55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  state: {
    fontSize: 11,
    fontWeight: '700',
  },
  complete: {
    color: theme.colors.success,
  },
  locked: {
    color: theme.colors.warning,
  },
  summary: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  meta: {
    color: theme.colors.neon,
    fontSize: 11,
    marginTop: 8,
    fontWeight: '700',
  },
});
