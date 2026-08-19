# Commerce Kit

Reusable DTC ecommerce blocks, sourced from the `@shadcnblocks` shadcn
registry (`shadcn add @shadcnblocks/<name>`) and adapted to this project's
`base-nova` (base-ui) shadcn style — the registry's source targets the more
common Radix-based shadcn style, so a few components needed API fixes (see
below). Live demo of every block: `/commerce-kit`.

## Components

| Component | File | Registry source |
|---|---|---|
| `AnnouncementBar` | `AnnouncementBar.tsx` | `@shadcnblocks/announcement-announcement-standard-1` |
| `CartDrawer` | `CartDrawer.tsx` | `@shadcnblocks/drawer-drawer-right-4` |
| `ProductGallery1` | `ProductGallery.tsx` | `@shadcnblocks/product-gallery1` |
| `ProductDetail1` | `ProductDetail.tsx` | `@shadcnblocks/product-detail1` |
| `ProductQuickView4` | `ProductQuickView.tsx` | `@shadcnblocks/product-quick-view4` |
| `ProductList1` | `ProductList.tsx` | `@shadcnblocks/product-list1` |
| `ProductCategories1` | `ProductCategories.tsx` | `@shadcnblocks/product-categories1` |
| `ProductSpecs1` | `ProductSpecs.tsx` | `@shadcnblocks/product-specs1` |
| `CompareProducts1` | `CompareProducts.tsx` | `@shadcnblocks/compare-products1` |
| `Faq1` | `Faq.tsx` | `@shadcnblocks/faq1` |
| `Checkout1` | `Checkout.tsx` | `@shadcnblocks/checkout1` |

Supporting primitives landed alongside these in `src/components/ui/`
(accordion, aspect-ratio, badge, card, carousel, checkbox, collapsible,
context-menu, dialog, drawer, field, input, label, radio-group, separator,
table) and in `src/components/shadcnblocks/` (logo, price, quantity-input)
and `src/components/kibo-ui/announcement/`.

## Why not the numbered `product-cardN` / `shopping-cartN` / `testimonialN` blocks

`@shadcnblocks` is a mixed free/paid registry. The plainer, composable
blocks used here install without authentication; the more heavily styled
numbered variants (most `product-card*`, `shopping-cart*`, `testimonial*`,
`pricing*`) require a paid API key (`shadcnblocks.com/dashboard/api`) —
attempting to add one without a key fails with an explicit
"Authentication required for shadcnblocks.com pro blocks" error. None were
installed or paid for.

## Fixes applied for this project's base-ui-based primitives

The registry's block source assumes the standard Radix-based shadcn
`accordion`/`drawer` API, which doesn't match this project's `base-nova`
style:

- **`Faq.tsx`** — removed `type="single" collapsible` from `<Accordion>`;
  the installed `Accordion` (`@base-ui/react/accordion`) defaults to
  single-open-at-a-time already (`multiple` defaults to `false`), so no
  replacement props were needed.
- **`Checkout.tsx`** — same `Accordion`, but controlled: its `value`/
  `onValueChange` expect `string[]`/`(value: string[]) => void` here, not
  the Radix `string`/`(value: string) => void`. Wrapped the existing
  string-based `activeAccordion` state (`value={[activeAccordion]}`,
  `onValueChange={(v) => handleOnValueChange(v[0] ?? "")}`) rather than
  rewriting the surrounding form logic.
- **`CartDrawer.tsx`** — the installed `Drawer` takes `swipeDirection`,
  not `direction`.
- **`ProductQuickView.tsx`** — the block shipped with `<Dialog defaultOpen>`
  and no trigger (fine for a static screenshot on shadcnblocks.com, wrong
  for a real page — it rendered the modal open and blocking on load).
  Removed `defaultOpen` and added a `DialogTrigger` button.
- **`ProductCategories.tsx`** — `title`/`summary`/`image` were typed as
  required despite having working default values at the destructure level;
  changed the prop type to `Partial<ProductCategories>` so the component
  is actually usable without forcing every caller to repeat the defaults.
  Also fixed `alt={image.src}` (a URL as alt text) to `alt={image.alt || title}`.

## Usage

```tsx
import { Faq1 } from "@/components/commerce/Faq";

<Faq1 />
```

Every block ships with working sample data as prop defaults — pass props
to override, or use as-is for a working placeholder.
