import { describe, it, expect, beforeEach } from "vitest";
import { IndexedDbRepository } from "./indexeddb-repository";
import { ArmoireDB } from "./db";
import type { WardrobeItem } from "@/lib/types";

function item(id: string): WardrobeItem {
  return {
    id, garmentType: "t-shirt", slot: "top", graphicId: "t-shirt",
    color: { hex: "#1f2a44", rgb: [31, 42, 68], lab: [20, 2, -20], colorName: "Navy", hueFamily: "neutral", isNeutral: true },
    formality: "casual", seasons: ["all-season"], timesWorn: 0, cooldown: 0, createdAt: Date.now(),
  };
}

describe("IndexedDbRepository", () => {
  let repo: IndexedDbRepository;
  beforeEach(async () => {
    const db = new ArmoireDB("test-" + Math.random());
    repo = new IndexedDbRepository(db);
  });

  it("adds and reads items", async () => {
    await repo.addItem(item("a"));
    expect((await repo.getItems()).map((i) => i.id)).toEqual(["a"]);
  });
  it("updates an item", async () => {
    await repo.addItem(item("a"));
    await repo.updateItem("a", { timesWorn: 3, cooldown: 2 });
    const got = (await repo.getItems())[0];
    expect(got.timesWorn).toBe(3);
    expect(got.cooldown).toBe(2);
  });
  it("deletes an item", async () => {
    await repo.addItem(item("a"));
    await repo.deleteItem("a");
    expect(await repo.getItems()).toEqual([]);
  });
  it("stores and retrieves blobs", async () => {
    const blob = new Blob(["hello"], { type: "text/plain" });
    await repo.saveBlob("b1", blob);
    const retrieved = await repo.getBlob("b1");
    expect(retrieved).toBeDefined();
  });
  it("records and reads worn history", async () => {
    await repo.addWorn({ id: "w1", outfitItemIds: ["a", "b"], wornAt: 123 });
    expect(await repo.getWorn()).toHaveLength(1);
  });
});
