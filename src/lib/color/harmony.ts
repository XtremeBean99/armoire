import type { ItemColor } from "@/lib/types";
import { hueAngle } from "./analyze";

function circularDiff(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

// Score a single pair of chromatic hues by colour-theory relationship.
function pairScore(h1: number, h2: number): number {
  const d = circularDiff(h1, h2);
  if (d <= 35) return 1;            // analogous
  if (d >= 150) return 1;           // complementary
  if (d >= 105 && d < 150) return 0.8; // triadic-ish
  return 0.25;                      // clash zone (35..105)
}

export function colorHarmonyScore(colors: ItemColor[]): number {
  const chromatic = colors.filter((c) => !c.isNeutral);
  if (chromatic.length === 0) return 0.9; // all neutral: always safe
  if (chromatic.length === 1) return 0.95; // one accent on neutrals: ideal

  const hues = chromatic.map((c) => hueAngle(c.lab));
  let total = 0;
  let pairs = 0;
  for (let i = 0; i < hues.length; i++) {
    for (let j = i + 1; j < hues.length; j++) {
      total += pairScore(hues[i], hues[j]);
      pairs++;
    }
  }
  const base = total / pairs;

  // Penalise too many competing bold colours.
  const excess = Math.max(0, chromatic.length - 2);
  const penalty = 1 - 0.2 * excess;
  return Math.max(0, Math.min(1, base * penalty));
}
