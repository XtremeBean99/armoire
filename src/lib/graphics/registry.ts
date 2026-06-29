import type { Formality, Season, Slot } from '@/lib/types'

export interface GarmentDef {
  slot: Slot
  graphicId: string
  label: string
  defaultFormality: Formality
  defaultSeasons: Season[]
  category: string         // top-level: "Tops" | "Bottoms" | "Footwear" | "Outerwear" | "Accessories"
  subcategory: string      // e.g. "Shirts", "Jeans", "Sneakers"
}

export const GARMENTS: Record<string, GarmentDef> = {
  // ═══════════════════════════════════════════════════════════════════
  // TOPS
  // ═══════════════════════════════════════════════════════════════════
  // ── T-shirts ──────────────────────────────────────────────────────
  "t-shirt":        { slot: "top", graphicId: "t-shirt",        label: "T-shirt",                defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Tops", subcategory: "T-shirts" },
  "crew-neck-tee":  { slot: "top", graphicId: "crew-neck-tee",  label: "Crew-neck tee",          defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Tops", subcategory: "T-shirts" },
  "v-neck-tee":     { slot: "top", graphicId: "v-neck-tee",     label: "V-neck tee",             defaultFormality: "casual",  defaultSeasons: ["spring", "summer"],            category: "Tops", subcategory: "T-shirts" },
  "tank-top":       { slot: "top", graphicId: "tank-top",       label: "Tank top",               defaultFormality: "gym",     defaultSeasons: ["summer"],                     category: "Tops", subcategory: "T-shirts" },
  "muscle-tee":     { slot: "top", graphicId: "muscle-tee",     label: "Muscle tee",             defaultFormality: "gym",     defaultSeasons: ["summer"],                     category: "Tops", subcategory: "T-shirts" },
  "long-sleeve-tee":{ slot: "top", graphicId: "long-sleeve-tee",label: "Long-sleeve tee",        defaultFormality: "casual",  defaultSeasons: ["spring", "autumn", "winter"],  category: "Tops", subcategory: "T-shirts" },
  "henley":         { slot: "top", graphicId: "henley",         label: "Henley",                 defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Tops", subcategory: "T-shirts" },
  "henley-collar":  { slot: "top", graphicId: "henley-collar",  label: "Henley (collar)",        defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Tops", subcategory: "T-shirts" },
  "baseball-tee":   { slot: "top", graphicId: "baseball-tee",   label: "Baseball tee",           defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Tops", subcategory: "T-shirts" },
  "rugby-shirt":    { slot: "top", graphicId: "rugby-shirt",    label: "Rugby shirt",            defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Tops", subcategory: "T-shirts" },

  // ── Shirts ────────────────────────────────────────────────────────
  "oxford-shirt":   { slot: "top", graphicId: "oxford-shirt",   label: "Oxford shirt",           defaultFormality: "smart",   defaultSeasons: ["all-season"],                 category: "Tops", subcategory: "Shirts" },
  "dress-shirt":    { slot: "top", graphicId: "dress-shirt",    label: "Dress shirt",            defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Tops", subcategory: "Shirts" },
  "dress-shirt-pocket": { slot: "top", graphicId: "dress-shirt-pocket", label: "Dress shirt (pocket)", defaultFormality: "formal", defaultSeasons: ["all-season"],                category: "Tops", subcategory: "Shirts" },
  "linen-shirt":    { slot: "top", graphicId: "linen-shirt",    label: "Linen shirt",            defaultFormality: "casual",  defaultSeasons: ["summer"],                     category: "Tops", subcategory: "Shirts" },
  "polo":           { slot: "top", graphicId: "polo",           label: "Polo",                   defaultFormality: "smart",   defaultSeasons: ["spring", "summer"],            category: "Tops", subcategory: "Shirts" },
  "button-up-collar-tee": { slot: "top", graphicId: "button-up-collar-tee", label: "Button-up collar tee", defaultFormality: "casual", defaultSeasons: ["spring", "summer"],       category: "Tops", subcategory: "Shirts" },

  // ── Knits & Sweaters ──────────────────────────────────────────────
  "crewneck":       { slot: "top", graphicId: "crewneck",       label: "Crewneck",              defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Knits" },
  "jumper":         { slot: "top", graphicId: "jumper",         label: "Jumper",                defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Knits" },
  "v-neck-jumper":  { slot: "top", graphicId: "v-neck-jumper",  label: "V-neck jumper",         defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Knits" },
  "turtleneck":     { slot: "top", graphicId: "turtleneck",     label: "Turtleneck",            defaultFormality: "smart",   defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Knits" },
  "vest-knit":      { slot: "top", graphicId: "vest-knit",      label: "Knit vest",             defaultFormality: "smart",   defaultSeasons: ["autumn", "spring"],            category: "Tops", subcategory: "Knits" },
  "sweater-vest":   { slot: "top", graphicId: "sweater-vest",   label: "Sweater vest",          defaultFormality: "smart",   defaultSeasons: ["autumn", "spring"],            category: "Tops", subcategory: "Knits" },
  "cardigan":       { slot: "top", graphicId: "cardigan",       label: "Cardigan",              defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Tops", subcategory: "Knits" },
  "fisherman-sweater": { slot: "top", graphicId: "fisherman-sweater", label: "Fisherman sweater", defaultFormality: "casual", defaultSeasons: ["winter", "autumn"],          category: "Tops", subcategory: "Knits" },
  "cable-knit":     { slot: "top", graphicId: "cable-knit",     label: "Cable knit",            defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Knits" },

  // ── Hoodies & Sweatshirts ─────────────────────────────────────────
  "hoodie":         { slot: "top", graphicId: "hoodie",         label: "Hoodie",                defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Hoodies & Sweats" },
  "zip-hoodie":     { slot: "top", graphicId: "zip-hoodie",     label: "Zip hoodie",            defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Hoodies & Sweats" },
  "sweatshirt":     { slot: "top", graphicId: "sweatshirt",     label: "Sweatshirt",            defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Hoodies & Sweats" },
  "quarter-zip":    { slot: "top", graphicId: "quarter-zip",    label: "Quarter-zip",           defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Tops", subcategory: "Hoodies & Sweats" },

  // ═══════════════════════════════════════════════════════════════════
  // BOTTOMS
  // ═══════════════════════════════════════════════════════════════════
  // ── Jeans ─────────────────────────────────────────────────────────
  "jeans":          { slot: "bottom", graphicId: "jeans",          label: "Jeans",              defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Jeans" },
  "jeans-skinny":   { slot: "bottom", graphicId: "jeans-skinny",   label: "Skinny jeans",       defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Jeans" },
  "jeans-ripped":   { slot: "bottom", graphicId: "jeans-ripped",   label: "Ripped jeans",       defaultFormality: "casual",  defaultSeasons: ["spring", "summer"],            category: "Bottoms", subcategory: "Jeans" },

  // ── Trousers ──────────────────────────────────────────────────────
  "chinos":         { slot: "bottom", graphicId: "chinos",         label: "Chinos",             defaultFormality: "smart",   defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Trousers" },
  "dress-pants":    { slot: "bottom", graphicId: "dress-pants",    label: "Dress pants",        defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Trousers" },
  "linen-pants":    { slot: "bottom", graphicId: "linen-pants",    label: "Linen pants",        defaultFormality: "casual",  defaultSeasons: ["summer"],                     category: "Bottoms", subcategory: "Trousers" },
  "wide-leg":       { slot: "bottom", graphicId: "wide-leg",       label: "Wide-leg trousers",  defaultFormality: "smart",   defaultSeasons: ["spring", "summer", "autumn"],  category: "Bottoms", subcategory: "Trousers" },
  "hiking-pants":   { slot: "bottom", graphicId: "hiking-pants",   label: "Hiking pants",       defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Trousers" },

  // ── Shorts ────────────────────────────────────────────────────────
  "shorts":         { slot: "bottom", graphicId: "shorts",         label: "Shorts",             defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Bottoms", subcategory: "Shorts" },
  "swim-shorts":    { slot: "bottom", graphicId: "swim-shorts",    label: "Swim shorts",        defaultFormality: "gym",     defaultSeasons: ["summer"],                     category: "Bottoms", subcategory: "Shorts" },
  "dress-shorts":   { slot: "bottom", graphicId: "dress-shorts",   label: "Dress shorts",       defaultFormality: "smart",   defaultSeasons: ["summer"],                     category: "Bottoms", subcategory: "Shorts" },
  "cargo-shorts":   { slot: "bottom", graphicId: "cargo-shorts",   label: "Cargo shorts",       defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Bottoms", subcategory: "Shorts" },
  "chino-shorts":   { slot: "bottom", graphicId: "chino-shorts",   label: "Chino shorts",       defaultFormality: "smart",   defaultSeasons: ["summer", "spring"],            category: "Bottoms", subcategory: "Shorts" },
  "track-shorts":   { slot: "bottom", graphicId: "track-shorts",   label: "Track shorts",       defaultFormality: "gym",     defaultSeasons: ["summer", "spring"],            category: "Bottoms", subcategory: "Shorts" },

  // ── Athleisure ────────────────────────────────────────────────────
  "joggers":        { slot: "bottom", graphicId: "joggers",        label: "Joggers",            defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Athleisure" },
  "track-pants":    { slot: "bottom", graphicId: "track-pants",    label: "Track pants",        defaultFormality: "gym",     defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Athleisure" },
  "sweatpants":     { slot: "bottom", graphicId: "sweatpants",     label: "Sweatpants",         defaultFormality: "gym",     defaultSeasons: ["winter", "autumn"],            category: "Bottoms", subcategory: "Athleisure" },

  // ── Utility & Other ───────────────────────────────────────────────
  "cargo-pants":    { slot: "bottom", graphicId: "cargo-pants",    label: "Cargo pants",        defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Utility" },
  "overalls":       { slot: "bottom", graphicId: "overalls",       label: "Overalls",           defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Bottoms", subcategory: "Utility" },
  "suspender-pants":{ slot: "bottom", graphicId: "suspender-pants",label: "Suspender pants",     defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Bottoms", subcategory: "Utility" },

  // ═══════════════════════════════════════════════════════════════════
  // FOOTWEAR
  // ═══════════════════════════════════════════════════════════════════
  // ── Sneakers ──────────────────────────────────────────────────────
  "sneakers":       { slot: "footwear", graphicId: "sneakers",       label: "Sneakers",         defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Sneakers" },
  "running-shoes":  { slot: "footwear", graphicId: "running-shoes",  label: "Running shoes",    defaultFormality: "gym",     defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Sneakers" },

  // ── Casual Shoes ──────────────────────────────────────────────────
  "boots":          { slot: "footwear", graphicId: "boots",          label: "Boots",            defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Footwear", subcategory: "Casual shoes" },
  "hiking-boots":   { slot: "footwear", graphicId: "hiking-boots",   label: "Hiking boots",     defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Casual shoes" },
  "moccasins":      { slot: "footwear", graphicId: "moccasins",      label: "Moccasins",        defaultFormality: "casual",  defaultSeasons: ["spring", "summer", "autumn"],  category: "Footwear", subcategory: "Casual shoes" },
  "espadrilles":    { slot: "footwear", graphicId: "espadrilles",    label: "Espadrilles",      defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Footwear", subcategory: "Casual shoes" },

  // ── Sandals ───────────────────────────────────────────────────────
  "sandals":        { slot: "footwear", graphicId: "sandals",        label: "Sandals",          defaultFormality: "casual",  defaultSeasons: ["summer"],                     category: "Footwear", subcategory: "Sandals" },
  "flip-flops":     { slot: "footwear", graphicId: "flip-flops",     label: "Flip-flops",       defaultFormality: "casual",  defaultSeasons: ["summer"],                     category: "Footwear", subcategory: "Sandals" },
  "slippers":       { slot: "footwear", graphicId: "slippers",       label: "Slippers",         defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Sandals" },

  // ── Smart Shoes ───────────────────────────────────────────────────
  "loafers":        { slot: "footwear", graphicId: "loafers",        label: "Loafers",          defaultFormality: "smart",   defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Smart shoes" },
  "chelsea-boots":  { slot: "footwear", graphicId: "chelsea-boots",  label: "Chelsea boots",    defaultFormality: "smart",   defaultSeasons: ["autumn", "winter", "spring"],  category: "Footwear", subcategory: "Smart shoes" },
  "oxford-shoes":   { slot: "footwear", graphicId: "oxford-shoes",   label: "Oxford shoes",     defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Smart shoes" },
  "dress-shoes":    { slot: "footwear", graphicId: "dress-shoes",    label: "Dress shoes",      defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Footwear", subcategory: "Smart shoes" },

  // ═══════════════════════════════════════════════════════════════════
  // OUTERWEAR
  // ═══════════════════════════════════════════════════════════════════
  // ── Casual Jackets ────────────────────────────────────────────────
  "jacket":         { slot: "outerwear", graphicId: "jacket",         label: "Jacket",           defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Outerwear", subcategory: "Casual jackets" },
  "denim-jacket":   { slot: "outerwear", graphicId: "denim-jacket",   label: "Denim jacket",     defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Outerwear", subcategory: "Casual jackets" },
  "bomber-jacket":  { slot: "outerwear", graphicId: "bomber-jacket",  label: "Bomber jacket",    defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Outerwear", subcategory: "Casual jackets" },
  "harrington-jacket": { slot: "outerwear", graphicId: "harrington-jacket", label: "Harrington jacket", defaultFormality: "casual", defaultSeasons: ["spring", "autumn"],        category: "Outerwear", subcategory: "Casual jackets" },
  "leather-jacket": { slot: "outerwear", graphicId: "leather-jacket", label: "Leather jacket",   defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Outerwear", subcategory: "Casual jackets" },

  // ── Technical / Outdoor ───────────────────────────────────────────
  "windbreaker":    { slot: "outerwear", graphicId: "windbreaker",    label: "Windbreaker",      defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Outerwear", subcategory: "Technical" },
  "raincoat":       { slot: "outerwear", graphicId: "raincoat",       label: "Raincoat",         defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Outerwear", subcategory: "Technical" },
  "rain-poncho":    { slot: "outerwear", graphicId: "rain-poncho",    label: "Rain poncho",      defaultFormality: "casual",  defaultSeasons: ["spring", "summer", "autumn"],  category: "Outerwear", subcategory: "Technical" },
  "puffer-jacket":  { slot: "outerwear", graphicId: "puffer-jacket",  label: "Puffer jacket",    defaultFormality: "casual",  defaultSeasons: ["winter"],                     category: "Outerwear", subcategory: "Technical" },
  "fleece-jacket":  { slot: "outerwear", graphicId: "fleece-jacket",  label: "Fleece jacket",    defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Outerwear", subcategory: "Technical" },

  // ── Smart Outerwear ───────────────────────────────────────────────
  "blazer":         { slot: "outerwear", graphicId: "blazer",         label: "Blazer",           defaultFormality: "smart",   defaultSeasons: ["all-season"],                 category: "Outerwear", subcategory: "Smart outerwear" },
  "coat":           { slot: "outerwear", graphicId: "coat",           label: "Coat",             defaultFormality: "smart",   defaultSeasons: ["winter", "autumn"],            category: "Outerwear", subcategory: "Smart outerwear" },
  "trench-coat":    { slot: "outerwear", graphicId: "trench-coat",    label: "Trench coat",      defaultFormality: "smart",   defaultSeasons: ["autumn", "winter", "spring"],  category: "Outerwear", subcategory: "Smart outerwear" },
  "gilet":          { slot: "outerwear", graphicId: "gilet",          label: "Gilet",            defaultFormality: "smart",   defaultSeasons: ["autumn", "spring"],            category: "Outerwear", subcategory: "Smart outerwear" },
  "overshirt":      { slot: "outerwear", graphicId: "overshirt",      label: "Overshirt",        defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],            category: "Outerwear", subcategory: "Smart outerwear" },

  // ═══════════════════════════════════════════════════════════════════
  // ACCESSORIES
  // ═══════════════════════════════════════════════════════════════════
  // ── Headwear ──────────────────────────────────────────────────────
  "cap":            { slot: "accessory", graphicId: "cap",            label: "Cap",              defaultFormality: "casual",  defaultSeasons: ["spring", "summer"],            category: "Accessories", subcategory: "Headwear" },
  "beanie":         { slot: "accessory", graphicId: "beanie",         label: "Beanie",           defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Accessories", subcategory: "Headwear" },
  "headband":       { slot: "accessory", graphicId: "headband",       label: "Headband",         defaultFormality: "gym",     defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Headwear" },
  "bucket-hat":     { slot: "accessory", graphicId: "bucket-hat",     label: "Bucket hat",       defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Accessories", subcategory: "Headwear" },
  "panama-hat":     { slot: "accessory", graphicId: "panama-hat",     label: "Panama hat",       defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Accessories", subcategory: "Headwear" },
  "flat-cap":       { slot: "accessory", graphicId: "flat-cap",       label: "Flat cap",         defaultFormality: "smart",   defaultSeasons: ["autumn", "spring"],            category: "Accessories", subcategory: "Headwear" },
  "safari-hat":     { slot: "accessory", graphicId: "safari-hat",     label: "Safari hat",       defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Accessories", subcategory: "Headwear" },

  // ── Eyewear ───────────────────────────────────────────────────────
  "sunglasses":     { slot: "accessory", graphicId: "sunglasses",     label: "Sunglasses",       defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],            category: "Accessories", subcategory: "Eyewear" },
  "glasses-style1": { slot: "accessory", graphicId: "glasses-style1", label: "Glasses (style 1)", defaultFormality: "smart",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Eyewear" },
  "glasses-style2": { slot: "accessory", graphicId: "glasses-style2", label: "Glasses (style 2)", defaultFormality: "smart",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Eyewear" },

  // ── Neckwear ──────────────────────────────────────────────────────
  "scarf":          { slot: "accessory", graphicId: "scarf",          label: "Scarf",            defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Accessories", subcategory: "Neckwear" },
  "tie":            { slot: "accessory", graphicId: "tie",            label: "Tie",              defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Neckwear" },
  "bow-tie":        { slot: "accessory", graphicId: "bow-tie",        label: "Bow tie",          defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Neckwear" },

  // ── Other Accessories ─────────────────────────────────────────────
  "belt":           { slot: "accessory", graphicId: "belt",           label: "Belt",             defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Belts" },
  "suspenders":     { slot: "accessory", graphicId: "suspenders",     label: "Suspenders",       defaultFormality: "smart",   defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Belts" },
  "backpack":       { slot: "accessory", graphicId: "backpack",       label: "Backpack",         defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Bags" },
  "bracelet":       { slot: "accessory", graphicId: "bracelet",       label: "Bracelet",         defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Jewellery" },
  "watch":          { slot: "accessory", graphicId: "watch",          label: "Watch",            defaultFormality: "casual",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Jewellery" },
  "pocket-square":  { slot: "accessory", graphicId: "pocket-square",  label: "Pocket square",    defaultFormality: "formal",  defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Smart extras" },
  "umbrella":       { slot: "accessory", graphicId: "umbrella",       label: "Umbrella",         defaultFormality: "smart",   defaultSeasons: ["all-season"],                 category: "Accessories", subcategory: "Smart extras" },
  "gloves":         { slot: "accessory", graphicId: "gloves",         label: "Gloves",           defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],            category: "Accessories", subcategory: "Gloves" },
  "leather-gloves": { slot: "accessory", graphicId: "leather-gloves", label: "Leather gloves",   defaultFormality: "smart",   defaultSeasons: ["winter", "autumn"],            category: "Accessories", subcategory: "Gloves" },
}

// ── Helpers ────────────────────────────────────────────────────────────

export function garmentTypesForSlot(slot: Slot): string[] {
  return Object.entries(GARMENTS)
    .filter(([, d]) => d.slot === slot)
    .map(([t]) => t);
}

export function resolveGarment(garmentType: string): { slot: Slot; graphicId: string } {
  const def = GARMENTS[garmentType];
  if (!def) throw new Error(`Unknown garment type: ${garmentType}`);
  return { slot: def.slot, graphicId: def.graphicId };
}

/** Returns garments grouped by subcategory, for the given slot. */
export function garmentTypesBySubcategory(
  slot: Slot,
): { subcategory: string; types: string[] }[] {
  const groups = new Map<string, string[]>();
  for (const [type, def] of Object.entries(GARMENTS)) {
    if (def.slot !== slot) continue;
    const list = groups.get(def.subcategory) ?? [];
    list.push(type);
    groups.set(def.subcategory, list);
  }
  return Array.from(groups, ([subcategory, types]) => ({ subcategory, types }));
}

/**
 * Hierarchical: slot → { subcategory → types }
 * Compatible with old consumers expecting Record<string,string[]>.
 */
export function garmentTypesByCategory(slot: Slot): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const { subcategory, types } of garmentTypesBySubcategory(slot)) {
    result[subcategory] = types;
  }
  return result;
}
