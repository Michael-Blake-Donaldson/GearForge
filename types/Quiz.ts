export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
};
