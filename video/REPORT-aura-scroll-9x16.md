# Report: Aura scroll film (9:16)

**Built:** `AuraScroll`, a 38 s film at 1080×1920, silent, with no added text. Shot list:
- **0–3.3 s:** open on a phone (modern proportions, Safari chrome), then push in until the site fills the frame.
- **3.3–36 s:** scroll the real site full-screen.
- **Module lifts:** at four holds a module lifts out of its slot. The page behind dims and blurs, and the slot goes deep red.
  - Pricing plan, 5.3–8.4 s.
  - Skin Health chart card, 17.2–19.6 s.
  - Comparison table, 24.8–27.2 s.
  - Review, 32–33.8 s.
- **36–38 s:** pull back to the phone on the final offer.

**The site is a real recording, not screenshots.** `scripts/record-scroll.cjs` scrolls the artifact in Chromium along `scripts/aura-scroll-path.json`, one frame at a time, at 390×693 CSS px (3×). The page's JS clock is a fake clock advanced 1/30 s per frame, and its CSS timeline is slowed to match. So these play exactly as they do live:
- the softgel slide-in on the fingertip (`[data-prog]` → `--p`, scroll 1,820–2,230)
- the "85+" badge
- the chart draw-ins
- the reveal fades
- the canvas blobs

**Critic loop:** two rounds, the cap for this size of piece. Neither said yes.
- **Round 1 (no):**
  - The lifted table had the site header baked in.
  - Lifted modules were seen twice.
  - The dimmed page shrank inside a dark border.
  - The phone was flat.
  - The 22 s stop put the heading under the header.

  All fixed: retimed path, re-recorded, slots, edge-to-edge dim.
- **Round 2 (no, "middle 30 s studio-grade"):**
  - **Phone bookends (blocking):** stubby, ungrounded phone.
  - **Minor:** a red keyline on the crops, lifts too small or flat, a heavy black slot, the table cut mid-module, and the end frame cluttered at the top.

  Fixed after round 2:
  - real phone aspect, side buttons, rim light, contact shadow, Safari chrome, and the page fit to the screen width (never cropped)
  - inset crops masked to each module's radius
  - lifts of at least 1.1× with drop shadows
  - a translucent red slot that covers the whole table
  - a frozen, clean page state for the pull-back

  **These final fixes were not re-checked by a critic.**

**Measured:**
- Recording: 1,140 frames, about 0.42 s each, about 8 min.
- Render: about 2 min.
- Module rects were measured live at each hold (`public/aura/scroll.rects.json`).

**Not done:** music (silent by request). The 16:9 `AuraShowcase` remains as a separate piece.

**Rebuild:**
```bash
cd video
node scripts/record-scroll.cjs sources/aura-pdp.html public/aura/scroll.mp4 scripts/aura-scroll-path.json   # ~8 min
npx remotion render AuraScroll renders/aura-scroll-9x16.mp4 --muted
```
