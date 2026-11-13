// "The line": one stroke that changes shape through the video. Every shape is N points so they can morph.
export const N = 220;
export type Pt = [number, number];

export const toPath = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

export const morph = (a: Pt[], b: Pt[], p: number): Pt[] => a.map(([x, y], i) => [x + (b[i][0] - x) * p, y + (b[i][1] - y) * p]);

const xs = (i: number, x0 = 40, x1 = 680) => x0 + ((x1 - x0) * i) / (N - 1);
const gauss = (x: number, c: number, w: number, a: number) => a * Math.exp(-(((x - c) / w) ** 2));

/** Overthinking: a tight scribbled knot. */
export const knot = (cx = 360, cy = 600): Pt[] =>
  Array.from({ length: N }, (_, i) => {
    const u = (i / (N - 1)) * Math.PI * 2 * 4.3;
    const r = 70 + 42 * Math.sin(1.7 * u + 0.6) + 18 * Math.sin(4.1 * u);
    return [cx + r * Math.cos(u + 0.5 * Math.sin(2.2 * u)), cy + r * 0.9 * Math.sin(u * 1.06)];
  });

/** Nerve pulse: flat line with travelling spikes at positions `px`. */
export const pulse = (px: number[], y = 600): Pt[] =>
  Array.from({ length: N }, (_, i) => {
    const x = xs(i);
    const d = px.reduce((acc, p) => acc + gauss(x, p, 22, -95) + gauss(x, p + 34, 18, 38), 0);
    return [x, y + d];
  });

const ecgShape = (p: number) =>
  gauss(p, 0.15, 0.04, -12) + gauss(p, 0.28, 0.015, 12) + gauss(p, 0.31, 0.017, -120) + gauss(p, 0.345, 0.02, 45) + gauss(p, 0.56, 0.06, -24);

/** Stressed heart-rate trace, scrolling with `phase` (px). */
export const ecg = (phase: number, y = 700, period = 140): Pt[] =>
  Array.from({ length: N }, (_, i) => {
    const x = xs(i);
    const p = (((x + phase) % period) + period) % period / period;
    return [x, y + ecgShape(p)];
  });

/** Calm, slow wave. */
export const calm = (phase: number, y = 700): Pt[] =>
  Array.from({ length: N }, (_, i) => {
    const x = xs(i);
    return [x, y + 26 * Math.sin(((x + phase) / 330) * Math.PI * 2)];
  });
