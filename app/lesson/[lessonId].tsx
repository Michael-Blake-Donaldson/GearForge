import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import QuizOption from "@/components/QuizOption";
import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useProgressStore } from "@/store/useProgressStore";

export default function LessonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    lessonId: string;
    startStep?: string;
  }>();
  const lessonId = Array.isArray(params.lessonId)
    ? params.lessonId[0]
    : params.lessonId;
  const startStepParam = Array.isArray(params.startStep)
    ? params.startStep[0]
    : params.startStep;

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

  const checkpointOptions = useMemo(() => {
    const distractors = lessons
      .filter((candidate) => candidate.id !== lesson.id)
      .map((candidate) => candidate.keyTakeaway)
      .slice(0, 2);
    return [lesson.keyTakeaway, ...distractors].sort(() => Math.random() - 0.5);
  }, [lesson.id]);
  const checkpointCorrectIndex = checkpointOptions.findIndex(
    (option) => option === lesson.keyTakeaway,
  );

  const initialStep = startStepParam === "checkpoint" ? 2 : 0;
  const [step, setStep] = useState(initialStep);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null,
  );
  const [checkpointChecked, setCheckpointChecked] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.summary}>
        Step {step + 1}/4 · {lesson.shortExplanation}
      </Text>

      {step === 0 && (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Mini Lesson 1 · Quick Briefing</Text>
          {lesson.hook && <Text style={styles.body}>{lesson.hook}</Text>}
          <Text style={styles.body}>{lesson.shortExplanation}</Text>
          <Text style={styles.body}>{lesson.keyTakeaway}</Text>
        </View>
      )}

      {step === 1 && (
        <>
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Mini Lesson 2 · Core Concept</Text>
            <Text style={styles.body}>{lesson.content}</Text>
          </View>

          <View style={styles.block}>
            <Text style={styles.blockTitle}>Garage Context</Text>
            <Text style={styles.body}>{lesson.realWorldContext}</Text>
          </View>

          {lesson.visualConcept && (
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Visual Concept</Text>
              <Text style={styles.body}>{lesson.visualConcept}</Text>
            </View>
          )}

          {lesson.symptoms && (
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Symptoms</Text>
              <Text style={styles.body}>{lesson.symptoms}</Text>
            </View>
          )}
        </>
      )}

      {step === 2 && (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Checkpoint Challenge</Text>
          <Text style={styles.body}>
            Which statement best matches this lesson's key takeaway?
          </Text>

          <View style={styles.challengeStack}>
            {checkpointOptions.map((option, index) => {
              let revealState: "correct" | "incorrect" | undefined;
              if (checkpointChecked) {
                if (index === checkpointCorrectIndex) revealState = "correct";
                if (
                  index === selectedCheckpoint &&
                  index !== checkpointCorrectIndex
                ) {
                  revealState = "incorrect";
                }
              }

              return (
                <QuizOption
                  key={option}
                  text={option}
                  selected={selectedCheckpoint === index}
                  revealState={revealState}
                  onPress={() => {
                    if (!checkpointChecked) setSelectedCheckpoint(index);
                  }}
                />
              );
            })}
          </View>

          {checkpointChecked && (
            <Text style={styles.challengeFeedback}>
              {selectedCheckpoint === checkpointCorrectIndex
                ? "Correct. You are ready for the final quiz."
                : "Review complete: the highlighted option is the best takeaway match."}
            </Text>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={styles.takeaway}>
          <Text style={styles.blockTitle}>Final Quiz Ready</Text>
          <Text style={styles.body}>
            Nice work. You completed the lesson brief and checkpoint challenge.
            Finish with the quiz to lock in XP and progression.
          </Text>
        </View>
      )}

      {step < 2 && (
        <Pressable
          style={[styles.button, !unlocked && styles.disabledButton]}
          disabled={!unlocked}
          onPress={() => setStep((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      )}

      {step === 2 && !checkpointChecked && (
        <Pressable
          style={[
            styles.button,
            (!unlocked || selectedCheckpoint === null) && styles.disabledButton,
          ]}
          disabled={!unlocked || selectedCheckpoint === null}
          onPress={() => setCheckpointChecked(true)}
        >
          <Text style={styles.buttonText}>Check Challenge</Text>
        </Pressable>
      )}

      {step === 2 && checkpointChecked && (
        <Pressable
          style={[styles.button, !unlocked && styles.disabledButton]}
          disabled={!unlocked}
          onPress={() => setStep(3)}
        >
          <Text style={styles.buttonText}>Proceed to Final Quiz</Text>
        </Pressable>
      )}

      {step === 3 && (
        <Pressable
          style={[styles.button, !unlocked && styles.disabledButton]}
          disabled={!unlocked}
          onPress={() => router.push(`/quiz/${lesson.quizId}`)}
        >
          <Text style={styles.buttonText}>
            {completed ? "Retake Final Quiz" : "Start Final Quiz"}
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
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg,
  },
  notFound: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "800",
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
    backgroundColor: "rgba(29,211,176,0.12)",
    padding: 14,
    marginBottom: 18,
  },
  blockTitle: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  challengeStack: {
    gap: 8,
    marginTop: 10,
  },
  challengeFeedback: {
    marginTop: 10,
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.neon,
    alignItems: "center",
    paddingVertical: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#051b1d",
    fontWeight: "800",
    fontSize: 14,
  },
});
