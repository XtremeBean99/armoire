import { describe, it, expect } from "vitest";
import { createWardrobeStore } from "./store";
import { IndexedDbRepository } from "./indexeddb-repository";
import { ArmoireDB } from "./db";
import { runGeneration } from "./generate";
import { analyzeColor } from "@/lib/color";

function makeStore() {
  return createWardrobeStore(new IndexedDbRepository(new ArmoireDB("gen-" + Math.random())));
}

async function addFullOutfit(store: ReturnType<typeof makeStore>) {
  await store.getState().addItem({
    garmentType: "t-shirt", color: analyzeColor([250, 250, 250]),
    formality: "casual", seasons: ["all-season"],
  });
  await store.getState().addItem({
    garmentType: "jeans", color: analyzeColor([90, 90, 90]),
    formality: "casual", seasons: ["all-season"],
  });
  await store.getState().addItem({
    garmentType: "sneakers", color: analyzeColor([16, 16, 16]),
    formality: "casual", seasons: ["all-season"],
  });
}

describe("runGeneration cooldown rotation", () => {
  it("benches a worn outfit for exactly the next two generations", async () => {
    const store = makeStore();
    await addFullOutfit(store);

    // Wear the only full outfit (one item per slot).
    await store.getState().markWorn(store.getState().items.map((i) => i.id));

    const gen1 = await runGeneration(store, { seed: 1 });
    const gen2 = await runGeneration(store, { seed: 1 });
    const gen3 = await runGeneration(store, { seed: 1 });

    expect(gen1).toHaveLength(0); // generation 1: benched
    expect(gen2).toHaveLength(0); // generation 2: still benched
    expect(gen3.length).toBeGreaterThan(0); // generation 3: back in rotation
  });
});
