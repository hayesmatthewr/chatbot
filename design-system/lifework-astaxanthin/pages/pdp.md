# Page Override: Product Detail Page (PDP)

> Overrides `design-system/lifework-astaxanthin/MASTER.md` for this page only,
> per that file's own override rule.

**Source wireframe:** `Lifework_PDP_Wireframe_standalone_2.html` (content + section
order + copy taken verbatim; all imagery left as labeled placeholders per the
wireframe's own bracketed slots).

## Why this overrides the auto-generated Master

The base `--design-system` run matched this brief to **Liquid Glass** (gold +
near-black, Cormorant/Montserrat) — a luxury-fashion pairing. The source
wireframe is a dense, data-forward clinical PDP (comparison table, study
stat blocks, tabbed clinical evidence, checkmark feature lists), so it was
re-matched by hand against two better-fitting catalog entries and one brand
fact from the copy itself ("a deep red antioxidant"):

- **Style** → `minimalism-and-swiss-style` (`--domain style`, query: "clinical
  science-backed supplement, editorial, trustworthy, data-driven, Swiss
  grid"): high contrast, geometric, grid-based, essential — matches the
  wireframe's structure exactly.
- **Typography** → `Medical Clean` pairing (`--domain typography`, query:
  "modern clean sans-serif, wellness, science, trustworthy DTC"): Figtree +
  Noto Sans, "clean, accessible fonts for medical contexts." Collapsed to
  **Figtree only** (heading + body, varied weight) for a tighter, more
  premium-DTC feel than a two-family pairing.
- **Accent color** → none of the six `--domain color` catalog rows fit a
  premium supplement brand (they skew clinical-blue/pharmacy-green/luxury-
  gold); the accent below is a deliberate deviation, keyed to the copy's own
  "deep red antioxidant" line rather than a catalog row.

## Colors

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#171310` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#57534E` | `--color-secondary` |
| Accent/CTA | `#C13B23` | `--color-accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Background | `#FBFAF7` | `--color-background` |
| Foreground | `#171310` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Muted | `#F1EEE7` | `--color-muted` |
| Muted Foreground | `#57534E` | `--color-muted-foreground` |
| Border | `#E4DFD3` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#171310` | `--color-ring` |

## Typography

- Heading + body: **Figtree** (weights 400–800)
- Numerals/labels (study stat blocks, "01/02/03"): Figtree, tabular where possible

## Layout notes carried from the wireframe

- Alternating white / warm-muted section backgrounds, same order as source.
- Every `[bracketed]` label in the wireframe is a real placeholder in the
  build — dashed-border panel with the label centered, no stock imagery.
- Purchase box keeps the two-tier radio layout (4-week vs. 12-week/Best
  Value) with the 12-week option pre-selected, matching the wireframe.
- Clinical-evidence tabs and FAQ accordion are interactive, matching the
  wireframe's implied behavior (tab switch, expand/collapse).
