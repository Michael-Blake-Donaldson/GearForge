import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import LessonCard from "@/components/LessonCard";
import PathCard from "@/components/PathCard";
import StreakCounter from "@/components/StreakCounter";
import UnitCard from "@/components/UnitCard";
import XPDisplay from "@/components/XPDisplay";
import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { regions, starterRegionIds } from "@/data/regions";
import { units } from "@/data/units";
import { useProgressStore } from "@/store/useProgressStore";

export default function LearnScreen() {
  const router = useRouter();
  const [selectedRegionId, setSelectedRegionId] = useState(starterRegionIds[0]);
  const [expandedUnitIds, setExpandedUnitIds] = useState<string[]>([]);

  const completedLessons = useProgressStore((state) => state.completedLessons);
  const isUnitUnlocked = useProgressStore((state) => state.isUnitUnlocked);
  const isLessonUnlocked = useProgressStore((state) => state.isLessonUnlocked);
  const getRegionMastery = useProgressStore((state) => state.getRegionMastery);
  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const streak = useProgressStore((state) => state.streak);

  const selectedRegion =
    regions.find((region) => region.id === selectedRegionId) ?? regions[0];
  const regionUnits = useMemo(
    () =>
      units
        .filter((unit) => unit.regionId === selectedRegion.id)
        .sort((a, b) => a.order - b.order),
    [selectedRegion.id],
  );

  const toggleUnit = (unitId: string) => {
    setExpandedUnitIds((prev) =>
      prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId],
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <XPDisplay xp={xp} level={level} />
        <StreakCounter streak={streak} />
      </View>

      <Text style={styles.sectionTitle}>Learning Paths</Text>
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

      <Text style={styles.sectionTitle}>{selectedRegion.name} Units</Text>
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
        const completedInUnit = unitLessons.filter((lesson) =>
          completedLessons.includes(lesson.id),
        ).length;
        const expanded = expandedUnitIds.includes(unit.id);

        return (
          <View key={unit.id}>
            <UnitCard
              unit={unit}
              completed={completedInUnit}
              total={unitLessons.length}
              isUnlocked={isUnitUnlocked(unit.id)}
              onPress={() => toggleUnit(unit.id)}
            />

            {expanded &&
              unitLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isUnlocked={isLessonUnlocked(lesson.id)}
                  onPress={() => {
                    if (!isLessonUnlocked(lesson.id)) return;
                    router.push(`/lesson/${lesson.id}`);
                  }}
                />
              ))}
          </View>
        );
      })}
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
});
