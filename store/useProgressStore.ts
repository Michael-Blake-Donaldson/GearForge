import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { lessons } from "@/data/lessons";
import { regions } from "@/data/regions";
import { units } from "@/data/units";
import { Rank, UserProgress } from "@/types/UserProgress";

const ranks: { minXp: number; label: Rank }[] = [
  { minXp: 0, label: "Garage Rookie" },
  { minXp: 100, label: "Apprentice" },
  { minXp: 250, label: "Junior Technician" },
  { minXp: 500, label: "Certified Technician" },
  { minXp: 850, label: "Master Technician" },
  { minXp: 1300, label: "Automotive Engineer" },
];

const getRankFromXp = (xp: number): Rank => {
  const matched = [...ranks].reverse().find((rank) => xp >= rank.minXp);
  return matched?.label ?? "Garage Rookie";
};

const getLevelFromXp = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

const dayDiff = (isoA: string, isoB: string): number => {
  const a = new Date(isoA);
  const b = new Date(isoB);
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcA - utcB) / (1000 * 60 * 60 * 24));
};

type SubmitQuizPayload = {
  quizId: string;
  lessonId: string;
  correct: number;
  total: number;
  incorrectQuestionIds: string[];
};

type ProgressState = UserProgress & {
  getRank: () => Rank;
  getAccuracy: () => number;
  getRegionMastery: (regionId: string) => number;
  isUnitUnlocked: (unitId: string) => boolean;
  isLessonUnlocked: (lessonId: string) => boolean;
  submitQuizResult: (payload: SubmitQuizPayload) => void;
  markLessonCompleted: (lessonId: string, quizScorePercent: number) => void;
  setUsername: (username: string) => void;
  resetProgress: () => void;
};

const firstUnits = regions
  .map(
    (region) =>
      units.find((unit) => unit.regionId === region.id && unit.order === 1)?.id,
  )
  .filter((id): id is string => Boolean(id));

const initialState: UserProgress = {
  username: "GearSmith",
  xp: 0,
  streak: 0,
  level: 1,
  lastLessonDate: null,
  completedLessons: [],
  completedUnits: [],
  unlockedUnitIds: firstUnits,
  quizHistory: [],
  incorrectQuestionIds: [],
  badges: [],
};

const maybeUnlockBadges = (state: UserProgress): string[] => {
  const next = new Set(state.badges);

  if (state.completedLessons.length >= 1) next.add("First Lesson Completed");
  if (state.completedLessons.length >= 10) next.add("10 Lessons Completed");
  if (
    state.completedLessons.includes("am-l1") &&
    state.completedLessons.includes("am-l2")
  ) {
    next.add("Engine Basics Completed");
  }
  if (state.streak >= 7) next.add("7 Day Streak");
  if (state.xp >= 100) next.add("100 XP Earned");

  return [...next];
};

const unlockNextUnitIfEligible = (
  state: UserProgress,
  lessonId: string,
): string[] => {
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson) return state.unlockedUnitIds;

  const unit = units.find((item) => item.id === lesson.unitId);
  if (!unit) return state.unlockedUnitIds;

  const allLessonsDone = unit.lessonIds.every((id) =>
    state.completedLessons.includes(id),
  );
  if (!allLessonsDone) return state.unlockedUnitIds;

  const nextUnits = units
    .filter((candidate) => candidate.regionId === unit.regionId)
    .sort((a, b) => a.order - b.order);

  const currentIndex = nextUnits.findIndex(
    (candidate) => candidate.id === unit.id,
  );
  const nextUnit = nextUnits[currentIndex + 1];

  if (!nextUnit) return state.unlockedUnitIds;
  if (state.unlockedUnitIds.includes(nextUnit.id)) return state.unlockedUnitIds;

  return [...state.unlockedUnitIds, nextUnit.id];
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,
      getRank: () => getRankFromXp(get().xp),
      getAccuracy: () => {
        const { quizHistory } = get();
        if (quizHistory.length === 0) return 0;

        const correctTotal = quizHistory.reduce(
          (sum, record) => sum + record.correct,
          0,
        );
        const questionTotal = quizHistory.reduce(
          (sum, record) => sum + record.total,
          0,
        );

        return questionTotal === 0
          ? 0
          : Math.round((correctTotal / questionTotal) * 100);
      },
      getRegionMastery: (regionId: string) => {
        const regionLessons = lessons.filter(
          (lesson) => lesson.regionId === regionId,
        );
        if (regionLessons.length === 0) return 0;

        const completed = regionLessons.filter((lesson) =>
          get().completedLessons.includes(lesson.id),
        ).length;
        return Math.round((completed / regionLessons.length) * 100);
      },
      isUnitUnlocked: (unitId: string) => {
        return get().unlockedUnitIds.includes(unitId);
      },
      isLessonUnlocked: (lessonId: string) => {
        const lesson = lessons.find((item) => item.id === lessonId);
        if (!lesson) return false;

        if (!get().unlockedUnitIds.includes(lesson.unitId)) return false;

        const unit = units.find((item) => item.id === lesson.unitId);
        if (!unit) return false;

        const lessonIndex = unit.lessonIds.indexOf(lessonId);
        if (lessonIndex <= 0) return true;

        const previousLessonId = unit.lessonIds[lessonIndex - 1];
        return get().completedLessons.includes(previousLessonId);
      },
      setUsername: (username: string) => set({ username }),
      markLessonCompleted: (lessonId: string, quizScorePercent: number) => {
        const snapshot = get();
        const lesson = lessons.find((item) => item.id === lessonId);
        if (!lesson) return;

        const alreadyCompleted = snapshot.completedLessons.includes(lessonId);

        const todayIso = new Date().toISOString();
        let nextStreak = snapshot.streak;

        // Streak increments only once per day when at least one lesson is completed.
        if (!snapshot.lastLessonDate) {
          nextStreak = 1;
        } else {
          const diff = dayDiff(todayIso, snapshot.lastLessonDate);
          if (diff === 1) nextStreak = snapshot.streak + 1;
          if (diff > 1) nextStreak = 1;
        }

        const streakBonus = nextStreak >= 3 ? 10 : 0;
        const quizBonus = Math.round((quizScorePercent / 100) * 20);
        const lessonXp = alreadyCompleted ? 0 : lesson.xpReward;
        const gainedXp = lessonXp + quizBonus + streakBonus;
        const nextXp = snapshot.xp + gainedXp;

        const completedLessons = alreadyCompleted
          ? snapshot.completedLessons
          : [...snapshot.completedLessons, lessonId];

        const nextUserProgress: UserProgress = {
          ...snapshot,
          xp: nextXp,
          level: getLevelFromXp(nextXp),
          streak: nextStreak,
          lastLessonDate: todayIso,
          completedLessons,
          unlockedUnitIds: unlockNextUnitIfEligible(
            { ...snapshot, completedLessons },
            lessonId,
          ),
        };

        const completedUnits = units
          .filter((unit) =>
            unit.lessonIds.every((id) =>
              nextUserProgress.completedLessons.includes(id),
            ),
          )
          .map((unit) => unit.id);

        set({
          ...nextUserProgress,
          completedUnits,
          badges: maybeUnlockBadges({ ...nextUserProgress, completedUnits }),
        });
      },
      submitQuizResult: ({
        quizId,
        lessonId,
        correct,
        total,
        incorrectQuestionIds,
      }) => {
        const snapshot = get();
        const scorePercent =
          total === 0 ? 0 : Math.round((correct / total) * 100);

        const mergedIncorrectIds = [
          ...new Set([
            ...snapshot.incorrectQuestionIds,
            ...incorrectQuestionIds,
          ]),
        ];

        const cleanedIncorrectIds = mergedIncorrectIds.filter(
          (questionId) => !incorrectQuestionIds.includes(questionId),
        );

        set({
          quizHistory: [
            ...snapshot.quizHistory,
            {
              quizId,
              lessonId,
              correct,
              total,
              answeredAt: new Date().toISOString(),
            },
          ],
          // Remove newly-corrected weak questions while keeping other weak points.
          incorrectQuestionIds: cleanedIncorrectIds,
        });

        get().markLessonCompleted(lessonId, scorePercent);
      },
      resetProgress: () => set(initialState),
    }),
    {
      name: "gearforge-progress-v1",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
