"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="mx-4 w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-msg"
      >
        <h2 id="confirm-title" className="font-serif text-lg font-semibold text-foreground">
          {title}
        </h2>
        <p id="confirm-msg" className="mt-2 text-sm text-muted-foreground">
          {message}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function WardrobePage() {
  const items = useWardrobe((s) => s.items);
  const storeError = useWardrobe((s) => s.lastError);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    void wardrobeStore.getState().load();
  }, []);

  function handleRemove(id: string) {
    setConfirmId(id);
  }

  function confirmRemove() {
    if (confirmId) {
      void wardrobeStore.getState().removeItem(confirmId);
      setConfirmId(null);
    }
  }

  const itemToRemove = confirmId ? items.find((i) => i.id === confirmId) : null;

  return (
    <div className="py-16 sm:py-20">
      {/* Confirmation modal */}
      {confirmId && itemToRemove && (
        <ConfirmModal
          title="Remove item"
          message={`Are you sure you want to remove the ${itemToRemove.color.colorName} ${itemToRemove.garmentType}? This cannot be undone.`}
          onConfirm={confirmRemove}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Store error banner */}
      {storeError && (
        <div className="mb-8 rounded-md border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          <div className="flex items-center justify-between gap-3">
            <span>{storeError}</span>
            <button
              onClick={() => wardrobeStore.getState().clearError()}
              className="shrink-0 text-xs text-error/70 hover:text-error"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

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
            hint="Add a few pieces — a top, a bottom and footwear is enough to start generating outfits."
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
                  onRemove={() => handleRemove(item.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
