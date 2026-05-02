export type Lesson = {
  id: string;
  unitId: string;
  regionId: string;
  title: string;
  hook?: string;
  shortExplanation: string;
  visualConcept?: string;
  content: string;
  realWorldContext: string;
  symptoms?: string;
  keyTakeaway: string;
  quizId: string;
  order: number;
  xpReward: number;
};
