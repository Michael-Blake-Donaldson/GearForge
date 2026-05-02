import { curriculumRegions, lessonModuleTemplates } from "@/data/curriculum";
import { Lesson } from "@/types/Lesson";

export const lessons: Lesson[] = curriculumRegions.flatMap((region) =>
  region.units.flatMap((unit, unitIndex) => {
    const unitId = `${region.code}-${unitIndex + 1}`;

    return lessonModuleTemplates.map((module, lessonIndex) => {
      const lessonOrder = lessonIndex + 1;
      const absoluteLessonIndex = unitIndex * 6 + lessonOrder;
      const lessonId = `${region.code}-l${absoluteLessonIndex}`;
      const quizId = `${region.code}-q${absoluteLessonIndex}`;

      const lessonTitle = `${unit.title}: ${module.titleSuffix}`;

      return {
        id: lessonId,
        unitId,
        regionId: region.id,
        title: lessonTitle,
        hook: module.hook,
        shortExplanation: `${region.appName} focus on ${unit.title.toLowerCase()} through ${module.slug.replace("-", " ")} analysis.`,
        visualConcept: `${unit.title} system map: inputs, control strategy, output behavior, and validation checkpoints.`,
        content:
          `This lesson trains how ${region.appName.toLowerCase()} platforms handle ${unit.title.toLowerCase()} in real operating conditions. ` +
          `You will connect subsystem behavior to measurable outcomes, identify expected control responses, and practice fault-isolation logic before parts replacement.`,
        realWorldContext: `In service bays, technicians use this model to avoid guesswork, reduce comeback repairs, and make confident decisions under time and budget constraints.`,
        symptoms: `Typical symptoms include degraded response, unstable behavior under load transitions, warning indicators, and intermittent performance drift during sustained operation.`,
        keyTakeaway: `${unit.title} decisions are strongest when diagnosis follows system evidence instead of assumptions.`,
        quizId,
        order: lessonOrder,
        xpReward: 30 + unitIndex * 4 + lessonIndex * 2,
      };
    });
  }),
);
