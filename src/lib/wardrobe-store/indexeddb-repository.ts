import type { WardrobeRepository } from "./repository";
import type { WardrobeItem, WornRecord } from "@/lib/types";
import { ArmoireDB } from "./db";

export class IndexedDbRepository implements WardrobeRepository {
  constructor(private db: ArmoireDB = new ArmoireDB()) {}

  addItem(item: WardrobeItem) { return this.db.items.add(item).then(() => undefined); }
  getItems() { return this.db.items.orderBy("createdAt").toArray(); }
  updateItem(id: string, patch: Partial<WardrobeItem>) {
    return this.db.items.update(id, patch).then(() => undefined);
  }
  deleteItem(id: string) { return this.db.items.delete(id); }

  addWorn(record: WornRecord) { return this.db.worn.add(record).then(() => undefined); }
  getWorn() { return this.db.worn.orderBy("wornAt").toArray(); }

  saveBlob(id: string, blob: Blob) { return this.db.blobs.put({ id, blob }).then(() => undefined); }
  async getBlob(id: string) { return (await this.db.blobs.get(id))?.blob; }
  deleteBlob(id: string) { return this.db.blobs.delete(id); }
}
