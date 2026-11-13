import { random } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal } from "../lib/anim";
import { C, DISPLAY, NOTE } from "./theme";
import { CityGrid } from "./World";
import { Contours } from "./Contours";
import { at } from "./words";

const PW = 600;
const PH = 420;
const CITY_ROUTE = "M64 384 L64 256 L192 256 L192 192 L320 192 L320 64 L448 64 L448 128 L544 128 L544 64";
const FOREST_ROUTE = "M50 370 C150 380 120 250 230 250 C340 250 300 140 400 130 C480 122 470 60 550 50";
const TREES = Array.from({ length: 34 }, (_, i) => ({ x: 20 + random(`tx${i}`) * 560, y: 20 + random(`ty${i}`) * 380, r: 4 + random(`tr${i}`) * 6 }));

const Tag = ({ text, dark }: { text: string; dark?: boolean }) => (
  <div
    style={{
      position: "absolute",
      left: 14,
      top: 14,
      padding: "5px 10px",
      fontFamily: NOTE,
      fontSize: 15,
      letterSpacing: "0.12em",
      background: dark ? C.paper : C.ink,
      color: dark ? C.ink : C.paper,
      borderRadius: 3,
    }}
  >
    {text}
  </div>
);

/** Point at fraction p along an SVG path, measured in the browser. */
const Walker = ({ d, p, color }: { d: string; p: number; color: string }) => {
  if (typeof document === "undefined" || p <= 0) return null;
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  el.setAttribute("d", d);
  const pt = el.getPointAtLength(el.getTotalLength() * p);
  return <circle cx={pt.x} cy={pt.y} r={9} fill={color} stroke={C.paper} strokeWidth={2} />;
};

const Figure = ({ x, y, p, color }: { x: number; y: number; p: number; color: string }) => (
  <g transform={`translate(${x} ${y}) scale(${lerp(0.4, 1, p)})`} opacity={p}>
    <circle cx={0} cy={-26} r={11} fill={color} />
    <rect x={-14} y={-12} width={28} height={40} rx={12} fill={color} />
  </g>
);

export const Walks = ({ s }: { s: number }) => {
  if (s < 4.85 || s > 10.95) return null;

  const figsOut = prog(s, 5.65, 6.05, EASE_IN_OUT);
  const city = prog(s, 6.05, 6.55, EASE_OUT);
  const cityRoute = prog(s, at("crowded") - 0.3, at("and") + 0.05, EASE_IN_OUT);
  const forest = prog(s, 7.5, 8.0, EASE_OUT);
  const forestRoute = prog(s, at("one", 7.9) - 0.05, at("forest", 8.5) + 0.35, EASE_IN_OUT);

  const cityOut = prog(s, 9.3, 9.75, EASE_IN_OUT);
  const expand = prog(s, 9.4, 10.15, EASE_IN_OUT);
  const forestContent = 1 - prog(s, 9.4, 9.8);
  const fx = lerp(60, 0, expand);
  const fy = lerp(640, 0, expand);
  const fw = lerp(PW, 720, expand);
  const fh = lerp(PH, 1280, expand);

  const headline = prog(s, at("changed") - 0.05, at("changed") + 0.5) * (1 - prog(s, 10.65, 10.9));
  const ticks = Array.from({ length: 6 }, (_, i) => ({ t: at("crowded") + i * 0.16, x: 90 + random(`ck${i}`) * 420, y: 40 + random(`cy${i}`) * 300 }));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* 12 participants */}
      {figsOut < 1 && (
        <>
          <svg width={720} height={1280} style={{ position: "absolute", inset: 0, opacity: 1 - figsOut }}>
            {Array.from({ length: 12 }, (_, i) => {
              const c = i % 6;
              const r = Math.floor(i / 6);
              const p = prog(s, at("12") + i * 0.035, at("12") + 0.35 + i * 0.035);
              return <Figure key={i} x={360 + (c - 2.5) * 78} y={520 + r * 100} p={p} color={C.paper} />;
            })}
          </svg>
          <div style={{ position: "absolute", top: 720, left: 0, right: 0, textAlign: "center", fontFamily: NOTE, fontSize: 20, letterSpacing: "0.16em", color: C.paper, ...reveal(prog(s, at("men"), at("men") + 0.4) * (1 - figsOut), 6, 6) }}>
            n = 12 · TWO WALKS EACH
          </div>
        </>
      )}

      {/* Walk A: city */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 175 - cityOut * 120,
          width: PW,
          height: PH,
          borderRadius: 6,
          overflow: "hidden",
          background: `linear-gradient(180deg, ${C.concrete}, ${C.concreteDeep})`,
          clipPath: `inset(0 0 ${(1 - city) * 100}% 0 round 6px)`,
          opacity: 1 - cityOut,
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <CityGrid s={s} width={PW} height={PH} seed="walk" />
        <svg width={PW} height={PH} style={{ position: "absolute", inset: 0 }}>
          <path d={CITY_ROUTE} fill="none" stroke={C.orange} strokeWidth={5} strokeLinejoin="miter" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - cityRoute} />
          {ticks.map((k, i) => {
            const p = prog(s, k.t, k.t + 0.15) * (1 - prog(s, k.t + 0.35, k.t + 0.55));
            return (
              <text key={i} x={k.x} y={k.y} fontFamily={NOTE} fontSize={26} fontWeight={500} fill={C.orange} opacity={p}>
                !
              </text>
            );
          })}
          <Walker d={CITY_ROUTE} p={cityRoute} color={C.orange} />
        </svg>
        <Tag text="WALK A · CITY STREETS" />
      </div>

      {/* Walk B: forest (expands into the whole frame) */}
      <div
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fw,
          height: fh,
          borderRadius: lerp(6, 0, expand),
          overflow: "hidden",
          background: `radial-gradient(120% 80% at 50% 35%, ${C.moss}, ${C.mossDeep})`,
          clipPath: `inset(${(1 - forest) * 100}% 0 0 0 round 6px)`,
          boxShadow: expand < 1 ? "0 20px 50px rgba(0,0,0,0.3)" : undefined,
          opacity: s > 10.3 ? 1 - prog(s, 10.3, 10.6) : 1,
        }}
      >
        <Contours s={s} width={720} height={1280} color={C.sage} opacity={0.42} />
        <svg width={PW} height={PH} style={{ position: "absolute", inset: 0, opacity: forestContent }}>
          {TREES.map((t, i) => (
            <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={C.sage} opacity={0.55} />
          ))}
          <path d={FOREST_ROUTE} fill="none" stroke={C.paper} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - forestRoute} />
          <Walker d={FOREST_ROUTE} p={forestRoute} color={C.paper} />
        </svg>
        <div style={{ opacity: forestContent }}>
          <Tag text="WALK B · QUIET FOREST" dark />
        </div>
      </div>

      <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center", fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 300, fontSize: 92, lineHeight: 1, color: C.paper, ...reveal(headline, 24, 14) }}>
        changed
        <br />
        everything.
      </div>
    </div>
  );
};
