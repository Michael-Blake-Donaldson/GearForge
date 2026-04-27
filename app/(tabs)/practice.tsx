import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { regions } from "@/data/regions";
import { useProgressStore } from "@/store/useProgressStore";

export default function PracticeScreen() {
  const router = useRouter();
  const incorrectQuestionIds = useProgressStore(
    (state) => state.incorrectQuestionIds,
  );
  const [regionId, setRegionId] = useState<string>("all");

  const quizCandidates = useMemo(() => {
    if (regionId === "all") return quizzes;

    const lessonIds = lessons
      .filter((lesson) => lesson.regionId === regionId)
      .map((lesson) => lesson.id);
    return quizzes.filter((quiz) => lessonIds.includes(quiz.lessonId));
  }, [regionId]);

  const runRandomQuiz = () => {
    if (quizCandidates.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quizCandidates.length);
    const quiz = quizCandidates[randomIndex];
    router.push(`/quiz/${quiz.id}`);
  };

  const weakQuizzes = quizzes.filter((quiz) =>
    quiz.questions.some((question) =>
      incorrectQuestionIds.includes(question.id),
    ),
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Practice Arena</Text>
      <Text style={styles.subtitle}>
        Reinforce weak topics and sharpen quiz speed with targeted drills.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weak Topic Review</Text>
        <Text style={styles.cardBody}>
          {incorrectQuestionIds.length} weak questions identified so far.
        </Text>

        {weakQuizzes.length === 0 ? (
          <Text style={styles.emptyState}>
            No weak quizzes yet. Complete more lessons to build a review set.
          </Text>
        ) : (
          weakQuizzes.slice(0, 4).map((quiz) => (
            <Pressable
              key={quiz.id}
              style={styles.actionButton}
              onPress={() => router.push(`/quiz/${quiz.id}`)}
            >
              <Text style={styles.actionText}>Retry: {quiz.title}</Text>
            </Pressable>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Randomized Practice</Text>
        <Text style={styles.cardBody}>
          Choose a region focus or run all-region random drills.
        </Text>

        <View style={styles.filters}>
          <Pressable
            style={[
              styles.filterChip,
              regionId === "all" && styles.filterChipActive,
            ]}
            onPress={() => setRegionId("all")}
          >
            <Text style={styles.filterText}>All</Text>
          </Pressable>
          {regions.slice(0, 3).map((region) => (
            <Pressable
              key={region.id}
              style={[
                styles.filterChip,
                regionId === region.id && styles.filterChipActive,
              ]}
              onPress={() => setRegionId(region.id)}
            >
              <Text style={styles.filterText}>
                {region.name.replace(" Vehicles", "")}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={runRandomQuiz}>
          <Text style={styles.primaryText}>Start Random Quiz</Text>
        </Pressable>
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
    gap: 14,
    paddingBottom: 120,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  cardBody: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 12,
  },
  emptyState: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  actionButton: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    padding: 12,
    marginTop: 8,
  },
  actionText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: theme.colors.surfaceAlt,
  },
  filterChipActive: {
    borderColor: theme.colors.neon,
    backgroundColor: "rgba(29,211,176,0.2)",
  },
  filterText: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  primaryButton: {
    borderRadius: theme.radii.md,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: theme.colors.neon,
  },
  primaryText: {
    color: "#06131a",
    fontWeight: "800",
    fontSize: 14,
  },
});
