# Amicro

Micro-interaction primitives from [`@subhanhq/amicro`](https://github.com/Subhan-code/Amicro--Micro-transitions-)
(MIT), installed via its shadcn registry (`shadcn add @amicro/<name>`). Built
on `framer-motion`. Live demo of every block: `/amicro-kit`.

## Components

| Component | File | Category |
|---|---|---|
| `FadeIn` | `fade-in.tsx` | entrance |
| `FadeUp` | `fade-up.tsx` | entrance |
| `FadeDown` | `fade-down.tsx` | entrance |
| `ScaleIn` | `scale-in.tsx` | entrance |
| `SlideLeft` | `slide-left.tsx` | entrance |
| `SlideRight` | `slide-right.tsx` | entrance |
| `ZoomIn` | `zoom-in.tsx` | entrance |
| `CardHover` | `card-hover.tsx` | hover |
| `GlowButton` | `glow-button.tsx` | hover |
| `MagneticButton` | `magnetic-button.tsx` | hover |
| `TiltCard` | `tilt-card.tsx` | hover |
| `BlurText` | `blur-text.tsx` | text |
| `CharacterStagger` | `character-stagger.tsx` | text |
| `TextReveal` | `text-reveal.tsx` | text |
| `WordReveal` | `word-reveal.tsx` | text |
| `ScrollReveal` | `scroll-reveal.tsx` | scroll |
| `StickyReveal` | `sticky-reveal.tsx` | scroll |
| `ProgressIndicator` | `progress-indicator.tsx` | scroll |
| `Spotlight` | `spotlight.tsx` | cursor |
| `MagneticWrap` | `magnetic-wrap.tsx` | hover (adapted, see below) |

Not installed: the `card-*` arc/carousel layouts (CLI-only, not in the
shadcn registry), `cursor-trail` / `mouse-follow` (novelty cursor effects,
low fit for a commerce page), and `page-transition` (assumes a Next.js
Pages-Router-style route transition wrapper this app's App Router doesn't
use the same way).

## Fixes applied

The upstream registry source ships without `"use client"` — every file here
uses hooks or `motion` components, both of which require it in the App
Router. Added to all 19 files on install.

Real bugs fixed in the upstream source:
- **`progress-indicator.tsx`** — had two `style` props on the same
  `motion.div` (a duplicate-JSX-attribute error); merged into one.
- **`blur-text.tsx`, `character-stagger.tsx`, `text-reveal.tsx`,
  `word-reveal.tsx`** — the `visible` variant objects weren't typed as
  `Variants`, so TS widened `ease`/`type` fields to `string`/`number[]`
  instead of the literal union framer-motion expects. Explicitly typed each
  as `Variants`.
- **`magnetic-button.tsx`, `tilt-card.tsx`** — unused `position`/`isHovered`
  state left over from an earlier version of the component; removed.
- **`tilt-card.tsx`, `card-hover.tsx`, `sticky-reveal.tsx`** — referenced
  Tailwind shades that don't exist in the default palette (`neutral-250`,
  `neutral-850`, `slate-350`, `neutral-450`), which silently generate no
  CSS. Remapped to the nearest real shade (`-200`/`-800`, `-300`, `-400`).

## `MagneticWrap` — not from upstream

`MagneticButton` and `GlowButton` hardcode their own look (`bg-neutral-900`,
etc.), which fights any themed button rather than adapting to it — fine for
a demo, wrong for a real page with its own brand colors. `magnetic-wrap.tsx`
lifts just the cursor-attraction math from `MagneticButton` into a bare
`<motion.div>` wrapper with no styling of its own, so it can wrap any
existing themed button/link without a color conflict.

## Usage

```tsx
import { ScrollReveal } from "@/components/amicro/scroll-reveal";
import { TextReveal } from "@/components/amicro/text-reveal";

<ScrollReveal><YourSection /></ScrollReveal>
<TextReveal text="Headline copy" />
```
