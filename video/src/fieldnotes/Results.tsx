import { Easing } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal } from "../lib/anim";
import { C, DISPLAY, NOTE, fg, worldAt } from "./theme";
import { at } from "./words";

const SPRING = Easing.out(Easing.back(1.8));
const R = 86;
const CY = 640;

type Dial = { x: number; label: string; note: string; appear: number; angle: (s: number) => number };

const DIALS: Dial[] = [
  { x: 140, label: "TENSION", note: "↓ dropped", appear: at("Tension") - 0.25, angle: (s) => lerp(55, -55, prog(s, at("dropped") - 0.05, at("dropped") + 0.55, SPRING)) },
  { x: 360, label: "DEPRESSION", note: "↓ eased", appear: at("depression") - 0.25, angle: (s) => lerp(45, -50, prog(s, at("eased") - 0.05, at("eased") + 0.55, SPRING)) },
  {
    x: 580,
    label: "VIGOR",
    note: "↑ rose",
    appear: at("vigor") - 0.3,
    angle: (s) => lerp(-55, -10, prog(s, at("vigor"), at("vigor") + 0.5, SPRING)) + 68 * prog(s, at("rose") - 0.05, at("rose") + 0.55, SPRING),
  },
];

const Check = ({ x, y, p, color }: { x: number; y: number; p: number; color: string }) => (
  <g transform={`translate(${x} ${y})`} opacity={p > 0 ? 1 : 0}>
    <circle r={19} fill="none" stroke={color} strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
    <path d="M-8 1 L-2 7 L9 -6" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(p, 0.4, 1)} />
  </g>
);

export const Results = ({ s }: { s: number }) => {
  if (s < 10.6 || s > 20.8) return null;
  const w = worldAt(s);
  const col = fg(w);
  const out = prog(s, 20.25, 20.65, EASE_IN_OUT);
  const isCity = s >= at("The", 17.2) && s < at("forest", 19);
  const back = prog(s, at("forest", 19), at("forest", 19) + 0.6, SPRING);

  const stamp = (t: number) => prog(s, t, t + 0.18, EASE_OUT);
  const measured = s < 17.26 ? stamp(at("measured")) : 0;
  const noChange = isCity ? stamp(17.3) : 0;
  const forestOnly = s >= at("forest", 19) ? stamp(at("forest", 19)) : 0;
  const note = prog(s, at("the", 13.3) - 0.05, at("life") + 0.2, EASE_IN_OUT);

  const stampStyle = (p: number, color: string): React.CSSProperties => ({
    position: "absolute",
    top: 330,
    left: "50%",
    padding: "10px 22px",
    border: `3px solid ${color}`,
    borderRadius: 6,
    fontFamily: NOTE,
    fontWeight: 500,
    fontSize: 40,
    letterSpacing: "0.2em",
    color,
    whiteSpace: "nowrap",
    opacity: p,
    transform: `translateX(-50%) rotate(-7deg) scale(${lerp(1.6, 1, p)})`,
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out, filter: out > 0 ? `blur(${out * 10}px)` : undefined }}>
      <svg width={720} height={1280} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {DIALS.map((d, i) => {
          const a = prog(s, d.appear, d.appear + 0.5, EASE_OUT);
          let ang = d.angle(s);
          if (isCity) ang = 0;
          else if (s >= at("forest", 19)) ang = lerp(0, d.angle(30), back);
          const rad = ((ang - 90) * Math.PI) / 180;
          const check = s < 17.26 ? prog(s, at("significant") + i * 0.12, at("significant") + 0.4 + i * 0.12) : 0;
          return (
            <g key={d.label} opacity={a}>
              <path d={`M${d.x - R} ${CY} A ${R} ${R} 0 0 1 ${d.x + R} ${CY}`} fill="none" stroke={col} strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a} />
              {Array.from({ length: 9 }, (_, k) => {
                const t = ((-90 + k * 22.5 - 90) * Math.PI) / 180;
                return <line key={k} x1={d.x + Math.cos(t) * (R - 12)} y1={CY + Math.sin(t) * (R - 12)} x2={d.x + Math.cos(t) * (R - 2)} y2={CY + Math.sin(t) * (R - 2)} stroke={col} strokeWidth={1.4} opacity={0.7} />;
              })}
              <line x1={d.x} y1={CY} x2={d.x + Math.cos(rad) * (R - 16)} y2={CY + Math.sin(rad) * (R - 16)} stroke={isCity ? C.ink : C.paper} strokeWidth={3.5} strokeLinecap="round" />
              <circle cx={d.x} cy={CY} r={7} fill={isCity ? C.ink : C.paper} />
              <Check x={d.x} y={CY - R - 40} p={check} color={col} />
            </g>
          );
        })}
        {note > 0 && (
          <path d="M455 872 C520 880 585 840 582 712" fill="none" stroke={col} strokeWidth={1.6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(note, 0.4, 1)} markerEnd="" />
        )}
      </svg>

      {DIALS.map((d) => {
        const a = prog(s, d.appear + 0.15, d.appear + 0.6);
        return (
          <div key={d.label} style={{ position: "absolute", left: d.x - 100, width: 200, top: CY + 28, textAlign: "center", fontFamily: NOTE, color: col, ...reveal(a, 6, 6) }}>
            <div style={{ fontSize: 17, letterSpacing: "0.16em" }}>{d.label}</div>
            <div style={{ fontSize: 16, marginTop: 6, opacity: 0.75 }}>{isCity ? "— no change" : d.note}</div>
          </div>
        );
      })}

      <div style={{ position: "absolute", left: 90, top: 852, fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 300, fontSize: 30, color: col, ...reveal(prog(note, 0, 0.5), 8, 8) }}>
        the energy to engage with life
      </div>

      <div style={{ position: "absolute", top: 220, left: 0, right: 0, textAlign: "center", fontFamily: NOTE, fontSize: 16, letterSpacing: "0.14em", color: col, ...reveal(prog(s, 10.75, 11.25), 6, 6) }}>
        {isCity ? "FIG. 4B — AFTER THE CITY WALK" : "FIG. 4 — AFTER THE FOREST WALK"}
      </div>
      <div style={stampStyle(measured, C.paper)}>MEASURED</div>
      <div style={stampStyle(noChange, C.ink)}>CITY · NO CHANGE</div>
      <div style={stampStyle(forestOnly, C.paper)}>FOREST ONLY</div>
    </div>
  );
};
