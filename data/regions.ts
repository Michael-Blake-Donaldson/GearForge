import { curriculumRegions } from "@/data/curriculum";
import { Region } from "@/types/Region";

export const regions: Region[] = curriculumRegions.map((region) => ({
  id: region.id,
  name: region.displayName,
  description: region.description,
  focusAreas: region.focusAreas,
  accentColor: region.accentColor,
  unitIds: Array.from({ length: region.units.length }, (_, unitOffset) => {
    return `${region.code}-${unitOffset + 1}`;
  }),
}));

export const starterRegionIds = ["american", "japanese", "european"];
