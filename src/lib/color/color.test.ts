import { describe, it, expect } from "vitest";
import { analyzeColor, isNeutral } from "./index";

const rgb = (r: number, g: number, b: number): [number, number, number] => [r, g, b];

describe("analyzeColor", () => {
  it("produces a hex string and 0..255 rgb echo", () => {
    const c = analyzeColor(rgb(255, 0, 0));
    expect(c.hex.toLowerCase()).toBe("#ff0000");
    expect(c.rgb).toEqual([255, 0, 0]);
  });
  it("classifies blue into the blue hue family", () => {
    expect(analyzeColor(rgb(0, 150, 200)).hueFamily).toBe("blue");
  });
  it("marks greys, black, white, beige and navy as neutral", () => {
    expect(analyzeColor(rgb(128, 128, 128)).isNeutral).toBe(true);
    expect(analyzeColor(rgb(0, 0, 0)).isNeutral).toBe(true);
    expect(analyzeColor(rgb(255, 255, 255)).isNeutral).toBe(true);
    expect(analyzeColor(rgb(245, 235, 215)).isNeutral).toBe(true); // beige
    expect(analyzeColor(rgb(31, 42, 68)).isNeutral).toBe(true);    // navy
  });
  it("marks a saturated colour as non-neutral", () => {
    expect(analyzeColor(rgb(200, 30, 30)).isNeutral).toBe(false);
    expect(analyzeColor(rgb(0, 150, 200)).isNeutral).toBe(false);
  });
});

describe("isNeutral helper", () => {
  it("agrees with analyzeColor", () => {
    const c = analyzeColor(rgb(31, 42, 68));
    expect(isNeutral(c.lab)).toBe(true);
  });
});
