import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import ForgeCore from "@/components/ForgeCore";
import ProgressBar from "@/components/ProgressBar";
import QuizOption from "@/components/QuizOption";
import { theme } from "@/constants/theme";
import { useProgressStore } from "@/store/useProgressStore";

type PlacementQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const QUESTIONS: PlacementQuestion[] = [
  {
    id: "mt-1",
    prompt: "What is the main purpose of a differential in a driveline?",
    options: [
      "Increase battery voltage to the starter motor",
      "Allow drive wheels to rotate at different speeds while cornering",
      "Control injector pulse width under boost",
      "Route coolant through the heater core",
    ],
    correctIndex: 1,
    explanation:
      "A differential allows left and right drive wheels to spin at different speeds, which is essential during turns.",
  },
  {
    id: "mt-2",
    prompt:
      "Which sensor is most directly used for closed-loop air-fuel correction?",
    options: ["Wheel speed sensor", "Knock sensor", "O2 sensor", "MAP sensor"],
    correctIndex: 2,
    explanation:
      "The oxygen (O2) sensor reports exhaust oxygen content, enabling ECU fuel-trim corrections.",
  },
  {
    id: "mt-3",
    prompt: "Regenerative braking in EVs primarily does what?",
    options: [
      "Uses friction pads only for stronger stopping",
      "Converts kinetic energy into electrical energy",
      "Purges battery heat through coolant bypass",
      "Increases hydraulic brake pressure at idle",
    ],
    correctIndex: 1,
    explanation:
      "Regenerative braking uses the electric motor as a generator to recover energy and recharge the battery.",
  },
  {
    id: "mt-4",
    prompt: "A turbocharger is driven by which energy source?",
    options: [
      "Crankshaft belt torque",
      "Exhaust gas energy",
      "Battery pack current",
      "Transmission fluid flow",
    ],
    correctIndex: 1,
    explanation:
      "Turbochargers are exhaust-driven compressors; they harvest exhaust energy to increase intake air mass.",
  },
  {
    id: "mt-5",
    prompt:
      "What is the most likely result of excessive rear brake bias on a light rear axle?",
    options: [
      "Faster warm-up of catalytic converters",
      "Higher alternator charging efficiency",
      "Rear instability or lock-up under hard braking",
      "Lower steering effort at parking speeds",
    ],
    correctIndex: 2,
    explanation:
      "Too much rear brake force can destabilize the vehicle by causing premature rear lock-up.",
  },
];

export default function MechanicTestScreen() {
  const router = useRouter();
  const completeMechanicTest = useProgressStore((s) => s.completeMechanicTest);

  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(0);

  const current = QUESTIONS[index];
  const percent = Math.round(((index + 1) / QUESTIONS.length) * 100);

  const tier = useMemo(() => {
    const scorePercent = Math.round((correct / QUESTIONS.length) * 100);
    if (scorePercent >= 80) return "Pro";
    if (scorePercent >= 55) return "Builder";
    return "Rookie";
  }, [correct]);

  const onCheck = () => {
    if (selectedIndex === null) return;
    if (selectedIndex === current.correctIndex) setCorrect((v) => v + 1);
    setShowFeedback(true);
  };

  const onNext = () => {
    if (index >= QUESTIONS.length - 1) {
      const scorePercent = Math.round((correct / QUESTIONS.length) * 100);
      completeMechanicTest(scorePercent);
      router.replace("/(tabs)/learn");
      return;
    }

    setIndex((v) => v + 1);
    setSelectedIndex(null);
    setShowFeedback(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <ForgeCore state={showFeedback ? "speaking" : "idle"} size={48} />
        <View style={styles.topTextWrap}>
          <Text style={styles.kicker}>One-Time Placement</Text>
          <Text style={styles.title}>Operator Diagnostics</Text>
        </View>
      </View>
      <ProgressBar
        value={percent}
        max={100}
        accessibilityLabel="Placement progress"
      />
      <Text style={styles.subtitle}>
        Quick calibration so GearForge can place you on the right roadmap.
      </Text>

      <Text style={styles.progress}>
        Diagnostic {index + 1}/{QUESTIONS.length} · {percent}%
      </Text>

      <View style={styles.card}>
        <Text style={styles.prompt}>{current.prompt}</Text>
        <View style={styles.optionStack}>
          {current.options.map((option, optionIndex) => {
            let revealState: "correct" | "incorrect" | undefined;
            if (showFeedback) {
              if (optionIndex === current.correctIndex) revealState = "correct";
              if (
                optionIndex === selectedIndex &&
                optionIndex !== current.correctIndex
              ) {
                revealState = "incorrect";
              }
            }

            return (
              <QuizOption
                key={option}
                text={option}
                selected={selectedIndex === optionIndex}
                revealState={revealState}
                onPress={() => {
                  if (!showFeedback) setSelectedIndex(optionIndex);
                }}
              />
            );
          })}
        </View>

        {showFeedback && (
          <Text style={styles.explanation}>{current.explanation}</Text>
        )}
      </View>

      {!showFeedback ? (
        <Button
          label="Check"
          onPress={onCheck}
          disabled={selectedIndex === null}
        />
      ) : (
        <Button
          label={index === QUESTIONS.length - 1 ? "See My Placement" : "Next"}
          onPress={onNext}
        />
      )}

      <View style={styles.previewRow}>
        <Text style={styles.previewLabel}>Current Placement Preview:</Text>
        <Text style={styles.previewValue}>{tier}</Text>
      </View>
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
    gap: 8,
    paddingBottom: 120,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topTextWrap: {
    flex: 1,
  },
  kicker: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 6,
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 8,
    fontFamily: theme.typography.body.fontFamily,
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  progress: {
    marginTop: 14,
    marginBottom: 10,
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  prompt: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    marginBottom: 12,
  },
  optionStack: {
    gap: 8,
  },
  explanation: {
    marginTop: 12,
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  previewRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  previewLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
  },
  previewValue: {
    color: theme.colors.neon,
    fontSize: 14,
    fontWeight: "800",
  },
});
