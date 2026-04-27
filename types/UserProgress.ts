export type Rank =
  | 'Garage Rookie'
  | 'Apprentice'
  | 'Junior Technician'
  | 'Certified Technician'
  | 'Master Technician'
  | 'Automotive Engineer';

export type QuizRecord = {
  quizId: string;
  lessonId: string;
  correct: number;
  total: number;
  answeredAt: string;
};

export type UserProgress = {
  username: string;
  xp: number;
  streak: number;
  level: number;
  lastLessonDate: string | null;
  completedLessons: string[];
  completedUnits: string[];
  unlockedUnitIds: string[];
  quizHistory: QuizRecord[];
  incorrectQuestionIds: string[];
  badges: string[];
};
