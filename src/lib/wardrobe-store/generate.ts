import type { StoreApi } from "zustand";
import { generateOutfits } from "@/lib/outfit-engine";
import type { GenerateOptions, RankedOutfit } from "@/lib/types";
import type { WardrobeState } from "./store";

/**
 * Runs one outfit generation against the store.
 *
 * Order matters: we generate from the CURRENT cooldown state first, then
 * decrement cooldowns for the next run. This benches a worn item for exactly
 * the next two generations (cooldown 2 -> excluded, 1 -> excluded, 0 -> back),
 * per the spec. Decrementing before generating would only bench it for one.
 */
export async function runGeneration(
  store: StoreApi<WardrobeState>,
  options: GenerateOptions,
): Promise<RankedOutfit[]> {
  const outfits = generateOutfits(store.getState().items, options);
  await store.getState().decrementCooldowns();
  return outfits;
}
