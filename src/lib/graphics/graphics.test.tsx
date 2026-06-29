import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { GARMENTS, garmentTypesForSlot, resolveGarment, garmentTypesBySubcategory } from "./registry";
import { GarmentGraphic } from "./GarmentGraphic";

describe("garment registry", () => {
  it("maps every garment to a slot, graphicId, and subcategory", () => {
    for (const [type, def] of Object.entries(GARMENTS)) {
      expect(def.slot).toBeTruthy();
      expect(def.graphicId).toBeTruthy();
      expect(def.subcategory).toBeTruthy();
      expect(def.category).toBeTruthy();
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
    const tops = garmentTypesForSlot("top");
    expect(tops).toContain("t-shirt");
    expect(tops).toContain("oxford-shirt");
    expect(tops).toContain("hoodie");
  });
  it("resolves a garment type", () => {
    expect(resolveGarment("jeans")).toEqual({ slot: "bottom", graphicId: "jeans" });
  });
  it("has hierarchical subcategories for tops", () => {
    const groups = garmentTypesBySubcategory("top");
    const subcats = groups.map(g => g.subcategory);
    expect(subcats).toContain("T-shirts");
    expect(subcats).toContain("Shirts");
    expect(subcats).toContain("Knits");
    expect(subcats).toContain("Hoodies & Sweats");
    // Each group has types
    for (const g of groups) {
      expect(g.types.length).toBeGreaterThan(0);
    }
  });
  it("has all slots covered", () => {
    const slots = ["top", "bottom", "footwear", "outerwear", "accessory"];
    for (const s of slots) {
      expect(garmentTypesForSlot(s as any).length).toBeGreaterThan(0);
    }
  });
  it("expanded garment count is reasonable", () => {
    const count = Object.keys(GARMENTS).length;
    expect(count).toBeGreaterThan(50); // We've expanded significantly
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
  it("renders with secondary color for two-tone pattern", () => {
    const { container } = render(
      <GarmentGraphic graphicId="t-shirt" color="#1f2a44" secondaryColor="#ffffff" pattern="two-tone" />
    );
    expect(container.querySelector("svg")).toBeTruthy();
    expect(container.innerHTML).toContain("linearGradient");
  });
  it("renders with stripe pattern", () => {
    const { container } = render(
      <GarmentGraphic graphicId="t-shirt" color="#1f2a44" secondaryColor="#e11d48" pattern="stripe-h" />
    );
    expect(container.innerHTML).toContain("pattern");
    expect(container.innerHTML).toContain("#e11d48");
  });
  it("renders with trim color", () => {
    const { container } = render(
      <GarmentGraphic graphicId="oxford-shirt" color="#ffffff" trimColor="#1e3a5f" pattern="trim" />
    );
    expect(container.innerHTML).toContain("#1e3a5f");
  });
  it("renders new garments from expanded registry", () => {
    // Test a few new garment types
    const newTypes = ["bucket-hat", "cargo-shorts", "espadrilles", "rain-poncho", "sweater-vest"];
    for (const gid of newTypes) {
      const { container } = render(<GarmentGraphic graphicId={gid} color="#333" />);
      expect(container.querySelector("svg")).toBeTruthy();
    }
  });
});
