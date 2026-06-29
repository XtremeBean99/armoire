import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import type { WardrobeItem } from "@/lib/types";

export function ItemCard({ item }: { item: WardrobeItem }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border p-3">
      <GarmentGraphic graphicId={item.graphicId} color={item.color.hex} />
      <span className="text-sm font-medium">{item.color.colorName} {item.garmentType}</span>
      <span className="text-xs text-neutral-500">{item.formality} · worn {item.timesWorn}×</span>
    </div>
  );
}
