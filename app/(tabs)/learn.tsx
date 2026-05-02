import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Card from "@/components/Card";
import ForgeCore from "@/components/ForgeCore";
import PathCard from "@/components/PathCard";
import StreakCounter from "@/components/StreakCounter";
import XPDisplay from "@/components/XPDisplay";
import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { regionExamsByRegionId, unitExamsByUnitId } from "@/data/quizzes";
import { regions, starterRegionIds } from "@/data/regions";
import { units } from "@/data/units";
import { useProgressStore } from "@/store/useProgressStore";
import { DailyQuest, WeeklyQuest } from "@/types/UserProgress";

type RoadmapNode = {
  id: string;
  label: string;
  type: "lesson" | "challenge" | "final";
  unlocked: boolean;
  completed: boolean;
  onPress: () => void;
};

export default function LearnScreen() {
  const router = useRouter();
  const preferredRegionId = useProgressStore(
    (state) => state.preferredRegionId,
  );
  const [selectedRegionId, setSelectedRegionId] = useState(
    preferredRegionId ?? starterRegionIds[0],
  );

  const completedLessons = useProgressStore((state) => state.completedLessons);
  const isUnitUnlocked = useProgressStore((state) => state.isUnitUnlocked);
  const isLessonUnlocked = useProgressStore((state) => state.isLessonUnlocked);
  const getRegionMastery = useProgressStore((state) => state.getRegionMastery);
  const mechanicPlacementTier = useProgressStore(
    (state) => state.mechanicPlacementTier,
  );
  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const streak = useProgressStore((state) => state.streak);
  const quizHistory = useProgressStore((state) => state.quizHistory);
  // Daily quest — may be null until first lesson is completed (store populates it)
  const dailyQuest = useProgressStore((state) => state.dailyQuest);
  const weeklyQuest = useProgressStore((state) => state.weeklyQuest);

  const selectedRegion =
    regions.find((region) => region.id === selectedRegionId) ?? regions[0];
  const regionUnits = useMemo(
    () =>
      units
        .filter((unit) => unit.regionId === selectedRegion.id)
        .sort((a, b) => a.order - b.order),
    [selectedRegion.id],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <XPDisplay xp={xp} level={level} />
        <StreakCounter streak={streak} />
      </View>

      <Card style={styles.commandCard} glowColor={theme.colors.neon}>
        <View style={styles.commandCardRow}>
          <ForgeCore state="idle" size={56} />
          <View style={styles.commandCardTextWrap}>
            <Text style={styles.commandCardEyebrow}>Neon Core Assistant</Text>
            <Text style={styles.commandCardTitle}>Forge is online</Text>
            <Text style={styles.commandCardBody}>
              Run calibrations in sequence, complete diagnostics, and maintain
              energy momentum.
            </Text>
          </View>
        </View>
      </Card>

      {/* Daily Quest card — only shown when a quest exists for today */}
      {dailyQuest && <DailyQuestCard quest={dailyQuest} />}
      {weeklyQuest && <WeeklyQuestCard quest={weeklyQuest} />}

      <View style={styles.placementCard}>
        <Text style={styles.placementLabel}>Operator Placement</Text>
        <Text style={styles.placementValue}>
          {mechanicPlacementTier === "pro"
            ? "Pro Track"
            : mechanicPlacementTier === "builder"
              ? "Builder Track"
              : "Rookie Track"}
        </Text>
        <Text style={styles.placementBody}>
          Your roadmap now alternates mini lessons, checkpoint challenges, and a
          final quiz so progression feels guided, not intimidating.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Command Paths</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pathRow}
      >
        {regions.map((region) => (
          <PathCard
            key={region.id}
            region={region}
            masteryPercent={getRegionMastery(region.id)}
            selected={region.id === selectedRegion.id}
            onPress={() => setSelectedRegionId(region.id)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>{selectedRegion.name} Command Roadmap</Text>
      {regionUnits.length === 0 && (
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonTitle}>Content Coming Soon</Text>
          <Text style={styles.comingSoonBody}>
            This path is planned for a future module pack. Start with American,
            Japanese, or European tracks.
          </Text>
        </View>
      )}

      {regionUnits.map((unit) => {
        const unitLessons = lessons
          .filter((lesson) => lesson.unitId === unit.id)
          .sort((a, b) => a.order - b.order);
        const allLessonsDone =
          unitLessons.length > 0 &&
          unitLessons.every((lesson) => completedLessons.includes(lesson.id));

        const roadmapNodes: RoadmapNode[] = unitLessons.flatMap((lesson) => {
          const unlocked = isLessonUnlocked(lesson.id);
          const completed = completedLessons.includes(lesson.id);

          return [
            {
              id: `${lesson.id}-micro-1`,
              label: `Calibration: ${lesson.title}`,
              type: "lesson" as const,
              unlocked,
              completed,
              onPress: () => router.push(`/lesson/${lesson.id}`),
            },
            {
              id: `${lesson.id}-challenge`,
              label: "Recalibration Challenge",
              type: "challenge" as const,
              unlocked,
              completed,
              onPress: () =>
                router.push(`/lesson/${lesson.id}?startStep=checkpoint`),
            },
          ];
        });

        const unitExam = unitExamsByUnitId[unit.id];
        if (unitExam) {
          const unitExamCompleted = quizHistory.some(
            (record) => record.quizId === unitExam.id,
          );
          roadmapNodes.push({
            id: `${unit.id}-final`,
            label: "Unit Diagnostics",
            type: "final" as const,
            unlocked: allLessonsDone,
            completed: unitExamCompleted,
            onPress: () => router.push(`/quiz/${unitExam.id}`),
          });
        }

        return (
          <View
            key={unit.id}
            style={[
              styles.unitRoadmap,
              !isUnitUnlocked(unit.id) && styles.lockedUnit,
            ]}
          >
            <View style={styles.unitHeaderRow}>
              <Text style={styles.unitTitle}>{unit.title}</Text>
              <Text style={styles.unitProgressLabel}>
                {
                  unitLessons.filter((lesson) =>
                    completedLessons.includes(lesson.id),
                  ).length
                }
                /{unitLessons.length}
              </Text>
            </View>
            <Text style={styles.unitDescription}>{unit.description}</Text>

            <View style={styles.pathColumn}>
              {roadmapNodes.map((node, index) => {
                const staggerLeft = index % 2 === 0;
                return (
                  <View key={node.id} style={styles.nodeWrap}>
                    <View
                      style={[
                        styles.connector,
                        index === roadmapNodes.length - 1 &&
                          styles.connectorHidden,
                      ]}
                    />
                    <Pressable
                      onPress={() => {
                        if (!node.unlocked) return;
                        node.onPress();
                      }}
                      style={[
                        styles.roadNode,
                        staggerLeft ? styles.nodeLeft : styles.nodeRight,
                        node.type === "challenge" && styles.challengeNode,
                        node.type === "final" && styles.finalNode,
                        node.completed && styles.completedNode,
                        !node.unlocked && styles.lockedNode,
                      ]}
                    >
                      <Text style={styles.nodeEmoji}>
                        {node.type === "lesson"
                          ? "📘"
                          : node.type === "challenge"
                            ? "🛠️"
                            : "🏁"}
                      </Text>
                      <View style={styles.nodeTextWrap}>
                        <Text style={styles.nodeTitle}>{node.label}</Text>
                        <Text style={styles.nodeSubtitle}>
                          {node.completed
                            ? "Completed"
                            : node.unlocked
                              ? "Tap to continue"
                              : "Locked"}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}

      {(() => {
        const regionExam = regionExamsByRegionId[selectedRegion.id];
        if (!regionExam) return null;

        const regionUnitIds = regionUnits.map((unit) => unit.id);
        const allRegionUnitsCompleted = regionUnitIds.every((unitId) => {
          const exam = unitExamsByUnitId[unitId];
          if (!exam) return false;
          return quizHistory.some((record) => record.quizId === exam.id);
        });

        const regionExamCompleted = quizHistory.some(
          (record) => record.quizId === regionExam.id,
        );

        return (
          <Pressable
            onPress={() => {
              if (!allRegionUnitsCompleted) return;
              router.push(`/quiz/${regionExam.id}`);
            }}
            style={[
              styles.regionFinalCard,
              !allRegionUnitsCompleted && styles.regionFinalCardLocked,
              regionExamCompleted && styles.regionFinalCardComplete,
            ]}
          >
            <Text style={styles.regionFinalTitle}>🏆 Final Region Exam</Text>
            <Text style={styles.regionFinalBody}>
              {regionExamCompleted
                ? "Completed. Retake any time to reinforce mastery."
                : allRegionUnitsCompleted
                  ? "All unit exams complete. Tap to take the region final."
                  : "Finish all unit exams in this region to unlock the final exam."}
            </Text>
          </Pressable>
        );
      })()}

      <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerTitle}>Safety Notice</Text>
        <Text style={styles.disclaimerBody}>
          GearForge is for educational purposes only and does not replace
          professional repair guidance, safety procedures, or certified
          inspections.
        </Text>
      </View>
    </ScrollView>
  );
}

// ── DailyQuestCard ───────────────────────────────────────────────────────────
// Inline sub-component for the Learn tab header. Shows quest description,
// progress bar, and a "Done" badge when the quest is completed.
function DailyQuestCard({ quest }: { quest: DailyQuest }) {
  const progress = Math.min(quest.progressCount / quest.targetCount, 1);
  const progressPercent = Math.round(progress * 100);

  return (
    <View style={questStyles.card}>
      <View style={questStyles.topRow}>
        <Text style={questStyles.label}>🎯 Daily Quest</Text>
        {quest.completed && (
          <View style={questStyles.doneBadge}>
            <Text style={questStyles.doneText}>Done ✓</Text>
          </View>
        )}
      </View>
      <Text style={questStyles.description}>{quest.description}</Text>

      {/* Progress bar */}
      <View style={questStyles.barTrack}>
        <View style={[questStyles.barFill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={questStyles.progressLabel}>
        {quest.progressCount} / {quest.targetCount}
      </Text>
    </View>
  );
}

function WeeklyQuestCard({ quest }: { quest: WeeklyQuest }) {
  const progress = Math.min(quest.progressCount / quest.targetCount, 1);
  const progressPercent = Math.round(progress * 100);

  return (
    <View style={questStyles.cardWeekly}>
      <View style={questStyles.topRow}>
        <Text style={questStyles.labelWeekly}>🗓️ Weekly Quest</Text>
        {quest.completed && (
          <View style={questStyles.doneBadgeWeekly}>
            <Text style={questStyles.doneTextWeekly}>Complete</Text>
          </View>
        )}
      </View>
      <Text style={questStyles.description}>{quest.description}</Text>

      <View style={questStyles.barTrack}>
        <View
          style={[questStyles.barFillWeekly, { width: `${progressPercent}%` }]}
        />
      </View>
      <Text style={questStyles.progressLabel}>
        {quest.progressCount} / {quest.targetCount}
      </Text>
    </View>
  );
}

const questStyles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.neon + "55",
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    color: theme.colors.neon,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  doneBadge: {
    borderRadius: 10,
    backgroundColor: theme.colors.neon + "22",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  doneText: {
    color: theme.colors.neon,
    fontSize: 11,
    fontWeight: "700",
  },
  description: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    marginBottom: 10,
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.border,
    overflow: "hidden",
    marginBottom: 4,
  },
  barFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.neon,
  },
  progressLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    textAlign: "right",
  },
  cardWeekly: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.warning + "55",
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 16,
  },
  labelWeekly: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  doneBadgeWeekly: {
    borderRadius: 10,
    backgroundColor: theme.colors.warning + "22",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  doneTextWeekly: {
    color: theme.colors.warning,
    fontSize: 11,
    fontWeight: "700",
  },
  barFillWeekly: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.warning,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 18,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  commandCard: {
    marginBottom: 14,
  },
  commandCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  commandCardTextWrap: {
    flex: 1,
  },
  commandCardEyebrow: {
    color: theme.colors.neonAlt,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  commandCardTitle: {
    color: theme.colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 3,
  },
  commandCardBody: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  placementCard: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.neon + "66",
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 14,
  },
  placementLabel: {
    color: theme.colors.neon,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  placementValue: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4,
  },
  placementBody: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  pathRow: {
    paddingBottom: 10,
    marginBottom: 18,
  },
  comingSoon: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 16,
    marginBottom: 14,
  },
  comingSoonTitle: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  comingSoonBody: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  unitRoadmap: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 14,
  },
  lockedUnit: {
    opacity: 0.55,
  },
  unitHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  unitTitle: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
    flex: 1,
  },
  unitProgressLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "800",
  },
  unitDescription: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 12,
  },
  pathColumn: {
    gap: 8,
  },
  nodeWrap: {
    position: "relative",
    minHeight: 72,
  },
  connector: {
    position: "absolute",
    left: "50%",
    marginLeft: -1,
    top: 40,
    width: 2,
    height: 42,
    backgroundColor: theme.colors.border,
  },
  connectorHidden: {
    display: "none",
  },
  roadNode: {
    width: "78%",
    minHeight: 60,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 9,
  },
  nodeLeft: {
    alignSelf: "flex-start",
  },
  nodeRight: {
    alignSelf: "flex-end",
  },
  challengeNode: {
    borderColor: theme.colors.warning + "88",
    backgroundColor: "rgba(255,209,102,0.12)",
  },
  finalNode: {
    borderColor: theme.colors.neon + "99",
    backgroundColor: "rgba(29,211,176,0.15)",
  },
  completedNode: {
    borderColor: theme.colors.success + "99",
    backgroundColor: "rgba(45,225,165,0.13)",
  },
  lockedNode: {
    opacity: 0.45,
  },
  nodeEmoji: {
    fontSize: 20,
  },
  nodeTextWrap: {
    flex: 1,
  },
  nodeTitle: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },
  nodeSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  regionFinalCard: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.neon + "66",
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 12,
  },
  regionFinalCardLocked: {
    opacity: 0.55,
  },
  regionFinalCardComplete: {
    borderColor: theme.colors.success + "88",
    backgroundColor: "rgba(45,225,165,0.14)",
  },
  regionFinalTitle: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 5,
  },
  regionFinalBody: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  disclaimerCard: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.warning + "66",
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginTop: 4,
  },
  disclaimerTitle: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  disclaimerBody: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});
