"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { runGeneration } from "@/lib/wardrobe-store/generate";
import { getWeatherContext, clearWeatherDenied } from "@/lib/weather/weather";
import { OutfitCard } from "@/components/OutfitCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { ChipSelect } from "@/components/ChipSelect";
import { Reveal } from "@/components/Reveal";
import type { RankedOutfit, Season, WeatherContext } from "@/lib/types";

const SEASONS: { value: Season | "any"; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
  { value: "spring", label: "Spring" },
];

const UNDO_TIMEOUT_MS = 5000;

export default function GeneratorPage() {
  const items = useWardrobe((s) => s.items);
  const storeError = useWardrobe((s) => s.lastError);
  const [outfits, setOutfits] = useState<RankedOutfit[]>([]);
  const [season, setSeason] = useState<Season | "any">("any");
  const [weather, setWeather] = useState<WeatherContext | undefined>();
  const [seed, setSeed] = useState(1);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [undoState, setUndoState] = useState<{
    itemIds: string[];
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);
  const [statusMsg, setStatusMsg] = useState("");
  const undoRef = useRef(undoState);
  undoRef.current = undoState;

  useEffect(() => {
    void wardrobeStore.getState().load();
  }, []);

  const generate = useCallback(async () => {
    setGenerating(true);
    setStatusMsg("Generating outfits…");
    try {
      const result = await runGeneration(wardrobeStore, { season, weather, seed, count: 6 });
      setOutfits(result);
      setSeed((s) => s + 1);
      setGenerated(true);
      setStatusMsg(
        result.length > 0
          ? `Generated ${result.length} outfit${result.length > 1 ? "s" : ""}.`
          : "No outfits matched your filters."
      );
    } finally {
      setGenerating(false);
    }
  }, [season, weather, seed]);

  async function enableWeather() {
    if (weather) {
      // Disable weather
      setWeather(undefined);
      setStatusMsg("Weather filter cleared.");
      return;
    }
    // Reset denied flag so user can retry
    clearWeatherDenied();
    const ctx = await getWeatherContext();
    if (ctx) {
      setWeather(ctx);
      setStatusMsg(
        `Weather loaded: ${Math.round(ctx.minTempC)}–${Math.round(ctx.maxTempC)}°C${ctx.rainExpected ? ", rain expected" : ""}.`
      );
    } else {
      setStatusMsg("Could not load weather. Check location permissions.");
    }
  }

  function wear(o: RankedOutfit) {
    const ids = o.items.map((i) => i.id);
    // Clear any existing undo timer
    if (undoRef.current) {
      clearTimeout(undoRef.current.timer);
    }
    void wardrobeStore.getState().markWorn(ids);
    setOutfits((prev) => prev.filter((p) => p !== o));
    const timer = setTimeout(() => {
      setUndoState(null);
    }, UNDO_TIMEOUT_MS);
    setUndoState({ itemIds: ids, timer });
    setStatusMsg("Outfit marked as worn. Undo available.");
  }

  function undoWear() {
    if (!undoRef.current) return;
    const { itemIds, timer } = undoRef.current;
    clearTimeout(timer);
    void wardrobeStore.getState().unmarkWorn(itemIds);
    setUndoState(null);
    setStatusMsg("Undone — outfit restored.");
    // Re-generate to refresh the list
    void generate();
  }

  return (
    <div className="py-16 sm:py-20">
      {/* Screen-reader live region */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {statusMsg}
      </div>

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
        <p className="label-text mb-5">Outfit generator</p>
        <h1 className="mb-5 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Build a look from what you own.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Colour-theory pairings from your wardrobe — no AI, fully offline.
          Worn pieces go on cooldown for the next two times you generate outfits.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button onClick={generate} disabled={generating}>
            {generating ? "Generating…" : "Generate outfits"}
          </Button>
          <Button
            variant="secondary"
            onClick={enableWeather}
          >
            {weather
              ? `Weather · ${Math.round(weather.minTempC)}–${Math.round(weather.maxTempC)}°C${weather.rainExpected ? " · rain" : ""} (click to clear)`
              : "Use today's weather"}
          </Button>
          {undoState && (
            <Button variant="ghost" size="sm" onClick={undoWear}>
              Undo last worn
            </Button>
          )}
        </div>
        <div className="mt-6">
          <p className="label-text mb-3">Season</p>
          <ChipSelect
            options={SEASONS}
            value={season}
            onChange={(v) => setSeason(v as Season | "any")}
          />
        </div>
      </Reveal>

      <div className="mt-12" aria-live="polite" aria-label="Outfit results">
        {generating ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg border border-border bg-surface"
              />
            ))}
          </div>
        ) : outfits.length === 0 ? (
          <EmptyState
            title={generated ? "No outfits to show" : "Ready when you are"}
            hint={
              items.length < 3
                ? "Add at least a top, a bottom and footwear to unlock outfits."
                : generated
                  ? "Everything valid may be benched from recent wear, or the filters are too tight. Loosen the season or wear fewer outfits."
                  : "Tap Generate to build colour-coherent outfits from your wardrobe."
            }
            action={
              items.length < 3 ? (
                <Link
                  href="/add"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface-hover"
                >
                  Add an item
                </Link>
              ) : undefined
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outfits.map((o, idx) => (
              <Reveal key={idx} delay={0.05 * idx}>
                <OutfitCard outfit={o} onWear={() => wear(o)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
