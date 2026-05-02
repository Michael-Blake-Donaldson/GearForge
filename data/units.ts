import { curriculumRegions } from "@/data/curriculum";
import { Unit } from "@/types/Unit";

export const units: Unit[] = curriculumRegions.flatMap((region) =>
  region.units.map((unit, index) => {
    const unitOrder = index + 1;
    const lessonStart = index * 6 + 1;
    const lessonIds = Array.from({ length: 6 }, (_, lessonOffset) => {
      return `${region.code}-l${lessonStart + lessonOffset}`;
    });

    return {
      id: `${region.code}-${unitOrder}`,
      regionId: region.id,
      title: `${region.appName} ${unit.title}`,
      description: unit.description,
      order: unitOrder,
      lessonIds,
    };
  }),
);
