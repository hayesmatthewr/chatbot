import { prog } from "../lib/anim";
import { SANS } from "../lib/constants";
import { GROUPS } from "./words";

/** Karaoke-style captions: the phrase appears, each word inks in as it is spoken. */
export const WordCaptions = ({ s }: { s: number }) => {
  const idx = GROUPS.findLastIndex((grp) => s >= grp[0].t - 0.12);
  if (idx < 0) return null;
  const grp = GROUPS[idx];
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        right: 110,
        top: 1107,
        transform: "translateY(-50%)",
        textAlign: "center",
        fontFamily: SANS,
        fontSize: 25,
        lineHeight: 1.12,
        letterSpacing: "-0.015em",
        color: "#1d1f20",
      }}
    >
      {grp.map((x, i) => {
        const p = prog(s, x.t - 0.04, x.t + 0.14);
        return (
          <span key={i} style={{ opacity: 0.28 + 0.72 * p }}>
            {x.w}
            {i < grp.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};
