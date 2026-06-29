import { describe, it, expect } from "vitest";
import { targetDimensions } from "./downscale";

describe("targetDimensions", () => {
  it("leaves small images unchanged", () => {
    expect(targetDimensions(800, 600, 1024)).toEqual({ width: 800, height: 600 });
  });
  it("scales a wide image to fit the max edge, keeping aspect ratio", () => {
    expect(targetDimensions(4000, 3000, 1024)).toEqual({ width: 1024, height: 768 });
  });
  it("scales a tall image", () => {
    expect(targetDimensions(3000, 4000, 1024)).toEqual({ width: 768, height: 1024 });
  });
});
