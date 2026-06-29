import React from "react";
import { GARMENTS } from "./registry";

type PathSet = Record<string, React.ReactNode>;

// Recolorable menswear silhouettes on a 100×100 canvas. Each shape carries no
// hard-coded fill - the wrapping <g> applies the detected garment colour. Kept
// geometric and centred so a wardrobe of mixed photos reads as one lookbook.
const PATHS: PathSet = {
  // ── Tops ──────────────────────────────────────────────────────────────
  "t-shirt": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
  ),
  polo: (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 L56 23 L50 18 L44 23 Z" />
  ),
  "oxford-shirt": (
    <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
  ),
  jumper: (
    <path d="M37 18 Q50 27 63 18 L74 23 L83 35 L76 47 L69 42 V85 H31 V42 L24 47 L17 35 L26 23 Z" />
  ),
  hoodie: (
    <>
      <path d="M36 25 Q50 5 64 25 Q50 17 36 25 Z" />
      <path d="M37 23 Q50 31 63 23 L74 27 L83 39 L76 51 L69 46 V86 H31 V46 L24 51 L17 39 L26 27 Z" />
    </>
  ),

  // ── Bottoms ───────────────────────────────────────────────────────────
  jeans: <path d="M33 16 H67 L66 86 H54 L50 40 L46 86 H34 Z" />,
  chinos: <path d="M34 16 H66 L63 86 H53 L50 42 L47 86 H37 Z" />,
  shorts: <path d="M33 16 H67 L65 56 H54 L50 36 L46 56 H35 Z" />,
  joggers: (
    <path d="M34 16 H66 L62 80 Q58 87 54 80 L50 44 L46 80 Q42 87 38 80 Z" />
  ),

  // ── Footwear ──────────────────────────────────────────────────────────
  sneakers: (
    <path d="M18 60 L21 50 Q29 44 41 47 L62 51 Q75 53 81 61 L82 67 Q82 71 77 71 H21 Q16 71 18 65 Z" />
  ),
  "dress-shoes": (
    <path d="M20 63 Q27 52 43 53 L66 55 Q80 57 82 65 Q82 69 77 69 H22 Q17 69 20 63 Z" />
  ),
  boots: (
    <path d="M30 28 H47 L48 60 L74 62 Q83 64 83 71 L81 75 H30 Z" />
  ),
  sandals: (
    <>
      <path d="M22 64 Q50 60 78 64 Q81 71 74 71 H26 Q19 71 22 64 Z" />
      <path d="M32 64 L45 51 L49 54 L37 66 Z" />
      <path d="M68 64 L55 51 L51 54 L63 66 Z" />
    </>
  ),

  // ── Outerwear (open front) ────────────────────────────────────────────
  jacket: (
    <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  blazer: (
    <path d="M36 16 L26 22 L19 36 L27 47 L33 41 V84 H47 V41 L50 30 L53 41 V84 H67 V41 L73 47 L81 36 L74 22 L64 16 L50 37 Z" />
  ),
  coat: (
    <path d="M34 14 L27 18 L17 31 L24 44 L31 39 V90 H48 V30 H52 V90 H69 V39 L76 44 L83 31 L73 18 L66 14 L58 21 L50 27 L42 21 Z" />
  ),
  overshirt: (
    <path d="M35 16 L27 20 L20 31 V64 H29 L30 39 V84 H48 V32 H52 V84 H70 V39 L71 64 H80 V31 L73 20 L65 16 L57 23 L50 29 L43 23 Z" />
  ),

  // ── Accessories ───────────────────────────────────────────────────────
  cap: (
    <>
      <path d="M28 51 Q28 28 50 28 Q72 28 72 51 Z" />
      <path d="M50 51 L86 57 Q89 59 84 61 L50 59 Z" />
    </>
  ),
  beanie: (
    <>
      <path d="M30 55 Q30 26 50 26 Q70 26 70 55 Z" />
      <path d="M27 55 H73 V63 Q50 67 27 63 Z" />
    </>
  ),
  scarf: (
    <>
      <path d="M35 24 Q50 35 65 24 L65 31 Q50 41 35 31 Z" />
      <path d="M39 31 L45 80 L39 82 L34 33 Z" />
      <path d="M61 31 L66 33 L61 82 L55 80 Z" />
    </>
  ),
  belt: (
    <>
      <path d="M16 46 H84 V56 H16 Z" />
      <path d="M45 43 H59 V59 H45 Z" />
    </>
  ),
  tie: (
    <>
      <path d="M44 17 H56 L58 26 H42 Z" />
      <path d="M43 27 H57 L54 64 L50 75 L46 64 Z" />
    </>
  ),
  watch: (
    <>
      <path d="M43 35 H57 L56 23 H44 Z" />
      <path d="M43 65 H57 L56 77 H44 Z" />
      <circle cx="50" cy="50" r="15" />
    </>
  ),
  umbrella: (
    <>
      <path d="M50 17 Q23 21 16 49 Q33 41 50 49 Q67 41 84 49 Q77 21 50 17 Z" />
      <path d="M48 49 H52 V78 Q52 85 44 82 V79 Q49 80 49 76 Z" />
    </>
  ),

  "tank-top": (
    <path d="M40 16 L32 20 L22 34 L28 42 L35 37 V84 H65 V37 L72 42 L78 34 L68 20 L60 16 Q50 24 40 16 Z" />
  ),
  "muscle-tee": (
    <path d="M42 16 L34 22 L26 36 L32 44 L38 39 V84 H62 V39 L68 44 L74 36 L66 22 L58 16 Q50 23 42 16 Z" />
  ),
  henley: (
    <>
      <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
      <path d="M46 16 L46 30 M54 16 L54 30 M46 22 H54" strokeWidth={2} fill="none" />
    </>
  ),
  "dress-shirt": (
    <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
  ),
  turtleneck: (
    <>
      <path d="M37 28 Q50 37 63 28 L74 33 L83 45 L76 57 L69 52 V85 H31 V52 L24 57 L17 45 L26 33 Z" />
      <path d="M39 22 Q50 28 61 22 L63 28 Q50 34 37 28 Z" />
      <path d="M40 16 Q50 22 60 16 L61 22 Q50 27 39 22 Z" />
    </>
  ),
  "linen-shirt": (
    <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
  ),
  crewneck: (
    <path d="M36 20 Q50 28 64 20 L75 25 L83 38 L76 50 L69 45 V85 H31 V45 L24 50 L17 38 L25 25 Z" />
  ),
  "vest-knit": (
    <path d="M36 18 Q50 26 64 18 L74 24 V85 H56 V36 H44 V85 H26 V24 Z" />
  ),

  "cargo-pants": (
    <>
      <path d="M33 16 H67 L66 86 H54 L50 40 L46 86 H34 Z" />
      <rect x="34" y="34" width="10" height="8" rx="1" />
      <rect x="56" y="34" width="10" height="8" rx="1" />
    </>
  ),
  "linen-pants": (
    <path d="M34 16 H66 L64 86 H53 L50 42 L47 86 H36 Z" />
  ),
  "swim-shorts": (
    <path d="M32 16 H68 L66 54 H54 L50 36 L46 54 H34 Z" />
  ),
  "dress-pants": (
    <path d="M35 16 H65 L63 86 H53 L50 44 L47 86 H37 Z" />
  ),
  "dress-shorts": (
    <path d="M34 16 H66 L64 58 H54 L50 38 L46 58 H36 Z" />
  ),
  "wide-leg": (
    <path d="M28 16 H72 L74 86 H54 L50 44 L46 86 H26 Z" />
  ),
  "track-pants": (
    <path d="M34 16 H66 L62 80 Q58 87 54 80 L50 44 L46 80 Q42 87 38 80 Z" />
  ),
  sweatpants: (
    <path d="M33 16 H67 L64 80 Q60 88 55 81 L50 44 L45 81 Q40 88 36 80 Z" />
  ),

  "flip-flops": (
    <>
      <path d="M22 64 Q50 60 78 64 Q81 71 74 71 H26 Q19 71 22 64 Z" />
      <path d="M50 64 L50 54 Q50 50 55 52" strokeWidth={2} fill="none" />
    </>
  ),
  moccasins: (
    <path d="M22 62 Q30 52 46 52 L64 54 Q78 56 80 63 L80 68 Q80 72 75 72 H25 Q18 72 22 66 Z" />
  ),
  loafers: (
    <path d="M22 62 Q30 52 46 52 L66 54 Q80 56 82 63 L82 68 Q82 72 76 72 H24 Q18 72 22 66 Z" />
  ),
  "chelsea-boots": (
    <path d="M28 26 H50 L51 60 L77 62 Q85 64 85 71 L83 75 H28 Z" />
  ),
  "oxford-shoes": (
    <path d="M20 63 Q27 52 43 53 L66 55 Q80 57 82 65 Q82 69 77 69 H22 Q17 69 20 63 Z" />
  ),
  "running-shoes": (
    <>
      <path d="M16 62 L20 50 Q29 43 44 47 L66 51 Q79 54 83 63 L84 69 Q83 73 77 73 H19 Q14 73 16 67 Z" />
      <path d="M24 50 L36 54 M44 48 L56 52" strokeWidth={1.5} fill="none" stroke="rgba(255,255,255,0.3)" />
    </>
  ),

  "denim-jacket": (
    <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  windbreaker: (
    <path d="M34 16 L27 20 L18 32 L25 44 L31 39 V84 H48 V30 H52 V84 H69 V39 L75 44 L82 32 L73 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  "puffer-jacket": (
    <>
      <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
      <path d="M31 50 H48 M52 50 H69 M31 60 H48 M52 60 H69 M31 40 H48 M52 40 H69" strokeWidth={1} fill="none" stroke="rgba(255,255,255,0.2)" />
    </>
  ),
  "leather-jacket": (
    <path d="M34 16 L27 20 L16 33 L24 46 L30 40 V84 H48 V30 H52 V84 H70 V40 L76 46 L84 33 L73 20 L66 16 L58 24 L50 30 L42 24 Z" />
  ),
  "trench-coat": (
    <path d="M33 13 L26 17 L16 31 L23 45 L30 39 V92 H47 V29 H53 V92 H70 V39 L77 45 L84 31 L74 17 L67 13 L59 20 L50 26 L41 20 Z" />
  ),
  gilet: (
    <path d="M36 16 Q50 24 64 16 L74 22 V85 H56 V32 H44 V85 H26 V22 Z" />
  ),

  sunglasses: (
    <>
      <path d="M18 46 H37 Q50 52 63 46 H82 V52 Q82 58 76 58 H62 Q50 60 38 58 H24 Q18 58 18 52 Z" />
      <path d="M37 49 H63" strokeWidth={1.5} fill="none" />
    </>
  ),
  backpack: (
    <>
      <path d="M35 20 Q50 14 65 20 L70 75 Q70 82 63 82 H37 Q30 82 30 75 Z" />
      <path d="M42 20 Q50 16 58 20 L58 30 Q50 34 42 30 Z" />
      <rect x="38" y="46" width="24" height="16" rx="3" />
    </>
  ),
  bracelet: (
    <path d="M32 46 Q32 34 50 34 Q68 34 68 46 Q68 58 50 58 Q32 58 32 46 Z" fill="none" strokeWidth={5} />
  ),
  "bow-tie": (
    <>
      <path d="M25 40 L45 50 L25 60 Z" />
      <path d="M75 40 L55 50 L75 60 Z" />
      <circle cx="50" cy="50" r="5" />
    </>
  ),
  "pocket-square": (
    <path d="M38 28 H62 L60 48 Q54 38 50 45 Q46 38 40 48 Z" />
  ),
  headband: (
    <path d="M22 48 Q22 36 50 36 Q78 36 78 48 Q78 56 50 58 Q22 56 22 48 Z" fill="none" strokeWidth={6} />
  ),
};

const SLOT_FALLBACK: Record<string, React.ReactNode> = {
  top: <rect x="32" y="20" width="36" height="60" rx="6" transform="translate(0)" />,
  bottom: <rect x="34" y="18" width="32" height="66" rx="4" />,
  footwear: <rect x="20" y="56" width="60" height="18" rx="9" />,
  outerwear: <rect x="30" y="16" width="40" height="68" rx="6" />,
  accessory: <circle cx="50" cy="50" r="22" />,
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={graphicId.replace(/-/g, " ")}
    >
      {/* Light rim keeps dark garments legible on the dark theme. */}
      <g
        fill={color}
        stroke="rgba(255,255,255,0.16)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {shape}
      </g>
    </svg>
  );
}
