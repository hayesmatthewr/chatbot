# Page Override: PDP "Red" variant (Seed DS-01–inspired)

> Second visual treatment of the same PDP content as `pdp.md`. Route:
> `/lifework-red`. Overrides `MASTER.md` and stands independent of `pdp.md`
> (that file governs `/lifework`, the Swiss-minimal/coral treatment).

## Brief

User ask: "make it feel like Seed Probiotics' DS-01 PDP, but red instead of
green." Seed's DS-01 page isn't in the ui-ux-pro-max catalog (no
brand-specific entries), so this is direct art direction rather than a
`--design-system` catalog match — same kind of deliberate, documented
deviation as the coral accent in `pdp.md`.

Seed's DS-01 identifying traits carried over:
- Warm oat/cream ground, near-black ink, restrained hairline rules instead
  of card shadows or shaded zebra-striping.
- A deep, almost-black brand color used sparingly and with confidence
  (Seed: forest green). Substituted with a deep, desaturated **oxblood
  red** rather than a bright coral/fire-engine red, to keep the same
  "confident near-black hue" quality instead of just recoloring.
- Editorial serif headlines over a clean grotesk body + a mono face for
  data/citation-style annotations.
- Annotated-diagram devices: dotted leader lines from a central visual to
  numbered callouts, spec-sheet dot-leader rows (label ⋯⋯⋯ value), and
  citation-numbered research cards — Seed's signature way of making
  clinical content feel designed rather than just tabulated.
- Flat surfaces over card chrome: dividers and hairlines do the
  separating, not background shading or drop shadows.

## Colors

| Role | Hex | Notes |
|------|-----|-------|
| Paper (background) | `#F7F2E7` | warm oat cream |
| Ink (text) | `#1A1512` | near-black, warm |
| Ink Soft (secondary text) | `#6B6156` | |
| Oxblood (primary / brand) | `#4E1712` | near-black red — the "Seed green" substitute |
| Oxblood Bright (interactive accent) | `#8C2A1F` | links, dots, active states |
| Blush (tint surface) | `#F1DED2` | pale rose-tan, Seed's pale-mint equivalent |
| Card | `#FEFCF6` | |
| Line (hairline) | `#E2D6C4` | |

## Typography

- Display/headline: **Fraunces** (soft-optical serif, editorial/botanical
  register)
- Body: **Archivo** (clean grotesk, good x-height)
- Data / citation annotations: **IBM Plex Mono** (kept from `pdp.md` for
  the same reason — reads as clinical/data without going full monospace
  brutalism)

## Structural devices specific to this variant

- Hero: product placeholder sits in a soft radial color-wash field; a
  dot-leader spec list stands in for Seed's ingredient panel.
- Mechanism section: dotted leader lines radiate from the central diagram
  placeholder to three numbered callouts (CSS-drawn, no image asset).
- Clinical evidence: each research area renders as a numbered citation
  card (`[STUDY 0N]`) instead of a plain tab panel.
- Consistency timeline: nodes sit on a connecting dotted line rather than
  a plain 4-up card grid.
- Comparison table: hairline row dividers only, serif header row, no
  shaded header band.
- No dark mode: this route follows the same single committed-theme
  pattern as the sibling concept pages (`/lifework`, `/solstice-coffee`).
