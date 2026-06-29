import { describe, it, expect } from "vitest";
import { computeInsights } from "./insights";
import type { WardrobeItem } from "@/lib/types";

function mk(id: string, p: Partial<WardrobeItem>): WardrobeItem {
  return {
    id, garmentType: "t-shirt", slot: "top", graphicId: "t-shirt",
    color: { hex: "#000", rgb: [0,0,0], lab: [0,0,0], colorName: "Black", hueFamily: "neutral", isNeutral: true },
    formality: "casual", seasons: ["all-season"], timesWorn: 0, cooldown: 0, createdAt: 0, ...p,
  };
}

describe("computeInsights", () => {
  const items = [
    mk("a", { timesWorn: 5, pricePaid: 50, color: colorOf("red") }),
    mk("b", { timesWorn: 1, pricePaid: 200, color: colorOf("blue") }),
    mk("c", { timesWorn: 0, pricePaid: 30, createdAt: 10 }),
  ];

  it("ranks most-worn descending", () => {
    expect(computeInsights(items).mostWorn[0].item.id).toBe("a");
  });
  it("computes cost-per-wear, best value first", () => {
    const cpw = computeInsights(items).costPerWear;
    expect(cpw[0].item.id).toBe("a");        // 50/5 = 10
    expect(cpw[0].cpw).toBeCloseTo(10);
  });
  it("lists orphans (never worn)", () => {
    expect(computeInsights(items).orphans.map((i) => i.id)).toEqual(["c"]);
  });
  it("weights colour distribution by wear", () => {
    const dist = computeInsights(items).colorDistribution;
    const red = dist.find((d) => d.hueFamily === "red");
    expect(red?.count).toBe(5);
  });
});

function colorOf(hueFamily: string): WardrobeItem["color"] {
  return { hex: "#000", rgb: [0,0,0], lab: [0,0,0], colorName: hueFamily, hueFamily, isNeutral: false };
}
