import { describe, it, expect } from "vitest";
import { dominantColorFromImageData } from "./pipeline";

// helper: build RGBA buffer of `count` pixels of a colour (alpha 255), plus transparent padding
function px(colors: Array<[number, number, number, number]>): Uint8ClampedArray {
  const arr = new Uint8ClampedArray(colors.length * 4);
  colors.forEach((c, i) => { arr.set(c, i * 4); });
  return arr;
}

describe("dominantColorFromImageData", () => {
  it("ignores transparent pixels and returns the dominant opaque colour", () => {
    const data = px([
      [31, 42, 68, 255], [31, 42, 68, 255], [33, 40, 70, 255], // navy cluster
      [255, 255, 255, 0], [0, 0, 0, 0],                         // transparent -> ignored
    ]);
    const [r, g, b] = dominantColorFromImageData(data);
    expect(r).toBeGreaterThan(20); expect(r).toBeLessThan(45);
    expect(b).toBeGreaterThan(55); expect(b).toBeLessThan(80);
  });
  it("throws if there are no opaque pixels", () => {
    const data = px([[10, 10, 10, 0]]);
    expect(() => dominantColorFromImageData(data)).toThrow();
  });
});
