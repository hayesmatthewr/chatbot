# Report — Field Notes 3D, pass 2

**What was built:** a 29.3 s 9:16 clay 3D film in Remotion + React Three Fiber, Inter type, bright two-tone backdrop (cool grey city ⇄ pale sage forest), one studio (warm key, cool fill, rim, softbox reflections, ACES), every state a pure function of time. Beats: clay knot → line; 12 pebbles; two routes (city / forest); three glass vials with a city cut; inflated clay heart with heart-rate line and cortisol stream; "reset."

**What was cut:** city/forest scale models (toy after four critics); mannequin participants (after two); 16:9 version; music-only twin (the supplied track has music baked into the voice); AI-video restyle; ElevenLabs.

**Measured:**
- Text contrast (computed, WCAG): headline/caption ink 6.9–7.6:1; unspoken caption grey 5.1–5.7:1; stress labels 5.0–5.6:1; all on the darkest backdrop tone they sit over.
- Camera elevation 35–42° in every key (by construction in `camera.ts`).
- Render: ~5–10 min for the full film at 1080×1920 with software WebGL (`--gl=swangle`).

**Not measured:** subject fill per beat (only judged by critics); frozen-time duration (camera drifts continuously by construction, not measured on the file); no blind A/B against real references — none were supplied.

**Critics:** five rounds, **never said yes**. Final open faults are listed in STATUS.md. The routes beat that replaced the cut models was not seen by any critic.

**Nobody checked:** the mix (critics can't hear; the voice track is used as supplied); the study claims (unverified — tagged on screen).
