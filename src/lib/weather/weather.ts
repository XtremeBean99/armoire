import type { WeatherContext } from "@/lib/types";
import { fetchForecast, toWeatherContext } from "./openMeteo";

const CACHE_KEY = "armoire.weather";
const PERMISSION_DENIED_KEY = "armoire.weather.denied";

function getCoords(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject(new Error("no geolocation"));
    // Check if permission was previously denied — don't bother retrying
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((status) => {
        if (status.state === "denied") return reject(new Error("permission denied"));
      });
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          try { localStorage.setItem(PERMISSION_DENIED_KEY, "1"); } catch { /* ignore */ }
        }
        reject(err);
      },
      { timeout: 5000, maximumAge: 30 * 60 * 1000 },
    );
  });
}

export function wasWeatherDenied(): boolean {
  try { return localStorage.getItem(PERMISSION_DENIED_KEY) === "1"; } catch { return false; }
}

export async function getWeatherContext(): Promise<WeatherContext | null> {
  try {
    const cached = readCache();
    if (cached) return cached;
    if (wasWeatherDenied()) return null; // don't retry after explicit denial
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
