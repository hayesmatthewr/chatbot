import { interpolateColors } from "remotion";
import { worldAt } from "../fieldnotes/theme";

export { worldAt };
export const INTER = "Inter, sans-serif";

export const P = {
  cityTop: "#eceeef",
  cityBottom: "#d1d5d7",
  forestTop: "#22362a",
  forestBottom: "#111c15",
  ink: "#141618",
  paper: "#efede8",
  clay: "#f2f0ea",
  stress: "#e8572a",
  calm: "#a9c7a2",
  neutral: "#9c9fa1",
};

export const fg = (w: number) => interpolateColors(w, [0, 1], [P.ink, P.paper]);
export const accent = (w: number) => interpolateColors(w, [0, 1], [P.neutral, P.calm]);
