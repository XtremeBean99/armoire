import type { WardrobeItem, WornRecord } from "@/lib/types";

export interface WardrobeRepository {
  addItem(item: WardrobeItem): Promise<void>;
  getItems(): Promise<WardrobeItem[]>;
  updateItem(id: string, patch: Partial<WardrobeItem>): Promise<void>;
  deleteItem(id: string): Promise<void>;

  addWorn(record: WornRecord): Promise<void>;
  getWorn(): Promise<WornRecord[]>;

  saveBlob(id: string, blob: Blob): Promise<void>;
  getBlob(id: string): Promise<Blob | undefined>;
  deleteBlob(id: string): Promise<void>;
}
