# takesonnet.com/products/core-sleep — Page Topology

Shopify (Horizon-based OS 2.0 theme). Fonts: TT Commons (Regular/Medium/Semibold/Bold, self-hosted .otf).

Palette (from theme CSS custom properties):
- Navy / primary text & dark panels: `#221D35`
- Blue (announcement bar, footer, chart accents): `#345E9E`
- Cream / warm background: `#EEF1EA`
- Terracotta / accent CTA: `#E79E6D`
- Light gray section bg: `#F5F5F5`
- White

Note: the buy-box (variant picker / subscription selector / quantity) and the reviews widget are rendered client-side by theme JS + a third-party reviews app. Headless/automated requests receive server-rendered fallback markup only (a bot-mitigation degrade, confirmed independently of proxy/network — 0 failed requests, no console errors, `no-js` class never flips even after 18s). Real content and CSS class rules were extracted directly from the theme's compiled stylesheet instead of a live screenshot for these two sections.

## Sections, top to bottom

1. **AnnouncementBar** — 2-line rotating strip, blue bg `#345E9E`, white text, emoji bullets ("😴 90K+ Customers Sleeping Better", "📦 Free Shipping + 30-Day Guarantee"). Static (no JS needed to fake rotation — build as simple stacked/marquee).
2. **Header** — sticky. Wave-logo "sonnet" wordmark + nav (Core Sleep, Sleep + Calm, Sleep + Restore, FAQs, Research) + account/cart icons. White bg.
3. **ProductHero** — 2-col grid. Left: product image gallery (bottle photo, swappable). Right: buy box — H1 "Core Sleep", subtitle copy, Safe/Effective/Tailored bullet row, Formula selector (radio pills: Core Sleep / Sleep + Calm / Sleep + Restore), Container selector (Bottle / Pouch pill buttons), Subscribe & Save 10% vs One Time Purchase (radio cards with price), delivery frequency select, quantity stepper, "Add to Bag" button (navy, full width), trust badges row, press-quote carousel (People/Yahoo/Forbes logos + quotes), Sleep Foundation award badge.
4. **SupplementFactsIngredients** — dark navy full-bleed panel, 2-col: Supplement Facts label panel + "Clinically Studied Ingredients" accordion list (Venetron, Valerian Root, Sensoril Ashwagandha, GABA) each with a round icon, expandable ("tap any ingredient to expand").
5. **TestimonialSplit** — cream bg, 2-col: bottle product shots left, big quote "I've suffered from tossing and turning for years now. Now I can't wait to go to sleep!" — Jason, restless sleeper ★★★★★, with "0% groggy / 100% recharged" callouts.
6. **IngredientsChart** — cream bg, 2-col: copy "Natural, clean ingredients that build benefits over time" + horizontal bar chart (Feeling Refreshed / Energized Throughout / Feeling Restful) comparing 30 days vs 90 days.
7. **WhenToTakeAndFAQ** — 2-col cream cards: "When should I take Core Sleep? / How long does it take to work?" copy card, and "FAQ" accordion card (habit-forming?, how will it feel?, when to expect results?, what's inside?).
8. **ReviewsSection** — overall rating (4.6/5, 217 reviews), "AI Generated Review Summary" paragraph + weighted "Summary topics" list, 3 pull-quote highlights, grid of 9 individual review cards (title, body, author, star rating).
9. **CommitmentBanner** — 2-tone full-bleed strip: blue half "Our Commitment… Our Research →", terracotta half "Happiness Guarantee… Contact Us →".
10. **NewsletterSignup** — navy full-bleed, "Exclusive Benefits" + email capture input/arrow button.
11. **Footer** — navy, giant wave "sonnet" wordmark, Explore + More link columns, social icons (Facebook/Instagram/Twitter), FDA disclaimer text, copyright, Terms/Privacy links.

## Interaction models
- Announcement bar: static list (site likely rotates via JS marquee; build as simple 2-line stack, acceptable simplification).
- Header: sticky on scroll (`position: sticky`), no shrink/hide behavior observed in theme CSS.
- Buy box: click-driven (radio pills for formula/container/purchase-type swap price display); built as controlled React state, not scroll-driven.
- Ingredients accordion: click-to-expand.
- FAQ: click-to-expand accordion.
- Reviews: static list, "Q&A" is an external link (not built).
- Everything else: static content, no scroll-triggered animation observed in theme CSS beyond standard fade-in-on-view utility classes (not critical to replicate for a design mockup).

## Assets
- Fonts: `public/fonts/sonnet/TT-Commons-{Regular,Medium,Semibold,Bold}.otf`
- Images: `public/images/sonnet/*` (bottle photos, supplement-facts card, ingredient info cards, badge icons, press logos not downloaded — used text/inline SVG substitutes since press logos weren't in the CDN image list)
- Logo: `public/images/sonnet/Logo.png`, `Logo_1.png` (footer wordmark)
