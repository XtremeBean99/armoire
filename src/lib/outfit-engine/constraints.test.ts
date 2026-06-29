import { describe, it, expect } from "vitest";
import { formalityCoherent, availableForSeason, isAvailable } from "./constraints";
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
