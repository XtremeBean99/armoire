import { analyzeColor as analyzeBase, isNeutral, hueAngle, NEUTRAL_CHROMA_MAX } from "./analyze";
import { nearestColorName } from "./names";
import type { ItemColor } from "@/lib/types";

export function analyzeColor(rgb: [number, number, number]): ItemColor {
  const base = analyzeBase(rgb);
  return { ...base, colorName: nearestColorName(rgb) };
}

export { isNeutral, hueAngle, NEUTRAL_CHROMA_MAX, nearestColorName };
export { colorHarmonyScore } from "./harmony";
