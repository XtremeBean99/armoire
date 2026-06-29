"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { wardrobeStore } from "@/lib/wardrobe-store/instance";
import { ChipSelect } from "@/components/ChipSelect";
import { ColorPicker } from "@/components/ColorPicker";
import { GarmentGraphic } from "@/lib/graphics/GarmentGraphic";
import { GARMENTS } from "@/lib/graphics/registry";
import type { Formality, ItemColor, Season } from "@/lib/types";

const FORMALITIES: { value: Formality; label: string }[] = [
  { value: "gym", label: "Gym" }, { value: "casual", label: "Casual" },
  { value: "smart", label: "Smart" }, { value: "formal", label: "Formal" },
];
const SEASONS: { value: Season; label: string }[] = [
  { value: "summer", label: "Summer" }, { value: "winter", label: "Winter" },
  { value: "spring", label: "Spring" }, { value: "autumn", label: "Autumn" },
  { value: "all-season", label: "All-season" },
];
const TYPES = Object.entries(GARMENTS).map(([value, def]) => ({ value, label: def.label }));

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

  async function onFile(f: File) {
    setFile(f); setBusy(true); setFallback(false);
    try {
      const { extractItemColor } = await import("@/lib/image-pipeline/pipeline");
      const { color } = await extractItemColor(f);
      setColor(color);
    } catch {
      setFallback(true); // show eyedropper
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!color) return;
    await wardrobeStore.getState().addItem({
      garmentType, color, formality, seasons,
      pricePaid: price ? Number(price) : undefined,
    });
    router.push("/wardrobe");
  }

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-xl font-semibold">Add an item</h1>
      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      {busy && <p className="text-sm text-neutral-500">Removing background &amp; reading colour…</p>}
      {fallback && file && <ColorPicker file={file} onPick={setColor} />}
      {color && (
        <div className="flex items-center gap-3">
          <GarmentGraphic graphicId={GARMENTS[garmentType].graphicId} color={color.hex} />
          <span className="text-sm">{color.colorName} ({color.hex})</span>
        </div>
      )}
      <label className="block text-sm font-medium">Type</label>
      <ChipSelect options={TYPES} value={garmentType} onChange={(v) => setGarmentType(v as string)} />
      <label className="block text-sm font-medium">Formality</label>
      <ChipSelect options={FORMALITIES} value={formality} onChange={(v) => setFormality(v as Formality)} />
      <label className="block text-sm font-medium">Season</label>
      <ChipSelect options={SEASONS} value={seasons} onChange={(v) => setSeasons(v as Season[])} multiple />
      <label className="block text-sm font-medium">Price (optional)</label>
      <input className="rounded border p-1" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button disabled={!color} onClick={save} className="rounded bg-black px-4 py-2 text-white disabled:opacity-40">
        Save item
      </button>
    </main>
  );
}
