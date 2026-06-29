# Armoire

A **local-first, installable PWA wardrobe builder for men's clothing**.

Photograph your clothes; Armoire extracts each item's exact color entirely in your browser, you tag the garment type / formality / season, and a **rule-based** engine builds color-coherent outfits from what you actually own. Outfits render as clean recolorable graphics — not your raw photos.

### What makes it different
- **No AI.** Deterministic color science + explainable color-theory rules. Every suggestion can show *why* it works.
- **Works offline.** After the first load, the core loop (add items, generate outfits, insights) runs with no network.
- **Free.** No accounts, no API costs, no subscription. Your data stays on your device.

### Features
- Exact in-browser color detection with background removal
- Outfit generation by color harmony, formality, and season
- "Mark worn" rotation: worn pieces are benched for 2 generations
- Times-worn tracking, optional price, and a **cost-per-wear** insights dashboard
- Optional, opt-in weather feature: temperature-aware outfits, umbrella prompt on rain, and layerable suggestions for cold-morning/warm-afternoon days

### Stack
Next.js 15 · React 19 · TypeScript · Tailwind · Framer Motion · Dexie (IndexedDB) · Serwist (PWA) · Open-Meteo (optional weather) — deployed on Vercel.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run unit tests
npm test

# Type-check
npm run type-check

# Production build
npm run build
```

## Deployment

```bash
# Deploy to Vercel
npx vercel --prod
```

Or link to a Vercel project:

```bash
npx vercel link
npx vercel --prod
```

## Design

See [`docs/superpowers/specs/2026-06-29-armoire-design.md`](docs/superpowers/specs/2026-06-29-armoire-design.md) for the full design document.
