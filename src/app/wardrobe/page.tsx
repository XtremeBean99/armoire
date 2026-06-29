"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";

export default function WardrobePage() {
  const items = useWardrobe((s) => s.items);
  useEffect(() => {
    void wardrobeStore.getState().load();
  }, []);

  return (
    <div className="py-16 sm:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-text mb-5">Your wardrobe</p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </h1>
          </div>
          <Link
            href="/add"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-muted-foreground"
          >
            Add an item
          </Link>
        </div>
      </Reveal>

      <div className="mt-12">
        {items.length === 0 ? (
          <EmptyState
            title="Your wardrobe is empty"
            hint="Add a few pieces - a top, a bottom and footwear is enough to start generating outfits."
            action={
              <Link
                href="/add"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface-hover"
              >
                Add an item
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={0.03 * i}>
                <ItemCard
                  item={item}
                  onRemove={() => void wardrobeStore.getState().removeItem(item.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
