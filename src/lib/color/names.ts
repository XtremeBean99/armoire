import Color from "colorjs.io";

interface NamedColor { name: string; hex: string; }

// Curated, menswear-oriented palette. Extend freely; names are user-facing.
export const PALETTE: NamedColor[] = [
  { name: "Black", hex: "#101010" },
  { name: "Charcoal", hex: "#36393b" },
  { name: "Grey", hex: "#808080" },
  { name: "Light Grey", hex: "#c9c9c9" },
  { name: "White", hex: "#fafafa" },
  { name: "Cream", hex: "#f3ecd9" },
  { name: "Beige", hex: "#e8dcc0" },
  { name: "Tan", hex: "#c9a36b" },
  { name: "Brown", hex: "#6b4a2b" },
  { name: "Navy", hex: "#1f2a44" },
  { name: "Blue", hex: "#2f6fb0" },
  { name: "Light Blue", hex: "#8fb8de" },
  { name: "Teal", hex: "#2a7d7b" },
  { name: "Green", hex: "#3f7d3f" },
  { name: "Olive", hex: "#5a5a2b" },
  { name: "Forest", hex: "#22402a" },
  { name: "Red", hex: "#b23030" },
  { name: "Burgundy", hex: "#5e1f2b" },
  { name: "Rust", hex: "#a85a32" },
  { name: "Orange", hex: "#d2722f" },
  { name: "Mustard", hex: "#c79a2e" },
  { name: "Yellow", hex: "#e3c64b" },
  { name: "Purple", hex: "#5b3b78" },
  { name: "Pink", hex: "#d29aa6" },
];

const PALETTE_LAB = PALETTE.map((c) => ({
  name: c.name,
  color: new Color(c.hex).to("lab"),
}));

export function nearestColorName(rgb: [number, number, number]): string {
  const target = new Color("srgb", [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]).to("lab");
  let best = PALETTE_LAB[0];
  let bestD = Infinity;
  for (const entry of PALETTE_LAB) {
    const d = target.deltaE(entry.color, "2000");
    if (d < bestD) { bestD = d; best = entry; }
  }
  return best.name;
}
