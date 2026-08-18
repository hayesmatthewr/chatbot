# Page Override: PDP "Recent" variant (user-supplied design system)

> Third visual treatment of the same PDP content as `pdp.md` / `pdp-red.md`.
> Route: `/lifework-recent`. Content, copy, and section order are identical
> to `/lifework` — only the design system changes. Overrides `MASTER.md`.

## Source

The user supplied a complete design-system spec verbatim ("Recent Design" —
a minimalist curation-platform system: monochrome palette, Inter
typeface, pill controls, 24px card radius, hairline borders, no accent
color, no dark panels, no heavy shadows). It was written for a different
content model (sidebar + masonry gallery + job listings), not a PDP — the
user confirmed: keep Lifework's existing PDP copy/layout, re-skin with
this system's tokens.

## Token mapping (spec → app)

| App token | Value | Spec source |
|---|---|---|
| `--background` | `#FFFFFF` | `colors.surface` |
| `--foreground` | `#000000` | `colors.primary` / `on-surface` |
| `--card` | `#FFFFFF` | `colors.surface` |
| `--secondary` | `#202020` | `colors.secondary` |
| `--muted` | `#F0F0F0` | `colors.tertiary` |
| `--muted-foreground` | `#B8B8B8` | `colors.muted` |
| `--border` | `#0000001F` | `colors.border` |
| `--destructive` | `#D64B4B` | `colors.error` |
| Radius (buttons/chips/badges) | `9999px` | `rounded.full` |
| Radius (cards) | `24px` | `rounded.xl` |
| Radius (plan-select rows) | `16–24px` | `rounded.lg`/`xl` (treated as small cards, not pills — see below) |
| Type | Inter, all weights/sizes | `typography.*` used near-verbatim |

## Deliberate adaptations (documented, not silent deviations)

- **Primary CTA color.** The spec's literal `button-primary` token is a
  light-gray pill (`tertiary` fill, black text) — correct for the
  system's everyday browser controls (nav pills, filter chips, "View
  Study" links), and used verbatim for those. But the spec also names
  `colors.primary` (`#000000`) as reserved for "the strongest contrast
  moments," and a full-width "Start Your Lifework" purchase button *is*
  that moment on a PDP. So the one money CTA uses solid black / white
  text (still full-pill radius, still no shadow, still monochrome) while
  every smaller control uses the literal gray `button-primary` spec.
- **Plan-select rows.** The system's pill controls are compact (28px
  tall, `padding: 0 8px`) — too small to hold a plan name, subcopy, and
  price. Those rows are treated as small `card`-style surfaces (24px
  radius, white, hairline border) instead of forcing them into a literal
  pill, per the spec's own "cards use larger 24px corner radius" rule.
- **Footer stays light.** Both earlier variants used an inverted-dark
  footer; this system's "Don't introduce dark panels" rule overrides that
  precedent here — the footer is white/hairline-bordered like the rest of
  the page.
- **No accent color.** Per "Don't overuse accent colors; stay mostly
  monochrome," the coral/oxblood accents from the other two variants are
  dropped entirely. Section eyebrows, active tabs, and small emphasis use
  `secondary` (#202020) or `primary` (#000000), never a hue.
- **Typography scale used as specified**, including headline-display
  capped at 24px — small for a marketing hero by ecommerce convention,
  but that is the system's own scale, applied faithfully rather than
  inflated to look more "landing-page-typical."

## Structural notes

- Section separation: whitespace + occasional `tertiary`/`neutral` tint
  band, no hairline rules between blocks (matches the "airy," "don't
  crowd with dividers" guidance already validated in `pdp-red.md`'s
  correction pass).
- Chips (`chip` token) used for stressor tags and review filters.
- `badge` token (black pill, white text, 20px) used for the "Best Value"
  marker and cart count.
- No sidebar / job-list-item usage — those component tokens don't apply
  to a PDP and are intentionally unused.
