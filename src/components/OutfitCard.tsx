"use client";

import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import { GARMENTS } from "@/lib/graphics/registry";
import { Button } from "@/components/Button";
import { MotionCard } from "@/components/MotionCard";
import type { RankedOutfit } from "@/lib/types";

export function OutfitCard({ outfit, onWear }: { outfit: RankedOutfit; onWear: () => void }) {
  return (
    <MotionCard className="h-full">
      <div className="flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <span className="label-text">Outfit</span>
          {outfit.layerable && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
              Layerable
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-4">
          {outfit.items.map((i) => (
            <div key={i.id} className="flex flex-col items-center gap-1.5">
              <GarmentGraphic
                graphicId={i.graphicId}
                color={i.color.hex}
                secondaryColor={i.secondaryColor?.hex}
                trimColor={i.trimColor?.hex}
                pattern={i.pattern ?? "solid"}
                size={76}
              />
              <span className="text-[11px] text-muted-foreground">
                {GARMENTS[i.garmentType]?.label ?? i.garmentType}
              </span>
            </div>
          ))}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{outfit.rationale}</p>

        <div>
          <Button variant="secondary" onClick={onWear}>
            Mark worn
          </Button>
        </div>
      </div>
    </MotionCard>
  );
}
