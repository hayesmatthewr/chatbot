import { interpolateColors } from "remotion";
import { prog } from "../lib/anim";
import { C, NOTE, worldAt } from "./theme";
import { GROUPS } from "./words";

/** Low mono captions; each word inks in (green in the forest, orange in the city) as it is spoken. */
export const NoteCaptions = ({ s }: { s: number }) => {
  const idx = GROUPS.findLastIndex((grp) => s >= grp[0].t - 0.12);
  if (idx < 0) return null;
  const w = worldAt(s);
  const base = interpolateColors(w, [0, 1], [C.ink, C.paper]);
  const hit = interpolateColors(w, [0, 1], [C.orange, "#b9d4a6"]);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 1150,
        textAlign: "center",
        fontFamily: NOTE,
        fontSize: 23,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
        color: base,
      }}
    >
      {GROUPS[idx].map((x, i, arr) => {
        const p = prog(s, x.t - 0.04, x.t + 0.14);
        const fresh = 1 - prog(s, x.t + 0.25, x.t + 0.7);
        return (
          <span key={i} style={{ opacity: 0.3 + 0.7 * p, color: p > 0 && fresh > 0.5 ? hit : undefined }}>
            {x.w}
            {i < arr.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};
