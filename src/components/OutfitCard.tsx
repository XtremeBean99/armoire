"use client";
import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import type { RankedOutfit } from "@/lib/types";

export function OutfitCard({ outfit, onWear }: { outfit: RankedOutfit; onWear: () => void }) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="flex gap-2">
        {outfit.items.map((i) => <GarmentGraphic key={i.id} graphicId={i.graphicId} color={i.color.hex} size={72} />)}
      </div>
      <p className="text-sm text-neutral-700">{outfit.rationale}</p>
      <button onClick={onWear} className="rounded bg-black px-3 py-1 text-sm text-white">Mark worn</button>
    </div>
  );
}
