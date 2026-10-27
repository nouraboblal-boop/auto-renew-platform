# Auto Renew UI/UX Upgrade — Review

## Scope

This review covers the existing `auto-renew-platform` Next.js application after the Dark Luxury / Cyber-Clean upgrade. The change keeps the current Next.js 16 / React 19 / Tailwind CSS 4 application and its existing deployment contracts, health endpoint, Docker image and GitHub Actions workflow.

## FLOWSTACK UI review status

The FLOWSTACK UI Compose, Builder and Review skills were used as the governance checklist for composition, ownership, responsive behavior, accessibility, tokens and verification.

**Exact FLOWSTACK package evidence is unavailable in this repository.** The repository does not install `@flowstack-ui/brick` (or another `@flowstack-ui/*` public package), and therefore there is no exact package version whose Agent Knowledge can be resolved. Per the FLOWSTACK rules, this review does **not** substitute “latest” documentation and does **not** invent Brick, Atom, Theme or Colors APIs.

The user explicitly requested shadcn/ui and Framer Motion. The resulting Radix/shadcn-compatible primitives, motion helpers and application CSS are therefore treated as intentional **application-owned** UI, not as FLOWSTACK package components.

## Architecture and ownership

- `src/components/Navbar.tsx` — floating glass navigation, mobile disclosure and WhatsApp quick action.
- `src/components/Hero.tsx` — animated automotive hero, parallax, pointer-follow glow and counters.
- `src/components/Services.tsx` — Radix Tabs service navigation, 3D tilt cards and illustrative system-data panel.
- `src/components/InteractiveEstimator.tsx` — selection state, price estimation, validation and WhatsApp hand-off.
- `src/components/EVFeatures.tsx` — explicitly illustrative before/after EV diagnostic comparison.
- `src/components/Footer.tsx` — center details driven by public environment variables with safe non-invented fallbacks.
- `src/components/ui/*` — local shadcn-compatible Button, Card and Tabs primitives.
- `src/components/motion/*` — reusable reveal, counter and tilt behaviors.
- `src/lib/catalog.mjs` / `src/lib/booking.mjs` — application-owned pricing and booking logic kept outside presentational components.

## Accessibility and interaction checks

- Semantic landmarks remain intact (`header`, `nav`, `main`, `section`, `footer`).
- A keyboard skip link remains available.
- Mobile navigation exposes `aria-expanded` and `aria-controls`.
- Tabs use Radix UI keyboard/focus behavior rather than a hand-rolled tab implementation.
- Choice controls expose `aria-pressed` state.
- Focus-visible rings are provided on interactive controls.
- `prefers-reduced-motion` is respected by both CSS and Framer Motion helpers.
- Decorative visuals are either hidden from assistive technology or labelled when meaningful.
- WhatsApp is opened only from a user submit/click action; no request is auto-sent and no appointment is represented as confirmed.
- EV comparison values are labelled as illustrative and are not presented as a real vehicle diagnosis.

## Responsive and visual-system checks

- One shared container width and section spacing scale is used throughout.
- Layouts collapse from multi-column grids to stacked mobile layouts.
- Floating navigation has a dedicated mobile menu.
- Dark tokens use the requested carbon/graphite foundation (`#0B0C10`) with cyan/electric-blue accents.
- Glassmorphism, glow, border-beam and parallax effects are bounded to decorative layers and do not own business state.

## Verification evidence

- Existing baseline GitHub Actions run before this upgrade: successful (tests, typecheck, lint, Next.js production build, Docker build and health smoke test).
- Local Node contract/logic tests for the upgraded source: **15/15 passed**.
- Local TypeScript/TSX syntax transpilation check: passed.
- Full dependency-aware typecheck/lint/production build is delegated to the post-commit GitHub Actions run because the local sandbox cannot resolve the npm registry.

## Remaining production inputs

- `NEXT_PUBLIC_WHATSAPP_NUMBER` must contain the official E.164-style destination to activate booking.
- Exact address/map URL and confirmed working hours should be supplied through the documented public environment variables.
- Illustrative estimator prices are not official Auto Renew quotations.
