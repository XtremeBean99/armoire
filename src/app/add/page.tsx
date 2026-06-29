"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { wardrobeStore } from "@/lib/wardrobe-store/instance";
import { ChipSelect } from "@/components/ChipSelect";
import { ColorPicker } from "@/components/ColorPicker";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import { GARMENTS, garmentTypesByCategory } from "@/lib/graphics/registry";
import type { Formality, ItemColor, Season } from "@/lib/types";

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
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [color, setColor] = useState<ItemColor | null>(null);
  const [garmentType, setGarmentType] = useState("t-shirt");
  const [formality, setFormality] = useState<Formality>("casual");
  const [seasons, setSeasons] = useState<Season[]>(["all-season"]);
  const [price, setPrice] = useState<string>("");
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const def = GARMENTS[garmentType]
    if (def) {
      setFormality(def.defaultFormality)
      setSeasons(def.defaultSeasons)
    }
  }, [garmentType])

  async function onFile(f: File) {
    setFile(f);
    setBusy(true);
    setFallback(false);
    try {
      const { extractItemColor } = await import("@/lib/image-pipeline/pipeline");
      const { color } = await extractItemColor(f);
      setColor(color);
    } catch {
      setFallback(true);
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!color) return;
    await wardrobeStore.getState().addItem({
      garmentType,
      color,
      formality,
      seasons,
      pricePaid: price ? Number(price) : undefined,
    });
    router.push("/wardrobe");
  }

  return (
    <div className="py-16 sm:py-20">
      <Reveal>
        <p className="label-text mb-5">Add to wardrobe</p>
        <h1 className="mb-3 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Add an item
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Upload a photo - the colour is read in your browser and the background removed. Then
          describe the piece.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Preview / upload */}
          <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface p-6">
            <div className="flex h-44 w-44 items-center justify-center rounded-md border border-border-subtle bg-background">
              {color ? (
                <GarmentGraphic graphicId={GARMENTS[garmentType].graphicId} color={color.hex} size={140} />
              ) : (
                <span className="px-4 text-center text-xs text-muted">No image yet</span>
              )}
            </div>
            <label className="w-full cursor-pointer">
              <span className="block w-full rounded-md border border-border px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface-hover">
                {file ? "Choose another photo" : "Choose a photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
              />
            </label>
            {busy && <p className="text-xs text-muted-foreground">Removing background &amp; reading colour…</p>}
            {color && (
              <p className="flex items-center gap-2 text-sm text-foreground">
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
                {color.colorName}
                <span className="text-muted-foreground">{color.hex}</span>
              </p>
            )}
            {fallback && file && (
              <div className="w-full space-y-2">
                <p className="text-xs text-muted-foreground">
                  Auto cut-out unavailable - tap the garment to pick its colour.
                </p>
                <ColorPicker file={file} onPick={setColor} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-7">
            <Field label="Type">
              {(["top", "bottom", "footwear", "outerwear", "accessory"] as const).map((slot) => {
                const byCategory = garmentTypesByCategory(slot)
                return Object.entries(byCategory).map(([category, types]) => (
                  <div key={category} className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">{category}</p>
                    <ChipSelect
                      options={types.map((t) => ({ value: t, label: GARMENTS[t].label }))}
                      value={garmentType}
                      onChange={(v) => setGarmentType(v as string)}
                    />
                  </div>
                ))
              })}
            </Field>
            <Field label="Formality">
              <ChipSelect options={FORMALITIES} value={formality} onChange={(v) => setFormality(v as Formality)} />
            </Field>
            <Field label="Season">
              <ChipSelect
                options={SEASONS}
                value={seasons}
                onChange={(v) => setSeasons(v as Season[])}
                multiple
              />
            </Field>
            <Field label="Price (optional)">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <input
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-muted-foreground"
                />
              </div>
            </Field>
            <div className="pt-2">
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
