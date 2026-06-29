import { describe, it, expect, beforeEach } from "vitest";
import { createWardrobeStore } from "./store";
import { IndexedDbRepository } from "./indexeddb-repository";
import { ArmoireDB } from "./db";
import { analyzeColor } from "@/lib/color";

function makeStore() {
  const repo = new IndexedDbRepository(new ArmoireDB("t-" + Math.random()));
  return createWardrobeStore(repo);
}

const baseInput = () => ({
  garmentType: "t-shirt",
  color: analyzeColor([31, 42, 68]),
  formality: "casual" as const,
  seasons: ["all-season"] as const,
});

describe("wardrobe store", () => {
  let store: ReturnType<typeof makeStore>;
  beforeEach(() => { store = makeStore(); });

  it("adds an item, resolving slot and graphicId from garmentType", async () => {
    await store.getState().addItem(baseInput());
    const items = store.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].slot).toBe("top");
    expect(items[0].graphicId).toBe("t-shirt");
    expect(items[0].timesWorn).toBe(0);
    expect(items[0].cooldown).toBe(0);
  });

  it("markWorn sets cooldown=2 and increments timesWorn and writes worn history", async () => {
    await store.getState().addItem(baseInput());
    const id = store.getState().items[0].id;
    await store.getState().markWorn([id]);
    const it = store.getState().items[0];
    expect(it.cooldown).toBe(2);
    expect(it.timesWorn).toBe(1);
  });

  it("decrementCooldowns reduces positive cooldowns by 1 and floors at 0", async () => {
    await store.getState().addItem(baseInput());
    const id = store.getState().items[0].id;
    await store.getState().markWorn([id]);            // cooldown 2
    await store.getState().decrementCooldowns();      // -> 1
    expect(store.getState().items[0].cooldown).toBe(1);
    await store.getState().decrementCooldowns();      // -> 0
    await store.getState().decrementCooldowns();      // stays 0
    expect(store.getState().items[0].cooldown).toBe(0);
  });
});
