# Armoire - Final Review (Claude, acceptance gate)

> **Date:** 2026-06-29 · **Reviewer:** Claude (design §12 final-review agent)
> **Subject:** pi's build of the Armoire implementation plan (`docs/superpowers/plans/2026-06-29-armoire.md`)

## Verdict: **GO** (with one fix applied during review)

pi delivered all 25 planned tasks across the 11 phases, committed cleanly. The five spec pillars hold: **no AI** in the core loop, **offline** core (weather is the only network call and degrades to `null`), **free / no accounts**, **men's-only** taxonomy, and **recolorable-graphics** display rather than raw photos.

## Verification gate

| Check | Result |
|---|---|
| `npm run lint` | ✓ No warnings or errors |
| `npm run type-check` (`tsc --noEmit`, strict) | ✓ Clean |
| `npm test` (Vitest) | ✓ 61 tests / 17 files pass |
| `npm run build` (Next.js production) | ✓ 8 routes prerendered |
| `npm run e2e` (Playwright) | **Not run** - see Residual items |

## Findings

### Blocker / Major

**M1 - Cooldown off-by-one in the generator (FIXED).**
`src/app/page.tsx` called `decrementCooldowns()` *before* `generateOutfits()`. With decrement-then-filter, a worn item was benched for only one generation, not the two the spec requires ("out of rotation for the next two outfit generations"). The defect originated in the plan (Task 22), so pi implemented it faithfully.

*Resolution:* extracted the orchestration into `src/lib/wardrobe-store/generate.ts::runGeneration()`, which generates from the current cooldown state first and decrements afterwards. Added `generate.test.ts`, a regression test asserting a worn outfit is excluded for generations 1 and 2 and returns at generation 3. Page now calls `runGeneration`. Full suite + build re-verified green.

### Minor / Observations (no change required)

- **O1 - bg-removal WASM not precached.** Build warns the ONNX runtime (`ort-wasm-*.wasm`, 23.9 MB) exceeds the Serwist precache limit. This is the documented "model downloads once on first use" caveat; Serwist's `defaultCache` runtime-caches it on first fetch. If fully-offline *first* item-add becomes a goal, add an explicit runtime-cache route for the model. Acceptable for MVP.
- **O2 - `next lint` deprecation notice.** Cosmetic; migrate to the ESLint CLI when convenient.
- **O3 - Garment SVGs and PWA icons are placeholders/fallbacks**, exactly as the plan scoped them (build/polish deliverable, spec §13). Visual-identity polish remains open by design.
- **O4 - `/insights` first-load JS is 237 kB** due to Recharts. Fine for a dashboard route; consider a lighter chart if bundle budget tightens.

## Spec/positioning compliance spot-checks

- Engine determinism, formality ±1, season, and cooldown filtering: covered by `outfit-engine` tests and confirmed by reading `engine.ts`.
- Weather is strictly optional and returns `null` on failure (`weather.ts`) - offline identity preserved.
- Insights include cost-per-wear and orphans (`insights.ts` + `/insights`).
- About page states no-AI / offline / free.

## Residual items for the user

1. **Run the Playwright e2e** (`npm run e2e`) in an environment with browser binaries + first-run network for the model download. It was not run during this review; the happy-path spec exists and the underlying logic it exercises is unit-covered.
2. Replace placeholder garment SVGs and app icons (O3) before showcasing.
