# DECISIONS — Field Notes 3D

1. **Bright world in both states.** Card: "start bright… dark openers get turned down." Forest is now pale sage mist, not dark moss; city stays cool light grey. Text is always ink (contrast).
2. **One studio for every shot.** RoomEnvironment reflections + one key sun (upper right) + soft fill, ACES Filmic, single exposure in `config.ts`. Owner: `Studio` in `FieldNotes3D.tsx`.
3. **Camera 35–42° elevation everywhere**, framed by target / distance / elevation / azimuth so each subject fills 60–85 % of width.
4. **Less toy, more object.** Physical clay (sheen + light clearcoat), real glass on vials, rounded-edge city blocks, clustered rounded tree canopies instead of cones.
5. **Captions reveal word by word** at full contrast instead of dimmed unspoken words.
6. **Honesty:** study unverified → "STUDY CITATION PENDING" tag, no numbers on vials.
7. **Sound:** picture rendered silent (`--muted`), voice track muxed offline. No music-only twin is possible: the supplied track has music baked into the voice.
8. **Cut:** 16:9 version, AI-video restyle, ElevenLabs (not in this pass).

## Pass-2 decisions during the critic loop
9. **Participants: figures → pebbles** (round 3). Peg/mannequin figures failed two critics; switch `figures` kept in `config.ts` (off).
10. **City/forest scale models cut** (after round 5). Failed four critics as "toy"; replaced by two routes on a bare floor — angular orange (city) vs soft meander (sage, forest). Switch `dioramas` kept (off).
11. **Backdrop moved into the 3D scene** (round 3) so glass refracts something; studio env gained two softbox strips for vertical highlights (round 4).
12. **Light reworked** (round 5): warm key ~45°, cool fill ≈1:3, cool rim from behind; env and hemisphere turned down; darker mid-tone backdrop. Text greys re-measured ≥5:1.
13. **Heart: extrusion → inflated sphere-deformed volume** (round 5).
