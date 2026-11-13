import { interpolateColors, random } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { P } from "./theme";
import { Tube } from "./Tube";

type V = [number, number, number];
const CY = 1.2;
const N = 200;
const gauss = (x: number, c: number, w: number, a: number) => a * Math.exp(-(((x - c) / w) ** 2));
const ecgShape = (p: number) => gauss(p, 0.15, 0.04, 0.06) + gauss(p, 0.28, 0.015, -0.06) + gauss(p, 0.31, 0.017, 0.55) + gauss(p, 0.345, 0.02, -0.2) + gauss(p, 0.56, 0.06, 0.12);
const PERIOD = 0.9; // world units per beat

const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  a: random(`pa${i}`) * Math.PI * 2,
  r: 0.9 + random(`pr${i}`) * 0.45,
  y: random(`py${i}`),
  sp: 0.15 + random(`ps${i}`) * 0.25,
  s: 0.022 + random(`pz${i}`) * 0.026,
  d: random(`pd${i}`),
}));

const Particles = ({ s, fill, drain }: { s: number; fill: number; drain: number }) => (
  <group>
    {PARTICLES.map((p, i) => {
      const k = (p.d < fill ? 1 : 0) * (1 - drain) * p.s;
      if (k < 0.002) return null;
      const y = ((p.y + s * p.sp) % 1) * 2.6 * (1 - drain * 0.9);
      return (
        <mesh key={i} position={[Math.cos(p.a + s * 0.2) * p.r, y, Math.sin(p.a + s * 0.2) * p.r * 0.6]} scale={k} castShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={P.stress} roughness={0.5} />
        </mesh>
      );
    })}
  </group>
);

/** Closing: a clay core that beats fast, tenses, fills with cortisol, then resets to a slow breath. */
export const Core = ({ s }: { s: number }) => {
  if (s < 20.6) return null;
  const appear = prog(s, 20.8, 22.0, EASE_OUT);
  const ecgIn = prog(s, at("heart") - 0.3, at("heart") + 0.9, EASE_IN_OUT);
  const tense = prog(s, at("tension", 23) - 0.1, at("tension", 23) + 0.9, EASE_IN_OUT) * (1 - prog(s, 26.3, 27.8, EASE_IN_OUT));
  const fill = prog(s, at("cortisol") - 0.1, 25.9, EASE_IN_OUT);
  const drain = prog(s, 26.4, 28.0, EASE_IN_OUT);
  const calm = prog(s, 26.8, 28.4, EASE_IN_OUT);

  const beatPhase = (s * 2.1) % 1;
  const beat = (1 - calm) * ecgIn * gauss(beatPhase, 0.3, 0.06, 0.06);
  const breath = calm * 0.04 * Math.sin(((s - 26.8) / 3.2) * Math.PI * 2);
  const jitter = tense > 0 ? Math.sin(s * 40) * 0.006 * tense : 0;
  const k = appear * (1 + beat + breath);

  const shift = s * PERIOD * 2.1;
  const pts: V[] = Array.from({ length: N }, (_, i) => {
    const x = -1.8 + (3.6 * i) / (N - 1);
    const p = ((((x + shift) % PERIOD) + PERIOD) % PERIOD) / PERIOD;
    const yE = ecgShape(p);
    const yC = 0.12 * Math.sin(((x + s * 0.4) / 2.2) * Math.PI * 2);
    return [x, CY + lerp(yE, yC, calm), 0.95];
  });
  const shown = Math.max(2, Math.round(N * ecgIn));
  const lineColor = interpolateColors(calm, [0, 1], [P.stress, P.calm]);

  return (
    <group>
      {appear > 0.001 && (
        <mesh position={[jitter, CY, 0]} scale={[k * (1 + 0.07 * tense), k * (1 - 0.14 * tense), k * (1 + 0.07 * tense)]} castShadow>
          <sphereGeometry args={[0.72, 96, 96]} />
          <meshStandardMaterial color={P.clay} roughness={0.8} />
        </mesh>
      )}
      {ecgIn > 0.02 && <Tube points={pts.slice(0, shown)} radius={0.022} color={lineColor} segments={400} />}
      {fill > 0 && <Particles s={s} fill={fill} drain={drain} />}
    </group>
  );
};

export const CORE_CENTER: V = [0, CY, 0];
void lerp;
