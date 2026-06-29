import { describe, it, expect } from "vitest";
import { prefersOuterwear, isLayerable, weatherNote, weatherScoreBonus } from "./weather-adjust";
import type { Outfit, WardrobeItem, WeatherContext } from "@/lib/types";

const item = (slot: WardrobeItem["slot"]): WardrobeItem => ({
  id: slot, garmentType: "x", slot, graphicId: "x",
  color: { hex: "#000", rgb: [0,0,0], lab: [0,0,0], colorName: "Black", hueFamily: "neutral", isNeutral: true },
  formality: "casual", seasons: ["all-season"], timesWorn: 0, cooldown: 0, createdAt: 0,
});
const core: Outfit = { top: item("top"), bottom: item("bottom"), footwear: item("footwear") };
const withOuter: Outfit = { ...core, outerwear: item("outerwear") };

const cold: WeatherContext = { minTempC: 2, maxTempC: 8, isTransitionalDay: false, rainExpected: false };
const transitional: WeatherContext = { minTempC: 8, maxTempC: 22, isTransitionalDay: true, rainExpected: false };
const rainy: WeatherContext = { minTempC: 10, maxTempC: 14, isTransitionalDay: false, rainExpected: true };

describe("weather-adjust", () => {
  it("prefers outerwear on a cold day", () => {
    expect(prefersOuterwear(cold)).toBe(true);
    expect(prefersOuterwear(undefined)).toBe(false);
  });
  it("flags layerable only when transitional AND outfit has outerwear", () => {
    expect(isLayerable(withOuter, transitional)).toBe(true);
    expect(isLayerable(core, transitional)).toBe(false);
    expect(isLayerable(withOuter, cold)).toBe(false);
  });
  it("notes an umbrella when rain is expected", () => {
    expect(weatherNote(rainy, true)?.toLowerCase()).toContain("umbrella");
    expect(weatherNote(undefined)).toBeUndefined();
  });
  it("rewards outerwear-bearing outfits in the cold", () => {
    expect(weatherScoreBonus(withOuter, cold)).toBeGreaterThan(weatherScoreBonus(core, cold));
  });
});
