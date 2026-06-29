import type { Outfit } from "@/lib/types";
import { colorHarmonyScore } from "@/lib/color";
import { outfitItems } from "./slots";
import { buildRationale } from "./rationale";

export function outfitColorScore(outfit: Outfit): number {
  return colorHarmonyScore(outfitItems(outfit).map((i) => i.color));
}

export { buildRationale };
