import { describe, it, expect } from "vitest";
import { toWeatherContext } from "./openMeteo";

const hours = (temps: number[], probs: number[], hourValues?: number[]) => ({
  time: (hourValues ?? temps.map((_, i) => i)).map((h) => `2026-06-29T${String(h).padStart(2, "0")}:00`),
  temperature_2m: temps,
  precipitation_probability: probs,
});

describe("toWeatherContext", () => {
  it("computes min/max and rain flag", () => {
    const ctx = toWeatherContext(hours([8, 9, 12, 15, 16], [0, 10, 0, 20, 5]));
    expect(ctx.minTempC).toBe(8);
    expect(ctx.maxTempC).toBe(16);
    expect(ctx.rainExpected).toBe(false);
  });
  it("flags rain when any hour exceeds the probability threshold", () => {
    expect(toWeatherContext(hours([10, 11], [0, 70])).rainExpected).toBe(true);
  });
  it("flags a transitional day (cold morning -> warm afternoon)", () => {
    const ctx = toWeatherContext(hours([6, 7, 9, 19, 22], [0, 0, 0, 0, 0], [6, 7, 8, 14, 15]));
    expect(ctx.isTransitionalDay).toBe(true);
  });
  it("is not transitional when the day is uniformly warm", () => {
    expect(toWeatherContext(hours([20, 21, 23, 22], [0,0,0,0], [10, 12, 14, 16])).isTransitionalDay).toBe(false);
  });
});
