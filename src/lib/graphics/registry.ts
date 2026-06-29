import type { Formality, Season, Slot } from '@/lib/types'

export interface GarmentDef {
  slot: Slot
  graphicId: string
  label: string
  defaultFormality: Formality
  defaultSeasons: Season[]
  category: string
}

export const GARMENTS: Record<string, GarmentDef> = {
  "t-shirt":       { slot: "top", graphicId: "t-shirt",       label: "T-shirt",              defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Casual tops" },
  "tank-top":      { slot: "top", graphicId: "tank-top",      label: "Tank top",             defaultFormality: "gym",     defaultSeasons: ["summer"],                      category: "Casual tops" },
  "muscle-tee":    { slot: "top", graphicId: "muscle-tee",    label: "Muscle tee",           defaultFormality: "gym",     defaultSeasons: ["summer"],                      category: "Casual tops" },
  "henley":        { slot: "top", graphicId: "henley",        label: "Henley",               defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],             category: "Casual tops" },
  "hoodie":        { slot: "top", graphicId: "hoodie",        label: "Hoodie",               defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],             category: "Casual tops" },
  "linen-shirt":   { slot: "top", graphicId: "linen-shirt",   label: "Linen shirt",          defaultFormality: "casual",  defaultSeasons: ["summer"],                      category: "Casual tops" },
  "polo":          { slot: "top", graphicId: "polo",          label: "Polo",                 defaultFormality: "smart",   defaultSeasons: ["spring", "summer"],             category: "Smart tops" },
  "oxford-shirt":  { slot: "top", graphicId: "oxford-shirt",  label: "Oxford shirt",         defaultFormality: "smart",   defaultSeasons: ["all-season"],                  category: "Smart tops" },
  "dress-shirt":   { slot: "top", graphicId: "dress-shirt",   label: "Dress shirt",          defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Smart tops" },
  "turtleneck":    { slot: "top", graphicId: "turtleneck",    label: "Turtleneck",           defaultFormality: "smart",   defaultSeasons: ["winter", "autumn"],             category: "Smart tops" },
  "jumper":        { slot: "top", graphicId: "jumper",        label: "Jumper",               defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],             category: "Knits" },
  "crewneck":      { slot: "top", graphicId: "crewneck",      label: "Crewneck",             defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],             category: "Knits" },
  "vest-knit":     { slot: "top", graphicId: "vest-knit",     label: "Knit vest",            defaultFormality: "smart",   defaultSeasons: ["autumn", "spring"],             category: "Knits" },
  "jeans":         { slot: "bottom", graphicId: "jeans",         label: "Jeans",             defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Casual bottoms" },
  "shorts":        { slot: "bottom", graphicId: "shorts",        label: "Shorts",            defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],             category: "Casual bottoms" },
  "cargo-pants":   { slot: "bottom", graphicId: "cargo-pants",   label: "Cargo pants",       defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Casual bottoms" },
  "joggers":       { slot: "bottom", graphicId: "joggers",       label: "Joggers",           defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Casual bottoms" },
  "linen-pants":   { slot: "bottom", graphicId: "linen-pants",   label: "Linen pants",       defaultFormality: "casual",  defaultSeasons: ["summer"],                      category: "Casual bottoms" },
  "swim-shorts":   { slot: "bottom", graphicId: "swim-shorts",   label: "Swim shorts",       defaultFormality: "gym",     defaultSeasons: ["summer"],                      category: "Casual bottoms" },
  "chinos":        { slot: "bottom", graphicId: "chinos",        label: "Chinos",            defaultFormality: "smart",   defaultSeasons: ["all-season"],                  category: "Smart bottoms" },
  "dress-pants":   { slot: "bottom", graphicId: "dress-pants",   label: "Dress pants",       defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Smart bottoms" },
  "dress-shorts":  { slot: "bottom", graphicId: "dress-shorts",  label: "Dress shorts",      defaultFormality: "smart",   defaultSeasons: ["summer"],                      category: "Smart bottoms" },
  "wide-leg":      { slot: "bottom", graphicId: "wide-leg",      label: "Wide-leg trousers", defaultFormality: "smart",   defaultSeasons: ["spring", "summer", "autumn"],  category: "Smart bottoms" },
  "track-pants":   { slot: "bottom", graphicId: "track-pants",   label: "Track pants",       defaultFormality: "gym",     defaultSeasons: ["all-season"],                  category: "Gym bottoms" },
  "sweatpants":    { slot: "bottom", graphicId: "sweatpants",    label: "Sweatpants",        defaultFormality: "gym",     defaultSeasons: ["winter", "autumn"],             category: "Gym bottoms" },
  "sneakers":      { slot: "footwear", graphicId: "sneakers",      label: "Sneakers",        defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Casual shoes" },
  "boots":         { slot: "footwear", graphicId: "boots",         label: "Boots",           defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],             category: "Casual shoes" },
  "sandals":       { slot: "footwear", graphicId: "sandals",       label: "Sandals",         defaultFormality: "casual",  defaultSeasons: ["summer"],                      category: "Casual shoes" },
  "flip-flops":    { slot: "footwear", graphicId: "flip-flops",    label: "Flip-flops",      defaultFormality: "casual",  defaultSeasons: ["summer"],                      category: "Casual shoes" },
  "moccasins":     { slot: "footwear", graphicId: "moccasins",     label: "Moccasins",       defaultFormality: "casual",  defaultSeasons: ["spring", "summer", "autumn"],  category: "Casual shoes" },
  "loafers":       { slot: "footwear", graphicId: "loafers",       label: "Loafers",         defaultFormality: "smart",   defaultSeasons: ["all-season"],                  category: "Smart shoes" },
  "chelsea-boots": { slot: "footwear", graphicId: "chelsea-boots", label: "Chelsea boots",   defaultFormality: "smart",   defaultSeasons: ["autumn", "winter", "spring"],  category: "Smart shoes" },
  "oxford-shoes":  { slot: "footwear", graphicId: "oxford-shoes",  label: "Oxford shoes",    defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Smart shoes" },
  "dress-shoes":   { slot: "footwear", graphicId: "dress-shoes",   label: "Dress shoes",     defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Smart shoes" },
  "running-shoes": { slot: "footwear", graphicId: "running-shoes", label: "Running shoes",   defaultFormality: "gym",     defaultSeasons: ["all-season"],                  category: "Gym shoes" },
  "jacket":        { slot: "outerwear", graphicId: "jacket",        label: "Jacket",          defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Casual outerwear" },
  "denim-jacket":  { slot: "outerwear", graphicId: "denim-jacket",  label: "Denim jacket",    defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],             category: "Casual outerwear" },
  "windbreaker":   { slot: "outerwear", graphicId: "windbreaker",   label: "Windbreaker",     defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],             category: "Casual outerwear" },
  "overshirt":     { slot: "outerwear", graphicId: "overshirt",     label: "Overshirt",       defaultFormality: "casual",  defaultSeasons: ["spring", "autumn"],             category: "Casual outerwear" },
  "puffer-jacket": { slot: "outerwear", graphicId: "puffer-jacket", label: "Puffer jacket",   defaultFormality: "casual",  defaultSeasons: ["winter"],                      category: "Casual outerwear" },
  "leather-jacket":{ slot: "outerwear", graphicId: "leather-jacket",label: "Leather jacket",  defaultFormality: "casual",  defaultSeasons: ["autumn", "winter", "spring"],  category: "Casual outerwear" },
  "blazer":        { slot: "outerwear", graphicId: "blazer",        label: "Blazer",          defaultFormality: "smart",   defaultSeasons: ["all-season"],                  category: "Smart outerwear" },
  "coat":          { slot: "outerwear", graphicId: "coat",          label: "Coat",            defaultFormality: "smart",   defaultSeasons: ["winter", "autumn"],             category: "Smart outerwear" },
  "trench-coat":   { slot: "outerwear", graphicId: "trench-coat",   label: "Trench coat",     defaultFormality: "smart",   defaultSeasons: ["autumn", "winter", "spring"],  category: "Smart outerwear" },
  "gilet":         { slot: "outerwear", graphicId: "gilet",         label: "Gilet",           defaultFormality: "smart",   defaultSeasons: ["autumn", "spring"],             category: "Smart outerwear" },
  "cap":           { slot: "accessory", graphicId: "cap",           label: "Cap",             defaultFormality: "casual",  defaultSeasons: ["spring", "summer"],             category: "Headwear" },
  "beanie":        { slot: "accessory", graphicId: "beanie",        label: "Beanie",          defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],             category: "Headwear" },
  "headband":      { slot: "accessory", graphicId: "headband",      label: "Headband",        defaultFormality: "gym",     defaultSeasons: ["all-season"],                  category: "Headwear" },
  "sunglasses":    { slot: "accessory", graphicId: "sunglasses",    label: "Sunglasses",      defaultFormality: "casual",  defaultSeasons: ["summer", "spring"],             category: "Eyewear" },
  "scarf":         { slot: "accessory", graphicId: "scarf",         label: "Scarf",           defaultFormality: "casual",  defaultSeasons: ["winter", "autumn"],             category: "Neckwear" },
  "tie":           { slot: "accessory", graphicId: "tie",           label: "Tie",             defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Neckwear" },
  "bow-tie":       { slot: "accessory", graphicId: "bow-tie",       label: "Bow tie",         defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Neckwear" },
  "belt":          { slot: "accessory", graphicId: "belt",          label: "Belt",            defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Belts" },
  "backpack":      { slot: "accessory", graphicId: "backpack",      label: "Backpack",        defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Bags" },
  "bracelet":      { slot: "accessory", graphicId: "bracelet",      label: "Bracelet",        defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Jewellery" },
  "watch":         { slot: "accessory", graphicId: "watch",         label: "Watch",           defaultFormality: "casual",  defaultSeasons: ["all-season"],                  category: "Jewellery" },
  "pocket-square": { slot: "accessory", graphicId: "pocket-square", label: "Pocket square",   defaultFormality: "formal",  defaultSeasons: ["all-season"],                  category: "Smart extras" },
  "umbrella":      { slot: "accessory", graphicId: "umbrella",      label: "Umbrella",        defaultFormality: "smart",   defaultSeasons: ["all-season"],                  category: "Smart extras" },
}

export function garmentTypesForSlot(slot: Slot): string[] {
  return Object.entries(GARMENTS).filter(([, d]) => d.slot === slot).map(([t]) => t);
}

export function resolveGarment(garmentType: string): { slot: Slot; graphicId: string } {
  const def = GARMENTS[garmentType];
  if (!def) throw new Error(`Unknown garment type: ${garmentType}`);
  return { slot: def.slot, graphicId: def.graphicId };
}

export function garmentTypesByCategory(slot: Slot): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const [type, def] of Object.entries(GARMENTS)) {
    if (def.slot !== slot) continue
    if (!result[def.category]) result[def.category] = []
    result[def.category].push(type)
  }
  return result
}
