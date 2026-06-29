import { describe, it, expect } from "vitest";
import { groupBySlot, coreCombos, outfitItems } from "./slots";
import type { WardrobeItem, Slot } from "@/lib/types";

function mk(id: string, slot: Slot): WardrobeItem {
  return {
    id, garmentType: "x", slot, graphicId: "x",
    color: { hex: "#000", rgb: [0,0,0], lab: [0,0,0], colorName: "Black", hueFamily: "neutral", isNeutral: true },
    formality: "casual", seasons: ["all-season"], timesWorn: 0, cooldown: 0, createdAt: 0,
  };
}

describe("slots", () => {
  it("groups items by slot", () => {
    const g = groupBySlot([mk("t1", "top"), mk("b1", "bottom"), mk("f1", "footwear")]);
    expect(g.top).toHaveLength(1);
  });
  it("produces the cartesian product of required slots", () => {
    const items = [mk("t1","top"), mk("t2","top"), mk("b1","bottom"), mk("f1","footwear")];
    expect(coreCombos(groupBySlot(items))).toHaveLength(2);
  });
  it("returns [] when a required slot is empty", () => {
    expect(coreCombos(groupBySlot([mk("t1","top"), mk("b1","bottom")]))).toEqual([]);
  });
  it("flattens outfit items in slot order", () => {
    const o = { top: mk("t","top"), bottom: mk("b","bottom"), footwear: mk("f","footwear") };
    expect(outfitItems(o).map((i) => i.id)).toEqual(["t","b","f"]);
  });
});
