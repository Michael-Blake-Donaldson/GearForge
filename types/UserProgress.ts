export type Rank =
  | "Garage Rookie"
  | "Apprentice"
  | "Junior Technician"
  | "Certified Technician"
  | "Master Technician"
  | "Automotive Engineer";

export type QuizRecord = {
  quizId: string;
  lessonId: string;
  correct: number;
  total: number;
  answeredAt: string;
};

// DailyQuest represents the quest generated each calendar day.
export type DailyQuest = {
  id: string;
  description: string;
  /** How many times the required action must be performed. */
  targetCount: number;
  /** Current progress toward targetCount. Stored in state. */
  progressCount: number;
  /** ISO date string for the day this quest was generated (YYYY-MM-DD). */
  dateKey: string;
  completed: boolean;
};

export type UserProgress = {
  /** Display name, validated 2-20 chars, alphanumeric + underscore. */
  username: string;
  xp: number;
  streak: number;
  /** Number of streak-freeze tokens the user holds. Earned every 7-day streak. */
  streakFreezeTokens: number;
  level: number;
  lastLessonDate: string | null;
  completedLessons: string[];
  completedUnits: string[];
  unlockedUnitIds: string[];
  quizHistory: QuizRecord[];
  incorrectQuestionIds: string[];
  badges: string[];
  /** Whether the user has finished the onboarding flow. */
  hasOnboarded: boolean;
  /** The active daily quest (regenerated each calendar day). */
  dailyQuest: DailyQuest | null;
  /** Preferred region set during onboarding – pre-expands on Learn tab. */
  preferredRegionId: string | null;
  /** Notification permission status: 'undecided' | 'granted' | 'denied'. */
  notificationPermission: "undecided" | "granted" | "denied";
  /** User-preferred local hour (0-23) for streak reminder notification. */
  notificationHour: number;
  /**
   * Number of times the app has been launched (cold-start).
   * Used to gate the notification permission prompt until the user's second
   * session so we don't ask on the very first open.
   */
  launchCount: number;
};
