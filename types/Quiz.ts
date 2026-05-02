export type QuizQuestion = {
  id: string;
  questionType:
    | "multiple-choice"
    | "true-false"
    | "matching"
    | "scenario"
    | "ordering";
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  lessonId?: string;
  referenceLessonId?: string;
  unitId?: string;
  regionId?: string;
  kind?: "lesson" | "unit-exam" | "region-exam";
  title: string;
  questions: QuizQuestion[];
};
