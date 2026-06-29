import React from "react";
import { GARMENTS } from "./registry";

type PathSet = Record<string, React.ReactNode>;

// Recolorable menswear silhouettes on a 100×100 canvas.
// Each shape carries no hard-coded fill - the wrapping <g> applies the
// detected garment colour. Secondary/trim colours applied via dedicated
// shape groups. Kept geometric and centred for a consistent lookbook.
const PATHS: PathSet = {
  // ═══════════════════════════════════════════════════════════════════
  // TOPS — CASUAL
  // ═══════════════════════════════════════════════════════════════════
  "t-shirt": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
  ),
  "tank-top": (
    <path d="M40 16 L32 20 L22 34 L28 42 L35 37 V84 H65 V37 L72 42 L78 34 L68 20 L60 16 Q50 24 40 16 Z" />
  ),
  "muscle-tee": (
    <path d="M42 16 L34 22 L26 36 L32 44 L38 39 V84 H62 V39 L68 44 L74 36 L66 22 L58 16 Q50 23 42 16 Z" />
  ),
  "v-neck-tee": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 L56 28 L50 22 L44 28 Z" />
  ),
  "crew-neck-tee": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 26 38 16 Z" />
  ),
  "henley": (
    <>
      <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
      {/* placket detail painted in trim colour */}
    </>
  ),
  "henley-collar": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
  ),
  "long-sleeve-tee": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V45 L20 50 L22 60 L33 55 V84 H67 V55 L78 60 L80 50 L67 45 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
  ),
  "ribbed-tee": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 Q50 26 38 16 Z" />
  ),

  // ═══════════════════════════════════════════════════════════════════
  // TOPS — SMART / FORMAL SHIRTS
  // ═══════════════════════════════════════════════════════════════════
  "oxford-shirt": (
    <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
  ),
  "dress-shirt": (
    <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
  ),
  "dress-shirt-pocket": (
    <>
      <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
    </>
  ),
  "linen-shirt": (
    <path d="M38 15 L28 19 L20 31 V72 H30 L31 39 V86 H69 V39 L70 72 H80 V31 L72 19 L62 15 L55 23 L50 17 L45 23 Z" />
  ),
  "button-up-collar-tee": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 L56 24 L50 18 L44 24 Z" />
  ),
  "polo": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 L56 23 L50 18 L44 23 Z" />
  ),
  "rugby-shirt": (
    <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V84 H67 V36 L76 41 L83 31 L70 20 L62 16 L56 23 L50 18 L44 23 Z" />
  ),
  "baseball-tee": (
    <>
      <path d="M38 16 L30 20 L17 31 L24 41 L33 36 V45 L20 50 L22 60 L33 55 V84 H67 V55 L78 60 L80 50 L67 45 V36 L76 41 L83 31 L70 20 L62 16 Q50 25 38 16 Z" />
    </>
  ),

  // ═══════════════════════════════════════════════════════════════════
  // TOPS — KNITS & SWEATERS
  // ═══════════════════════════════════════════════════════════════════
  "jumper": (
    <path d="M37 18 Q50 27 63 18 L74 23 L83 35 L76 47 L69 42 V85 H31 V42 L24 47 L17 35 L26 23 Z" />
  ),
  "crewneck": (
    <path d="M36 20 Q50 28 64 20 L75 25 L83 38 L76 50 L69 45 V85 H31 V45 L24 50 L17 38 L25 25 Z" />
  ),
  "turtleneck": (
    <>
      <path d="M37 28 Q50 37 63 28 L74 33 L83 45 L76 57 L69 52 V85 H31 V52 L24 57 L17 45 L26 33 Z" />
      <path d="M39 22 Q50 28 61 22 L63 28 Q50 34 37 28 Z" />
      <path d="M40 16 Q50 22 60 16 L61 22 Q50 27 39 22 Z" />
    </>
  ),
  "vest-knit": (
    <path d="M36 18 Q50 26 64 18 L74 24 V85 H56 V36 H44 V85 H26 V24 Z" />
  ),
  "sweater-vest": (
    <path d="M36 18 Q50 26 64 18 L74 24 V82 H58 V38 H42 V82 H26 V24 Z" />
  ),
  "cardigan": (
    <>
      <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
    </>
  ),
  "v-neck-jumper": (
    <path d="M37 18 Q50 27 63 18 L74 23 L83 35 L76 47 L69 42 V85 H31 V42 L24 47 L17 35 L26 23 L50 30 Z" />
  ),
  "fisherman-sweater": (
    <path d="M36 20 Q50 28 64 20 L75 25 L83 38 L76 50 L69 45 V85 H31 V45 L24 50 L17 38 L25 25 Z" />
  ),
  "cable-knit": (
    <path d="M36 20 Q50 28 64 20 L75 25 L83 38 L76 50 L69 45 V85 H31 V45 L24 50 L17 38 L25 25 Z" />
  ),

  // ═══════════════════════════════════════════════════════════════════
  // TOPS — OUTERWEAR / HOODIES
  // ═══════════════════════════════════════════════════════════════════
  "hoodie": (
    <>
      <path d="M36 25 Q50 5 64 25 Q50 17 36 25 Z" />
      <path d="M37 23 Q50 31 63 23 L74 27 L83 39 L76 51 L69 46 V86 H31 V46 L24 51 L17 39 L26 27 Z" />
    </>
  ),
  "zip-hoodie": (
    <>
      <path d="M36 25 Q50 5 64 25 Q50 17 36 25 Z" />
      <path d="M37 23 Q50 31 63 23 L74 27 L83 39 L76 51 L69 46 V86 H31 V46 L24 51 L17 39 L26 27 Z" />
    </>
  ),
  "sweatshirt": (
    <path d="M36 18 Q50 27 64 18 L75 24 L83 37 L76 49 L69 44 V85 H31 V44 L24 49 L17 37 L25 24 Z" />
  ),
  "quarter-zip": (
    <path d="M36 18 Q50 27 64 18 L75 24 L83 37 L76 49 L69 44 V85 H31 V44 L24 49 L17 37 L25 24 Z" />
  ),

  // ═══════════════════════════════════════════════════════════════════
  // BOTTOMS
  // ═══════════════════════════════════════════════════════════════════
  "jeans": (
    <path d="M33 16 H67 L66 86 H54 L50 40 L46 86 H34 Z" />
  ),
  "jeans-skinny": (
    <path d="M36 16 H64 L62 86 H53 L50 40 L47 86 H38 Z" />
  ),
  "jeans-ripped": (
    <path d="M33 16 H67 L66 86 H54 L50 40 L46 86 H34 Z" />
  ),
  "chinos": (
    <path d="M34 16 H66 L63 86 H53 L50 42 L47 86 H37 Z" />
  ),
  "shorts": (
    <path d="M33 16 H67 L65 56 H54 L50 36 L46 56 H35 Z" />
  ),
  "joggers": (
    <path d="M34 16 H66 L62 80 Q58 87 54 80 L50 44 L46 80 Q42 87 38 80 Z" />
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
  "sweatpants": (
    <path d="M33 16 H67 L64 80 Q60 88 55 81 L50 44 L45 81 Q40 88 36 80 Z" />
  ),
  "cargo-shorts": (
    <>
      <path d="M33 16 H67 L65 56 H54 L50 36 L46 56 H35 Z" />
      <rect x="34" y="28" width="10" height="7" rx="1" />
      <rect x="56" y="28" width="10" height="7" rx="1" />
    </>
  ),
  "chino-shorts": (
    <path d="M34 16 H66 L63 54 H53 L50 38 L47 54 H37 Z" />
  ),
  "hiking-pants": (
    <path d="M33 16 H67 L66 86 H54 L50 40 L46 86 H34 Z" />
  ),
  "overalls": (
    <>
      <path d="M36 16 Q50 24 64 16 L74 24 V42 H66 V86 H54 L50 44 L46 86 H34 V42 H26 V24 Z" />
      <path d="M42 16 L42 28 M58 16 L58 28" strokeWidth={1.5} fill="none" />
    </>
  ),
  "suspender-pants": (
    <path d="M35 16 H65 L63 86 H53 L50 44 L47 86 H37 Z" />
  ),
  "track-shorts": (
    <path d="M34 16 H66 L62 54 Q58 61 54 54 L50 38 L46 54 Q42 61 38 54 Z" />
  ),

  // ═══════════════════════════════════════════════════════════════════
  // FOOTWEAR
  // ═══════════════════════════════════════════════════════════════════
  "sneakers": (
    <path d="M18 60 L21 50 Q29 44 41 47 L62 51 Q75 53 81 61 L82 67 Q82 71 77 71 H21 Q16 71 18 65 Z" />
  ),
  "dress-shoes": (
    <path d="M20 63 Q27 52 43 53 L66 55 Q80 57 82 65 Q82 69 77 69 H22 Q17 69 20 63 Z" />
  ),
  "boots": (
    <path d="M30 28 H47 L48 60 L74 62 Q83 64 83 71 L81 75 H30 Z" />
  ),
  "sandals": (
    <>
      <path d="M22 64 Q50 60 78 64 Q81 71 74 71 H26 Q19 71 22 64 Z" />
      <path d="M32 64 L45 51 L49 54 L37 66 Z" />
      <path d="M68 64 L55 51 L51 54 L63 66 Z" />
    </>
  ),
  "flip-flops": (
    <>
      <path d="M22 64 Q50 60 78 64 Q81 71 74 71 H26 Q19 71 22 64 Z" />
      <path d="M50 64 L50 54 Q50 50 55 52" strokeWidth={2} fill="none" />
    </>
  ),
  "moccasins": (
    <path d="M22 62 Q30 52 46 52 L64 54 Q78 56 80 63 L80 68 Q80 72 75 72 H25 Q18 72 22 66 Z" />
  ),
  "loafers": (
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
  "hiking-boots": (
    <path d="M28 22 H48 L50 60 L78 62 Q86 64 86 72 L84 76 H28 Z" />
  ),
  "espadrilles": (
    <path d="M24 62 Q32 54 46 54 L64 56 Q76 58 78 64 L78 69 Q78 72 72 72 H28 Q22 72 24 66 Z" />
  ),
  "slippers": (
    <path d="M18 64 Q36 58 64 60 Q82 62 82 69 L82 72 H18 Z" />
  ),

  // ═══════════════════════════════════════════════════════════════════
  // OUTERWEAR
  // ═══════════════════════════════════════════════════════════════════
  "jacket": (
    <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  "denim-jacket": (
    <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  "windbreaker": (
    <path d="M34 16 L27 20 L18 32 L25 44 L31 39 V84 H48 V30 H52 V84 H69 V39 L75 44 L82 32 L73 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  "overshirt": (
    <path d="M35 16 L27 20 L20 31 V64 H29 L30 39 V84 H48 V32 H52 V84 H70 V39 L71 64 H80 V31 L73 20 L65 16 L57 23 L50 29 L43 23 Z" />
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
  "blazer": (
    <path d="M36 16 L26 22 L19 36 L27 47 L33 41 V84 H47 V41 L50 30 L53 41 V84 H67 V41 L73 47 L81 36 L74 22 L64 16 L50 37 Z" />
  ),
  "coat": (
    <path d="M34 14 L27 18 L17 31 L24 44 L31 39 V90 H48 V30 H52 V90 H69 V39 L76 44 L83 31 L73 18 L66 14 L58 21 L50 27 L42 21 Z" />
  ),
  "trench-coat": (
    <path d="M33 13 L26 17 L16 31 L23 45 L30 39 V92 H47 V29 H53 V92 H70 V39 L77 45 L84 31 L74 17 L67 13 L59 20 L50 26 L41 20 Z" />
  ),
  "gilet": (
    <path d="M36 16 Q50 24 64 16 L74 22 V85 H56 V32 H44 V85 H26 V22 Z" />
  ),
  "fleece-jacket": (
    <path d="M34 16 L28 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L72 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  "raincoat": (
    <path d="M33 14 L26 18 L17 31 L24 44 L31 39 V86 H48 V30 H52 V86 H69 V39 L76 44 L83 31 L74 18 L67 14 L58 21 L50 27 L42 21 Z" />
  ),
  "rain-poncho": (
    <path d="M30 16 L25 20 L17 55 L30 70 H70 L83 55 L75 20 L70 16 L60 22 L50 28 L40 22 Z" />
  ),
  "bomber-jacket": (
    <path d="M34 16 L27 20 L17 31 L24 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L76 43 L83 31 L73 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),
  "harrington-jacket": (
    <path d="M34 16 L27 20 L18 31 L25 43 L31 38 V84 H48 V30 H52 V84 H69 V38 L75 43 L82 31 L73 20 L66 16 L58 23 L50 29 L42 23 Z" />
  ),

  // ═══════════════════════════════════════════════════════════════════
  // ACCESSORIES — HEADWEAR
  // ═══════════════════════════════════════════════════════════════════
  "cap": (
    <>
      <path d="M28 51 Q28 28 50 28 Q72 28 72 51 Z" />
      <path d="M50 51 L86 57 Q89 59 84 61 L50 59 Z" />
    </>
  ),
  "beanie": (
    <>
      <path d="M30 55 Q30 26 50 26 Q70 26 70 55 Z" />
      <path d="M27 55 H73 V63 Q50 67 27 63 Z" />
    </>
  ),
  "headband": (
    <path d="M22 48 Q22 36 50 36 Q78 36 78 48 Q78 56 50 58 Q22 56 22 48 Z" fill="none" strokeWidth={6} />
  ),
  "bucket-hat": (
    <>
      <path d="M32 55 Q32 30 50 30 Q68 30 68 55 Z" />
      <path d="M26 55 H74 L78 65 Q74 69 50 69 Q26 69 22 65 Z" />
    </>
  ),
  "panama-hat": (
    <>
      <path d="M34 52 Q34 32 50 32 Q66 32 66 52 Z" />
      <path d="M20 52 H80 L84 62 Q84 66 50 66 Q16 66 16 62 Z" />
    </>
  ),
  "flat-cap": (
    <>
      <path d="M30 55 Q30 32 50 32 Q70 32 70 55 Z" />
      <path d="M50 55 L82 60 Q86 62 80 64 L50 62 Z" />
    </>
  ),
  "safari-hat": (
    <>
      <path d="M32 52 Q32 28 50 28 Q68 28 68 52 Z" />
      <path d="M18 52 H82 L86 64 Q86 68 50 68 Q14 68 14 64 Z" />
    </>
  ),

  // ═══════════════════════════════════════════════════════════════════
  // ACCESSORIES — EYEWEAR
  // ═══════════════════════════════════════════════════════════════════
  "sunglasses": (
    <>
      <path d="M18 46 H37 Q50 52 63 46 H82 V52 Q82 58 76 58 H62 Q50 60 38 58 H24 Q18 58 18 52 Z" />
      <path d="M37 49 H63" strokeWidth={1.5} fill="none" />
    </>
  ),
  "glasses-style1": (
    <>
      <path d="M22 48 H40 Q50 54 60 48 H78 V50 Q78 54 72 54 H62 Q50 56 38 54 H28 Q22 54 22 50 Z" fill="none" strokeWidth={2.5} />
      <path d="M38 50 H62" strokeWidth={2} fill="none" />
    </>
  ),
  "glasses-style2": (
    <>
      <circle cx="35" cy="48" r="10" fill="none" strokeWidth={2.5} />
      <circle cx="65" cy="48" r="10" fill="none" strokeWidth={2.5} />
      <path d="M45 48 H55" strokeWidth={2} fill="none" />
    </>
  ),

  // ═══════════════════════════════════════════════════════════════════
  // ACCESSORIES — NECKWEAR
  // ═══════════════════════════════════════════════════════════════════
  "scarf": (
    <>
      <path d="M35 24 Q50 35 65 24 L65 31 Q50 41 35 31 Z" />
      <path d="M39 31 L45 80 L39 82 L34 33 Z" />
      <path d="M61 31 L66 33 L61 82 L55 80 Z" />
    </>
  ),
  "tie": (
    <>
      <path d="M44 17 H56 L58 26 H42 Z" />
      <path d="M43 27 H57 L54 64 L50 75 L46 64 Z" />
    </>
  ),
  "bow-tie": (
    <>
      <path d="M25 40 L45 50 L25 60 Z" />
      <path d="M75 40 L55 50 L75 60 Z" />
      <circle cx="50" cy="50" r="5" />
    </>
  ),

  // ═══════════════════════════════════════════════════════════════════
  // ACCESSORIES — OTHER
  // ═══════════════════════════════════════════════════════════════════
  "belt": (
    <>
      <path d="M16 46 H84 V56 H16 Z" />
      <path d="M45 43 H59 V59 H45 Z" />
    </>
  ),
  "backpack": (
    <>
      <path d="M35 20 Q50 14 65 20 L70 75 Q70 82 63 82 H37 Q30 82 30 75 Z" />
      <path d="M42 20 Q50 16 58 20 L58 30 Q50 34 42 30 Z" />
      <rect x="38" y="46" width="24" height="16" rx="3" />
    </>
  ),
  "bracelet": (
    <path d="M32 46 Q32 34 50 34 Q68 34 68 46 Q68 58 50 58 Q32 58 32 46 Z" fill="none" strokeWidth={5} />
  ),
  "watch": (
    <>
      <path d="M43 35 H57 L56 23 H44 Z" />
      <path d="M43 65 H57 L56 77 H44 Z" />
      <circle cx="50" cy="50" r="15" />
    </>
  ),
  "pocket-square": (
    <path d="M38 28 H62 L60 48 Q54 38 50 45 Q46 38 40 48 Z" />
  ),
  "umbrella": (
    <>
      <path d="M50 17 Q23 21 16 49 Q33 41 50 49 Q67 41 84 49 Q77 21 50 17 Z" />
      <path d="M48 49 H52 V78 Q52 85 44 82 V79 Q49 80 49 76 Z" />
    </>
  ),
  "gloves": (
    <>
      <path d="M32 30 H68 L72 48 Q72 56 64 56 H56 L53 40 L47 40 L44 56 H36 Q28 56 28 48 Z" />
    </>
  ),
  "leather-gloves": (
    <>
      <path d="M32 30 H68 L72 48 Q72 56 64 56 H56 L53 40 L47 40 L44 56 H36 Q28 56 28 48 Z" />
    </>
  ),
  "suspenders": (
    <>
      <path d="M45 12 L41 50 M55 12 L59 50" strokeWidth={3} fill="none" />
    </>
  ),
};

// Fallback silhouette per slot when graphicId not found
const SLOT_FALLBACK: Record<string, React.ReactNode> = {
  top: <rect x="32" y="20" width="36" height="60" rx="6" />,
  bottom: <rect x="34" y="18" width="32" height="66" rx="4" />,
  footwear: <rect x="20" y="56" width="60" height="18" rx="9" />,
  outerwear: <rect x="30" y="16" width="40" height="68" rx="6" />,
  accessory: <circle cx="50" cy="50" r="22" />,
};

// ── Pattern / effect defs ──────────────────────────────────────────────

function PatternDefs({
  id,
  pattern,
  color,
  secondaryColor,
}: {
  id: string;
  pattern: string;
  color: string;
  secondaryColor?: string;
}) {
  const sec = secondaryColor ?? "rgba(255,255,255,0.22)";

  if (pattern === "stripe-h")
    return (
      <defs>
        <pattern id={id} x="0" y="0" width="100" height="10" patternUnits="userSpaceOnUse">
          <rect width="100" height="5" fill={color} opacity={0.95} />
          <rect y="5" width="100" height="5" fill={sec} />
        </pattern>
      </defs>
    );

  if (pattern === "stripe-v")
    return (
      <defs>
        <pattern id={id} x="0" y="0" width="10" height="100" patternUnits="userSpaceOnUse">
          <rect width="5" height="100" fill={color} opacity={0.95} />
          <rect x="5" width="5" height="100" fill={sec} />
        </pattern>
      </defs>
    );

  if (pattern === "two-tone")
    return (
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" stopColor={color} />
          <stop offset="50%" stopColor={sec} />
        </linearGradient>
      </defs>
    );

  return null;
}

// ── Component ──────────────────────────────────────────────────────────

export function GarmentGraphic({
  graphicId,
  color,
  secondaryColor,
  trimColor,
  size = 96,
  pattern = "solid",
}: {
  graphicId: string;
  color: string;
  secondaryColor?: string;
  trimColor?: string;
  size?: number;
  pattern?: string;
}) {
  const known = PATHS[graphicId];
  const slot =
    Object.values(GARMENTS).find((g) => g.graphicId === graphicId)?.slot ?? "top";
  const shape = known ?? SLOT_FALLBACK[slot];
  const patId = `pat-${graphicId}-${pattern}`;
  const needsUrl =
    pattern !== "solid" && pattern !== "graphic" && pattern !== "trim";
  const fill = needsUrl ? `url(#${patId})` : color;

  const hasTrim = pattern === "trim" && trimColor;
  const secFill = secondaryColor ?? "rgba(255,255,255,0.28)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={graphicId.replace(/-/g, " ")}
    >
      {/* Pattern defs */}
      {needsUrl && (
        <PatternDefs
          id={patId}
          pattern={pattern}
          color={color}
          secondaryColor={secondaryColor}
        />
      )}

      {/* Main body */}
      <g
        fill={fill}
        stroke="rgba(255,255,255,0.16)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {shape}
      </g>

      {/* Trim overlay — collar, cuffs, placket etc */}
      {hasTrim && (
        <g fill={trimColor} stroke="none">
          {/* Collar */}
          <path d="M36 19 Q50 13 64 19 L61 22 Q50 17 39 22 Z" />
          {/* Cuffs for long sleeves */}
          <rect x="20" y="48" width="6" height="16" rx="2" />
          <rect x="74" y="48" width="6" height="16" rx="2" />
        </g>
      )}

      {/* Graphic pattern — badge / emblem on chest */}
      {pattern === "graphic" && (
        <g fill={secFill} stroke="none">
          <circle cx="50" cy="45" r="7" />
          <path
            d="M46 45 L50 39 L54 45 L50 51 Z"
            fill={color}
            opacity={0.6}
          />
        </g>
      )}
    </svg>
  );
}
