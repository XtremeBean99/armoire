"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { wardrobeStore } from "@/lib/wardrobe-store/instance";
import { ChipSelect } from "@/components/ChipSelect";
import { ColorIndex } from "@/components/ColorIndex";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import { GARMENTS, garmentTypesBySubcategory } from "@/lib/graphics/registry";
import type { Formality, ItemColor, Season, Pattern, Slot } from "@/lib/types";

const FORMALITIES: { value: Formality; label: string }[] = [
  { value: "gym", label: "Gym" },
  { value: "casual", label: "Casual" },
  { value: "smart", label: "Smart" },
  { value: "formal", label: "Formal" },
];
const SEASONS: { value: Season; label: string }[] = [
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
  { value: "spring", label: "Spring" },
  { value: "all-season", label: "All-season" },
];

const SLOTS: { value: Slot; label: string }[] = [
  { value: "top", label: "Tops" },
  { value: "bottom", label: "Bottoms" },
  { value: "footwear", label: "Footwear" },
  { value: "outerwear", label: "Outerwear" },
  { value: "accessory", label: "Accessories" },
];

const PATTERN_OPTIONS: { value: Pattern; label: string }[] = [
  { value: "solid",    label: "Solid" },
  { value: "stripe-h", label: "Horizontal stripe" },
  { value: "stripe-v", label: "Vertical stripe" },
  { value: "graphic",  label: "Graphic / logo" },
  { value: "two-tone", label: "Two-tone" },
  { value: "trim",     label: "Contrast trim" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="label-text">{label}</p>
      {children}
    </div>
  );
}

export default function AddPage() {
  const router = useRouter();
  const [color, setColor] = useState<ItemColor | null>(null);
  const [secondaryColor, setSecondaryColor] = useState<ItemColor | null>(null);
  const [trimColor, setTrimColor] = useState<ItemColor | null>(null);
  const [garmentType, setGarmentType] = useState("t-shirt");
  const [activeSlot, setActiveSlot] = useState<Slot>("top");
  const [formality, setFormality] = useState<Formality>("casual");
  const [seasons, setSeasons] = useState<Season[]>(["all-season"]);
  const [price, setPrice] = useState<string>("");
  const [priceError, setPriceError] = useState<string | null>(null);
  const [seasonError, setSeasonError] = useState<string | null>(null);
  const [pattern, setPattern] = useState<Pattern>("solid");

  // Resolve current garment
  const currentDef = GARMENTS[garmentType];

  // When slot changes, pick first garment of that slot
  useEffect(() => {
    const groups = garmentTypesBySubcategory(activeSlot);
    if (groups.length > 0 && groups[0].types.length > 0) {
      const firstType = groups[0].types[0];
      setGarmentType(firstType);
      const def = GARMENTS[firstType];
      if (def) {
        setFormality(def.defaultFormality);
        setSeasons(def.defaultSeasons);
      }
    }
  }, [activeSlot]);

  // When garment changes, reset defaults
  useEffect(() => {
    if (currentDef) {
      setFormality(currentDef.defaultFormality);
      setSeasons(currentDef.defaultSeasons);
    }
  }, [garmentType]);

  // Reset secondary/trim colors when pattern changes to something that doesn't need them
  useEffect(() => {
    if (pattern === "solid" || pattern === "trim") {
      setSecondaryColor(null);
    }
  }, [pattern]);

  const showSecondaryColor =
    pattern === "stripe-h" ||
    pattern === "stripe-v" ||
    pattern === "graphic" ||
    pattern === "two-tone";

  const showTrimColor = pattern === "trim";

  async function save() {
    if (!color) return;
    if (price.trim() !== "") {
      const n = Number(price);
      if (!Number.isFinite(n) || n < 0) {
        setPriceError("Enter a valid price or leave it empty.");
        return;
      }
    }
    if (seasons.length === 0) {
      setSeasonError("Select at least one season.");
      return;
    }
    await wardrobeStore.getState().addItem({
      garmentType,
      color,
      secondaryColor: (showSecondaryColor && secondaryColor) ? secondaryColor : undefined,
      trimColor: (showTrimColor && trimColor) ? trimColor : undefined,
      formality,
      seasons,
      pricePaid: price.trim() ? Number(price) : undefined,
      pattern: pattern !== "solid" ? pattern : undefined,
    });
    router.push("/wardrobe");
  }

  const subcategoryGroups = garmentTypesBySubcategory(activeSlot);

  return (
    <div className="py-16 sm:py-20">
      <Reveal>
        <p className="label-text mb-5">Add to wardrobe</p>
        <h1 className="mb-3 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Add an item
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Pick the garment, choose colours and patterns, then save to your wardrobe.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Preview */}
          <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface p-6">
            <div className="flex h-48 w-48 items-center justify-center rounded-md border border-border-subtle bg-background">
              {color ? (
                <GarmentGraphic
                  graphicId={currentDef?.graphicId ?? "t-shirt"}
                  color={color.hex}
                  secondaryColor={secondaryColor?.hex}
                  trimColor={trimColor?.hex}
                  pattern={pattern}
                  size={150}
                />
              ) : (
                <span className="px-4 text-center text-xs text-muted">
                  Select a colour below
                </span>
              )}
            </div>
            {color && (
              <div className="flex flex-col items-center gap-1">
                <p className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    className="inline-block h-3.5 w-3.5 rounded-full border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.colorName || color.hex}
                  <span className="text-muted-foreground">{color.hex}</span>
                </p>
                {secondaryColor && (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="inline-block h-3 w-3 rounded-full border border-white/10"
                      style={{ backgroundColor: secondaryColor.hex }}
                    />
                    {secondaryColor.colorName || secondaryColor.hex} · secondary
                  </p>
                )}
                {trimColor && (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="inline-block h-3 w-3 rounded-full border border-white/10"
                      style={{ backgroundColor: trimColor.hex }}
                    />
                    {trimColor.colorName || trimColor.hex} · trim
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {currentDef?.label ?? garmentType} · {formality}
                </p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-7">
            {/* Primary Colour */}
            <Field label="Primary colour">
              <ColorIndex value={color} onChange={setColor} label="Primary" />
            </Field>

            {/* Pattern */}
            <Field label="Pattern">
              <ChipSelect
                options={PATTERN_OPTIONS}
                value={pattern}
                onChange={(v) => setPattern(v as Pattern)}
              />
            </Field>

            {/* Secondary Colour (shown for stripe/graphic/two-tone) */}
            {showSecondaryColor && (
              <Field label="Secondary colour">
                <ColorIndex
                  value={secondaryColor}
                  onChange={setSecondaryColor}
                  label="Secondary"
                />
              </Field>
            )}

            {/* Trim Colour */}
            {showTrimColor && (
              <Field label="Trim colour (collar, cuffs)">
                <ColorIndex
                  value={trimColor}
                  onChange={setTrimColor}
                  label="Trim"
                />
              </Field>
            )}

            {/* Garment Type - hierarchical */}
            <Field label="Garment type">
              {/* Slot tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {SLOTS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setActiveSlot(s.value)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      activeSlot === s.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Subcategory → garment grid */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {subcategoryGroups.map(({ subcategory, types }) => (
                  <div key={subcategory}>
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                      {subcategory}
                    </p>
                    <ChipSelect
                      options={types.map((t) => ({
                        value: t,
                        label: GARMENTS[t].label,
                      }))}
                      value={garmentType}
                      onChange={(v) => setGarmentType(v as string)}
                    />
                  </div>
                ))}
              </div>
            </Field>

            <Field label="Formality">
              <ChipSelect
                options={FORMALITIES}
                value={formality}
                onChange={(v) => setFormality(v as Formality)}
              />
            </Field>

            <Field label="Season">
              <ChipSelect
                options={SEASONS}
                value={seasons}
                onChange={(v) => {
                  setSeasons(v as Season[]);
                  setSeasonError(null);
                }}
                multiple
              />
              {seasonError && (
                <p role="alert" className="text-xs text-red-500">
                  {seasonError}
                </p>
              )}
            </Field>

            <Field label="Price (optional)">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="0.01"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceError(null);
                  }}
                  placeholder="0.00"
                  aria-invalid={!!priceError}
                  aria-describedby={priceError ? "price-error" : undefined}
                  className="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-muted-foreground"
                />
              </div>
              {priceError && (
                <p id="price-error" role="alert" className="text-xs text-red-500">
                  {priceError}
                </p>
              )}
            </Field>

            <div className="pt-2" aria-live="polite">
              <Button disabled={!color} onClick={save}>
                Save item
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
