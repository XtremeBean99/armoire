import type { GenerateOptions, Outfit, RankedOutfit, WardrobeItem } from "@/lib/types";
import { mulberry32 } from "@/lib/rng";
import { availableForSeason, formalityCoherent, isAvailable, patternCoherent } from "./constraints";
import { coreCombos, groupBySlot, outfitItems } from "./slots";
import { outfitColorScore } from "./score";
import { buildRationale } from "./rationale";
import { isLayerable, prefersOuterwear, weatherNote, weatherScoreBonus } from "./weather-adjust";
import { colorHarmonyScore } from "@/lib/color";

export function generateOutfits(items: WardrobeItem[], options: GenerateOptions = {}): RankedOutfit[] {
  const season = options.season ?? "any";
  const seed = options.seed ?? 1;
  const count = options.count ?? 5;
  const weather = options.weather;

  const usable = items.filter((i) => isAvailable(i) && availableForSeason(i, season));
  const bySlot = groupBySlot(usable);

  const cores = coreCombos(bySlot).filter((o) => formalityCoherent(outfitItems(o)) && patternCoherent(outfitItems(o)));
  const ranked: RankedOutfit[] = [];

  for (const core of cores) {
    const outfit = attachOptional(core, bySlot.outerwear, bySlot.accessory, weather);
    if (!formalityCoherent(outfitItems(outfit))) {
      delete outfit.outerwear; delete outfit.accessory;
    }
    const colorScore = outfitColorScore(outfit);
    const score = clamp(0.7 * colorScore + 0.3 + weatherScoreBonus(outfit, weather));
    const layerable = isLayerable(outfit, weather);
    const hasUmbrella = outfit.accessory?.garmentType === "umbrella";
    ranked.push({
      outfit,
      items: outfitItems(outfit),
      score,
      layerable,
      rationale: buildRationale(outfit, layerable, weatherNote(weather, hasUmbrella)),
    });
  }

  const rng = mulberry32(seed);
  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const wornA = sum(a.items.map((i) => i.timesWorn));
    const wornB = sum(b.items.map((i) => i.timesWorn));
    if (wornA !== wornB) return wornA - wornB;
    return rng() - 0.5;
  });
  return ranked.slice(0, count);
}

function attachOptional(
  core: Outfit,
  outerwear: WardrobeItem[],
  accessories: WardrobeItem[],
  weather?: GenerateOptions["weather"],
): Outfit {
  const out: Outfit = { ...core };

  if (weather?.rainExpected) {
    const umbrella = accessories.find((a) => a.garmentType === "umbrella");
    if (umbrella) out.accessory = umbrella;
  }
  if (!out.accessory && accessories.length) {
    out.accessory = bestByColor(core, accessories);
  }

  if (outerwear.length) {
    const best = bestByColor(core, outerwear);
    if (prefersOuterwear(weather)) out.outerwear = best;
    else if (improves(core, best)) out.outerwear = best;
  }
  return out;
}

function bestByColor(core: Outfit, candidates: WardrobeItem[]): WardrobeItem {
  const baseColors = outfitItems(core).map((i) => i.color);
  let best = candidates[0];
  let bestScore = -1;
  for (const c of candidates) {
    const s = colorHarmonyScore([...baseColors, c.color]);
    if (s > bestScore) { bestScore = s; best = c; }
  }
  return best;
}

function improves(core: Outfit, candidate: WardrobeItem): boolean {
  const base = colorHarmonyScore(outfitItems(core).map((i) => i.color));
  const withIt = colorHarmonyScore([...outfitItems(core).map((i) => i.color), candidate.color]);
  return withIt >= base;
}

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
