import { describe, it, expect } from "vitest";
import { generateOutfits } from "./index";
import { analyzeColor } from "@/lib/color";
import type { WardrobeItem, Slot, Formality, Season, WeatherContext } from "@/lib/types";

let n = 0;
function mk(rgb: [number,number,number], slot: Slot, opts: Partial<WardrobeItem> = {}): WardrobeItem {
  return {
    id: `i${n++}`, garmentType: "x", slot, graphicId: "x",
    color: analyzeColor(rgb), formality: "casual" as Formality,
    seasons: ["all-season"] as Season[], timesWorn: 0, cooldown: 0, createdAt: 0, ...opts,
  };
}

function wardrobe(): WardrobeItem[] {
  return [
    mk([250,250,250], "top"), mk([200,40,40], "top"),
    mk([31,42,68], "bottom"), mk([90,90,90], "bottom"),
    mk([16,16,16], "footwear"),
    mk([60,60,60], "outerwear"),
    mk([20,20,20], "accessory", { garmentType: "umbrella", graphicId: "umbrella" }),
  ];
}

describe("generateOutfits", () => {
  it("returns ranked outfits with required slots filled", () => {
    const out = generateOutfits(wardrobe(), { seed: 1, count: 3 });
    expect(out.length).toBeGreaterThan(0);
    for (const r of out) {
      expect(r.outfit.top.slot).toBe("top");
      expect(r.outfit.bottom.slot).toBe("bottom");
      expect(r.outfit.footwear.slot).toBe("footwear");
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(1);
      expect(r.rationale.length).toBeGreaterThan(0);
    }
  });
  it("is deterministic for a fixed seed", () => {
    const a = generateOutfits(wardrobe(), { seed: 7, count: 5 });
    const b = generateOutfits(wardrobe(), { seed: 7, count: 5 });
    expect(a.map((o) => o.items.map((i) => i.garmentType))).toEqual(
      b.map((o) => o.items.map((i) => i.garmentType))
    );
  });
  it("excludes items on cooldown", () => {
    const items = wardrobe().map((i) => i.slot === "footwear" ? { ...i, cooldown: 2 } : i);
    expect(generateOutfits(items, { seed: 1 })).toEqual([]); // no footwear available
  });
  it("includes an umbrella accessory when rain is expected", () => {
    const weather: WeatherContext = { minTempC: 10, maxTempC: 14, isTransitionalDay: false, rainExpected: true };
    const out = generateOutfits(wardrobe(), { seed: 1, count: 1, weather });
    expect(out[0].outfit.accessory?.garmentType).toBe("umbrella");
    expect(out[0].rationale.toLowerCase()).toContain("umbrella");
  });
});
