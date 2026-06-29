import type { Slot } from "@/lib/types";

export interface GarmentDef { slot: Slot; graphicId: string; label: string; }

export const GARMENTS: Record<string, GarmentDef> = {
  // top
  "t-shirt": { slot: "top", graphicId: "t-shirt", label: "T-shirt" },
  "polo": { slot: "top", graphicId: "polo", label: "Polo" },
  "oxford-shirt": { slot: "top", graphicId: "oxford-shirt", label: "Oxford shirt" },
  "jumper": { slot: "top", graphicId: "jumper", label: "Jumper" },
  "hoodie": { slot: "top", graphicId: "hoodie", label: "Hoodie" },
  // bottom
  "jeans": { slot: "bottom", graphicId: "jeans", label: "Jeans" },
  "chinos": { slot: "bottom", graphicId: "chinos", label: "Chinos" },
  "shorts": { slot: "bottom", graphicId: "shorts", label: "Shorts" },
  "joggers": { slot: "bottom", graphicId: "joggers", label: "Joggers" },
  // footwear
  "sneakers": { slot: "footwear", graphicId: "sneakers", label: "Sneakers" },
  "dress-shoes": { slot: "footwear", graphicId: "dress-shoes", label: "Dress shoes" },
  "boots": { slot: "footwear", graphicId: "boots", label: "Boots" },
  "sandals": { slot: "footwear", graphicId: "sandals", label: "Sandals" },
  // outerwear
  "jacket": { slot: "outerwear", graphicId: "jacket", label: "Jacket" },
  "blazer": { slot: "outerwear", graphicId: "blazer", label: "Blazer" },
  "coat": { slot: "outerwear", graphicId: "coat", label: "Coat" },
  "overshirt": { slot: "outerwear", graphicId: "overshirt", label: "Overshirt" },
  // accessory
  "cap": { slot: "accessory", graphicId: "cap", label: "Cap" },
  "beanie": { slot: "accessory", graphicId: "beanie", label: "Beanie" },
  "scarf": { slot: "accessory", graphicId: "scarf", label: "Scarf" },
  "belt": { slot: "accessory", graphicId: "belt", label: "Belt" },
  "tie": { slot: "accessory", graphicId: "tie", label: "Tie" },
  "watch": { slot: "accessory", graphicId: "watch", label: "Watch" },
  "umbrella": { slot: "accessory", graphicId: "umbrella", label: "Umbrella" },
};

export function garmentTypesForSlot(slot: Slot): string[] {
  return Object.entries(GARMENTS).filter(([, d]) => d.slot === slot).map(([t]) => t);
}

export function resolveGarment(garmentType: string): { slot: Slot; graphicId: string } {
  const def = GARMENTS[garmentType];
  if (!def) throw new Error(`Unknown garment type: ${garmentType}`);
  return { slot: def.slot, graphicId: def.graphicId };
}
