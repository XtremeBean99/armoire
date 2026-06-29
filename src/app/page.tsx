"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { runGeneration } from "@/lib/wardrobe-store/generate";
import { getWeatherContext } from "@/lib/weather/weather";
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

export default function GeneratorPage() {
  const items = useWardrobe((s) => s.items);
  const [outfits, setOutfits] = useState<RankedOutfit[]>([]);
  const [season, setSeason] = useState<Season | "any">("any");
  const [weather, setWeather] = useState<WeatherContext | undefined>();
  const [seed, setSeed] = useState(1);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    void wardrobeStore.getState().load();
  }, []);

  async function generate() {
    setOutfits(await runGeneration(wardrobeStore, { season, weather, seed, count: 6 }));
    setSeed((s) => s + 1);
    setGenerated(true);
  }

  async function enableWeather() {
    const ctx = await getWeatherContext();
    if (ctx) setWeather(ctx);
  }

  async function wear(o: RankedOutfit) {
    await wardrobeStore.getState().markWorn(o.items.map((i) => i.id));
    setOutfits((prev) => prev.filter((p) => p !== o));
  }

  return (
    <div className="py-16 sm:py-20">
      <Reveal>
        <p className="label-text mb-5">Outfit generator</p>
        <h1 className="mb-5 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Build a look from what you own.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Colour-theory pairings from your wardrobe - no AI, fully offline. Worn outfits drop
          out of rotation for two generations.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button onClick={generate}>Generate outfits</Button>
          <Button variant="secondary" onClick={enableWeather}>
            {weather
              ? `Weather · ${Math.round(weather.minTempC)}–${Math.round(weather.maxTempC)}°C${weather.rainExpected ? " · rain" : ""}`
              : "Use today's weather"}
          </Button>
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

      <div className="mt-12">
        {outfits.length === 0 ? (
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
