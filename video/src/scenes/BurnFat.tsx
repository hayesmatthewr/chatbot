import { random } from "remotion";
import { EASE_IN_OUT, lerp, prog, tween } from "../lib/anim";
import { MONO, SANS } from "../lib/constants";

// Procedural stand-in for the stained muscle-fibre micrograph.
const CELLS = Array.from({ length: 16 }, (_, i) => ({
  x: 15 + random(`x${i}`) * 170,
  y: 15 + random(`y${i}`) * 170,
  rx: 26 + random(`rx${i}`) * 20,
  ry: 22 + random(`ry${i}`) * 18,
  rot: random(`r${i}`) * 180,
}));

const Micrograph = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <defs>
      <clipPath id="disc">
        <circle cx="100" cy="100" r="100" />
      </clipPath>
      <radialGradient id="tissue" cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#7cc6e0" />
        <stop offset="1" stopColor="#3f9cc0" />
      </radialGradient>
    </defs>
    <g clipPath="url(#disc)">
      <rect width="200" height="200" fill="url(#tissue)" />
      {CELLS.map((c, i) => (
        <ellipse
          key={i}
          cx={c.x}
          cy={c.y}
          rx={c.rx}
          ry={c.ry}
          transform={`rotate(${c.rot} ${c.x} ${c.y})`}
          fill="rgba(110,190,220,0.35)"
          stroke="rgba(230,248,255,0.55)"
          strokeWidth="1.4"
        />
      ))}
      <ellipse cx="62" cy="58" rx="30" ry="26" fill="none" stroke="#c2407a" strokeWidth="2" opacity="0.8" />
      <text x="100" y="186" textAnchor="middle" fontFamily={MONO} fontSize="8" letterSpacing="1" fill="rgba(255,255,255,0.8)">
        MICROGRAPH
      </text>
    </g>
  </svg>
);

const CARD = { left: 127, top: 557, w: 466, h: 266 };

/** Micrograph disc + HAD definition card (section 2, first half). */
export const BurnFat = ({ s }: { s: number }) => {
  if (s < 17.3 || s > 25.8) return null;

  // disc: pops in beside the leg, then glides to centre
  const pop = prog(s, 17.35, 18.2);
  const move = prog(s, 18.6, 19.5, EASE_IN_OUT);
  const exit = prog(s, 24.4, 25.4, EASE_IN_OUT);
  const fade = 1 - prog(s, 24.75, 25.45);
  const cx = lerp(195, 360, move);
  const cy = lerp(510, 373, move) + exit * 165;
  const d = lerp(248, 266, move) * lerp(0.15, 1, pop);

  // card: hairline that grows downward into the full card
  const line = prog(s, 19.65, 19.85);
  const ch = lerp(4, CARD.h, prog(s, 19.85, 21.0));
  const body = prog(s, 20.3, 21.0);
  const cardFade = 1 - prog(s, 24.6, 25.5);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          left: cx - d / 2,
          top: cy - d / 2,
          width: d,
          height: d,
          opacity: pop * fade,
          filter: pop < 1 ? `blur(${(1 - pop) * 8}px)` : exit > 0 ? `blur(${exit * 4}px)` : undefined,
        }}
      >
        <Micrograph size={d} />
      </div>

      {s >= 19.65 && (
        <div
          style={{
            position: "absolute",
            left: CARD.left,
            top: CARD.top + exit * 140,
            width: CARD.w,
            height: ch,
            borderRadius: 4,
            overflow: "hidden",
            background: `linear-gradient(180deg, rgba(40,43,46,${cardFade}), rgba(22,24,26,${cardFade}))`,
            transform: `scaleX(${line})`,
            opacity: lerp(0.15, 1, cardFade),
          }}
        >
          <div
            style={{
              paddingTop: 24,
              textAlign: "center",
              fontFamily: MONO,
              fontSize: 21,
              lineHeight: 1.08,
              letterSpacing: "0.34em",
              paddingLeft: "0.34em",
              color: "#f4f4f4",
            }}
          >
            3-HYDROXYACYL-COA
            <br />
            DEHYDROGENASE (HAD)
          </div>
          <div
            style={{
              marginTop: 22,
              textAlign: "center",
              fontFamily: SANS,
              fontWeight: 300,
              fontSize: 20.5,
              lineHeight: 1.27,
              letterSpacing: "-0.01em",
              color: "#e6e6e6",
              opacity: body,
              transform: `translateY(${tween(s, 20.3, 21.0, 10, 0)}px)`,
            }}
          >
            HAD is a key mitochondrial enzyme
            <br />
            involved in fatty acid beta-oxidation (the
            <br />
            breakdown of fats for energy). Higher
            <br />
            activity aids enhanced fat metabolism
            <br />
            during prolonged endurance exercise
          </div>
        </div>
      )}
    </div>
  );
};
