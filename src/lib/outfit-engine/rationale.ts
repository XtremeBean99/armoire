import type { Outfit } from "@/lib/types";
import { outfitItems } from "./slots";

export function buildRationale(outfit: Outfit, layerable: boolean, weatherNote?: string): string {
  const items = outfitItems(outfit);
  const neutrals = items.filter((i) => i.color.isNeutral).map((i) => i.color.colorName);
  const accents = items.filter((i) => !i.color.isNeutral).map((i) => i.color.colorName);

  const parts: string[] = [];
  if (accents.length === 0) {
    parts.push(`An all-neutral palette (${unique(neutrals).join(", ")}) — clean and fail-safe.`);
  } else if (neutrals.length > 0) {
    parts.push(`${unique(neutrals).join(", ")} anchors the ${unique(accents).join(" & ")} accent${accents.length > 1 ? "s" : ""}.`);
  } else {
    parts.push(`${unique(accents).join(" & ")} sit together by colour-wheel harmony.`);
  }
  if (layerable) parts.push("Works with and without the outer layer.");
  if (weatherNote) parts.push(weatherNote);
  return parts.join(" ");
}

function unique(xs: string[]): string[] { return [...new Set(xs)]; }
