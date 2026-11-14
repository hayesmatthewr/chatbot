import { useEffect, useMemo } from "react";
import { SphereGeometry } from "three";
import { interpolateColors, random } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { CONFIG } from "./config";
import { Clay, Glaze } from "./materials";
import { P } from "./theme";
import { Tube } from "./Tube";

type V = [number, number, number];
const CY = 1.02; // heart centre: its tip nearly touches the ground so the shadow stays attached
const N = 200;
const HALF = 0.98; // heart-rate line half-width: stays inside the frame's safe margins
const gauss = (x: number, c: number, w: number, a: number) => a * Math.exp(-(((x - c) / w) ** 2));
const ecgShape = (p: number) => gauss(p, 0.15, 0.045, 0.06) + gauss(p, 0.275, 0.022, -0.05) + gauss(p, 0.31, 0.026, 0.46) + gauss(p, 0.35, 0.026, -0.14) + gauss(p, 0.56, 0.065, 0.1);
const PERIOD = 0.9;

/** An inflated clay heart: a sphere whose outline follows a heart curve — fully rounded, no flat face. */
const useHeart = () => {
  const geo = useMemo(() => {
    // polar radius of the classic heart curve, sampled by angle
    const samples: { a: number; r: number }[] = [];
    for (let k = 0; k < 720; k++) {
      const t = (k / 720) * Math.PI * 2;
      const x = 16 * Math.sin(t) ** 3;
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t) + 2.5;
      samples.push({ a: Math.atan2(y, x), r: Math.hypot(x, y) / 17 });
    }
    samples.sort((p, q) => p.a - q.a);
    const radiusAt = (a: number) => {
      let best = samples[0];
      for (const s of samples) if (Math.abs(s.a - a) < Math.abs(best.a - a)) best = s;
      return best.r;
    };
    const g = new SphereGeometry(1, 160, 120);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const rho = Math.hypot(x, y);
      const R = rho > 1e-5 ? radiusAt(Math.atan2(y, x)) : 1;
      pos.setXYZ(i, x * R, y * R, z * 0.62 * (0.75 + 0.25 * R));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
};

// Cortisol: a directed stream of beads leaving the heart toward the upper right.
const BEADS = Array.from({ length: 30 }, (_, i) => ({
  ph: i / 30 + random(`bp${i}`) * 0.02,
  off: [(random(`bx${i}`) - 0.5) * 0.18, (random(`by${i}`) - 0.5) * 0.18, (random(`bz${i}`) - 0.5) * 0.18] as V,
  size: 0.032 + random(`bs${i}`) * 0.022,
  d: random(`bd${i}`),
}));
export const STREAM_END: V = [0.82, CY + 1.25, 0.2];

const Beads = ({ s, fill, drain }: { s: number; fill: number; drain: number }) => (
  <group>
    {BEADS.map((b, i) => {
      if (b.d > fill) return null;
      const t = (b.ph + s * 0.32) % 1;
      // gentle arc from the heart's upper right lobe to STREAM_END
      const x = lerp(0.35, STREAM_END[0], t) + b.off[0] * t;
      const y = lerp(CY + 0.35, STREAM_END[1], t) + Math.sin(t * Math.PI) * 0.12 + b.off[1] * t;
      const z = lerp(0.15, STREAM_END[2], t) + b.off[2] * t;
      const k = b.size * Math.min(1, t * 6) * (1 - Math.max(0, (t - 0.8) / 0.2)) * (1 - drain);
      if (k < 0.002) return null;
      return (
        <mesh key={i} position={[x, y, z]} scale={k} castShadow>
          <sphereGeometry args={[1, 24, 24]} />
          <Glaze color={P.stress} />
        </mesh>
      );
    })}
  </group>
);

/** Closing: a clay heart that races, tenses, sheds cortisol, then settles into a slow beat. */
export const Core = ({ s }: { s: number }) => {
  const geo = useHeart();
  if (s < 20.6) return null;
  const appear = prog(s, 20.8, 22.0, EASE_OUT);
  const ecgIn = prog(s, at("heart") - 0.3, at("heart") + 0.9, EASE_IN_OUT);
  const tense = prog(s, at("tension", 23) - 0.1, at("tension", 23) + 0.9, EASE_IN_OUT) * (1 - prog(s, 26.3, 27.8, EASE_IN_OUT));
  const fill = prog(s, at("cortisol") - 0.1, 25.9, EASE_IN_OUT);
  const drain = prog(s, 26.4, 28.0, EASE_IN_OUT);
  const calm = prog(s, 26.8, 28.4, EASE_IN_OUT);

  // beat: fast (≈126 bpm) while stressed, slow breath-like (≈40 bpm) after reset
  const fast = gauss((s * 2.1) % 1, 0.3, 0.06, 0.07);
  const slow = gauss((s * 0.66) % 1, 0.3, 0.1, 0.035);
  const beat = (lerp(fast, slow, calm) + (appear < 1 ? 0 : 0)) * Math.max(ecgIn, calm);
  const jitter = tense > 0 ? Math.sin(s * 40) * 0.006 * tense : 0;
  const k = appear * 1.12 * (1 + beat);
  const heartColor = interpolateColors(tense, [0, 1], ["#efe3dd", "#ecc7b8"]);

  const shift = s * PERIOD * lerp(2.1, 0.66, calm);
  const pts: V[] = Array.from({ length: N }, (_, i) => {
    const x = -HALF + (2 * HALF * i) / (N - 1);
    const p = ((((x + shift) % PERIOD) + PERIOD) % PERIOD) / PERIOD;
    const yC = 0.1 * Math.sin(((x + s * 0.4) / 2.2) * Math.PI * 2);
    return [x, CY - 0.42 + lerp(ecgShape(p), yC, calm), 0.95];
  });
  const shown = Math.max(2, Math.round(N * ecgIn));
  const lineColor = interpolateColors(calm, [0, 1], [P.stress, P.calm]);

  return (
    <group>
      {appear > 0.001 && (
        <mesh geometry={geo} position={[jitter, CY, 0]} rotation={[0.1, -0.35, 0]} scale={[k * (1 + 0.06 * tense), k * (1 - 0.1 * tense), k]} castShadow receiveShadow>
          <Clay color={heartColor} />
        </mesh>
      )}
      {ecgIn > 0.02 && <Tube points={pts.slice(0, shown)} radius={0.028} color={lineColor} segments={400} glaze />}
      {CONFIG.particles && fill > 0 && <Beads s={s} fill={fill} drain={drain} />}
    </group>
  );
};

export const CORE_CENTER: V = [0, CY, 0];
