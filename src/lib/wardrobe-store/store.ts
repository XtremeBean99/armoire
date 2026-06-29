import { createStore } from "zustand/vanilla";
import type { WardrobeRepository } from "./repository";
import type { Formality, ItemColor, Pattern, Season, WardrobeItem } from "@/lib/types";
import { resolveGarment } from "@/lib/graphics/registry";

export interface AddItemInput {
  garmentType: string;
  color: ItemColor;
  formality: Formality;
  seasons: readonly Season[];
  pricePaid?: number;
  imageBlobId?: string;
  thumbnailBlobId?: string;
  pattern?: Pattern;
}

export interface WardrobeState {
  items: WardrobeItem[];
  load(): Promise<void>;
  addItem(input: AddItemInput): Promise<void>;
  removeItem(id: string): Promise<void>;
  markWorn(itemIds: string[]): Promise<void>;
  decrementCooldowns(): Promise<void>;
}

function uid(): string {
  return (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);
}

export function createWardrobeStore(repo: WardrobeRepository) {
  return createStore<WardrobeState>((set, get) => ({
    items: [],

    async load() {
      set({ items: await repo.getItems() });
    },

    async addItem(input) {
      const { slot, graphicId } = resolveGarment(input.garmentType);
      const item: WardrobeItem = {
        id: uid(),
        garmentType: input.garmentType,
        slot, graphicId,
        color: input.color,
        pattern: input.pattern,
        formality: input.formality,
        seasons: [...input.seasons],
        pricePaid: input.pricePaid,
        imageBlobId: input.imageBlobId,
        thumbnailBlobId: input.thumbnailBlobId,
        timesWorn: 0,
        cooldown: 0,
        createdAt: Date.now(),
      };
      await repo.addItem(item);
      set({ items: [...get().items, item] });
    },

    async removeItem(id) {
      await repo.deleteItem(id);
      set({ items: get().items.filter((i) => i.id !== id) });
    },

    async markWorn(itemIds) {
      const set2 = new Set(itemIds);
      const updated = get().items.map((i) =>
        set2.has(i.id) ? { ...i, cooldown: 2, timesWorn: i.timesWorn + 1 } : i
      );
      await Promise.all(
        updated.filter((i) => set2.has(i.id)).map((i) =>
          repo.updateItem(i.id, { cooldown: i.cooldown, timesWorn: i.timesWorn })
        )
      );
      await repo.addWorn({ id: uid(), outfitItemIds: itemIds, wornAt: Date.now() });
      set({ items: updated });
    },

    async decrementCooldowns() {
      const updated = get().items.map((i) =>
        i.cooldown > 0 ? { ...i, cooldown: i.cooldown - 1 } : i
      );
      await Promise.all(
        updated.filter((i, idx) => i.cooldown !== get().items[idx].cooldown).map((i) =>
          repo.updateItem(i.id, { cooldown: i.cooldown })
        )
      );
      set({ items: updated });
    },
  }));
}
