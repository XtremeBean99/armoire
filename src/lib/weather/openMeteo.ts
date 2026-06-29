import type { WeatherContext } from "@/lib/types";

const RAIN_PROB_THRESHOLD = 50;
const COLD_MORNING_C = 12;
const WARM_AFTERNOON_C = 18;

export interface OpenMeteoHourly {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
}

export function toWeatherContext(hourly: OpenMeteoHourly): WeatherContext {
  const temps = hourly.temperature_2m;
  const minTempC = Math.min(...temps);
  const maxTempC = Math.max(...temps);
  const rainExpected = hourly.precipitation_probability.some((p) => p >= RAIN_PROB_THRESHOLD);

  const morning = temps.filter((_, i) => hourFromIso(hourly.time[i]) < 11);
  const afternoon = temps.filter((_, i) => hourFromIso(hourly.time[i]) >= 14);
  const coldMorning = morning.length > 0 && Math.min(...morning) <= COLD_MORNING_C;
  const warmAfternoon = afternoon.length > 0 && Math.max(...afternoon) >= WARM_AFTERNOON_C;
  const isTransitionalDay = coldMorning && warmAfternoon;

  return { minTempC, maxTempC, isTransitionalDay, rainExpected };
}

function hourFromIso(iso: string): number {
  return Number(iso.slice(11, 13));
}

export async function fetchForecast(lat: number, lon: number): Promise<OpenMeteoHourly> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m,precipitation_probability&forecast_days=1&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
  const json = await res.json();
  return json.hourly as OpenMeteoHourly;
}
