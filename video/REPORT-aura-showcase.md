# Report: Aura showcase

**Source:** the "Aura PDP - Test 1" artifact, rendered offline in headless Chromium at 390 px (3×). Full page, sections and components were captured from the live markup. Sticky/fixed chrome is hidden in the component captures.

**Built:** a 30 s, 1920×1080, silent film (`AuraShowcase`). It has no added text: the only type on screen is the site's own. Beats:
1. A phone on a deep wine studio backdrop settles and scrolls the page.
2. The phone moves aside as the pricing card, checklist and photo tiles float out.
3. An isometric spread of five sections.
4. A floating wall of components (charts, comparison table, reviews, expert, 85+ studies) with parallax columns.
5. Three phones scroll different chapters.
6. A full-resolution pouch close-up hands off to the final section on one phone.

**Technique:** Remotion with CSS 3D. Device and cards are DOM elements, so the site renders razor-sharp with no WebGL. Every state is a pure function of time.

**Critic loop:** two rounds (the cap for a small piece). Neither said yes.
- Round 1 (no): blurry frame zero, flat phones, a broken screen mask, a cluttered isometric spread, cropped cards. All addressed. Root causes found: an 18k-px image under 3D transforms, and coplanar layers depth-sorting under `preserve-3d`.
- Round 2 (no): one blocking fault, a soft pouch close-up (caused by upscaling). Fixed afterwards with the 3× source, plus a single-hero ending, stronger floor shadows, a brighter key pool and a five-slab isometric spread. **These final fixes were not re-checked by a critic.**

**Open (named by the critics, not fully fixed):**
- The isometric slabs still read small in frame.
- Glass reflection is a static sheen; it doesn't move with the camera.
- The backdrop is one lit set throughout, not varied per beat.

**Not done:**
- No 9:16 cut.
- No music bed (silent by request).

**Rebuild:** `cd video && npx remotion render AuraShowcase renders/aura-showcase.mp4 --muted`
