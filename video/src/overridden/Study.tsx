import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal, tween } from "../lib/anim";
import { MONO, SANS, SERIF } from "../lib/constants";
import { at } from "./words";

const COLS = 8;
const ROWS = 6;
const GAP = 52;

// Three pseudo-EEG channels, deterministic.
const wave = (seed: number, n = 90) =>
  Array.from({ length: n }, (_, i) => {
    const x = i / (n - 1);
    const y =
      Math.sin(x * 38 + seed) * 0.45 +
      Math.sin(x * 91 + seed * 2.3) * 0.3 +
      Math.sin(x * 173 + seed * 5.1) * 0.25;
    return [x, y] as const;
  });
const CHANNELS = ["Fz", "Cz", "Pz"].map((name, i) => ({ name, pts: wave(i * 1.7 + 0.4) }));

export const Study = ({ s }: { s: number }) => {
  if (s < 2.4 || s > 7.15) return null;
  const sceneIn = prog(s, 2.4, 2.75);
  const sceneOut = prog(s, 6.85, 7.1);
  const phase2 = prog(s, at("while") - 0.1, at("while") + 0.3, EASE_IN_OUT);

  const count = Math.round(tween(s, at("48"), at("48") + 0.75, 0, 48, EASE_OUT));
  const tEEG = at("EEG");

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneIn * (1 - sceneOut) }}>
      {/* phase 1: 48 participants */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - phase2,
          filter: phase2 > 0 ? `blur(${phase2 * 10}px)` : undefined,
          transform: `translateY(${-phase2 * 50}px)`,
        }}
      >
        <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontFamily: SERIF, fontSize: 230, lineHeight: 1, color: "#151617", fontVariantNumeric: "tabular-nums" }}>
          {count}
        </div>
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: SANS,
            fontSize: 18,
            letterSpacing: "0.42em",
            paddingLeft: "0.42em",
            color: "#2a2c2e",
            ...reveal(prog(s, at("people"), at("people") + 0.4), 6, 8),
          }}
        >
          PARTICIPANTS
        </div>
        <div style={{ position: "absolute", left: 360 - ((COLS - 1) * GAP) / 2, top: 520 }}>
          {Array.from({ length: COLS * ROWS }).map((_, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const p = prog(s, at("48") + 0.05 + i * 0.016, at("48") + 0.35 + i * 0.016);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: c * GAP - 15,
                  top: r * GAP - 15,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  background: "#1b1d1f",
                  opacity: p,
                  transform: `scale(${lerp(0.2, 1, p)})`,
                }}
              />
            );
          })}
        </div>
        <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18 }}>
          {[
            ["ATTENTION", at("attention")],
            ["SELF-CONTROL", at("self-control")],
          ].map(([label, t]) => (
            <div
              key={label as string}
              style={{
                padding: "11px 20px",
                borderRadius: 4,
                background: "rgba(82,102,103,0.88)",
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: 22,
                letterSpacing: "0.12em",
                color: "#e8efef",
                ...reveal(prog(s, (t as number) - 0.05, (t as number) + 0.4), 10, 8),
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* phase 2: citation + EEG traces */}
      {phase2 > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              left: 127,
              top: 200,
              width: 466,
              height: lerp(3, 99, prog(s, tEEG + 0.4, tEEG + 0.8)),
              transform: `scaleX(${prog(s, tEEG + 0.15, tEEG + 0.4)})`,
              borderRadius: 4,
              overflow: "hidden",
              background: "linear-gradient(180deg, #2c2f32, #191b1d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: SANS,
              fontSize: 19.5,
              lineHeight: 1.3,
              letterSpacing: "-0.03em",
              color: "#f2f2f2",
            }}
          >
            <div style={{ opacity: prog(s, tEEG + 0.65, tEEG + 1.1) }}>
              <i>[Author et al. (Year)]</i> — "[Study title]."
              <br />
              <span style={{ fontWeight: 500 }}>[Journal]</span> · n = 48, EEG
            </div>
          </div>

          {CHANNELS.map((ch, i) => {
            const top = 380 + i * 170;
            const bandIn = prog(s, tEEG + i * 0.12, tEEG + 0.8 + i * 0.12);
            const draw = prog(s, tEEG + 0.25 + i * 0.12, 6.9, (t) => t);
            const d = ch.pts.map(([x, y], k) => `${k ? "L" : "M"}${(x * 560).toFixed(1)} ${(75 + y * 52).toFixed(1)}`).join(" ");
            return (
              <div
                key={ch.name}
                style={{ position: "absolute", left: lerp(240, 59, bandIn), right: 0, top, height: 150, opacity: bandIn }}
              >
                <div style={{ position: "absolute", inset: 0, left: 33, background: "linear-gradient(180deg, #d0d4d4, #c3c7c7)", borderTop: "1.5px solid #2a2b2c" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 33, height: 150, background: "#1b1d1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: MONO, fontSize: 18, letterSpacing: "0.2em", color: "#f0f0f0" }}>{ch.name}</div>
                </div>
                <svg width={600} height={150} style={{ position: "absolute", left: 55, top: 0, overflow: "visible" }}>
                  <path d={d} fill="none" stroke="#111213" strokeWidth={1.8} strokeDasharray={1} strokeDashoffset={1 - draw} pathLength={1} />
                </svg>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 900,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 33,
              color: "#1d1f20",
              ...reveal(prog(s, at("brainwaves") - 0.05, at("brainwaves") + 0.45), 8, 10),
            }}
          >
            brainwave activity
          </div>
        </>
      )}
    </div>
  );
};
