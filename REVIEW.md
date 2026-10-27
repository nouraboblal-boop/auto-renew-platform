# Auto Renew — Dark Luxury Design System Correction

## Scope

This correction keeps the existing Next.js 16 / React 19 / Tailwind CSS 4 application, booking logic, `/api/health`, Docker image and GitHub Actions deployment contract. It intentionally changes the visual layer from a simplified dark interface into a richer automotive presentation.

## Visual system

- Carbon base: `#090A0F` / `#0D0E12`.
- Technical accent: electric cyan `#00F0FF` and electric blue `#0070F3`.
- Conversion / booking accent: racing red `#FF0055` with `#E11D48` gradient.
- Glass panels use dark translucent zinc surfaces, blur, inner highlights and bounded glow.
- PPF / vinyl cards use a moving shimmer layer.
- Hero and protection visuals use remote Unsplash images marked free to use under the Unsplash License on their source pages.

## Motion contract

Interactive components remain client components and use Framer Motion directly.

- Hero: staggered fade-up entrance, pulsing title glow, parallax image, animated scan line and floating telemetry.
- Services: `whileInView` with `viewport={{ once: true }}` and staggered service cards.
- Cards: 3D tilt plus `whileHover={{ scale: 1.02 }}` where appropriate.
- EV comparison: staggered panels, animated meters and hoverable diagnostic chips.
- Estimator: staggered controls, animated price changes and a distinct red WhatsApp CTA.
- Reduced-motion CSS remains in place and existing Motion helpers continue to call `useReducedMotion`.

## EV / DiLink presentation

UI values such as `SOH 98%`, ECU module counts and status labels are explicitly marked `DEMO` / illustrative. They demonstrate the intended visual hierarchy and never represent an actual vehicle diagnosis. BYD Song Plus and Destroyer 05 are presented as compatibility examples subject to software/version validation.

## FLOWSTACK UI Builder status

The Builder skill was applied as an ownership, token, responsiveness and accessibility governance checklist. The repository still does **not** install an exact version of `@flowstack-ui/brick` or another public FLOWSTACK package. The FLOWSTACK instructions prohibit substituting latest/current documentation or inventing APIs, so no fictional Brick/Atom/Theme imports were added. Current Radix/shadcn-compatible components and application CSS remain intentional application-owned fallbacks.

## CI hardening included in this correction

The previous UI commit reached TypeScript successfully but failed ESLint for two unrelated reasons:

1. `magicpath-src/**` is a reference export rather than production source and contained explicit `any`; it is now excluded from production lint scope.
2. `AnimatedCounter` synchronously called `setState` inside an effect; it now updates the rendered counter through `requestAnimationFrame` and a DOM ref instead of causing React cascading renders.

PostCSS and Tailwind config exports were also named to remove anonymous-default-export warnings.

## Production inputs still required

- `NEXT_PUBLIC_WHATSAPP_NUMBER` for the official destination.
- Confirmed address/map and opening hours environment values.
- Official price list if the estimator is to move beyond illustrative pricing.
- If remote image independence is required, replace the Unsplash URLs with approved locally hosted assets before final launch.
