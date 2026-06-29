import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import { GARMENTS } from "@/lib/graphics/registry";
import type { Slot, WardrobeItem } from "@/lib/types";

const SLOT_BADGES: Record<Slot, { label: string; className: string }> = {
  top:       { label: "Top",       className: "bg-blue-900/30 text-blue-300 border-blue-800/50" },
  bottom:    { label: "Bottom",    className: "bg-amber-900/30 text-amber-300 border-amber-800/50" },
  footwear:  { label: "Shoes",     className: "bg-emerald-900/30 text-emerald-300 border-emerald-800/50" },
  outerwear: { label: "Outer",     className: "bg-purple-900/30 text-purple-300 border-purple-800/50" },
  accessory: { label: "Accessory", className: "bg-rose-900/30 text-rose-300 border-rose-800/50" },
};

function patternLabel(p?: string): string {
  const map: Record<string,string> = {
    "stripe-h": "horizontal stripe",
    "stripe-v": "vertical stripe",
    graphic: "graphic",
    "two-tone": "two-tone",
    trim: "contrast trim",
  }
  return map[p ?? ""] ?? ""
}

export function ItemCard({ item, onRemove }: { item: WardrobeItem; onRemove?: () => void }) {
  const label = GARMENTS[item.garmentType]?.label ?? item.garmentType;
  const subcat = GARMENTS[item.garmentType]?.subcategory ?? "";
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
      {/* Slot badge */}
      {SLOT_BADGES[item.slot] && (
        <span className={`absolute left-2 top-2 rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${SLOT_BADGES[item.slot].className}`}>
          {SLOT_BADGES[item.slot].label}
        </span>
      )}
      <GarmentGraphic
        graphicId={item.graphicId}
        color={item.color.hex}
        secondaryColor={item.secondaryColor?.hex}
        trimColor={item.trimColor?.hex}
        pattern={item.pattern ?? "solid"}
        size={88}
      />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span
            className="inline-block h-3 w-3 rounded-full border border-white/10"
            style={{ backgroundColor: item.color.hex }}
          />
          {item.color.colorName} {label}
        </span>
        {item.pattern && item.pattern !== "solid" && (
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {patternLabel(item.pattern)}
          </span>
        )}
        <span className="text-xs capitalize text-muted-foreground">
          {subcat && `${subcat} · `}{item.formality} · worn {item.timesWorn}×
        </span>
      </div>
    </div>
  );
}
