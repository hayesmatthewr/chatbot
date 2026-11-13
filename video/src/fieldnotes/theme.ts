import { interpolateColors } from "remotion";

export const DISPLAY = "Fraunces, serif";
export const NOTE = "'IBM Plex Mono', monospace";

export const C = {
  concrete: "#c9c9c6",
  concreteDeep: "#b4b4b0",
  ink: "#151515",
  orange: "#e8572a",
  moss: "#1f3a2b",
  mossDeep: "#15291e",
  sage: "#a9b8a0",
  paper: "#efeadf",
};

/** World state: 0 = city, 1 = forest. Every colour that flips between worlds reads from this. */
export const worldAt = (s: number) => {
  const ramp = (a: number, b: number) => Math.min(1, Math.max(0, (s - a) / (b - a)));
  const ease = (t: number) => t * t * (3 - 2 * t);
  if (s < 4.3) return 0;
  if (s < 17.26) return ease(ramp(4.3, 5.1));
  if (s < 19.2) return 0;
  if (s < 20.5) return ease(ramp(19.2, 19.8));
  if (s < 26.1) return 1 - ease(ramp(20.5, 21.0));
  return ease(ramp(26.1, 27.4));
};

/** Foreground colour: ink on concrete, paper on moss. */
export const fg = (w: number) => interpolateColors(w, [0, 1], [C.ink, C.paper]);
