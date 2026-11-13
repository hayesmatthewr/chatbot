import { interpolateColors, random } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal } from "../lib/anim";
import { C, DISPLAY, NOTE, fg, worldAt } from "./theme";
import { calm, ecg, morph, toPath } from "./line";
import { at } from "./words";

const BODY =
  "M230 1020 C215 860 200 720 210 640 C220 575 270 545 330 532 L336 486 C300 468 284 428 286 378 C288 310 322 268 362 268 C404 268 436 310 436 376 C436 428 420 466 386 486 L392 532 C452 545 502 575 512 640 C522 720 507 860 492 1020 Z";
const TOP = 268;
const BOTTOM = 1020;
const PARTICLES = Array.from({ length: 70 }, (_, i) => ({ x: 200 + random(`px${i}`) * 320, y: random(`py${i}`), r: 2 + random(`pr${i}`) * 4, sp: 0.3 + random(`ps${i}`) * 0.7 }));

export const Body = ({ s }: { s: number }) => {
  if (s < 20.5) return null;
  const w = worldAt(s);
  const col = fg(w);

  const outline = prog(s, 20.6, 21.6, EASE_IN_OUT);
  const headPulse = prog(s, at("head") - 0.05, at("head") + 0.8, EASE_OUT);
  const ecgDraw = prog(s, at("heart") - 0.2, at("heart") + 0.45, EASE_IN_OUT);
  const tensionIn = prog(s, at("tension", 23) - 0.05, at("tension", 23) + 0.35, EASE_OUT);
  const relax = prog(s, 26.3, 27.4, EASE_IN_OUT);
  const tension = tensionIn * (1 - relax);
  const shake = tension > 0 ? Math.sin(s * 55) * 1.6 * tension : 0;

  const level = lerp(0, 0.72, prog(s, at("cortisol") - 0.05, 25.7, EASE_IN_OUT)) * (1 - prog(s, 26.5, 27.7, EASE_IN_OUT));
  const fillTop = BOTTOM - (BOTTOM - TOP) * level;
  const cortLabel = prog(s, at("cortisol") - 0.05, at("cortisol") + 0.4) * (1 - prog(s, 26.4, 26.9));

  const calmP = prog(s, 26.8, 27.9, EASE_IN_OUT);
  const pts = morph(ecg(s * 300), calm(s * 120), calmP);
  const lineCol = interpolateColors(calmP, [0, 1], [C.orange, "#b9d4a6"]);
  const heartBeat = (((s * 300) % 140) + 140) % 140 / 140;

  const reset = prog(s, at("reset") - 0.05, at("reset") + 0.55);
  const breathe = 1 + 0.14 * Math.sin(((s - at("reset")) / 3) * Math.PI * 2);
  const bodyFade = lerp(1, 0.45, reset);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width={720} height={1280} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <defs>
          <clipPath id="fn-body">
            <path d={BODY} />
          </clipPath>
        </defs>
        <g opacity={bodyFade} transform={`translate(${shake} ${-8 * tension}) translate(360 640) scale(${1 - 0.025 * tension} 1) translate(-360 -640)`}>
          <g clipPath="url(#fn-body)">
            <rect x={150} y={fillTop} width={420} height={BOTTOM - fillTop + 10} fill={C.orange} opacity={0.28} />
            {PARTICLES.map((p, i) => {
              const y = BOTTOM - (((p.y + s * 0.18 * p.sp) % 1) * (BOTTOM - TOP));
              return y > fillTop ? <circle key={i} cx={p.x} cy={y} r={p.r} fill={C.orange} opacity={0.75} /> : null;
            })}
          </g>
          <path d={BODY} fill="none" stroke={col} strokeWidth={2.4} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - outline} />
          {headPulse > 0 && headPulse < 1 && <circle cx={362} cy={370} r={lerp(8, 70, headPulse)} fill="none" stroke={col} strokeWidth={1.6} opacity={1 - headPulse} />}
          {headPulse > 0 && <circle cx={362} cy={370} r={6} fill={col} opacity={1 - prog(s, 22.3, 22.7)} />}
          {[-1, 1].map((side) =>
            [0, 1, 2].map((k) => (
              <line
                key={`${side}${k}`}
                x1={360 + side * (120 + k * 22)}
                y1={520 - k * 6}
                x2={360 + side * (132 + k * 22)}
                y2={498 - k * 6}
                stroke={C.orange}
                strokeWidth={3}
                strokeLinecap="round"
                opacity={tension}
              />
            )),
          )}
        </g>
        <path d={toPath(pts)} fill="none" stroke={lineCol} strokeWidth={3.4} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ecgDraw} />
        {ecgDraw > 0.3 && calmP < 1 && <circle cx={330} cy={700} r={7 + (heartBeat > 0.28 && heartBeat < 0.4 ? 5 : 0)} fill={C.orange} opacity={1 - calmP} />}
        {cortLabel > 0 && <path d="M520 860 L600 860 L600 820" fill="none" stroke={C.orange} strokeWidth={1.6} opacity={cortLabel} />}
      </svg>

      <div style={{ position: "absolute", left: 540, top: 780, fontFamily: NOTE, fontWeight: 500, fontSize: 18, letterSpacing: "0.14em", color: C.orange, ...reveal(cortLabel, 6, 6) }}>
        CORTISOL ↑
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1060, textAlign: "center", fontFamily: NOTE, fontSize: 16, letterSpacing: "0.14em", color: col, ...reveal(outline * (1 - reset), 6, 6) }}>
        FIG. 3 — THE BODY
      </div>

      {reset > 0 && (
        <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 28, ...reveal(reset, 24, 14) }}>
          <svg width={80} height={80} style={{ overflow: "visible" }}>
            <circle cx={40} cy={40} r={30 * breathe} fill="none" stroke={C.paper} strokeWidth={2} />
            <circle cx={40} cy={40} r={12} fill={C.paper} />
          </svg>
          <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 300, fontSize: 150, lineHeight: 1, color: C.paper }}>reset.</div>
        </div>
      )}
    </div>
  );
};
