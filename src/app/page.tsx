"use client";
import { useEffect, useState } from "react";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { runGeneration } from "@/lib/wardrobe-store/generate";
import { getWeatherContext } from "@/lib/weather/weather";
import { OutfitCard } from "@/components/OutfitCard";
import { EmptyState } from "@/components/EmptyState";
import type { RankedOutfit, Season, WeatherContext } from "@/lib/types";

export default function GeneratorPage() {
  const items = useWardrobe((s) => s.items);
  const [outfits, setOutfits] = useState<RankedOutfit[]>([]);
  const [season, setSeason] = useState<Season | "any">("any");
  const [weather, setWeather] = useState<WeatherContext | undefined>();
  const [seed, setSeed] = useState(1);

  useEffect(() => { void wardrobeStore.getState().load(); }, []);

  async function generate() {
    // Generate from current cooldowns, THEN decrement (inside runGeneration),
    // so worn items stay benched for exactly the next two generations.
    setOutfits(await runGeneration(wardrobeStore, { season, weather, seed, count: 5 }));
    setSeed((s) => s + 1);
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
    <main className="space-y-4 p-6">
      <div className="flex items-center gap-3">
        <button onClick={generate} className="rounded bg-black px-4 py-2 text-white">Generate outfits</button>
        <button onClick={enableWeather} className="rounded border px-3 py-2 text-sm">
          {weather ? `Weather: ${Math.round(weather.minTempC)}–${Math.round(weather.maxTempC)}°C` : "Use today's weather"}
        </button>
      </div>
      {outfits.length === 0
        ? <EmptyState title="No outfits yet" hint={items.length < 3 ? "Add a top, bottom and footwear to begin." : "Tap Generate. If everything is benched, mark fewer outfits as worn or reset rotation."} />
        : outfits.map((o, idx) => <OutfitCard key={idx} outfit={o} onWear={() => wear(o)} />)}
    </main>
  );
}
