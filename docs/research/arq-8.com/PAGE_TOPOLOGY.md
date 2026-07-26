# Page Topology — arq-8.com/products/arq8-creatine-monohydrate-gummies

Source: Shopify theme (Online Store 2.0, section-based). 22 top-level sections,
top to bottom. Scroll container is the native document (no smooth-scroll lib
detected — no `.lenis`/`.locomotive-scroll` markers found).

| # | Section id (theme handle) | Working name | Height (1440px) | Notes |
|---|---|---|---|---|
| 1 | `header_top_bar` | Announcement bar | 34 | Sticky-with-page, yellow bg, rotating/static promo text |
| 2 | `header_2` | Site header/nav | 36 (collapsed) | Logo, nav links, account/cart icons. Likely sticky on scroll (Shopify "header-2" pattern) |
| 3 | `sicom-cart-drawer` | Cart drawer | 0 (hidden overlay) | Out of scope — real cart backend |
| 4 | `product_info` | Hero: gallery + purchase box | 1424 | Complex — media gallery/carousel, price, variant picker (flavor + pack size), subscribe/one-time toggle, free-gift bullets, add-to-cart, mini FAQ accordion. Split into sub-components. |
| 5 | `backed` | "Clinicians' Choice" / trust logos row | 581 | Badge + heading + logo strip |
| 6 | `before_after_product` | "Creatine works when it's taken daily." | 671 | Image + heading + body copy + CTA |
| 7 | `scrolling_line` | Marquee ticker | 19 | Infinite horizontal scroll of small product images, CSS animation |
| 8 | `modern_redesign` | "Creatine gummies that actually taste good." | 646 | Image + heading + copy + CTA |
| 9 | `sicom_tastes_good` | (paired with #8, flavor imagery) | 671 | Product jar/flavor shot |
| 10 | `four_ingridients` | "Four ingredients. Chosen with purpose." | 808 | Radial/orbit diagram with 4 ingredient labels around central image |
| 11 | `sicom_leave_out` | "What we leave out." | 299 | Two-column list (leave out vs. what's included) |
| 12 | `pdp_video_reviews` | "Hear from people who use it every day." | 812 | Testimonial carousel (video/photo + quote), swiper-driven |
| 13 | `myth_pdp` | "Clinical facts over common myths." | 390 | Accordion list of myth/fact rows |
| 14 | `benefits` | "Different lives. One foundation." | 556 | Lifestyle photo grid (5 images) with captions |
| 15 | `tested` | "Built with precision. Verified with care." | 581 | Checklist + portrait image |
| 16 | `scientist` | "Backed by longevity scientists." | 735 | Dark section, scientist portrait + quote |
| 17 | `comparisons_new` | "The difference is clear." | 833 | Comparison table: Arq8 vs. generic vs. store-bought |
| 18 | `design` | "Simple by Design" | 789 | 3-card row (JS-populated in live site — cards were empty in static render, need runtime data) |
| 19 | `certificate` | "Try Arq8™ risk-free for 30 days." | 342 | Full-bleed CTA banner, dark bg |
| 20 | `faq` | "Questions? We've got answers." | 542 | Accordion FAQ list |
| 21 | `reviews_user` / `sicom_product_stick` | Reviews widget mount / sticky add-to-cart bar | 0 (JS-injected) | Out of scope — third-party (Judge.me) + sticky ATC bar low-priority |
| 22 | `footer_2` | Footer | 762 | Logo, link columns, newsletter, social icons, legal links |

## Layout / global notes
- No global smooth-scroll library.
- Header (`header_2`) is a fixed/sticky nav — confirm exact scroll trigger via interaction sweep.
- Marquee (`scrolling_line`) uses a CSS keyframe animation (`scrolling__items--to-left`), infinite loop, no JS required.
- Primary font: **Geist** (sans-serif fallback) for body, headings, subheading, accent — confirmed via `--font-*--family` CSS custom properties in the theme's inline `<style data-shopify>` block. No external `@font-face` for Geist was found in the captured network requests (theme likely relies on a system-installed/preloaded variable font or a first-party `/cdn/fonts/` path not hit during this capture) — approximate with a comparable geometric sans (e.g. `Geist` via `next/font/google` if available, else Inter as fallback) and verify against the extracted computed `font-family` stack per element in the component specs.
- Color scheme uses a light theme by default (`--color-background: white`, `--color-foreground: near-black`) with select sections (e.g. `scientist`) switching to a dark scheme via a section-level `--color-background: black` override — same page, not a global dark-mode toggle.
