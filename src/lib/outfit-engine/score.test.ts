import { describe, it, expect } from "vitest";
import { outfitColorScore, buildRationale } from "./score";
import { analyzeColor } from "@/lib/color";
import type { Outfit, WardrobeItem } from "@/lib/types";

function mk(rgb: [number, number, number], slot: WardrobeItem["slot"]): WardrobeItem {
  return {
    id: rgb.join(","), garmentType: "x", slot, graphicId: "x",
    color: analyzeColor(rgb), formality: "casual", seasons: ["all-season"],
    timesWorn: 0, cooldown: 0, createdAt: 0,
  };
}

const neutralOutfit: Outfit = {
  top: mk([250, 250, 250], "top"),
  bottom: mk([31, 42, 68], "bottom"),
  footwear: mk([16, 16, 16], "footwear"),
};
const clashOutfit: Outfit = {
  top: mk([40, 150, 60], "top"),
  bottom: mk([200, 40, 40], "bottom"),
  footwear: mk([210, 200, 40], "footwear"),
};

describe("outfitColorScore", () => {
  it("scores a neutral outfit above a clashing one", () => {
    expect(outfitColorScore(neutralOutfit)).toBeGreaterThan(outfitColorScore(clashOutfit));
  });
});

describe("buildRationale", () => {
  it("mentions the layerable note when layerable", () => {
    const r = buildRationale(neutralOutfit, true);
    expect(r.toLowerCase()).toContain("without");
  });
});
