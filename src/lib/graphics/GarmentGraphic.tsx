import React from "react";
import { GARMENTS } from "./registry";

type PathSet = Record<string, React.ReactNode>;

// Single-fill silhouettes. Each is one <path> with no hard-coded fill.
const PATHS: PathSet = {
  "t-shirt": <path d="M30 20 L45 10 H75 L90 20 L80 35 L72 30 V90 H48 V30 L40 35 Z" />,
  "polo": <path d="M30 20 L45 10 H75 L90 20 L80 35 L72 30 V90 H48 V30 L40 35 Z M52 28 L55 25 H65 L68 28" />,
  "oxford-shirt": <path d="M28 18 L44 8 H76 L92 18 L84 38 L72 30 V90 H48 V30 L36 38 Z M52 26 L55 22 H65 L68 26" />,
  "jumper": <path d="M28 18 L44 10 H76 L92 18 L86 40 V90 H34 V40 Z" />,
  "hoodie": <path d="M28 18 L44 10 H76 L92 18 L86 40 V90 H34 V40 Z M52 18 Q60 2 68 18" />,
  "jeans": <path d="M42 15 H78 L82 95 H64 L60 45 L56 95 H38 Z" />,
  "chinos": <path d="M40 15 H80 L84 95 H60 L58 52 L56 95 H36 Z" />,
  "shorts": <path d="M42 15 H78 L82 60 H64 L60 55 L56 60 H38 Z" />,
  "joggers": <path d="M42 15 H78 L82 95 H64 L60 50 L56 95 H38 Z" />,
  "sneakers": <path d="M20 60 H70 Q85 60 88 72 L88 80 H20 Z" />,
  "dress-shoes": <path d="M20 62 H74 Q86 62 88 72 L88 80 H20 Z M60 62 L58 58 Q56 52 52 50" />,
  "boots": <path d="M22 45 H72 Q82 45 84 56 L84 82 H22 Z M72 56 L74 52 Q76 45 78 42" />,
  "sandals": <path d="M22 68 H68 Q78 68 80 76 L80 82 H22 Z M46 68 L46 62 M56 68 L56 62" />,
  "jacket": <path d="M28 18 L46 10 H74 L92 18 L84 40 V92 H60 V44 H60 V92 H36 V40 Z" />,
  "blazer": <path d="M28 18 L44 10 H76 L92 18 L86 38 V92 H60 V42 H60 V92 H34 V38 Z M52 26 L55 22 H65 L68 26" />,
  "coat": <path d="M26 16 L44 8 H76 L94 16 L88 40 V94 H32 V40 Z" />,
  "overshirt": <path d="M28 18 L44 10 H76 L92 18 L84 38 L74 32 V90 H46 V32 L36 38 Z" />,
  "cap": <path d="M36 30 H84 Q86 30 86 38 Q86 44 60 46 Q34 44 34 38 Q34 30 36 30 Z M52 28 L50 18 Q48 12 44 10 H76 Q72 12 70 18 L68 28" />,
  "beanie": <path d="M38 18 H82 Q86 18 84 26 Q82 46 60 50 Q38 46 36 26 Q34 18 38 18 Z M44 18 Q46 14 60 14 Q74 14 76 18" />,
  "scarf": <path d="M28 42 H92 L88 58 H78 L74 70 H70 L66 58 H54 L50 70 H46 L42 58 H32 Z" />,
  "belt": <path d="M24 68 H96 L94 76 H26 Z M54 72 L52 78 H48 L50 72" />,
  "tie": <path d="M46 12 L54 12 L52 38 L58 50 L50 66 L54 72 L46 72 L50 66 L42 50 L48 38 Z" />,
  "watch": <path d="M34 44 H44 L42 56 H36 Z M56 44 H66 L64 56 H58 Z M44 42 H56 Q58 42 58 46 V54 Q58 58 56 58 H44 Q42 58 42 54 V46 Q42 42 44 42 Z M50 48 L50 54" />,
  "umbrella": <path d="M50 18 Q20 22 14 50 H86 Q80 22 50 18 Z M50 50 V86 Q50 92 58 90" />,
};

const SLOT_FALLBACK: Record<string, React.ReactNode> = {
  top: <rect x="32" y="20" width="48" height="60" rx="6" />,
  bottom: <rect x="38" y="20" width="38" height="70" rx="4" />,
  footwear: <rect x="20" y="60" width="68" height="22" rx="8" />,
  outerwear: <rect x="28" y="16" width="56" height="74" rx="6" />,
  accessory: <circle cx="50" cy="50" r="26" />,
};

export function GarmentGraphic({
  graphicId,
  color,
  size = 96,
}: {
  graphicId: string;
  color: string;
  size?: number;
}) {
  const known = PATHS[graphicId];
  const slot = Object.values(GARMENTS).find((g) => g.graphicId === graphicId)?.slot ?? "top";
  const shape = known ?? SLOT_FALLBACK[slot];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={graphicId}>
      <g fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth={1}>
        {shape}
      </g>
    </svg>
  );
}
