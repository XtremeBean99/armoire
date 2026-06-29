import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { GARMENTS, garmentTypesForSlot, resolveGarment } from "./registry";
import { GarmentGraphic } from "./GarmentGraphic";

describe("garment registry", () => {
  it("maps every garment to a slot and graphicId", () => {
    for (const [type, def] of Object.entries(GARMENTS)) {
      expect(def.slot).toBeTruthy();
      expect(def.graphicId).toBeTruthy();
      expect(type.length).toBeGreaterThan(0);
    }
  });
  it("includes core menswear types and an umbrella accessory", () => {
    expect(GARMENTS["t-shirt"].slot).toBe("top");
    expect(GARMENTS["jeans"].slot).toBe("bottom");
    expect(GARMENTS["sneakers"].slot).toBe("footwear");
    expect(GARMENTS["umbrella"].slot).toBe("accessory");
  });
  it("lists types by slot", () => {
    expect(garmentTypesForSlot("top")).toContain("t-shirt");
  });
  it("resolves a garment type", () => {
    expect(resolveGarment("jeans")).toEqual({ slot: "bottom", graphicId: "jeans" });
  });
});

describe("GarmentGraphic", () => {
  it("renders an svg tinted with the given colour", () => {
    const { container } = render(<GarmentGraphic graphicId="t-shirt" color="#1f2a44" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(container.innerHTML).toContain("#1f2a44");
  });
  it("falls back to a slot silhouette for an unknown graphicId", () => {
    const { container } = render(<GarmentGraphic graphicId="does-not-exist" color="#000" />);
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
