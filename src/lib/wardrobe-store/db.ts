import Dexie, { type Table } from "dexie";
import type { WardrobeItem, WornRecord } from "@/lib/types";

export interface BlobRow { id: string; blob: Blob; }

export class ArmoireDB extends Dexie {
  items!: Table<WardrobeItem, string>;
  worn!: Table<WornRecord, string>;
  blobs!: Table<BlobRow, string>;

  constructor(name = "armoire") {
    super(name);
    this.version(1).stores({
      items: "id, slot, formality, createdAt",
      worn: "id, wornAt",
      blobs: "id",
    });
  }
}
