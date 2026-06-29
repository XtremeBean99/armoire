export type Slot = "top" | "bottom" | "footwear" | "outerwear" | "accessory";
export const REQUIRED_SLOTS: Slot[] = ["top", "bottom", "footwear"];
export const OPTIONAL_SLOTS: Slot[] = ["outerwear", "accessory"];

export type Formality = "gym" | "casual" | "smart" | "formal";
export const FORMALITY_ORDER: Formality[] = ["gym", "casual", "smart", "formal"];

export type Season = "summer" | "winter" | "spring" | "autumn" | "all-season";

export type Pattern = "solid" | "stripe-h" | "stripe-v" | "graphic" | "two-tone" | "trim"

export interface ItemColor {
  hex: string;                       // "#rrggbb"
  rgb: [number, number, number];     // 0..255
  lab: [number, number, number];     // CIE Lab
  colorName: string;                 // nearest named color, e.g. "Navy"
  hueFamily: string;                 // "red"|"orange"|...|"neutral"
  isNeutral: boolean;
}

export interface WardrobeItem {
  id: string;
  garmentType: string;               // key into the graphics registry
  slot: Slot;                        // resolved from garmentType
  graphicId: string;                 // resolved from garmentType
  imageBlobId?: string;              // optional reference photo
  thumbnailBlobId?: string;
  color: ItemColor;
  secondaryColor?: ItemColor;        // used for stripes, two-tone, graphic
  trimColor?: ItemColor;             // used for collar/cuff/trim accents
  pattern?: Pattern;
  formality: Formality;
  seasons: Season[];                 // non-empty
  pricePaid?: number;                // optional, app-level currency
  timesWorn: number;                 // starts 0
  cooldown: number;                  // 0 = available; >0 = benched
  createdAt: number;                 // epoch ms
}

export interface WornRecord {
  id: string;
  outfitItemIds: string[];
  wornAt: number;
}

export interface WeatherContext {
  minTempC: number;
  maxTempC: number;
  isTransitionalDay: boolean;        // cold morning -> warm afternoon
  rainExpected: boolean;
}

export interface Outfit {
  top: WardrobeItem;
  bottom: WardrobeItem;
  footwear: WardrobeItem;
  outerwear?: WardrobeItem;
  accessory?: WardrobeItem;
}

export interface RankedOutfit {
  outfit: Outfit;
  items: WardrobeItem[];             // flattened, in slot order
  score: number;                     // 0..1
  rationale: string;
  layerable: boolean;                // "works with and without the jacket"
}

export interface GenerateOptions {
  season?: Season | "any";
  weather?: WeatherContext;
  seed?: number;                     // default 1
  count?: number;                    // default 5
}
