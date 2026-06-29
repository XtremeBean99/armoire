import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import { GARMENTS } from "@/lib/graphics/registry";
import type { WardrobeItem } from "@/lib/types";

export function ItemCard({ item, onRemove }: { item: WardrobeItem; onRemove?: () => void }) {
  const label = GARMENTS[item.garmentType]?.label ?? item.garmentType;
  return (
    <div className="group relative flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-muted-foreground/40 hover:bg-surface-hover">
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.color.colorName} ${label}`}
          className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs text-muted opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
        >
          ✕
        </button>
      )}
      <GarmentGraphic graphicId={item.graphicId} color={item.color.hex} size={88} />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span
            className="inline-block h-3 w-3 rounded-full border border-white/10"
            style={{ backgroundColor: item.color.hex }}
          />
          {item.color.colorName} {label}
        </span>
        <span className="text-xs capitalize text-muted-foreground">
          {item.formality} · worn {item.timesWorn}×
        </span>
      </div>
    </div>
  );
}
