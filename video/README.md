# Born To Run? (Remotion recreation)

A Remotion rebuild of the 38s vertical explainer. It uses the original voiceover, and placeholder art stands in for the photos and clips.

```bash
npm install
npm run studio                      # live preview at localhost:3000
npx remotion render BornToRun out/born-to-run.mp4 --scale=1.5   # 1080x1920
```

In a sandbox without Remotion's own browser, set `REMOTION_BROWSER` to a Chrome headless shell binary.

## How it's built

- Layout is authored at 720x1280 (the source resolution) and rendered at 1.5x.
- Every scene reads **absolute time in seconds** (`s`), so each timing matches the original edit and the voiceover 1:1.
- `src/lib/anim.ts`: `tween` / `prog` / `reveal` helpers and the easing curves used throughout.
- `src/components`: captions (cue list), chapter pill nav, word-stagger text, placeholders, icons.
- `src/scenes`: Intro → Map (real Natural Earth data via `world-atlas` + `d3-geo`) → Legs → BurnFat → Enzyme → Altitude.

## Swapping in real assets

Put files in `public/` and replace the `<Placeholder>` / `RunnerCutout` / `LegArt` / `Micrograph` stand-ins
with `<Img src={staticFile("...")} />` or `<OffthreadVideo src={staticFile("...")} />`.
