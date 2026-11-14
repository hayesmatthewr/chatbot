// Every feature is a switch. Switch off, never delete.
export const CONFIG = {
  /** Room-environment reflections (PMREM). Off = flat ambient only. */
  envLighting: true,
  /** Physically based glass on the vials (transmission). Off = simple transparent shell. */
  glassTransmission: true,
  /** Cortisol particles around the core. */
  particles: true,
  /** Small uppercase labels anchored to 3D objects. */
  labels: true,
  /** On-screen honesty tag while unverified study claims are shown. */
  citationTag: true,
  /** Participants as mannequin figures (failed two critic rounds) — off = clay pebbles. */
  figures: false,
  /** City/forest scale models (failed four critic rounds as "toy") — off = routes only, on a bare floor. */
  dioramas: false,
  /** Word-by-word captions. */
  captions: true,
  /** Tone-mapping exposure (ACES Filmic, set by the studio owner only). */
  exposure: 1.0,
} as const;
