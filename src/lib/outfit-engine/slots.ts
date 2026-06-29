import type { Outfit, WardrobeItem } from "@/lib/types";

// Stub — replaced by Task 15
export function outfitItems(outfit: Outfit): WardrobeItem[] {
  return [outfit.top, outfit.bottom, outfit.footwear, outfit.outerwear, outfit.accessory]
    .filter((x): x is WardrobeItem => Boolean(x));
}
