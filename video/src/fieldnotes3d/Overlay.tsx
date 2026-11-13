import { prog, reveal } from "../lib/anim";
import { GROUPS, at } from "../fieldnotes/words";
import { project } from "./camera";
import { cityMode, VIAL_X } from "./Vials";
import { INTER, P, fg } from "./theme";
import { WALK_ANCHORS } from "./Walks3D";

type HeadlineProps = { s: number; w: number; text: string; t0: number; t1: number; size?: number; top?: number; color?: string };

/** One quiet line of type at a time. Long fades, no bounce. */
const Headline = ({ s, w, text, t0, t1, size = 76, top = 190, color }: HeadlineProps) => {
  const p = prog(s, t0 - 0.1, t0 + 0.7) * (1 - prog(s, t1 - 0.4, t1));
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 70,
        right: 70,
        textAlign: "center",
        fontFamily: INTER,
        fontWeight: 300,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: "-0.045em",
        color: color ?? fg(w),
        ...reveal(p, 14, 10),
      }}
    >
      {text}
    </div>
  );
};

const Label = ({ x, y, text, p, color, align = "center" }: { x: number; y: number; text: string; p: number; color: string; align?: "center" | "left" }) =>
  p > 0 ? (
    <div
      style={{
        position: "absolute",
        left: align === "center" ? x - 120 : x,
        width: align === "center" ? 240 : undefined,
        top: y,
        textAlign: align,
        fontFamily: INTER,
        fontWeight: 500,
        fontSize: 13,
        letterSpacing: "0.24em",
        color,
        whiteSpace: "nowrap",
        ...reveal(p, 6, 6),
      }}
    >
      {text}
    </div>
  ) : null;

export const Overlay = ({ s, w }: { s: number; w: number }) => {
  const col = fg(w);
  const city = cityMode(s);
  const cityLabel = project(s, WALK_ANCHORS.city);
  const forestLabel = project(s, WALK_ANCHORS.forest);
  const walkLabels = 1 - prog(s, 9.2, 9.7);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Headline s={s} w={w} text="stress." t0={at("stress")} t1={2.0} />
      <Headline s={s} w={w} text="place." t0={at("place")} t1={5.3} />
      <Headline s={s} w={w} text="Changed everything." t0={at("changed")} t1={11.0} size={64} />
      <Headline s={s} w={w} text="Vigor: the energy to engage with life." t0={at("the", 13.3)} t1={15.4} size={40} top={200} />
      <Headline s={s} w={w} text="Measured. Significant." t0={at("measured")} t1={17.26} size={52} />
      <Headline s={s} w={w} text="City walk: no change." t0={17.3} t1={19.16} size={52} color={P.ink} />
      <Headline s={s} w={w} text="Only the forest." t0={at("forest", 19)} t1={20.5} size={52} />
      <Headline s={s} w={w} text="reset." t0={at("reset")} t1={40} size={124} top={170} />

      <Label x={360} y={760} text="12 PARTICIPANTS" p={prog(s, at("men"), at("men") + 0.6) * (1 - prog(s, 5.9, 6.4))} color={col} />
      <Label x={cityLabel.x} y={cityLabel.y - 18} text="CITY STREETS" align="left" p={prog(s, 6.4, 7.0) * walkLabels} color={col} />
      <Label x={forestLabel.x} y={forestLabel.y - 18} text="QUIET FOREST" align="left" p={prog(s, 7.9, 8.5) * walkLabels} color={col} />

      {["TENSION", "DEPRESSION", "VIGOR"].map((name, i) => {
        const pt = project(s, [VIAL_X[i], 0, 0.75]);
        const p = prog(s, 10.9 + i * 0.25, 11.6 + i * 0.25) * (1 - prog(s, 20.0, 20.5));
        const arrow = city > 0.5 ? "—" : i === 2 ? "↑" : "↓";
        return <Label key={name} x={pt.x} y={pt.y} text={`${name} ${arrow}`} p={p} color={col} />;
      })}

      {(() => {
        const hr = project(s, [-1.05, 2.05, 0.95]);
        const co = project(s, [1.15, 2.3, 0]);
        return (
          <>
            <Label x={hr.x} y={hr.y} text="HEART RATE" p={prog(s, at("heart"), at("heart") + 0.7) * (1 - prog(s, 26.6, 27.2))} color={P.stress} />
            <Label x={co.x} y={co.y} text="CORTISOL" align="left" p={prog(s, at("cortisol"), at("cortisol") + 0.7) * (1 - prog(s, 26.4, 27.0))} color={P.stress} />
          </>
        );
      })()}

      <Captions s={s} color={col} />
    </div>
  );
};

const Captions = ({ s, color }: { s: number; color: string }) => {
  const idx = GROUPS.findLastIndex((g) => s >= g[0].t - 0.12);
  if (idx < 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top: 1140,
        textAlign: "center",
        fontFamily: INTER,
        fontWeight: 400,
        fontSize: 22,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
        color,
      }}
    >
      {GROUPS[idx].map((x, i, arr) => (
        <span key={i} style={{ opacity: 0.3 + 0.7 * prog(s, x.t - 0.04, x.t + 0.16) }}>
          {x.w}
          {i < arr.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  );
};
