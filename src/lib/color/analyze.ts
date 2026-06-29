import Color from "colorjs.io";
import type { ItemColor } from "@/lib/types";

export const NEUTRAL_CHROMA_MAX = 15;

function toColor(rgb: [number, number, number]): Color {
  return new Color("srgb", [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]);
}

export function hueAngle(lab: [number, number, number]): number {
  const [, a, b] = lab;
  const deg = (Math.atan2(b, a) * 180) / Math.PI;
  return (deg + 360) % 360;
}

export function isNeutral(lab: [number, number, number]): boolean {
  const [L, a, b] = lab;
  const chroma = Math.sqrt(a * a + b * b);
  if (chroma < NEUTRAL_CHROMA_MAX) return true;       // greys, beige, near-greys
  if (L < 20) return true;                            // near-black
  if (L > 92) return true;                            // near-white
  const h = hueAngle(lab);
  if (L < 45 && chroma < 35 && h >= 230 && h <= 290) return true; // navy / dark denim
  return false;
}

function hueFamily(lab: [number, number, number]): string {
  if (isNeutral(lab)) return "neutral";
  const h = hueAngle(lab);
  if (h < 20 || h >= 345) return "red";
  if (h < 50) return "orange";
  if (h < 70) return "yellow";
  if (h < 160) return "green";
  if (h < 200) return "teal";
  if (h < 255) return "blue";
  if (h < 290) return "purple";
  if (h < 345) return "pink";
  return "red";
}

export function analyzeColor(rgb: [number, number, number]): ItemColor {
  const color = toColor(rgb);
  const lab = color.to("lab").coords as [number, number, number];
  const hex = color.to("srgb").toString({ format: "hex" });
  return {
    hex: hex.length === 4 ? expandHex(hex) : hex,
    rgb,
    lab,
    colorName: "",
    hueFamily: hueFamily(lab),
    isNeutral: isNeutral(lab),
  };
}

function expandHex(short: string): string {
  return "#" + short.slice(1).split("").map((c) => c + c).join("");
}
