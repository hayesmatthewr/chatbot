import { EASE_IN_OUT, EASE_OUT, LINEAR, prog, reveal, tween } from "../lib/anim";
import { C, DISPLAY, NOTE, fg, worldAt } from "./theme";
import { knot, morph, pulse, toPath } from "./line";
import { at } from "./words";

const KNOT = knot();
const CHIPS = [
  { text: "IF", x: 150 },
  { text: "THEN", x: 280 },
  { text: "SHOULD", x: 420 },
  { text: "LOGIC", x: 560 },
];

const FigLabel = ({ s, t0, t1, text, color }: { s: number; t0: number; t1: number; text: string; color: string }) => {
  const p = prog(s, t0, t0 + 0.5) * (1 - prog(s, t1, t1 + 0.3));
  return (
    <div style={{ position: "absolute", top: 840, left: 0, right: 0, textAlign: "center", fontFamily: NOTE, fontSize: 16, letterSpacing: "0.14em", color, ...reveal(p, 6, 6) }}>
      {text}
    </div>
  );
};

export const Opening = ({ s }: { s: number }) => {
  if (s > 5.1) return null;
  const w = worldAt(s);
  const col = fg(w);

  const draw = prog(s, 0.0, 1.0, EASE_OUT);
  const tighten = prog(s, at("stress") - 0.05, at("stress") + 0.35, EASE_OUT);
  const jitter = s > at("stress") && s < 1.66 ? Math.sin(s * 70) * 2.5 : 0;
  const unravel = prog(s, 1.66, 2.55, EASE_IN_OUT);
  const spikes = [tween(s, 2.4, 3.3, -60, 760, LINEAR), tween(s, 3.4, 4.3, -60, 760, LINEAR)];
  const pts = morph(KNOT, pulse(spikes), unravel);
  const lineOut = prog(s, 4.7, 5.0, EASE_IN_OUT);
  const scale = 1 - 0.28 * tighten * (1 - unravel);

  const stressWord = prog(s, at("stress") - 0.05, at("stress") + 0.35) * (1 - prog(s, 1.55, 1.8));
  const place = prog(s, at("place") - 0.05, at("place") + 0.5) * (1 - prog(s, 4.85, 5.05));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width={720} height={1280} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <g transform={`translate(${360 + jitter} 600) scale(${scale}) translate(-360 -600)`}>
          <path
            d={toPath(pts)}
            fill="none"
            stroke={col}
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - draw + lineOut}
          />
        </g>
      </svg>

      {CHIPS.map((c, i) => {
        const t0 = at("logic") - 0.35 + i * 0.12;
        const fall = prog(s, t0, t0 + 0.32, (t) => t * t);
        const bounce = prog(s, t0 + 0.32, t0 + 0.9, EASE_OUT);
        if (s < t0 || bounce >= 1) return null;
        const y = 250 + fall * 300 - bounce * 170;
        return (
          <div
            key={c.text}
            style={{
              position: "absolute",
              left: c.x - 60,
              width: 120,
              top: y,
              textAlign: "center",
              fontFamily: NOTE,
              fontSize: 20,
              letterSpacing: "0.12em",
              color: C.ink,
              border: `1.5px solid ${C.ink}`,
              borderRadius: 4,
              padding: "6px 0",
              background: "rgba(239,234,223,0.6)",
              opacity: Math.min(1, fall * 3) * (1 - bounce),
              transform: `rotate(${(i % 2 ? 1 : -1) * bounce * 18}deg)`,
            }}
          >
            {c.text}
          </div>
        );
      })}

      <div style={{ position: "absolute", top: 250, left: 0, right: 0, textAlign: "center", fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 300, fontSize: 120, color: C.ink, ...reveal(stressWord, 20, 12) }}>
        stress.
      </div>
      <div style={{ position: "absolute", top: 270, left: 0, right: 0, textAlign: "center", fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 300, fontSize: 150, color: col, ...reveal(place, 24, 14) }}>
        place.
      </div>

      <FigLabel s={s} t0={0.45} t1={1.6} text="FIG. 1 — OVERTHINKING" color={col} />
      <FigLabel s={s} t0={2.0} t1={4.2} text="FIG. 2 — NERVOUS SYSTEM" color={col} />
    </div>
  );
};
