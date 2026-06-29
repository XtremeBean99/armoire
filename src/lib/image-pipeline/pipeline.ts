import { analyzeColor } from "@/lib/color";
import type { ItemColor } from "@/lib/types";
import { targetDimensions } from "./downscale";

const ALPHA_MIN = 200;   // treat as opaque
const BIN = 24;          // colour-bin size for clustering

export function dominantColorFromImageData(data: Uint8ClampedArray): [number, number, number] {
  const bins = new Map<string, { r: number; g: number; b: number; n: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < ALPHA_MIN) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = `${Math.floor(r / BIN)}-${Math.floor(g / BIN)}-${Math.floor(b / BIN)}`;
    const cur = bins.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
    cur.r += r; cur.g += g; cur.b += b; cur.n += 1;
    bins.set(key, cur);
  }
  let best: { r: number; g: number; b: number; n: number } | null = null;
  for (const v of bins.values()) if (!best || v.n > best.n) best = v;
  if (!best) throw new Error("No opaque pixels to sample.");
  return [Math.round(best.r / best.n), Math.round(best.g / best.n), Math.round(best.b / best.n)];
}

// Browser-only. Removes background, samples the dominant colour, returns the cutout.
export async function extractItemColor(file: Blob): Promise<{ color: ItemColor; cutoutBlob: Blob }> {
  const { removeBackground } = await import("@imgly/background-removal");
  const cutoutBlob = await removeBackground(file);
  const bitmap = await createImageBitmap(cutoutBlob);
  const { width, height } = targetDimensions(bitmap.width, bitmap.height, 512);
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);
  const rgb = dominantColorFromImageData(data);
  return { color: analyzeColor(rgb), cutoutBlob };
}
