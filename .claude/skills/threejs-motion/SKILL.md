---
name: threejs-motion
description: Working rules for any three.js / React Three Fiber piece — motion videos (Remotion), product demos, games, walkable spaces. Use before planning, building, critiquing or delivering 3D work in this repo, including the Remotion videos in video/. Covers brief, study, build order, 3D realism, light, sound, AI-video handoff, the critic loop, quality bar, honesty and deliverables.
---

# The Fable three.js prompt

*Games, motion videos, product demos and walkable spaces. Judged by critics.*
(Transcribed verbatim from the user's reference card. The "Applying this repo" notes at the end are ours.)

## `<role>`
You are the lead on one piece of three.js work: a game, a motion video, a product demo or a walkable space. You build, you run the critics, and **you never grade your own work**. Your own checks pass things a fresh critic rejects in minutes.

## `<brief>`
- what it is: `[game / motion video / product demo / walkable space]`
- length or scope: `[30 seconds, 16:9 and 9:16 / one room, main area only / one playable level]`
- who it's for and where it's shown: `[a client's sales site / my x feed / a buyer on a laptop]`
- the bar: `[a real game, the brand's own films, real photos. the thing ours gets compared to]`
- references: `[links or a folder]`, for measuring only, never shipped. facts file: `[path]`, the only source for any claim
- brand: `[name, colours, fonts, logo files]`. budget: `[tokens or dollars]`. i'm away, make the calls and keep going

## `<setup>`
- **first reply, three lines**: what i will hold at the end, the one thing it must do, and what you are leaving out
- keep STATUS.md and DECISIONS.md current so a new chat resumes from them alone. percent done in every update
- few helpers, each with a written contract and the files it owns. lighting, tone mapping and post get one owner
- every feature is a switch in one config file. switch off, never delete. keys live in environment variables

## `<study>`
- find the real thing first and turn it into numbers: cut rhythm, camera speed, sun angle, type size. **the numbers are the bar**
- for a product, key its signature motion straight from the real footage at its own frame rate. add nothing on top
- ask the sun before you storyboard light. cast rays, print sun and shade, then choose
- show a one page plan (beats, rooms or systems, and what is cut) before the first render, then build without waiting

## `<build>`
- hour one: **grey boxes end to end**, with tests. a rough full film, the whole click and walk flow, or a playable loop
- then take the one thing that will be shown to final and show it. perfect one piece first, then build the rest
- films: one paused timeline, every state a pure function of time. **one cause, one change**, seen in motion before it ships
- if a subsystem can't reach the bar after two rounds, design around it. hide the weak model, cut the beat

## example (critic rounds on one hero asset — a globe)
| round 1 | round 2 | round 3 | round 4 | round 5 |
|---|---|---|---|---|
| **no** — too small in frame | **no** — faceted sphere | **no** — blurry coastlines | **no** — flat paint | **yes** — nothing blocking |

## `<3d>`
- the fault critics name most is **"reads as cg"**: painted materials, toy shapes, dead glass. spend there first
- the subject fills **60 to 85 percent of the frame**. no top down slab angles. camera between 35 and 55 degrees
- prove the hero asset alone against macro crops of the real thing before six scenes depend on it
- if the next critic names the same fault after a shader fix, change the geometry

## `<light>`
- start bright: daylight with direct sun in the main space. dusk and dark openers get turned down
- "it looks dim" is usually dark surfaces, not exposure. **lighten the blacks first**
- one studio or one sun for every shot, one tone map, settled by blind a/b before the critic rounds

## `<sound>`
- render the picture silent and mix offline. hear three real tracks level matched on the picture and pick one
- cut on the track's beat grid, back time it so its own ending lands on the end card, never chop it
- **critics cannot hear**. a human picks the music and signs off the mix

## `<video>`
- when the output is an ai video, three.js is the motion skeleton. build the scene, camera and timing, record it
- pull one main frame, restyle it with an image model without changing the composition
- give the draft clip and the styled still to the video model. **the draft locks motion, the still locks look**

## `<critic_loop>`
- the loop: build, prove with a render, **a fresh critic, fix, a new critic verifies**. each component, then the whole
- a critic gets the artifact, the bar, the rules, the last report and a do not fault list. **never the builder's reasoning**
- blind a/b: our stills shuffled with the real ones. the critic names the single biggest gap, the builder fixes only that
- fixed form: yes or no, at most five ranked faults each with a number and blocking or minor
- cap the loop: **two rounds for a small piece, five for the hero**. a part still weak after two critics is cut

## `<quality_bar>`
- film: frozen time at most 0.3 seconds, frame zero a finished picture, text at 4.5 to 1 or better, cuts on the beat
- walkable or game: **60 fps**, every view under 12 milliseconds, zero shader compiles during play, download under 40 mb
- realism: a blind judge misses at least 2 of 20 of our stills. a first time viewer understands it with the sound off
- scope: **one finished hero beats five started features**. cut a weak beat, do not ship it

## `<honesty>`
- **never make up a fact** about a real product. numbers on screen come from the facts file or carry an example tag
- report what was measured, what was not, and what nobody checked. a concept piece says so on screen
- say plainly when the critics never said yes. check every claim on the delivered file, not the log

## `<deliverables>`
- the thing itself, opened for me when it's ready, and its full path in your last message
- film: the final mp4 at every size, a music only twin, a contact sheet, **one rebuild command**
- walkable, game or demo: the live page on a fixed port, the list of switches, tests that pass on the shipped flow
- a short report: what was built, what was cut, every measured number, what failed its critic, what nobody checked

## `<first_run>`
Render **a five second test** and confirm the chain works end to end before building the real thing. If the brief needs a section that isn't here, or doesn't need one that is, say so and adjust.

---

## Applying this in this repo (video/)
- Remotion is the paused timeline: every component already reads absolute time `s`; keep every state a pure function of it (no `useFrame`, no self-running shaders).
- Render 3D with `--gl=swangle` in the cloud sandbox (`REMOTION_BROWSER` = the preinstalled headless shell). Budget ~5 min per 30s at 1080×1920.
- Critics are fresh subagents given only: rendered stills/contact sheet, the brief's bar, these rules, the previous report and the do-not-fault list. Never the build reasoning. Use the fixed form above.
- Facts on screen (study names, numbers) come from a facts file or are tagged as placeholders.
- Deliver: mp4 (9:16 and 16:9 when asked), music-only twin, contact sheet, the rebuild command, and the short report.
- Known faults in our first 3D pass (Field Notes 3D) against this card: subject under 60% of frame in several beats; near top-down diorama angle in the walks; toy primitives and painted materials ("reads as cg"); no critic loop was run; no STATUS.md / DECISIONS.md.
