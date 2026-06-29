import type { Outfit, Slot, WardrobeItem } from "@/lib/types";

const EMPTY: Record<Slot, WardrobeItem[]> = {
  top: [], bottom: [], footwear: [], outerwear: [], accessory: [],
};

export function groupBySlot(items: WardrobeItem[]): Record<Slot, WardrobeItem[]> {
  const out: Record<Slot, WardrobeItem[]> = { top: [], bottom: [], footwear: [], outerwear: [], accessory: [] };
  for (const i of items) out[i.slot].push(i);
  return out;
}

export function coreCombos(bySlot: Record<Slot, WardrobeItem[]>): Outfit[] {
  const out: Outfit[] = [];
  for (const top of bySlot.top)
    for (const bottom of bySlot.bottom)
      for (const footwear of bySlot.footwear)
        out.push({ top, bottom, footwear });
  return out;
}

export function outfitItems(outfit: Outfit): WardrobeItem[] {
  return [outfit.top, outfit.bottom, outfit.footwear, outfit.outerwear, outfit.accessory]
    .filter((x): x is WardrobeItem => Boolean(x));
}

void EMPTY;
