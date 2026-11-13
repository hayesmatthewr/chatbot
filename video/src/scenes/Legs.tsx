import { EASE_IN, EASE_IN_OUT, lerp, prog, reveal, tween } from "../lib/anim";
import { MONO, SANS } from "../lib/constants";
import { StaggerWords } from "../components/StaggerWords";

const CARD_BG = "linear-gradient(180deg, #e3e6e6 0%, #c4c9c9 45%, #9ca2a2 100%)";
const TAB = 29;

type LegKind = "kenyan" | "scandinavian";

/** Placeholder leg: a simple shin + shoe that can swing like a pendulum from the hip. */
const LegArt = ({ kind, angle, zoom, ring }: { kind: LegKind; angle: number; zoom: number; ring: number }) => {
  const kenyan = kind === "kenyan";
  const skin = kenyan ? "#2a1c17" : "#e0a487";
  const shoe = kenyan ? "#a9c4e6" : "#e7682c";
  const thick = kenyan ? 30 : 40;
  return (
    <svg
      width={179}
      height={330}
      viewBox="0 0 179 330"
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible", transform: `scale(${zoom})`, transformOrigin: "50% 0%" }}
    >
      <g transform={`rotate(${angle} 120 -40)`}>
        {kenyan && <rect x="104" y="-6" width="60" height="38" rx="4" fill="#3d4fd0" />}
        <path d="M128 10 L96 112 L74 258" stroke={skin} strokeWidth={thick} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {!kenyan && <rect x="56" y="246" width="34" height="26" rx="6" fill="#f5f5f3" />}
        <ellipse cx="78" cy="286" rx="46" ry="18" fill={shoe} />
        <ellipse cx="78" cy="296" rx="44" ry="7" fill={kenyan ? "#dbe7f5" : "#f2f2f0"} />
        {ring > 0 && (
          <circle
            cx="97"
            cy="112"
            r="12"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={0.9}
            strokeDasharray={76}
            strokeDashoffset={76 * (1 - ring)}
          />
        )}
      </g>
      <text x="8" y="320" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="rgba(0,0,0,0.45)">
        {kenyan ? "▶ LEG CLIP" : "LEG PHOTO"}
      </text>
    </svg>
  );
};

type CardProps = {
  s: number;
  kind: LegKind;
  label: string;
  name: string;
  left: number;
  top: number;
  width: number;
  height: number;
  tabH: number;
  angle: number;
  zoom: number;
  ring: number;
  nameP: number;
  style?: React.CSSProperties;
};

const LegCard = ({ s, kind, label, name, left, top, width, height, tabH, angle, zoom, ring, nameP, style }: CardProps) => (
  <div style={{ position: "absolute", left, top, width, ...style }}>
    <div style={{ position: "relative", width, height, overflow: "hidden", background: CARD_BG }}>
      <div style={{ position: "absolute", top: TAB, left: (width - 179) / 2, width: 179, height: height - TAB }}>
        <LegArt kind={kind} angle={angle} zoom={zoom} ring={ring} />
      </div>
      {tabH > 0.5 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: tabH,
            background: "#ffffff",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: SANS,
            fontSize: 12.5,
            letterSpacing: "0.42em",
            paddingLeft: "0.42em",
            color: "#1d1f20",
            clipPath: `inset(0 ${(1 - prog(s, 8.7, 9.05)) * 100}% 0 0)`,
          }}
        >
          {label}
        </div>
      )}
    </div>
    <div
      style={{
        marginTop: 13,
        textAlign: "center",
        fontFamily: SANS,
        fontSize: 15,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        color: "#2a2c2e",
        whiteSpace: "pre",
        ...reveal(nameP, 6, 8),
      }}
    >
      {name}
    </div>
  </div>
);

export const Legs = ({ s }: { s: number }) => {
  if (s < 7.95 || s > 19.3) return null;

  // Kenyan card geometry morphs through four layouts.
  const m = prog(s, 11.9, 12.65, EASE_IN_OUT);
  const n = prog(s, 14.15, 14.85, EASE_IN_OUT);
  const z = prog(s, 15.85, 16.6, EASE_IN_OUT);
  let left = lerp(121, 188, m);
  let width = lerp(179, 345, m);
  left = lerp(left, 270, n);
  width = lerp(width, 180, n);
  left = lerp(left, 234, z);
  width = lerp(width, 252, z);
  const top = lerp(460, 378, z);
  const height = lerp(359, 523, z);
  const exit = tween(s, 18.5, 19.15, 0, 560, EASE_IN);

  const enterK = prog(s, 7.95, 8.9);
  const enterS = prog(s, 8.12, 9.05);
  const swingEnv = prog(s, 11.9, 12.4) * (1 - prog(s, 15.9, 16.4));
  const angle = swingEnv * 17 * Math.sin(((s - 11.9) / 1.15) * Math.PI * 2);
  const tabH = TAB * (1 - prog(s, 14.2, 14.6, EASE_IN_OUT));
  const nameIn = prog(s, 8.9, 9.4);
  const nameOutK = 1 - prog(s, 14.25, 14.7);
  const zoom = lerp(1, 1.45, z);
  const ring = prog(s, 16.9, 17.4);

  const scandX = tween(s, 11.9, 12.55, 0, 420, EASE_IN);

  // -400g chip
  const chip = prog(s, 8.9, 9.4) * (1 - prog(s, 11.35, 11.75));

  // citation box: line -> grows -> text; collapses back to a line at 16.0
  const lineW = prog(s, 8.6, 8.85);
  const boxH = lerp(3, 99, prog(s, 8.85, 9.3)) * 1;
  const collapse = prog(s, 16.0, 16.4, EASE_IN_OUT);
  const h = lerp(boxH, 3, collapse);
  const lineOut = 1 - prog(s, 16.4, 16.85);
  const textSweep = prog(s, 9.2, 10.2, EASE_IN_OUT);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {lineOut > 0 && (
        <div
          style={{
            position: "absolute",
            left: 127,
            top: 290,
            width: 466,
            height: h,
            overflow: "hidden",
            borderRadius: 4,
            background: "linear-gradient(180deg, #2c2f32, #191b1d)",
            transform: `scaleX(${lineW * lerp(0.6, 1, lineOut)})`,
            opacity: lineOut,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 10,
              textAlign: "center",
              fontFamily: SANS,
              fontSize: 19.5,
              lineHeight: 1.3,
              letterSpacing: "-0.045em",
              whiteSpace: "nowrap",
              color: "#f2f2f2",
              WebkitMaskImage: `linear-gradient(90deg, #000 ${textSweep * 130 - 30}%, transparent ${textSweep * 130}%)`,
              maskImage: `linear-gradient(90deg, #000 ${textSweep * 130 - 30}%, transparent ${textSweep * 130}%)`,
            }}
          >
            <i>Larsen, H. B. et al. (2003)</i> — "Calf muscle volume
            <br />
            and energy cost of running in elite Kenyan distance
            <br />
            runners." <span style={{ fontWeight: 500 }}>Journal of Applied Physiology.</span>
          </div>
        </div>
      )}

      <LegCard
        s={s}
        kind="scandinavian"
        label="SCANDINAVIAN"
        name={"Jakob Ingebrigtsen,\nNorwegian Runner"}
        left={420 + scandX}
        top={460}
        width={179}
        height={359}
        tabH={TAB}
        angle={0}
        zoom={1}
        ring={0}
        nameP={nameIn}
        style={{
          opacity: enterS,
          transform: `translateY(${(1 - enterS) * 70}px) scale(${lerp(0.9, 1, enterS)})`,
          filter: enterS < 1 ? `blur(${(1 - enterS) * 6}px)` : undefined,
        }}
      />

      <LegCard
        s={s}
        kind="kenyan"
        label="KENYAN"
        name={"Sabastian Sawe,\nKenyan Runner"}
        left={left + exit}
        top={top}
        width={width}
        height={height}
        tabH={tabH}
        angle={angle}
        zoom={zoom}
        ring={ring}
        nameP={nameIn * nameOutK}
        style={{
          opacity: enterK,
          transform: `translateY(${(1 - enterK) * 70}px) scale(${lerp(0.9, 1, enterK)})`,
          filter: enterK < 1 ? `blur(${(1 - enterK) * 6}px)` : undefined,
        }}
      />

      {chip > 0 && (
        <div
          style={{
            position: "absolute",
            left: 260,
            top: 614,
            width: 133,
            height: 49,
            borderRadius: 4,
            background: "rgba(82,102,103,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: SANS,
            fontWeight: 300,
            fontSize: 30,
            letterSpacing: "0.08em",
            color: "#e8efef",
            opacity: chip,
            filter: chip < 1 ? `blur(${(1 - chip) * 8}px)` : undefined,
            transform: `scaleX(${lerp(0.85, 1, chip)})`,
          }}
        >
          <StaggerWords s={s} text="-400g" start={9.0} dur={0.4} rise={0} blur={0} />
        </div>
      )}
    </div>
  );
};
