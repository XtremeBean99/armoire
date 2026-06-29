import { createStore } from "zustand/vanilla";
import type { WardrobeRepository } from "./repository";
import type { Formality, ItemColor, Pattern, Season, WardrobeItem } from "@/lib/types";
import { resolveGarment } from "@/lib/graphics/registry";

export interface AddItemInput {
  garmentType: string;
  color: ItemColor;
  secondaryColor?: ItemColor;
  trimColor?: ItemColor;
  formality: Formality;
  seasons: readonly Season[];
  pricePaid?: number;
  imageBlobId?: string;
  thumbnailBlobId?: string;
  pattern?: Pattern;
}

export interface WardrobeState {
  items: WardrobeItem[];
  lastError: string | null;
  load(): Promise<void>;
  addItem(input: AddItemInput): Promise<void>;
  removeItem(id: string): Promise<void>;
  markWorn(itemIds: string[]): Promise<void>;
  unmarkWorn(itemIds: string[]): Promise<void>;
  decrementCooldowns(): Promise<void>;
  clearError(): void;
}

function uid(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  // Fallback: crypto.getRandomValues is available in all secure contexts
  const buf = new Uint32Array(2);
  globalThis.crypto?.getRandomValues?.(buf);
  return `${Date.now()}-${buf[0].toString(36)}-${buf[1].toString(36)}`;
}

export function createWardrobeStore(repo: WardrobeRepository) {
  return createStore<WardrobeState>((set, get) => ({
    items: [],
    lastError: null,

    async load() {
      try {
        set({ items: await repo.getItems(), lastError: null });
      } catch (e) {
        set({ lastError: `Failed to load wardrobe: ${e instanceof Error ? e.message : e}` });
      }
    },

    async addItem(input) {
      try {
        const { slot, graphicId } = resolveGarment(input.garmentType);
        const item: WardrobeItem = {
          id: uid(),
          garmentType: input.garmentType,
          slot, graphicId,
          color: input.color,
          secondaryColor: input.secondaryColor,
          trimColor: input.trimColor,
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
        set({ items: [...get().items, item], lastError: null });
      } catch (e) {
        set({ lastError: `Failed to save item: ${e instanceof Error ? e.message : e}` });
      }
    },

    async removeItem(id) {
      try {
        await repo.deleteItem(id);
        set({ items: get().items.filter((i) => i.id !== id), lastError: null });
      } catch (e) {
        set({ lastError: `Failed to remove item: ${e instanceof Error ? e.message : e}` });
      }
    },

    async markWorn(itemIds) {
      try {
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
        set({ items: updated, lastError: null });
      } catch (e) {
        set({ lastError: `Failed to mark worn: ${e instanceof Error ? e.message : e}` });
      }
    },

    async unmarkWorn(itemIds) {
      try {
        const set2 = new Set(itemIds);
        const updated = get().items.map((i) =>
          set2.has(i.id) ? { ...i, cooldown: 0, timesWorn: Math.max(0, i.timesWorn - 1) } : i
        );
        await Promise.all(
          updated.filter((i) => set2.has(i.id)).map((i) =>
            repo.updateItem(i.id, { cooldown: i.cooldown, timesWorn: i.timesWorn })
          )
        );
        set({ items: updated, lastError: null });
      } catch (e) {
        set({ lastError: `Failed to undo: ${e instanceof Error ? e.message : e}` });
      }
    },

    async decrementCooldowns() {
      try {
        const updated = get().items.map((i) =>
          i.cooldown > 0 ? { ...i, cooldown: i.cooldown - 1 } : i
        );
        await Promise.all(
          updated.filter((i, idx) => i.cooldown !== get().items[idx].cooldown).map((i) =>
            repo.updateItem(i.id, { cooldown: i.cooldown })
          )
        );
        set({ items: updated, lastError: null });
      } catch (e) {
        set({ lastError: `Failed to update cooldowns: ${e instanceof Error ? e.message : e}` });
      }
    },

    clearError() {
      set({ lastError: null });
    },
  }));
}
