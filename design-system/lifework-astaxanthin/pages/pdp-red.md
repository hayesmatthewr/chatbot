# Page Override: PDP "Red" variant (Seed DS-01–inspired)

> Second visual treatment of the same PDP content as `pdp.md`. Route:
> `/lifework-red`. Overrides `MASTER.md` and stands independent of `pdp.md`
> (that file governs `/lifework`, the Swiss-minimal/coral treatment).

## Brief

User ask: "make it feel like Seed Probiotics' DS-01 PDP, but red instead of
green." Seed's DS-01 page isn't in the ui-ux-pro-max catalog (no
brand-specific entries), so this is direct art direction rather than a
`--design-system` catalog match.

**Revision note:** the first pass was built from general recollection of
Seed's brand (warm cream, editorial serif, dotted annotation lines) and the
user correctly called it out as looking nothing like the real page. It was
rebuilt after fetching `seed.com/daily-synbiotic` and extracting its actual
structure/typography/copy via `WebFetch` (no live screenshot access was
available in this sandbox — network to seed.com was blocked at the OS and
browser level, so this is a text-description reconstruction, not a pixel
trace). Corrections from that research, vs. the first pass:

| | First pass (wrong) | Corrected |
|---|---|---|
| Ground | Warm oat/cream `#F7F2E7` | Near-white `#FDFDFC` |
| Headline type | Serif (Fraunces) | Bold sans-serif grotesk (Archivo) — the real page has **no serif anywhere** |
| Section separation | Hairline borders between every section | Whitespace + occasional flat tint band, minimal border use |
| Hero | Dot-leader "spec sheet" list | Direct DTC pattern: product photo, price, "Bestseller" badge, subscription line, solid CTA |
| Diagrams | Dotted leader lines radiating to callouts | Real device is a **capsule/softgel cross-section with labeled layers** — simplified to a labeled diagram placeholder + adjacent numbered list |
| Benefits | Bordered columns with vertical dividers | Flat tinted cards, no dividers (page uses "flat card design") |
| Quality | Circular checkmark medallions | A flat row of small monochrome icon + label badges (mirrors Seed's "Gluten-Tested / Dairy-Tested…" badge row) |
| Ingredient | 3-stat bordered panel only | Added a dose bar (100% width, single segment) — the closest honest analog to Seed's multi-blend percentage bars, since Lifework has one active ingredient, not four blends |

Kept from the first pass (still accurate): the oxblood-red substitution for
Seed's forest green, IBM Plex Mono for data/citation labels, numbered
citation-style research cards (`[Study 0N]`), and the comparison table
structure — WebFetch confirmed Seed's real page also runs a DS-01-vs-
"Other Probiotics" comparison table.

## Colors

| Role | Hex | Notes |
|------|-----|-------|
| Background | `#FDFDFC` | near-white, not cream |
| Foreground (text) | `#17130F` | near-black, warm |
| Secondary text | `#6E655C` | |
| Oxblood (primary / brand) | `#4E1712` | near-black red — the "Seed green" substitute |
| Oxblood Bright (accent) | `#8C2A1F` | links, active states, icons |
| Muted (tint band) | `#FAF3F1` | pale blush, used sparingly for section bands |
| Card | `#FFFFFF` | |
| Border | `#ECE7E2` | low-contrast, used only where a real edge is needed (tables, accordions) |

## Typography

- Headline + body: **Archivo** (single family, weight does the hierarchy —
  matches the real page's all-sans-serif system)
- Data / citation annotations: **IBM Plex Mono**

## Structural devices specific to this variant

- Hero: product-photo placeholder, price + "Bestseller" badge, purchase
  card, solid oxblood CTA, trust row.
- Mechanism section: labeled softgel cross-section diagram beside a plain
  numbered list (no dotted connector art).
- Clinical evidence: tabs + numbered citation cards (`[Study 0N]`).
- Ingredient section: single-segment dose bar ("100% active dose — no
  fillers, blends, or proprietary dilution").
- Quality section: flat icon + label badge row.
- Comparison table: kept, matches Seed's real DS-01-vs-competitor table.
- No dark mode: single committed theme, matching sibling concept pages.
