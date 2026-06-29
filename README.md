# Armoire

A **local-first, installable PWA wardrobe builder for men's clothing**.

Pick your garment's colour from an index, select the type (58 garment types across tops, bottoms, footwear, outerwear, and accessories - formality and season are auto-set), and a **rule-based** engine builds colour-coherent outfits from what you actually own. Outfits render as clean SVG silhouettes with pattern variants (solid, striped, pinstripe, graphic, two-tone).

**Live:** [armoire.ahmedyhussain.com](https://armoire.ahmedyhussain.com) - a companion app to [ahmedyhussain.com](https://ahmedyhussain.com), sharing its dark, serif-headed design language.

### What makes it different
- **No AI.** Deterministic color science + explainable color-theory rules. Every suggestion can show *why* it works.
- **Works offline.** After the first load, the core loop (add items, generate outfits, insights) runs with no network.
- **Free.** No accounts, no API costs, no subscription. Your data stays on your device.

### Features
- Colour index swatch picker with 20 colours (no photo upload needed)
- 58 garment types with auto formality and season detection
- Pattern system: solid, striped, pinstripe, graphic, two-tone
- Outfit generation by color harmony, formality, and season
- "Mark worn" rotation: worn pieces are benched for 2 generations
- Times-worn tracking, optional price, and a **cost-per-wear** insights dashboard
- Optional, opt-in weather feature: temperature-aware outfits, umbrella prompt on rain, and layerable suggestions for cold-morning/warm-afternoon days

### Stack
Next.js 15 · React 19 · TypeScript · Tailwind · Framer Motion · Dexie (IndexedDB) · Serwist (PWA) · Open-Meteo (optional weather) - deployed on Vercel.

### Security
- CSP, HSTS, X-Frame-Options, and other security headers on all responses
- AI crawler blocking via `robots.ts` (14 bot user-agents) and `X-Robots-Tag: noai, noimageai`
- Privacy Policy and Terms of Use pages (`/legal/privacy`, `/legal/terms`)
- `sitemap.xml` for search engine discovery
- All data stays on-device (IndexedDB); no accounts, no uploads

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

Hosted on Vercel and served at **armoire.ahmedyhussain.com**. The Vercel project is
linked to this GitHub repository, so pushes to `main` deploy automatically.

```bash
# Manual production deploy (if needed)
npx vercel --prod
```

## Design

See [`docs/superpowers/specs/2026-06-29-armoire-design.md`](docs/superpowers/specs/2026-06-29-armoire-design.md) for the full design document.
