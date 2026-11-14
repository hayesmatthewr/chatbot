import { interpolateColors } from "remotion";
import { worldAt } from "../fieldnotes/theme";

export { worldAt };
export const INTER = "Inter, sans-serif";

// Bright in both worlds (card: start bright). Text is always ink.
export const P = {
  cityTop: "#c6cbce",
  cityBottom: "#9aa1a4",
  forestTop: "#c3cebe",
  forestBottom: "#98a893",
  ink: "#15171a",
  clay: "#f3f1ec",
  stress: "#e2552a",
  stressText: "#5c1a08",
  calm: "#5f8c63",
  calmLight: "#9dbf98",
  neutral: "#a3a6a8",
  pending: "#2b2f33",
};

export const fg = (_w: number) => P.ink;
export const accent = (w: number) => interpolateColors(w, [0, 1], [P.neutral, P.calm]);
