import { curriculumRegions, quizQuestionTypes } from "@/data/curriculum";
import { lessons } from "@/data/lessons";
import { Quiz, QuizQuestion } from "@/types/Quiz";

const makeQuestion = (
  id: string,
  questionType: QuizQuestion["questionType"],
  stem: string,
  options: string[],
  correctAnswerIndex: number,
  explanation: string,
): QuizQuestion => ({
  id,
  questionType,
  question: stem,
  options,
  correctAnswerIndex,
  explanation,
});

const makeLessonQuiz = (lessonId: string, quizId: string, title: string): Quiz => {
  const questionSet: QuizQuestion[] = [
    makeQuestion(
      `${quizId}-1`,
      "multiple-choice",
      `${title}: what should be verified before replacing parts?`,
      [
        "System evidence and measured baseline behavior",
        "Only driver opinion",
        "Only mileage",
        "Only visual appearance",
      ],
      0,
      "A reliable workflow begins with measured evidence and baseline comparison.",
    ),
    makeQuestion(
      `${quizId}-2`,
      "true-false",
      "True or False: diagnostics should prioritize repeatable tests over assumptions.",
      ["True", "False"],
      0,
      "Repeatable tests reduce misdiagnosis and unnecessary component replacement.",
    ),
    makeQuestion(
      `${quizId}-3`,
      "scenario",
      "Scenario: performance drops only under sustained load. What is the best next action?",
      [
        "Recreate conditions and capture live data",
        "Replace the first suspect component immediately",
        "Reset all modules and release the vehicle",
        "Ignore because idle operation is normal",
      ],
      0,
      "Load-specific faults require condition-matched validation and captured telemetry.",
    ),
    makeQuestion(
      `${quizId}-4`,
      "matching",
      "Select the best matched pair for an effective workflow.",
      [
        "Symptom -> Test plan",
        "Symptom -> Random replacement",
        "Warning light -> Ignore",
        "Fault code -> Clear only",
      ],
      0,
      "Good matching ties observed symptoms to targeted tests, not guesswork.",
    ),
    makeQuestion(
      `${quizId}-5`,
      "ordering",
      "Choose the best service order for reliable diagnosis.",
      [
        "Verify symptom -> Measure baseline -> Isolate cause -> Confirm repair",
        "Replace parts -> Road test -> Read codes -> Verify symptom",
        "Clear codes -> Deliver vehicle -> Ask for feedback -> Test",
        "Inspect cosmetic condition -> Replace ECU -> Retry",
      ],
      0,
      "A structured sequence protects quality and prevents repeat failures.",
    ),
  ];

  return {
    id: quizId,
    lessonId,
    kind: "lesson",
    title,
    questions: questionSet,
  };
};

const makeUnitExam = (
  id: string,
  regionId: string,
  unitId: string,
  referenceLessonId: string,
  title: string,
): Quiz => {
  const questions = Array.from({ length: 10 }, (_, index) => {
    const qId = `${id}-${index + 1}`;
    const questionType = quizQuestionTypes[index % quizQuestionTypes.length];

    return makeQuestion(
      qId,
      questionType,
      `${title} exam: choose the strongest engineering decision for checkpoint ${index + 1}.`,
      [
        "Validate data, then decide",
        "Replace a likely part first",
        "Skip verification to save time",
        "Rely only on memory",
      ],
      0,
      "Unit exams reinforce evidence-based decisions across the complete module.",
    );
  });

  return {
    id,
    regionId,
    unitId,
    referenceLessonId,
    kind: "unit-exam",
    title,
    questions,
  };
};

const makeRegionExam = (
  id: string,
  regionId: string,
  referenceLessonId: string,
  title: string,
): Quiz => {
  const questions = Array.from({ length: 12 }, (_, index) => {
    const qId = `${id}-${index + 1}`;
    const questionType = quizQuestionTypes[index % quizQuestionTypes.length];

    return makeQuestion(
      qId,
      questionType,
      `${title}: integrated systems challenge ${index + 1}.`,
      [
        "Use cross-system evidence and verify outcomes",
        "Treat each symptom in isolation only",
        "Reset modules and release without confirmation",
        "Delay diagnosis until complete failure",
      ],
      0,
      "Region finals validate cross-unit mastery and robust troubleshooting habits.",
    );
  });

  return {
    id,
    regionId,
    referenceLessonId,
    kind: "region-exam",
    title,
    questions,
  };
};

export const quizzes: Quiz[] = lessons.map((lesson) =>
  makeLessonQuiz(lesson.id, lesson.quizId, `${lesson.title} Quiz`),
);

export const unitExams: Quiz[] = curriculumRegions.flatMap((region) =>
  region.units.map((unit, index) => {
    const unitId = `${region.code}-${index + 1}`;
    const referenceLessonId = `${region.code}-l${index * 6 + 1}`;
    return makeUnitExam(
      `${region.code}-u${index + 1}-exam`,
      region.id,
      unitId,
      referenceLessonId,
      `${region.appName} Unit ${index + 1} Exam`,
    );
  }),
);

export const regionExams: Quiz[] = curriculumRegions.map((region) =>
  makeRegionExam(
    `${region.code}-region-exam`,
    region.id,
    `${region.code}-l1`,
    `${region.appName} Final Region Exam`,
  ),
);

export const allQuizzes: Quiz[] = [...quizzes, ...unitExams, ...regionExams];

export const quizzesById = Object.fromEntries(
  allQuizzes.map((quiz) => [quiz.id, quiz]),
);

export const unitExamsByUnitId = Object.fromEntries(
  unitExams.map((exam) => [exam.unitId as string, exam]),
);

export const regionExamsByRegionId = Object.fromEntries(
  regionExams.map((exam) => [exam.regionId as string, exam]),
);
