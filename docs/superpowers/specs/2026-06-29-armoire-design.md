# Armoire — Design Document

> **Status:** Approved (design) · **Date:** 2026-06-29
> **Author:** Ahmed (with Claude)
> **Intended executor:** pi + subagents

*Armoire* (French for "wardrobe") is a **local-first, installable PWA wardrobe builder for men's clothing**. You photograph your clothes; the app extracts each item's exact color entirely in-browser, you tag garment type / formality / season from pickers, and a **rule-based** engine generates color-coherent outfits from the clothes you actually own. Outfits are displayed as **recolorable garment graphics** (a consistent "paper-doll" look), not the raw photos. Marking an outfit "worn" benches its pieces for the next two generations, increments wear counts, and feeds a personal insights dashboard. An **optional** weather feature can tailor the day's suggestion to the local forecast.

---

## 1. Positioning — why Armoire is different

These properties are the product's identity and constrain every technical decision below. They are non-negotiable requirements, not nice-to-haves.

1. **No AI.** Color detection is deterministic color science; outfit generation is explainable color-theory rules. No model inference, no LLM, no black box. Every suggestion can show *why* it works.
2. **Works offline.** After the first load (app shell + background-removal model + garment graphics cached), the entire **core loop** — adding items, generating outfits, insights — runs with **no network**. The only online feature is the *optional* weather augmentation (§8), which never blocks or degrades the offline core.
3. **Free.** No accounts, no per-use API cost, no subscription. Data lives on the user's device. Even the weather feature uses a free, keyless API.
4. **Consistent visual identity.** Outfits are shown as clean recolorable graphics, so a wardrobe of mismatched phone photos still presents as a coherent, designed lookbook.

**Scope:** **men's clothing only.** The garment taxonomy, graphics library, and styling rules are menswear-oriented. (Womenswear is not a goal and shapes no decisions here.)

The README and in-app About screen must state points 1–3 plainly — they are the differentiators from existing AI-stylist apps.

> **Honest caveats to document, not hide:** (a) the background-removal model (~a few MB) and the graphics library download once on first use; "offline" means *after* that first cache. (b) The weather feature requires network + location and is strictly optional.

---

## 2. Scope

### In scope (MVP)
- **Add an item:** photo → automatic background removal + exact color extraction → user picks **garment type**, **formality**, **season(s)** from lists → optional **price** → save locally. The photo is used only for color extraction (and an optional reference thumbnail); the item is *displayed* as a recolored garment graphic.
- **Wardrobe grid:** browse, filter, edit, delete items, rendered as recolored graphics.
- **Outfit generator:** rule-based, color-coherent, season-aware, formality-coherent, cooldown-aware. Each outfit shows a plain-English rationale and renders as a stack of recolored graphics.
- **Mark worn:** benches the outfit's items for 2 generations, increments each item's `timesWorn`.
- **Insights dashboard:** most-worn items / colors / styles, cost-per-wear, least-worn ("orphans").
- **Optional weather augmentation:** temperature-aware suggestions, umbrella prompt on rain, transitional-day layering (§8).
- PWA install + offline shell.

### Deferred (out of MVP — YAGNI)
- Accounts and cloud sync (the data layer is *designed* to allow it later — §3 — but no cloud code ships in MVP).
- AI styling polish; auto garment-type detection from the photo.
- Outfit sharing / export, social features.
- Multiple wardrobes / profiles.
- Native (app-store) mobile build. PWA is the only "standalone app" target for now.
- Womenswear.

---

## 3. Architecture — modules

Each module has one responsibility, a clean interface, and is testable in isolation. This boundary discipline lets pi's subagents build and test modules independently and in parallel.

| Module | Responsibility | Primary dependency |
|---|---|---|
| `color` | **Pure** color science: RGB↔LAB, CIEDE2000 distance, nearest **named color**, hue-family classification, neutral detection, harmony relationships (complementary / analogous / triadic / clash) | `colorjs.io` |
| `image-pipeline` | Photo → background removal → masked dominant-color extraction → `{ hex, rgb, lab, colorName, thumbnailBlob }` | `@imgly/background-removal` (WASM, in-browser) |
| `graphics` | Menswear garment-graphic **library** (recolorable SVG per garment type) + a `<GarmentGraphic type color />` component that applies the detected color to the template | (static SVG assets) |
| `wardrobe-store` | Repository **interface** + IndexedDB implementation + reactive state binding. Item CRUD, image/thumbnail blob storage, cooldown counters, wear counts, worn history | `Dexie`, `Zustand` |
| `outfit-engine` | **Pure** function `(items, filters, cooldownState, weatherContext?, seed) → RankedOutfit[]`. Slot logic, formality/season filtering, cooldown exclusion, color-harmony scoring, weather adjustments, rationale | none (pure) |
| `weather` | **Optional, online.** Geolocation → forecast adapter → `WeatherContext` (today's temp range, precipitation). Isolated network boundary | `Open-Meteo` (free, keyless) |
| `insights` | **Pure** aggregations over items + worn history → chart-ready datasets (most-worn, cost-per-wear, color/style distribution, orphans) | none (pure) |
| `ui` | Next.js App Router routes & components: add-item flow, wardrobe grid, generator, worn tracking, insights, About | Next.js, Tailwind, Framer Motion, Recharts |
| `pwa` | Manifest, service worker, offline shell, model + graphics + asset caching, install prompt | `Serwist` |

### The cloud-ready seam
`wardrobe-store` exposes a `WardrobeRepository` **interface**. MVP ships one implementation, `IndexedDbRepository`. A future `CloudRepository` (Postgres + API) can drop in behind the identical interface with **zero changes** to `outfit-engine`, `insights`, or `ui`. No cloud code is written now; only the seam is honored.

### Tech stack
Mirrors Ahmed's existing portfolio for visual and operational consistency:
**Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion**, deployed on **Vercel** as its own project. Charts: **Recharts** (alternative: hand-rolled SVG if bundle size matters). PWA: **Serwist**. Local DB: **Dexie** (IndexedDB). State: **Zustand**. Weather: **Open-Meteo** (no API key, no signup).

---

## 4. Data model

```ts
type Slot = 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory';
type Formality = 'gym' | 'casual' | 'smart' | 'formal';   // ordinal: gym<casual<smart<formal
type Season = 'summer' | 'winter' | 'spring' | 'autumn' | 'all-season';

// garmentType is the user-selected, menswear-oriented type that also picks the display graphic.
// A registry maps each garmentType -> { slot, graphicId }. See §4.1.
type GarmentType = string;

interface WardrobeItem {
  id: string;
  garmentType: GarmentType;   // e.g. 'oxford-shirt' -> slot 'top', graphic 'oxford-shirt'
  slot: Slot;                 // derived from garmentType registry, stored for fast filtering
  graphicId: string;          // which recolorable graphic to render
  imageBlobId?: string;       // optional original photo, kept for reference only
  thumbnailBlobId?: string;   // optional
  color: {
    hex: string;
    rgb: [number, number, number];
    lab: [number, number, number];
    colorName: string;        // nearest named color
    hueFamily: string;        // e.g. 'red', 'blue', 'neutral'
    isNeutral: boolean;
  };
  formality: Formality;
  seasons: Season[];          // one or more
  pricePaid?: number;         // optional; currency from a single app-level setting
  timesWorn: number;          // starts 0
  cooldown: number;           // 0 = available; >0 = benched for N more generations
  createdAt: number;
}

interface WornRecord {        // one per "mark worn" event — powers insights history
  outfitItemIds: string[];
  wornAt: number;
}

interface WeatherContext {    // produced by the optional `weather` module
  minTempC: number;
  maxTempC: number;
  isTransitionalDay: boolean; // morning cold, afternoon warm (spans a temp boundary)
  rainExpected: boolean;
}
```

### 4.1 Garment taxonomy & graphics (menswear)
Each garment type maps to one recolorable graphic and one slot. Starter set (extendable):
- **top:** t-shirt, polo, oxford-shirt, jumper, hoodie
- **bottom:** jeans, chinos, shorts, joggers
- **footwear:** sneakers, dress-shoes, boots, sandals
- **outerwear:** jacket, blazer, coat, overshirt
- **accessory:** cap, beanie, scarf, belt, tie, watch, **umbrella**

The picker only offers types that have a graphic, so display is always consistent. (Note: `full-body` is intentionally **omitted** for menswear MVP.)

---

## 5. Data flow

- **Add item:** photo → `image-pipeline` (background removal + exact color) → user selects garment type / formality / season(s), optional price → registry resolves `slot` + `graphicId` → `wardrobe-store.add()` persists item (and optional photo blob) to IndexedDB.
- **Generate outfits:** `wardrobe-store` reads items; if the weather feature is enabled, `weather` provides a `WeatherContext` → `outfit-engine(items, filters, cooldown, weatherContext?, seed)` → ranked outfits with rationales → `ui` renders each as a stack of recolored `graphics`.
- **Mark worn:** `wardrobe-store` sets `cooldown = 2` on each item, `timesWorn += 1`, appends a `WornRecord`. Every generation decrements positive cooldowns by 1; items are excluded while `cooldown > 0`.
- **Insights:** `insights` aggregates items + `WornRecord[]` → chart datasets → `ui` renders with Recharts.

---

## 6. The outfit engine (core IP)

Deterministic given the same wardrobe + seed + weather context. Pure, no I/O.

**Slots.** A valid outfit = `top + bottom + footwear` (required). `outerwear` and `accessory` are optional additions.

**Filtering (hard constraints).**
- **Formality coherence:** all items within ±1 ordinal tier (gym↔casual↔smart↔formal). gym never pairs with formal.
- **Season:** every item's `seasons` must include the active season (selected manually, or inferred from weather) or be `all-season`. "Any season" disables this filter.
- **Cooldown:** items with `cooldown > 0` are excluded.

**Scoring (color theory, soft).**
- Neutrals (low-chroma: black / white / grey / navy / beige, via chroma threshold in LAB) always harmonize — they can pair with anything.
- Among non-neutral items, reward **complementary**, **analogous**, and **triadic** hue relationships; penalize clashes and more than ~2 competing bold colors in one outfit.
- Normalized score per candidate outfit; return the top **N** ranked.

**Weather adjustments (only when a `WeatherContext` is supplied — see §8).**
- **Cold day:** require/strongly prefer an `outerwear` piece; bias toward warmer garment types (jumper, coat, boots).
- **Warm day:** prefer lighter types (t-shirt, shorts, sneakers); make `outerwear` unlikely.
- **Rain expected:** if the wardrobe contains an `umbrella` accessory, include/suggest it; always surface a textual "bring an umbrella" note regardless.
- **Transitional day (cold morning → warm afternoon):** prefer a **layerable** outfit — a `top + bottom + footwear` core that already works at the warmer temperature, paired with a compatible `outerwear` piece that can be added for the cold morning. The outfit is tagged and explained as *"works with and without the jacket."*

**Rationale.** Each outfit carries a short plain-English explanation built from the rules that fired (color + formality + weather), reinforcing the "no black box" positioning.

**Determinism & ties.** A seed makes generation reproducible; ties broken by lowest `timesWorn` (gently favors under-worn items), then by `id`.

---

## 7. Error & empty states

| Situation | Behavior |
|---|---|
| Background removal fails / low confidence | Fall back to a manual **eyedropper** color pick on the original photo; user confirms/overrides. |
| Bg-removal model not yet cached + offline | Allow item add via eyedropper-only path; one-time "connect once to enable auto cut-out" note. |
| Missing graphic for a garment type | Render a generic per-slot silhouette as fallback. |
| Over-constrained / everything on cooldown | Explicit empty state naming the reason + a **"reset rotation"** action that clears cooldowns. |
| Too few items for any outfit | Empty state stating exactly what's missing ("add footwear to unlock outfits"). |
| Weather: offline / location denied / API error | Silently skip the weather augmentation; fall back to manual season selection. Core loop unaffected. |
| IndexedDB unavailable (private mode) | In-memory fallback for the session + a clear "won't be saved" warning. |
| Oversized image | Downscale client-side before processing. |

---

## 8. Optional weather augmentation

Strictly opt-in; the user enables it and grants location once. **Provider: Open-Meteo** — free, no API key, no signup (preserves the "free" identity).

- `weather` resolves geolocation (browser API) → fetches today's hourly forecast → derives a `WeatherContext`: `minTempC`, `maxTempC`, `rainExpected` (precipitation probability/volume over a threshold), and `isTransitionalDay` (morning below a cold threshold, afternoon above a warm threshold).
- `WeatherContext` is passed to `outfit-engine`, which applies the adjustments in §6.
- If anything fails (offline, denied, error), the feature simply doesn't apply — no error blocking the core loop.
- The forecast result is cached for the day so repeated generations don't refetch (and work offline once fetched).

---

## 9. Insights dashboard

Pure aggregations rendered as simple charts:
- **Most-worn items** (bar) — by `timesWorn`, shown as their graphics.
- **Color distribution of wear** (bar/donut) — which `hueFamily` you actually wear most.
- **Style/formality distribution** (bar) — where your wear lands across gym/casual/smart/formal.
- **Cost-per-wear** (per priced item) — `pricePaid / max(timesWorn, 1)`; surfaces best- and worst-value pieces.
- **Wardrobe orphans** — items with `timesWorn === 0`, oldest first, nudging use or removal.

---

## 10. Testing strategy

- **`color`** (pure) — TDD: known RGB→name mappings, CIEDE2000 within tolerance, hue-family + neutral classification, harmony relationships.
- **`outfit-engine`** (pure) — TDD: slot validity, formality ±1, season filtering, cooldown exclusion, scoring/ranking, **weather adjustments** (cold/warm/rain/transitional), determinism under fixed seed, tie-breaking.
- **`insights`** (pure) — unit tests on known item/wear fixtures.
- **`weather`** — adapter unit tests against recorded Open-Meteo responses (including transitional + rain cases) with the network mocked; failure paths return "feature unavailable."
- **`graphics`** — render/recolor tests: every `garmentType` resolves to a graphic; recolor applies; fallback silhouette on missing.
- **`image-pipeline`** — integration tests against sample photos; detected color within a ΔE tolerance.
- **`wardrobe-store`** — `fake-indexeddb`: CRUD, cooldown decrement, wear increment, blob round-trip.
- **e2e (Playwright)** — happy path: add 3 items → generate → mark worn → regenerate **excludes** benched items → insights reflect the wear.

---

## 11. Build phases (hand-off units for pi)

Ordered so pure, high-value modules land first and UI builds on tested foundations.

0. **Scaffold** — Next.js 15 + TS + Tailwind + Framer repo; PWA shell (Serwist) + manifest; CI lint/test; README with the §1 positioning.
1. **`color`** — pure module, TDD.
2. **`graphics`** — menswear garment-graphic library + recolorable `<GarmentGraphic />`; the taxonomy registry (§4.1).
3. **`image-pipeline`** — background removal + masked color extraction; eyedropper fallback.
4. **`wardrobe-store`** — `WardrobeRepository` interface + IndexedDB impl (Dexie) + Zustand binding; add-item UI + wardrobe grid (rendered via graphics).
5. **`outfit-engine`** — pure module, TDD; generator UI with rationales (color + formality only at first).
6. **Worn cooldown + season filter** — mark-worn flow, cooldown lifecycle, wear counts, `WornRecord` history.
7. **`weather`** — optional augmentation + engine weather adjustments + enable/permission UI.
8. **`insights`** — aggregations + Recharts dashboard.
9. **Polish & ship** — About screen (positioning), empty/error states, portfolio link/embed, Vercel deploy.

Each phase becomes its own implementation-plan slice with review checkpoints.

---

## 12. Execution model — pi multi-agent orchestration

pi executes this build as **three sequential series of agents**, each fanning out into multiple focused subagents, with a human-readable handoff artifact between series, followed by a **final review by Claude**.

```
Series 1 (Build) ──▶ Series 2 (Review) ──▶ Series 3 (Polish & Fix) ──▶ Final Review (Claude)
   build agents         reviewer agents        fixer agents               acceptance gate
```

Each series is a **hard gate**: pi does not begin the next series until the prior series' output artifact exists and the build is green.

### Series 1 — Build (parallel, focused subagents)
- pi dispatches **one subagent per focused unit** from the §11 work breakdown / §3 modules. Each agent owns a small, single-responsibility slice and delivers it **with its own tests**.
- **Contracts first:** before fan-out, fix the shared TypeScript interfaces — the §4 data model, the `WardrobeRepository` seam, and the module signatures in §3 — so agents build against stable contracts and don't collide.
- **Dependency layering** inside the series: the foundation/pure modules (`color`, `graphics`, `outfit-engine`, `insights`) and the store interface build fully in parallel; consumer agents (`wardrobe-store` impl, `ui`, `weather`, `pwa`) build against those contracts.
- **Definition of done** per agent: the module compiles, its tests pass, it honors its interface, and it respects the §1 positioning constraints (no AI, offline-safe core, free).
- **Output artifact:** working code + a short per-agent build note (what was built, deviations, assumptions).

### Series 2 — Review (parallel, critical reviewers)
After Series 1 is green, pi dispatches **multiple independent reviewing agents**, each with a distinct critical lens. They **assess and report only — they do not change code.** Suggested roster:
1. **Correctness & tests** — logic bugs, edge cases, missing/weak tests, engine determinism.
2. **Architecture & contracts** — interface adherence, the cloud-ready seam, module boundaries and coupling.
3. **Positioning compliance** — verifies no-AI, the offline core (weather is the *only* online feature), and the free/no-account constraints actually hold in the code.
4. **Domain correctness** — neutral detection, color-harmony rules, formality/season/cooldown logic, and the weather adjustments.
5. **UX, accessibility & visual identity** — empty/error states, recolorable-graphics consistency, responsiveness, a11y.

Each reviewer writes severity-tagged findings (**blocker / major / minor**) with file/line references into a consolidated report.
- **Output artifact:** `docs/superpowers/reviews/2026-06-29-series-2-review.md`.

### Series 3 — Polish & Fix (parallel fixers)
- pi dispatches **fixer subagents** that consume the Series 2 report and resolve findings — blockers and majors first, then minors and polish.
- Each fix re-runs the full test suite; a regression test must accompany every bug fix. Fixers may refactor for clarity but must not break interfaces or the §1 positioning.
- **Output artifact:** updated code + a **remediation note** mapping every Series 2 finding to its resolution (fixed / won't-fix-with-reason).

### Final Review — Claude (acceptance gate)
Claude performs the final pass: confirms every blocker/major from Series 2 is resolved, the full test suite and the e2e happy path pass, the §1 positioning holds, and the build matches this spec. Claude issues a **go / no-go** with any residual items. If issues remain, Claude routes a targeted task list back through a Series-3-style fix pass before re-reviewing.

### Orchestration rules
- Reviewers (Series 2) and fixers (Series 3) must reference **specific findings** — no vague "looks good." Every claim of completion is backed by passing tests, not assertion.
- Series 1 agents must not start consumer modules until the contracts they depend on are fixed.
- No series is skipped, even for "simple" modules.

---

## 13. Open questions / future

- **Garment graphics source:** commission/design a custom SVG set vs adapt an existing open-license icon set. Affects phase 2 and visual identity. To resolve before phase 2.
- **Currency:** single app-level setting (default from locale) for MVP.
- **Color-name dictionary:** curated menswear-oriented palette vs large generic list — decided in the `color` phase.
- **Weather thresholds:** exact cold/warm/rain cut-offs for `WeatherContext` — tune in phase 7.
- **Cloud sync provider** when the deferred seam is activated (candidate: Postgres on Vercel).
