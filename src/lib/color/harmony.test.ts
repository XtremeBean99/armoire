import { describe, it, expect } from "vitest";
import { analyzeColor, colorHarmonyScore } from "./index";

const C = (r: number, g: number, b: number) => analyzeColor([r, g, b]);

describe("colorHarmonyScore", () => {
  it("returns 0..1", () => {
    const s = colorHarmonyScore([C(31, 42, 68), C(250, 250, 250), C(168, 90, 50)]);
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(1);
  });
  it("scores an all-neutral set highly", () => {
    const neutral = colorHarmonyScore([C(16, 16, 16), C(128, 128, 128), C(250, 250, 250)]);
    expect(neutral).toBeGreaterThan(0.7);
  });
  it("prefers complementary over clashing pairs of bold colours", () => {
    const complementary = colorHarmonyScore([C(40, 90, 200), C(200, 190, 30)]); // blue + gold (~173° apart)
    const clash = colorHarmonyScore([C(40, 90, 200), C(0, 150, 200)]);          // blue + teal (~44° apart)
    expect(complementary).toBeGreaterThan(clash);
  });
  it("penalises more than two competing bold colours", () => {
    const two = colorHarmonyScore([C(40, 90, 200), C(200, 190, 30)]);
    const four = colorHarmonyScore([C(40, 90, 200), C(200, 190, 30), C(80, 150, 60), C(160, 40, 160)]);
    expect(four).toBeLessThan(two);
  });
});
