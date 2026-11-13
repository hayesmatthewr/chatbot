import { Easing } from "remotion";
import { EASE_OUT, lerp, prog, tween } from "../lib/anim";
import { MONO, SERIF } from "../lib/constants";
import { StaggerWords } from "../components/StaggerWords";

// Elevation trace (screen coords, 720x1280).
const POINTS: [number, number][] = [
  [-6, 801],
  [234, 460],
  [354, 545],
  [626, 153],
  [736, 314],
];
const D = POINTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const LENGTH = POINTS.slice(1).reduce((acc, [x, y], i) => acc + Math.hypot(x - POINTS[i][0], y - POINTS[i][1]), 0);

const AXIS_X = 59;
const AXIS_W = 33;
const BANDS = [
  { label: "2000m+", top: 206, fill: "linear-gradient(180deg, rgba(222,226,226,0.55), rgba(214,218,218,0.6))", start: 31.5 },
  { label: "1000m+", top: 406, fill: "linear-gradient(180deg, #d0d4d4, #c3c7c7)", start: 31.3 },
  { label: "0m+", top: 606, fill: "linear-gradient(180deg, #bfc2c2, #a9acac)", start: 31.1 },
];
const BAND_H = 200;

/** Section 3: self-drawing altitude chart. */
export const Altitude = ({ s }: { s: number }) => {
  if (s < 30.25) return null;

  const draw = prog(s, 30.3, 31.95, Easing.bezier(0.4, 0, 0.7, 1));
  const dot = prog(s, 32.65, 32.9, Easing.out(Easing.back(2)));
  const pulse = prog(s, 32.95, 33.65, EASE_OUT);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {BANDS.map((b) => {
        const p = prog(s, b.start, b.start + 1.1, EASE_OUT);
        const x = lerp(240, AXIS_X, p);
        const o = prog(s, b.start, b.start + 0.5);
        return (
          <div key={b.label} style={{ position: "absolute", left: x, top: b.top, right: 0, height: BAND_H, opacity: o }}>
            <div style={{ position: "absolute", inset: 0, left: AXIS_W, background: b.fill, borderTop: "1.5px solid #2a2b2c" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: AXIS_W, height: BAND_H, background: "#1b1d1f" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: AXIS_W,
                  top: 30,
                  height: 140,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontFamily: MONO,
                    fontSize: 20,
                    letterSpacing: "0.24em",
                    color: "#f0f0f0",
                    whiteSpace: "nowrap",
                    marginTop: b.label === "0m+" ? 60 : 8,
                  }}
                >
                  {b.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: lerp(240, AXIS_X, prog(s, 31.1, 32.2, EASE_OUT)) + AXIS_W,
          right: 0,
          top: 806,
          height: 1.5,
          background: "#2a2b2c",
          opacity: prog(s, 31.1, 31.6),
        }}
      />

      <StaggerWords
        s={s}
        text={"Great Rift\nValley"}
        start={31.05}
        stagger={0.15}
        dur={0.55}
        rise={8}
        style={{
          position: "absolute",
          left: 426,
          width: 200,
          top: 432,
          textAlign: "center",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 33,
          lineHeight: 1.1,
          color: "#1d1f20",
        }}
      />

      <svg width={720} height={1280} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path
          d={D}
          fill="none"
          stroke="#111213"
          strokeWidth={2.2}
          strokeLinejoin="miter"
          strokeDasharray={LENGTH}
          strokeDashoffset={LENGTH * (1 - draw)}
        />
        {pulse > 0 && pulse < 1 && (
          <circle cx={519} cy={307} r={lerp(17, 44, pulse)} fill="none" stroke="#1b1d1f" strokeWidth={1.4} opacity={tween(s, 32.95, 33.65, 0.9, 0)} />
        )}
        <circle cx={519} cy={307} r={17 * dot} fill="#0f1011" />
      </svg>
    </div>
  );
};
