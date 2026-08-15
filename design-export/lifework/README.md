# Lifework Design System — Claude Design import bundle

Self-contained HTML previews of the Lifework Cellular Protection design system.
Every file is standalone (inline CSS, no build step, no external assets), so each
one can be opened, pasted, or uploaded on its own.

## What's here

**Foundations**
| File | Contents |
|---|---|
| `foundations/colors.html` | Full palette with hex values and the role each color plays |
| `foundations/type.html` | Inter type scale, weights, and the mono/tabular-nums data treatment |
| `foundations/principles.html` | Design principles, 8px spacing scale, radii |

**Components**
| File | Contents |
|---|---|
| `components/buttons.html` | Primary CTA, inverse CTA, text links, filter/tab pills, badges |
| `components/plan-picker.html` | Three-tier subscription selector with selected state and trust row |
| `components/clinical-chart.html` | Hero study chart — dotted gridlines, error bars, delta annotation |
| `components/comparison-table.html` | Two-tab comparison with nuanced cells and red-tint column |
| `components/accordion.html` | Six-category single-open benefits accordion |
| `components/timeline.html` | Five-stage Day 1 → Week 12+ progression |
| `components/editorial-cards.html` | Look/Feel/Perform pillars + full-bleed stressor cards |
| `components/reviews-faq.html` | Review cards, quality matrix, FAQ accordion |

## The system in short

- **Brand red `#B3392C`** and **Inter** were extracted from the live Lifework page, not invented.
- **Seed** informs the typographic restraint: one family, hierarchy from weight, hairline borders instead of shadows, generous whitespace.
- **ARMRA** informs the single-open benefits accordion that expands one ingredient across six body systems.
- **Timeline** informs the clinical chart conventions (dotted gridlines, error bars, one delta annotation) and the nuanced comparison table — never binary green-check vs red-X.
- Red is earned: CTAs, active states, proof numbers, eyebrow labels. Nothing decorative.

## Compliance rules baked in

- Every structure/function claim keeps its trailing `*`.
- Review bodies render literally as `[verified customer review]` — no fabricated testimonials.
- Unconfirmed study values stay bracketed (`[Result]`, `[Dosage]`, `[Participants]`) pending science/regulatory sign-off.

## Getting this into Claude Design from an iPad

1. Open **claude.ai/design** in Safari and create a project (or open an existing one).
2. Attach the files from this folder — start with the three `foundations/` files so the
   tokens land first, then the `components/` files.
3. Ask Claude Design to build the system from them, e.g.
   *"Build a design system from these files. Use colors.html and type.html as the token
   source of truth, and turn each component file into its own component."*

The `<!-- @dsCard group="..." -->` comment on line 1 of each file is what Claude Design
reads to group cards into **Foundations** and **Components** in the Design System pane.
