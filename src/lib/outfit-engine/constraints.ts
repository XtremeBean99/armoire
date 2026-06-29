import type { WardrobeItem, Season } from "@/lib/types";
import { FORMALITY_ORDER } from "@/lib/types";

export function formalityCoherent(items: WardrobeItem[]): boolean {
  const idx = items.map((i) => FORMALITY_ORDER.indexOf(i.formality));
  return Math.max(...idx) - Math.min(...idx) <= 1;
}

export function availableForSeason(item: WardrobeItem, season: Season | "any"): boolean {
  if (season === "any") return true;
  return item.seasons.includes(season) || item.seasons.includes("all-season");
}

export function isAvailable(item: WardrobeItem): boolean {
  return item.cooldown === 0;
}

export function patternCoherent(items: WardrobeItem[]): boolean {
  const patterned = items.filter(
    (i) => i.pattern && i.pattern !== 'solid' && i.pattern !== 'graphic'
  )
  return patterned.length <= 1
}
