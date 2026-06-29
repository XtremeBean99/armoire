import type { WeatherContext } from "@/lib/types";
import { fetchForecast, toWeatherContext } from "./openMeteo";

const CACHE_KEY = "armoire.weather";

function getCoords(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject(new Error("no geolocation"));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 8000 },
    );
  });
}

export async function getWeatherContext(): Promise<WeatherContext | null> {
  try {
    const cached = readCache();
    if (cached) return cached;
    const { lat, lon } = await getCoords();
    const ctx = toWeatherContext(await fetchForecast(lat, lon));
    writeCache(ctx);
    return ctx;
  } catch {
    return null; // offline / denied / error -> feature simply does not apply
  }
}

function readCache(): WeatherContext | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { date, ctx } = JSON.parse(raw);
    return date === today() ? ctx : null;
  } catch { return null; }
}
function writeCache(ctx: WeatherContext) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ date: today(), ctx })); } catch { /* ignore */ }
}
function today(): string { return new Date().toISOString().slice(0, 10); }
