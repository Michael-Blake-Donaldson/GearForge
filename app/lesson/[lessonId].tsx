import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import ForgeCore from "@/components/ForgeCore";
import ProgressBar from "@/components/ProgressBar";
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
  const calibrationProgress = ((step + 1) / 4) * 100;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.forgeRow}>
        <ForgeCore
          state={
            checkpointChecked
              ? selectedCheckpoint === checkpointCorrectIndex
                ? "success"
                : "error"
              : "idle"
          }
          size={52}
        />
        <View style={styles.forgeTextWrap}>
          <Text style={styles.forgeTitle}>Forge Guidance</Text>
          <Text style={styles.forgeBody}>
            {step < 2
              ? "Scan each calibration block before advancing to diagnostics."
              : step === 2
                ? "Confirm the strongest takeaway, then proceed."
                : "Final diagnostics are unlocked. Run the sequence."}
          </Text>
        </View>
      </View>

      <ProgressBar value={calibrationProgress} max={100} accessibilityLabel="Calibration progress" />
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.summary}>
        Calibration step {step + 1}/4 · {lesson.shortExplanation}
      </Text>

      {step === 0 && (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Calibration 1 · Quick Briefing</Text>
          {lesson.hook && <Text style={styles.body}>{lesson.hook}</Text>}
          <Text style={styles.body}>{lesson.shortExplanation}</Text>
          <Text style={styles.body}>{lesson.keyTakeaway}</Text>
        </View>
      )}

      {step === 1 && (
        <>
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Calibration 2 · Core Concept</Text>
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
          <Text style={styles.blockTitle}>Diagnostics Checkpoint</Text>
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
          <Text style={styles.blockTitle}>Final Diagnostics Ready</Text>
          <Text style={styles.body}>
            Nice work. You completed the calibration brief and checkpoint.
            Finish with diagnostics to lock in energy and progression.
          </Text>
        </View>
      )}

      {step < 2 && (
        <Button label="Continue" disabled={!unlocked} onPress={() => setStep((prev) => prev + 1)} />
      )}

      {step === 2 && !checkpointChecked && (
        <Button
          label="Check Diagnostics"
          disabled={!unlocked || selectedCheckpoint === null}
          onPress={() => setCheckpointChecked(true)}
        />
      )}

      {step === 2 && checkpointChecked && (
        <Button label="Proceed to Final Diagnostics" disabled={!unlocked} onPress={() => setStep(3)} />
      )}

      {step === 3 && (
        <Button
          label={completed ? "Retake Final Diagnostics" : "Start Final Diagnostics"}
          disabled={!unlocked}
          onPress={() => router.push(`/quiz/${lesson.quizId}`)}
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
    gap: 10,
    paddingBottom: 100,
  },
  forgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  forgeTextWrap: {
    flex: 1,
  },
  forgeTitle: {
    color: theme.colors.neonAlt,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  forgeBody: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
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
    marginBottom: 2,
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
});
