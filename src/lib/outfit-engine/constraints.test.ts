import { describe, it, expect, test } from "vitest";
import { formalityCoherent, availableForSeason, isAvailable, patternCoherent } from "./constraints";
import type { WardrobeItem, Formality, Season } from "@/lib/types";

function it2(formality: Formality, seasons: Season[], cooldown = 0): WardrobeItem {
  return {
    id: Math.random().toString(), garmentType: "t-shirt", slot: "top", graphicId: "t-shirt",
    color: { hex: "#000", rgb: [0,0,0], lab: [0,0,0], colorName: "Black", hueFamily: "neutral", isNeutral: true },
    formality, seasons, timesWorn: 0, cooldown, createdAt: 0,
  };
}

describe("formalityCoherent", () => {
  it("allows items within one tier", () => {
    expect(formalityCoherent([it2("casual", []), it2("smart", [])])).toBe(true);
  });
  it("rejects gym with formal", () => {
    expect(formalityCoherent([it2("gym", []), it2("formal", [])])).toBe(false);
  });
});

describe("availableForSeason", () => {
  it("matches exact season or all-season, and 'any' disables the filter", () => {
    expect(availableForSeason(it2("casual", ["summer"]), "summer")).toBe(true);
    expect(availableForSeason(it2("casual", ["winter"]), "summer")).toBe(false);
    expect(availableForSeason(it2("casual", ["all-season"]), "summer")).toBe(true);
    expect(availableForSeason(it2("casual", ["winter"]), "any")).toBe(true);
  });
});

describe("isAvailable", () => {
  it("is false while on cooldown", () => {
    expect(isAvailable(it2("casual", [], 0))).toBe(true);
    expect(isAvailable(it2("casual", [], 1))).toBe(false);
  });
});

function makeItem(pattern?: string) {
  return {
    id: 'x', garmentType: 't-shirt', slot: 'top' as const, graphicId: 't-shirt',
    color: { hex: '#fff', rgb: [255,255,255] as [number,number,number], lab: [100,0,0] as [number,number,number], colorName: 'White', hueFamily: 'neutral', isNeutral: true },
    formality: 'casual' as const, seasons: ['all-season' as const],
    timesWorn: 0, cooldown: 0, createdAt: 0,
    pattern: pattern as any,
  }
}

test('patternCoherent: allows one patterned item', () => {
  expect(patternCoherent([makeItem('stripe-h'), makeItem('solid'), makeItem('solid')])).toBe(true)
})

test('patternCoherent: rejects two patterned items', () => {
  expect(patternCoherent([makeItem('stripe-h'), makeItem('stripe-v'), makeItem('solid')])).toBe(false)
})

test('patternCoherent: allows multiple graphic items', () => {
  expect(patternCoherent([makeItem('graphic'), makeItem('graphic'), makeItem('solid')])).toBe(true)
})
