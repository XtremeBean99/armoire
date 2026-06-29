import type { Formality, WardrobeItem } from "@/lib/types";

export interface InsightsData {
  mostWorn: { item: WardrobeItem; timesWorn: number }[];
  colorDistribution: { hueFamily: string; count: number }[];
  formalityDistribution: { formality: Formality; count: number }[];
  costPerWear: { item: WardrobeItem; cpw: number }[];
  orphans: WardrobeItem[];
}

export function computeInsights(items: WardrobeItem[]): InsightsData {
  const mostWorn = [...items]
    .sort((a, b) => b.timesWorn - a.timesWorn)
    .map((item) => ({ item, timesWorn: item.timesWorn }));

  const colorMap = new Map<string, number>();
  for (const i of items) colorMap.set(i.color.hueFamily, (colorMap.get(i.color.hueFamily) ?? 0) + i.timesWorn);
  const colorDistribution = [...colorMap.entries()]
    .map(([hueFamily, count]) => ({ hueFamily, count }))
    .sort((a, b) => b.count - a.count);

  const formalityMap = new Map<Formality, number>();
  for (const i of items) formalityMap.set(i.formality, (formalityMap.get(i.formality) ?? 0) + i.timesWorn);
  const formalityDistribution = [...formalityMap.entries()]
    .map(([formality, count]) => ({ formality, count }))
    .sort((a, b) => b.count - a.count);

  const costPerWear = items
    .filter((i) => typeof i.pricePaid === "number")
    .map((item) => ({ item, cpw: (item.pricePaid as number) / Math.max(item.timesWorn, 1) }))
    .sort((a, b) => a.cpw - b.cpw);

  const orphans = items.filter((i) => i.timesWorn === 0).sort((a, b) => a.createdAt - b.createdAt);

  return { mostWorn, colorDistribution, formalityDistribution, costPerWear, orphans };
}
