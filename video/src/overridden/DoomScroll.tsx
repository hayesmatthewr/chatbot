import { EASE_IN, EASE_IN_OUT, EASE_OUT, lerp, prog, reveal, tween } from "../lib/anim";
import { MONO, SANS } from "../lib/constants";
import { at } from "./words";

// Simplified side-view brain, facing left (frontal lobe on the left).
const BRAIN =
  "M175 560 C120 520 125 420 190 380 C230 330 320 300 400 310 C480 305 570 340 600 420 C625 470 610 540 560 565 C540 600 490 610 450 600 C400 615 330 622 260 612 C220 606 192 588 175 560 Z";
const GYRI = [
  "M230 360 C260 400 250 440 290 470",
  "M320 318 C330 360 310 400 350 430 C380 450 370 500 400 520",
  "M420 312 C430 350 460 380 450 420",
  "M500 330 C500 380 540 400 530 450",
  "M210 470 C260 480 300 520 360 520 C420 520 460 560 520 560",
  "M560 380 C570 420 590 450 580 500",
];

const NOTIFS = [
  { text: "New message", x: -260, y: 395, from: -1 },
  { text: "12 new likes", x: 520, y: 455, from: 1 },
  { text: "Breaking news", x: -230, y: 560, from: -1 },
  { text: "Sale ends soon", x: 500, y: 620, from: 1 },
];

const Bar = ({ label, value, top, inP }: { label: string; value: number; top: number; inP: number }) => (
  <div style={{ position: "absolute", left: 127, top, width: 466, ...reveal(inP, 10, 8) }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 15, letterSpacing: "0.18em", color: "#2a2c2e", marginBottom: 10 }}>
      <span>{label}</span>
    </div>
    <div style={{ height: 14, borderRadius: 7, background: "rgba(27,29,31,0.12)", overflow: "hidden" }}>
      <div style={{ width: `${value * 100}%`, height: "100%", borderRadius: 7, background: "#1b1d1f" }} />
    </div>
  </div>
);

export const DoomScroll = ({ s }: { s: number }) => {
  if (s < 6.9 || s > 11.45) return null;
  const sceneIn = prog(s, 6.95, 7.5);
  const out = prog(s, 11.1, 11.4, EASE_IN_OUT);

  const scroll = prog(s, at("doom-scrolling"), 9.5, EASE_IN_OUT);
  const activity = 1 - 0.78 * prog(s, at("weaker"), 9.5, EASE_IN_OUT);
  const pfcLabel = prog(s, at("prefrontal") - 0.05, at("prefrontal") + 0.4);
  const fired = at("fired");
  const pulse = prog(s, fired, fired + 0.7, EASE_OUT);
  const bars = 1 - prog(s, at("when") - 0.1, at("when") + 0.3);
  const flicker = s > at("distractions") ? 0.55 + 0.45 * Math.abs(Math.sin(s * 30)) : 1;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: sceneIn * (1 - out),
        filter: out > 0 ? `blur(${out * 10}px)` : sceneIn < 1 ? `blur(${(1 - sceneIn) * 8}px)` : undefined,
      }}
    >
      <svg width={720} height={1280} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <clipPath id="brainClip">
            <path d={BRAIN} />
          </clipPath>
          <linearGradient id="pfc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5b6266" />
            <stop offset="0.5" stopColor="#1c1e20" />
            <stop offset="1" stopColor="#0e0f10" />
          </linearGradient>
        </defs>
        <ellipse cx="520" cy="602" rx="58" ry="34" fill="#a3a6a6" stroke="#fff" strokeWidth="1.3" />
        <path d="M440 600 L450 660 C452 676 432 680 428 664 L420 610 Z" fill="#a3a6a6" stroke="#fff" strokeWidth="1.3" />
        <path d={BRAIN} fill="#b2b2b2" stroke="#fff" strokeWidth="1.5" />
        <g clipPath="url(#brainClip)">
          <rect x="100" y="280" width="168" height="400" fill="url(#pfc)" opacity={activity * flicker} />
          <path d="M268 280 L268 680" stroke="#fff" strokeWidth="1.3" strokeDasharray="4 5" />
          {GYRI.map((d) => (
            <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.3" />
          ))}
        </g>
        {pulse > 0 && pulse < 1 && (
          <circle cx="205" cy="455" r={lerp(30, 70 * activity + 30, pulse)} fill="none" stroke="#1b1d1f" strokeWidth="1.4" opacity={(1 - pulse) * 0.9} />
        )}
        {/* leader line to label */}
        <path
          d="M205 455 L205 250 L240 250"
          fill="none"
          stroke="#1b1d1f"
          strokeWidth="1.3"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - pfcLabel}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 238,
          fontFamily: SANS,
          fontSize: 19,
          letterSpacing: "0.36em",
          color: "#1d1f20",
          whiteSpace: "nowrap",
          ...reveal(pfcLabel, 0, 8),
        }}
      >
        PREFRONTAL CORTEX
      </div>

      <div style={{ opacity: bars }}>
        <Bar label="SCROLLING" value={scroll} top={760} inP={prog(s, at("more") - 0.05, at("more") + 0.4)} />
        <Bar label="PREFRONTAL RESPONSE" value={activity} top={850} inP={prog(s, at("weaker") - 0.05, at("weaker") + 0.4)} />
      </div>

      {NOTIFS.map((n, i) => {
        const t0 = at("when") + i * 0.18;
        const p = prog(s, t0, t0 + 0.55, EASE_OUT);
        const through = tween(s, at("distractions"), at("distractions") + 0.6, 0, 1, EASE_IN);
        const x = lerp(n.from < 0 ? -320 : 740, 360 + n.x * 0.35 - 115, p) + through * -n.from * 20;
        return (
          <div
            key={n.text}
            style={{
              position: "absolute",
              left: x,
              top: n.y + 330,
              width: 230,
              padding: "12px 16px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: SANS,
              fontSize: 19,
              color: "#1d1f20",
              opacity: p,
              filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
            }}
          >
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "#1b1d1f", flex: "none" }} />
            {n.text}
          </div>
        );
      })}
    </div>
  );
};
