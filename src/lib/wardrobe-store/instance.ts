"use client";
import { useStore } from "zustand";
import { createWardrobeStore } from "./store";
import { IndexedDbRepository } from "./indexeddb-repository";

export const wardrobeStore = createWardrobeStore(new IndexedDbRepository());
export function useWardrobe<T>(selector: (s: ReturnType<typeof wardrobeStore.getState>) => T): T {
  return useStore(wardrobeStore, selector);
}
