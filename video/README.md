# Remotion explainer videos

Three compositions: `BornToRun` and `Overridden` share the grey editorial kit; `FieldNotes` has its own city ⇄ forest style.

## Field Notes

A 29s piece built from `public/audio3`. A world value (0 = concrete city grid, 1 = moss forest with generative
contour lines) drives every colour, and one morphing line runs through it all: knot → nerve pulse → walking routes →
heart-rate trace → calm wave. Timings live in `src/fieldnotes/words.ts`; the world timeline is in `src/fieldnotes/theme.ts`.

```bash
npx remotion render FieldNotes out/field-notes.mp4 --scale=1.5
```

## Overridden

A 20s doom-scrolling explainer built only from the second voiceover (`public/audio2`). It reuses the pill nav,
diamonds, bands and caption style. Word-level Whisper timings in `src/overridden/words.ts` drive both the karaoke
captions and every animation cue (`at("word")`). The citation card is a placeholder until the real study details are added.

```bash
npx remotion render Overridden out/overridden.mp4 --scale=1.5
```

## Born To Run? (Remotion recreation)

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
