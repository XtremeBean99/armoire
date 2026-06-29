"use client";
import { useEffect } from "react";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

export default function WardrobePage() {
  const items = useWardrobe((s) => s.items);
  useEffect(() => { void wardrobeStore.getState().load(); }, []);
  if (items.length === 0)
    return <main className="p-6"><EmptyState title="Your wardrobe is empty" hint="Add a few items to start." action={<Link className="underline" href="/add">Add an item</Link>} /></main>;
  return (
    <main className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3">
      {items.map((i) => <ItemCard key={i.id} item={i} />)}
    </main>
  );
}
