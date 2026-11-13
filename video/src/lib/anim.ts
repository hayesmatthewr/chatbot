import { Easing, interpolate } from "remotion";

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.8, 0.3);
export const LINEAR = (t: number) => t;

type Ease = (t: number) => number;

/** Clamped tween of a value between two timestamps (seconds). */
export const tween = (
  s: number,
  start: number,
  end: number,
  from: number,
  to: number,
  easing: Ease = EASE_OUT,
) =>
  interpolate(s, [start, end], [from, to], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** 0 → 1 progress between two timestamps. */
export const prog = (s: number, start: number, end: number, easing: Ease = EASE_OUT) =>
  tween(s, start, end, 0, 1, easing);

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** The soft "blur + fade + rise" reveal used for nearly every text element. */
export const reveal = (p: number, rise = 14, blur = 10): React.CSSProperties => ({
  opacity: p,
  filter: p >= 1 ? undefined : `blur(${(1 - p) * blur}px)`,
  transform: `translateY(${(1 - p) * rise}px)`,
});
