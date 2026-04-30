import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { lessons } from "@/data/lessons";
import { regions } from "@/data/regions";
import { units } from "@/data/units";
import { DailyQuest, Rank, UserProgress } from "@/types/UserProgress";

// ---------------------------------------------------------------------------
// Username validation
//   Returns null when valid, or an error message string when invalid.
// ---------------------------------------------------------------------------
export const validateUsername = (name: string): string | null => {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Username must be at least 2 characters.";
  if (trimmed.length > 20) return "Username must be 20 characters or fewer.";
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed))
    return "Only letters, numbers, and underscores are allowed.";
  return null; // valid
};

// ---------------------------------------------------------------------------
// Rank thresholds – ordered lowest to highest
// ---------------------------------------------------------------------------
const RANK_THRESHOLDS: { minXp: number; label: Rank }[] = [
  { minXp: 0, label: "Garage Rookie" },
  { minXp: 100, label: "Apprentice" },
  { minXp: 250, label: "Junior Technician" },
  { minXp: 500, label: "Certified Technician" },
  { minXp: 850, label: "Master Technician" },
  { minXp: 1300, label: "Automotive Engineer" },
];

const getRankFromXp = (xp: number): Rank => {
  const matched = [...RANK_THRESHOLDS]
    .reverse()
    .find((rank) => xp >= rank.minXp);
  return matched?.label ?? "Garage Rookie";
};

const getLevelFromXp = (xp: number): number => Math.floor(xp / 100) + 1;

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------
/** Returns the number of calendar days between two ISO date strings (A - B). */
const dayDiff = (isoA: string, isoB: string): number => {
  const a = new Date(isoA);
  const b = new Date(isoB);
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcA - utcB) / (1000 * 60 * 60 * 24));
};

/** Returns today as a YYYY-MM-DD string in local time, used as a quest key. */
const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// ---------------------------------------------------------------------------
// Daily quest generation
//   Deterministic: every user gets the same quest on the same calendar day.
// ---------------------------------------------------------------------------
const QUEST_POOL = [
  { id: "q-lessons-2", description: "Complete 2 lessons today", targetCount: 2 },
  { id: "q-lessons-3", description: "Complete 3 lessons today", targetCount: 3 },
  { id: "q-quiz-perfect", description: "Score 100% on any quiz", targetCount: 1 },
  { id: "q-weak-review", description: "Review 1 weak topic in Practice", targetCount: 1 },
  { id: "q-encyclopedia", description: "Look up 2 encyclopedia entries", targetCount: 2 },
  { id: "q-streak", description: "Keep your streak alive today", targetCount: 1 },
];

const generateDailyQuest = (dateKey: string): DailyQuest => {
  const dayIndex = parseInt(dateKey.replace(/-/g, ""), 10) % QUEST_POOL.length;
  const template = QUEST_POOL[dayIndex];
  return { ...template, progressCount: 0, dateKey, completed: false };
};

// ---------------------------------------------------------------------------
// Badge unlock logic — evaluated after every lesson/quiz completion
// ---------------------------------------------------------------------------
const maybeUnlockBadges = (state: UserProgress): string[] => {
  const earned = new Set(state.badges);

  // --- Lesson count milestones ---
  if (state.completedLessons.length >= 1) earned.add("First Lesson Completed");
  if (state.completedLessons.length >= 5) earned.add("5 Lessons Completed");
  if (state.completedLessons.length >= 10) earned.add("10 Lessons Completed");
  if (state.completedLessons.length >= 25) earned.add("25 Lessons Completed");
  if (state.completedLessons.length >= 50) earned.add("50 Lessons Completed");

  // --- XP milestones ---
  if (state.xp >= 100) earned.add("100 XP Earned");
  if (state.xp >= 500) earned.add("500 XP Earned");
  if (state.xp >= 1000) earned.add("1000 XP Earned");

  // --- Streak milestones ---
  if (state.streak >= 3) earned.add("3 Day Streak");
  if (state.streak >= 7) earned.add("7 Day Streak");
  if (state.streak >= 30) earned.add("30 Day Streak");

  // --- Content-specific badges ---
  if (
    state.completedLessons.includes("am-l1") &&
    state.completedLessons.includes("am-l2")
  ) {
    earned.add("Engine Basics Completed");
  }

  // --- Region mastery badges (complete every lesson in a region) ---
  const regionBadgeMap: Record<string, string> = {
    american: "American Region Master",
    japanese: "Japanese Region Master",
    european: "European Region Master",
    korean: "Korean Region Master",
    "ev-hybrid": "EV & Hybrid Region Master",
    "diesel-heavy": "Diesel & Heavy Duty Region Master",
  };
  for (const region of regions) {
    const regionLessons = lessons.filter((l) => l.regionId === region.id);
    if (regionLessons.length > 0) {
      const allDone = regionLessons.every((l) =>
        state.completedLessons.includes(l.id),
      );
      if (allDone) earned.add(regionBadgeMap[region.id]);
    }
  }

  // --- Multi-region badge: started lessons in 3+ regions ---
  const activeRegions = regions.filter((region) =>
    lessons
      .filter((l) => l.regionId === region.id)
      .some((l) => state.completedLessons.includes(l.id)),
  );
  if (activeRegions.length >= 3) earned.add("Jack of All Trades");

  // --- Perfect score badge ---
  const hasPerfect = state.quizHistory.some(
    (r) => r.total > 0 && r.correct === r.total,
  );
  if (hasPerfect) earned.add("Perfect Score");

  // --- Comeback Kid: improved score on a retaken quiz ---
  const quizScoreHistory = new Map<string, number[]>();
  for (const record of state.quizHistory) {
    const pct =
      record.total === 0
        ? 0
        : Math.round((record.correct / record.total) * 100);
    quizScoreHistory.set(record.quizId, [
      ...(quizScoreHistory.get(record.quizId) ?? []),
      pct,
    ]);
  }
  const hasComeback = [...quizScoreHistory.values()].some((scores) => {
    return scores.length >= 2 && scores[scores.length - 1] > scores[0];
  });
  if (hasComeback) earned.add("Comeback Kid");

  // --- Streak freeze badge ---
  if (state.streakFreezeTokens >= 1) earned.add("Streak Protector");

  return [...earned];
};

// ---------------------------------------------------------------------------
// Unit unlock logic — unlocks the next unit once all lessons in current are done
// ---------------------------------------------------------------------------
const unlockNextUnitIfEligible = (
  state: UserProgress,
  lessonId: string,
): string[] => {
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson) return state.unlockedUnitIds;

  const unit = units.find((item) => item.id === lesson.unitId);
  if (!unit) return state.unlockedUnitIds;

  // Only unlock the next unit if all lessons in this unit are complete
  const allDone = unit.lessonIds.every((id) =>
    state.completedLessons.includes(id),
  );
  if (!allDone) return state.unlockedUnitIds;

  // Find the next sequential unit in the same region
  const regionUnits = units
    .filter((u) => u.regionId === unit.regionId)
    .sort((a, b) => a.order - b.order);

  const idx = regionUnits.findIndex((u) => u.id === unit.id);
  const next = regionUnits[idx + 1];

  if (!next) return state.unlockedUnitIds;
  if (state.unlockedUnitIds.includes(next.id)) return state.unlockedUnitIds;

  return [...state.unlockedUnitIds, next.id];
};

// ---------------------------------------------------------------------------
// Store action types
// ---------------------------------------------------------------------------
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
  completeOnboarding: (username: string, preferredRegionId: string) => void;
  advanceDailyQuestProgress: (amount?: number) => void;
  setNotificationPermission: (
    status: "undecided" | "granted" | "denied",
  ) => void;
  setNotificationHour: (hour: number) => void;
  incrementLaunchCount: () => void;
  useStreakFreeze: () => boolean;
  resetProgress: () => void;
};

// ---------------------------------------------------------------------------
// Initial state — first unit of every region is pre-unlocked
// ---------------------------------------------------------------------------
const firstUnits = regions
  .map(
    (region) =>
      units.find((u) => u.regionId === region.id && u.order === 1)?.id,
  )
  .filter((id): id is string => Boolean(id));

const initialState: UserProgress = {
  username: "GearSmith",
  xp: 0,
  streak: 0,
  streakFreezeTokens: 0,
  level: 1,
  lastLessonDate: null,
  completedLessons: [],
  completedUnits: [],
  unlockedUnitIds: firstUnits,
  quizHistory: [],
  incorrectQuestionIds: [],
  badges: [],
  hasOnboarded: false,
  dailyQuest: null,
  preferredRegionId: null,
  notificationPermission: "undecided",
  notificationHour: 20, // default 8 PM reminder
  launchCount: 0,
};

// ---------------------------------------------------------------------------
// Error-safe AsyncStorage wrapper
//   Prevents uncaught storage exceptions from crashing the app.
// ---------------------------------------------------------------------------
const safeStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (e) {
      console.warn("[GearForge] Storage read error:", e);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.warn("[GearForge] Storage write error:", e);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.warn("[GearForge] Storage remove error:", e);
    }
  },
};

// ---------------------------------------------------------------------------
// Main Zustand store (persisted)
// ---------------------------------------------------------------------------
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ---- Selectors --------------------------------------------------------

      getRank: () => getRankFromXp(get().xp),

      getAccuracy: () => {
        const { quizHistory } = get();
        if (quizHistory.length === 0) return 0;
        const correct = quizHistory.reduce((s, r) => s + r.correct, 0);
        const total = quizHistory.reduce((s, r) => s + r.total, 0);
        return total === 0 ? 0 : Math.round((correct / total) * 100);
      },

      getRegionMastery: (regionId: string) => {
        const regionLessons = lessons.filter((l) => l.regionId === regionId);
        if (regionLessons.length === 0) return 0;
        const done = regionLessons.filter((l) =>
          get().completedLessons.includes(l.id),
        ).length;
        return Math.round((done / regionLessons.length) * 100);
      },

      isUnitUnlocked: (unitId: string) =>
        get().unlockedUnitIds.includes(unitId),

      isLessonUnlocked: (lessonId: string) => {
        const lesson = lessons.find((l) => l.id === lessonId);
        if (!lesson) return false;
        if (!get().unlockedUnitIds.includes(lesson.unitId)) return false;

        const unit = units.find((u) => u.id === lesson.unitId);
        if (!unit) return false;

        const idx = unit.lessonIds.indexOf(lessonId);
        // First lesson in an unlocked unit is always accessible
        if (idx <= 0) return true;

        return get().completedLessons.includes(unit.lessonIds[idx - 1]);
      },

      // ---- Actions ----------------------------------------------------------

      setUsername: (username: string) => set({ username }),

      /** Complete onboarding: stores username, preferred region, and flags done. */
      completeOnboarding: (username: string, preferredRegionId: string) => {
        set({
          username,
          preferredRegionId,
          hasOnboarded: true,
          dailyQuest: generateDailyQuest(todayKey()),
        });
      },

      /** Advance today's daily quest. Auto-regenerates the quest on a new day. */
      advanceDailyQuestProgress: (amount = 1) => {
        const { dailyQuest } = get();
        const today = todayKey();

        // Regenerate if it's a new day or no quest exists
        const active =
          !dailyQuest || dailyQuest.dateKey !== today
            ? generateDailyQuest(today)
            : dailyQuest;

        if (active.completed) return; // quest already finished today

        const newCount = active.progressCount + amount;
        set({
          dailyQuest: {
            ...active,
            progressCount: Math.min(newCount, active.targetCount),
            completed: newCount >= active.targetCount,
          },
        });
      },

      setNotificationPermission: (status) =>
        set({ notificationPermission: status }),

      setNotificationHour: (hour: number) => set({ notificationHour: hour }),

      /**
       * Increment the app launch counter by 1.
       * Called once each time the root layout mounts (i.e., cold app start).
       * Used to gate the notification permission prompt until session 2+.
       */
      incrementLaunchCount: () =>
        set((s) => ({ launchCount: s.launchCount + 1 })),

      /**
       * Spend one streak-freeze token.
       * Returns true if a token was available and spent, false otherwise.
       */
      useStreakFreeze: (): boolean => {
        const { streakFreezeTokens } = get();
        if (streakFreezeTokens < 1) return false;
        set({ streakFreezeTokens: streakFreezeTokens - 1 });
        return true;
      },

      markLessonCompleted: (lessonId: string, quizScorePercent: number) => {
        const snapshot = get();
        const lesson = lessons.find((l) => l.id === lessonId);
        if (!lesson) return;

        const alreadyCompleted = snapshot.completedLessons.includes(lessonId);
        const todayIso = new Date().toISOString();

        // --- Streak calculation ---
        let nextStreak = snapshot.streak;
        let nextFreezeTokens = snapshot.streakFreezeTokens;

        if (!snapshot.lastLessonDate) {
          nextStreak = 1; // first ever lesson
        } else {
          const diff = dayDiff(todayIso, snapshot.lastLessonDate);
          if (diff === 0) {
            // Same calendar day — streak doesn't change
          } else if (diff === 1) {
            nextStreak = snapshot.streak + 1; // consecutive day
          } else if (diff === 2 && snapshot.streakFreezeTokens > 0) {
            // One day missed but freeze token available — protect the streak
            nextStreak = snapshot.streak + 1;
            nextFreezeTokens = snapshot.streakFreezeTokens - 1;
          } else {
            nextStreak = 1; // streak broken
          }
        }

        // Award one freeze token for every new 7-day streak milestone
        const prevMilestone = Math.floor(snapshot.streak / 7);
        const newMilestone = Math.floor(nextStreak / 7);
        if (newMilestone > prevMilestone) {
          nextFreezeTokens += newMilestone - prevMilestone;
        }

        // --- XP calculation ---
        const streakBonus = nextStreak >= 3 ? 10 : 0;
        const quizBonus = Math.round((quizScorePercent / 100) * 20);
        const lessonXp = alreadyCompleted ? 0 : lesson.xpReward; // no replay bonus
        const gainedXp = lessonXp + quizBonus + streakBonus;
        const nextXp = snapshot.xp + gainedXp;

        const completedLessons = alreadyCompleted
          ? snapshot.completedLessons
          : [...snapshot.completedLessons, lessonId];

        const nextProgress: UserProgress = {
          ...snapshot,
          xp: nextXp,
          level: getLevelFromXp(nextXp),
          streak: nextStreak,
          streakFreezeTokens: nextFreezeTokens,
          lastLessonDate: todayIso,
          completedLessons,
          unlockedUnitIds: unlockNextUnitIfEligible(
            { ...snapshot, completedLessons },
            lessonId,
          ),
        };

        // Recalculate fully-completed units
        const completedUnits = units
          .filter((u) =>
            u.lessonIds.every((id) => nextProgress.completedLessons.includes(id)),
          )
          .map((u) => u.id);

        const withUnits: UserProgress = { ...nextProgress, completedUnits };

        // Advance daily quest for lessons
        const today = todayKey();
        const activeQuest =
          !snapshot.dailyQuest || snapshot.dailyQuest.dateKey !== today
            ? generateDailyQuest(today)
            : snapshot.dailyQuest;

        let updatedQuest = activeQuest;
        if (
          !updatedQuest.completed &&
          updatedQuest.id.startsWith("q-lessons")
        ) {
          const newCount = updatedQuest.progressCount + 1;
          updatedQuest = {
            ...updatedQuest,
            progressCount: Math.min(newCount, updatedQuest.targetCount),
            completed: newCount >= updatedQuest.targetCount,
          };
        }

        set({
          ...withUnits,
          badges: maybeUnlockBadges(withUnits),
          dailyQuest: updatedQuest,
        });
      },

      submitQuizResult: ({
        quizId,
        lessonId,
        correct,
        total,
        incorrectQuestionIds: newIncorrect,
      }) => {
        const snapshot = get();
        const scorePercent =
          total === 0 ? 0 : Math.round((correct / total) * 100);

        // Merge wrong-answer IDs but remove any the user just corrected
        const merged = [
          ...new Set([...snapshot.incorrectQuestionIds, ...newIncorrect]),
        ];
        const cleaned = merged.filter((qId) => !newIncorrect.includes(qId));

        set({
          quizHistory: [
            ...snapshot.quizHistory,
            { quizId, lessonId, correct, total, answeredAt: new Date().toISOString() },
          ],
          incorrectQuestionIds: cleaned,
        });

        // Advance perfect-score quest if applicable
        if (correct === total && total > 0) {
          get().advanceDailyQuestProgress(1);
        }

        get().markLessonCompleted(lessonId, scorePercent);
      },

      resetProgress: () => set(initialState),
    }),
    {
      name: "gearforge-progress-v2",
      storage: createJSONStorage(() => safeStorage),
      version: 2,
      // Migrate from v1 (original) → v2 (new fields)
      migrate: (persisted, version) => {
        if (version < 2) {
          return {
            ...initialState,
            ...(persisted as Partial<UserProgress>),
            streakFreezeTokens: 0,
            hasOnboarded: false,
            dailyQuest: null,
            preferredRegionId: null,
            notificationPermission: "undecided" as const,
            notificationHour: 20,
            launchCount: 0,
          };
        }
        // Patch any persisted state missing launchCount (added in Phase 6)
        const p = persisted as Partial<UserProgress>;
        if (p.launchCount === undefined) {
          return { ...p, launchCount: 0 } as UserProgress;
        }
        return persisted as UserProgress;
      },
    },
  ),
);
