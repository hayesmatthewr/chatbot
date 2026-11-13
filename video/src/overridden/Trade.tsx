import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal } from "../lib/anim";
import { MONO, SANS, SERIF } from "../lib/constants";
import { at } from "./words";

const BASE = 860;
const COLS = [
  { x: 190, label: ["FAST", "DOPAMINE"] },
  { x: 410, label: ["SLOWER", "CONTROL"] },
];
const W = 120;

export const Trade = ({ s }: { s: number }) => {
  if (s < 16.1) return null;
  const sceneIn = prog(s, 16.1, 16.5);
  const tDop = at("dopamine");
  const tCtl = at("control", 17);
  const hDop = lerp(150, 470, prog(s, tDop - 0.1, tDop + 0.6, EASE_OUT));
  const hCtl = lerp(300, 300, 1) - 210 * prog(s, tCtl - 0.1, tCtl + 0.6, EASE_IN_OUT);
  const colIn = [prog(s, at("Fast") - 0.05, at("Fast") + 0.4), prog(s, at("slower") - 0.05, at("slower") + 0.4)];
  const heights = [hDop, hCtl];

  const beam = prog(s, at("that's", 18) - 0.05, at("trade") + 0.2, EASE_IN_OUT);
  const tradeWord = prog(s, at("trade") - 0.05, at("trade") + 0.45);
  const now = at("right");
  const dim = prog(s, now - 0.1, now + 0.3);
  const nowIn = prog(s, now - 0.05, now + 0.4);
  const pulse = ((s - now) % 0.9) / 0.9;

  const x1 = COLS[0].x + W / 2;
  const x2 = COLS[1].x + W / 2;
  const y1 = BASE - hDop;
  const y2 = BASE - hCtl;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneIn }}>
      <div style={{ position: "absolute", inset: 0, opacity: lerp(1, 0.25, dim), filter: dim > 0 ? `blur(${dim * 5}px)` : undefined }}>
        <div style={{ position: "absolute", left: 127, width: 466, top: BASE, height: 1.5, background: "#2a2b2c", opacity: sceneIn }} />
        {COLS.map((c, i) => (
          <div key={i} style={{ opacity: colIn[i] }}>
            <div
              style={{
                position: "absolute",
                left: c.x,
                width: W,
                top: BASE - heights[i],
                height: heights[i] * colIn[i],
                borderRadius: "6px 6px 0 0",
                background: i === 0 ? "linear-gradient(180deg, #2c2f32, #121314)" : "linear-gradient(180deg, #c3c8c8, #9ca2a2)",
              }}
            />
            <div style={{ position: "absolute", left: c.x - 40, width: W + 80, top: BASE + 18, textAlign: "center", fontFamily: MONO, fontSize: 16, lineHeight: 1.2, letterSpacing: "0.18em", color: "#2a2c2e" }}>
              {c.label.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
            <div style={{ position: "absolute", left: c.x, width: W, top: BASE - heights[i] - 52, textAlign: "center", fontFamily: SANS, fontWeight: 300, fontSize: 34, color: "#151617" }}>
              {i === 0 ? "↑" : "↓"}
            </div>
          </div>
        ))}
        <svg width={720} height={1280} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <line x1={x1} y1={y1 - 70} x2={lerp(x1, x2, beam)} y2={lerp(y1, y2, beam) - 70} stroke="#111213" strokeWidth={2} strokeDasharray="6 7" />
          <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2 - 70} r={7 * beam} fill="#111213" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 84,
            color: "#151617",
            ...reveal(tradeWord, 20, 12),
          }}
        >
          the trade
        </div>
      </div>

      {nowIn > 0 && (
        <div style={{ position: "absolute", top: 520, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 26, ...reveal(nowIn, 20, 12) }}>
          <svg width={60} height={60} style={{ overflow: "visible" }}>
            <circle cx={30} cy={30} r={lerp(16, 40, pulse)} fill="none" stroke="#1b1d1f" strokeWidth={1.4} opacity={1 - pulse} />
            <circle cx={30} cy={30} r={16} fill="#0f1011" />
          </svg>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 110, lineHeight: 1, color: "#151617" }}>right now.</div>
        </div>
      )}
    </div>
  );
};
