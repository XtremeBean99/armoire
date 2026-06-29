import type { Outfit, WeatherContext } from "@/lib/types";

export const WEATHER = { COLD_MAX_C: 12, WARM_MIN_C: 18 };

export function prefersOuterwear(weather?: WeatherContext): boolean {
  if (!weather) return false;
  return weather.minTempC <= WEATHER.COLD_MAX_C;
}

export function isLayerable(outfit: Outfit, weather?: WeatherContext): boolean {
  return Boolean(weather?.isTransitionalDay && outfit.outerwear);
}

export function weatherNote(weather?: WeatherContext, hasUmbrella = false): string | undefined {
  if (!weather) return undefined;
  if (weather.rainExpected) {
    return hasUmbrella ? "Rain likely - your umbrella is included." : "Rain likely - bring an umbrella.";
  }
  return undefined;
}

export function weatherScoreBonus(outfit: Outfit, weather?: WeatherContext): number {
  if (!weather) return 0;
  let bonus = 0;
  if (prefersOuterwear(weather)) bonus += outfit.outerwear ? 0.15 : -0.15;
  if (weather.maxTempC >= WEATHER.WARM_MIN_C && !weather.isTransitionalDay) {
    bonus += outfit.outerwear ? -0.1 : 0.05; // warm steady day: discourage heavy layering
  }
  if (isLayerable(outfit, weather)) bonus += 0.1;
  return bonus;
}
