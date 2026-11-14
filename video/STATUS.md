# STATUS — Field Notes 3D (pass 2, threejs-motion card)

**Percent done: 95%** (final render + report delivered; critics never said yes — see below)

## Brief (decided by the builder — user away)
- Motion video, 29.3 s, **9:16 1080×1920** only. Shown on the user's short-form feed.
- Bar: premium minimal clay/product-style 3D. **No reference footage supplied** — targets below are builder-set, not measured from a reference.
- Facts: `facts/field-notes.md` (nothing verified → "STUDY CITATION PENDING" on screen).
- Type: Inter only. Palette: ink / clay / sage / one stress orange.

## Rebuild command
```bash
cd video && REMOTION_BROWSER=<chrome-headless-shell> npx remotion render FieldNotes out/fn.mp4 --gl=swangle --muted --scale=1.5 \
  && ffmpeg -i out/fn.mp4 -i public/audio3/voiceover-3.m4a -map 0:v -map 1:a -c:v copy -c:a aac -shortest renders/field-notes-3d.mp4
```

## Critic loop (fresh subagent each round, stills only, fixed form)
| Round | Verdict | Biggest gap named |
|---|---|---|
| 1 | no | stock primitives, flat material — reads as CG |
| 2 | no | vials = dead glass |
| 3 | no | toy people/trees; dead glass |
| 4 | no | flat light, white-on-pale |
| 5 (cap) | no | city/forest scale models still toys, low small framing |

After round 5 the scale models were **cut** (card: weak part after two critics is cut). That cut was not re-checked by a critic.

## Open faults (named by round-5 critic, not fixed)
- Heart: pinched seam at the bottom tip and cusp, faint streaky grain.
- Light still reads soft on white subjects (knot, pebbles); pebbles lack strong contact shadow.
- Vials: two-tone liquid band; refraction weak.
- A dark tube end can show on the knot at frame zero.
- Pebble grid ~22% of frame height.

## Next
- Get references (the bar) and real study facts; then a fresh critic round with blind A/B against references.
