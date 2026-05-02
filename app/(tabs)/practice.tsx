import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { regions } from "@/data/regions";
import { useProgressStore } from "@/store/useProgressStore";
import { QuizRecord } from "@/types/UserProgress";

// ── SM-2 Spaced-Repetition Scheduler ─────────────────────────────────────────
//
// Simplified SM-2: Each past quiz attempt is reduced to a "quality" score
// (0–5) and used to compute the next optimal review date.
//
// Interval rules (simplified from Anki/SM-2):
//   quality < 3 → reset interval to 1 day
//   quality = 3 → interval stays the same (minimum 1)
//   quality = 4 → interval * 2.5
//   quality = 5 → interval * 2.5 * 1.3
//
// A quiz is "due" when today >= lastAnsweredAt + interval days.

const MS_PER_DAY = 86_400_000;

/** Map a raw score (0–1) to an SM-2 quality value (0–5). */
function scoreToQuality(correct: number, total: number): number {
  if (total === 0) return 0;
  const ratio = correct / total;
  if (ratio >= 0.95) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  if (ratio >= 0.2) return 1;
  return 0;
}

/**
 * Compute the next review interval (in days) for a quiz given its full
 * history. Returns the interval from the most recent attempt forward.
 */
function computeNextInterval(records: QuizRecord[]): number {
  let interval = 1;
  for (const record of records) {
    const quality = scoreToQuality(record.correct, record.total);
    if (quality < 3) {
      interval = 1; // reset
    } else if (quality === 3) {
      interval = Math.max(interval, 1);
    } else if (quality === 4) {
      interval = Math.round(interval * 2.5);
    } else {
      interval = Math.round(interval * 2.5 * 1.3);
    }
  }
  return interval;
}

/** Return true when a quiz is currently due for review. */
function isDue(
  quizId: string,
  historyByQuiz: Map<string, QuizRecord[]>,
): boolean {
  const records = historyByQuiz.get(quizId);
  if (!records || records.length === 0) return false; // never attempted

  const latest = records[records.length - 1];
  const interval = computeNextInterval(records);
  const dueAt = new Date(latest.answeredAt).getTime() + interval * MS_PER_DAY;
  return Date.now() >= dueAt;
}

// ── Screen ─────────────────────────────────────────────────────────────────

export default function PracticeScreen() {
  const router = useRouter();
  const incorrectQuestionIds = useProgressStore(
    (state) => state.incorrectQuestionIds,
  );
  const quizHistory = useProgressStore((state) => state.quizHistory);
  const [regionId, setRegionId] = useState<string>("all");

  // Build a map from quizId → sorted list of QuizRecord for SM-2 scheduling
  const historyByQuiz = useMemo<Map<string, QuizRecord[]>>(() => {
    const map = new Map<string, QuizRecord[]>();
    for (const record of quizHistory) {
      const existing = map.get(record.quizId) ?? [];
      map.set(record.quizId, [...existing, record]);
    }
    // Sort each quiz's history chronologically
    for (const [id, records] of map) {
      map.set(
        id,
        [...records].sort(
          (a, b) =>
            new Date(a.answeredAt).getTime() - new Date(b.answeredAt).getTime(),
        ),
      );
    }
    return map;
  }, [quizHistory]);

  // Quizzes due for spaced-repetition review — ordered by most overdue first
  const dueQuizzes = useMemo(() => {
    return quizzes
      .filter((quiz) => isDue(quiz.id, historyByQuiz))
      .sort((a, b) => {
        // Sort so most overdue comes first
        const aRecords = historyByQuiz.get(a.id) ?? [];
        const bRecords = historyByQuiz.get(b.id) ?? [];
        if (aRecords.length === 0 || bRecords.length === 0) return 0;
        const aLatest = aRecords[aRecords.length - 1];
        const bLatest = bRecords[bRecords.length - 1];
        return (
          new Date(aLatest.answeredAt).getTime() -
          new Date(bLatest.answeredAt).getTime()
        );
      });
  }, [historyByQuiz]);

  const quizCandidates = useMemo(() => {
    if (regionId === "all") return quizzes;

    const lessonIds = lessons
      .filter((lesson) => lesson.regionId === regionId)
      .map((lesson) => lesson.id);
    return quizzes.filter(
      (quiz) => quiz.lessonId && lessonIds.includes(quiz.lessonId),
    );
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
      <Text style={styles.title}>Recalibration Arena</Text>
      <Text style={styles.subtitle}>
        Reinforce weak systems and sharpen diagnostics speed with targeted
        drills.
      </Text>

      {/* ── Spaced Repetition Review ────────────────────────────────────── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>📅 Diagnostics Due</Text>
          {dueQuizzes.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{dueQuizzes.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardBody}>
          Spaced-repetition schedule (SM-2). Diagnostics become due when your
          forgetting curve says it's time to reinforce.
        </Text>

        {dueQuizzes.length === 0 ? (
          <Text style={styles.emptyState}>
            Nothing due right now. Keep completing lessons to build your review
            queue.
          </Text>
        ) : (
          dueQuizzes.slice(0, 5).map((quiz) => {
            const records = historyByQuiz.get(quiz.id) ?? [];
            const lastRecord = records[records.length - 1];
            const lastScore = lastRecord
              ? `${lastRecord.correct}/${lastRecord.total}`
              : "—";
            return (
              <Pressable
                key={quiz.id}
                style={styles.reviewButton}
                onPress={() => router.push(`/quiz/${quiz.id}`)}
              >
                <View style={styles.reviewButtonRow}>
                  <Text style={styles.reviewTitle}>{quiz.title}</Text>
                  <Text style={styles.reviewScore}>Last: {lastScore}</Text>
                </View>
              </Pressable>
            );
          })
        )}
      </View>

      {/* ── Weak Topic Retry ────────────────────────────────────────────── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔁 Weak-System Review</Text>
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

      {/* ── Randomized Practice ──────────────────────────────────────────── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎲 Randomized Recalibration</Text>
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
          {regions.map((region) => (
            <Pressable
              key={region.id}
              style={[
                styles.filterChip,
                regionId === region.id && styles.filterChipActive,
              ]}
              onPress={() => setRegionId(region.id)}
            >
              <Text style={styles.filterText}>
                {region.name
                  .replace(" Vehicles", "")
                  .replace(" and Hybrid", "")}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={runRandomQuiz}>
          <Text style={styles.primaryText}>Start Random Diagnostics</Text>
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  badge: {
    borderRadius: 10,
    backgroundColor: theme.colors.neon,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "800",
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
  reviewButton: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.neon + "55",
    backgroundColor: theme.colors.neon + "11",
    padding: 12,
    marginTop: 8,
  },
  reviewButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewTitle: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  reviewScore: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginLeft: 8,
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
