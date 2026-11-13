import { random } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { P } from "./theme";
import { Tube } from "./Tube";

type V = [number, number, number];
const CITY_Z = -1.35;
const FOREST_Z = 1.05;

// city: 5x3 blocks with streets between
const BLOCKS = Array.from({ length: 15 }, (_, i) => {
  const c = i % 5;
  const r = Math.floor(i / 5);
  return { x: -1.04 + c * 0.52, z: CITY_Z - 0.44 + r * 0.44, h: 0.25 + random(`bh${i}`) * 0.75, d: random(`bd${i}`) };
});
const CITY_PATH: V[] = [
  [-1.3, 0.04, CITY_Z + 0.22],
  [-0.52 - 0.26, 0.04, CITY_Z + 0.22],
  [-0.78, 0.04, CITY_Z - 0.22],
  [0.26, 0.04, CITY_Z - 0.22],
  [0.26, 0.04, CITY_Z + 0.22],
  [1.3, 0.04, CITY_Z + 0.22],
];
const FOREST_PATH: V[] = [
  [-1.3, 0.04, FOREST_Z + 0.25],
  [-0.6, 0.04, FOREST_Z - 0.2],
  [0.1, 0.04, FOREST_Z + 0.3],
  [0.7, 0.04, FOREST_Z - 0.15],
  [1.3, 0.04, FOREST_Z + 0.05],
];
const TREES = Array.from({ length: 16 }, (_, i) => ({
  x: -1.2 + random(`fx${i}`) * 2.4,
  z: FOREST_Z - 0.5 + random(`fz${i}`) * 1.0,
  s: 0.7 + random(`fs${i}`) * 0.6,
  d: random(`fd${i}`),
})).filter((t) => Math.abs(t.z - (FOREST_Z + 0.05 + 0.22 * Math.sin(t.x * 2.6))) > 0.16);

/** Resample a polyline to n points (straight segments preserved by dense sampling). */
const resample = (pts: V[], n: number, upto: number): V[] => {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[2] - pts[i][2]));
  const total = seg.reduce((a, b) => a + b, 0) * Math.max(upto, 0.001);
  const out: V[] = [];
  for (let k = 0; k < n; k++) {
    let d = (total * k) / (n - 1);
    let i = 0;
    while (i < seg.length - 1 && d > seg[i]) d -= seg[i++];
    const p = Math.min(1, d / seg[i]);
    out.push([lerp(pts[i][0], pts[i + 1][0], p), pts[i][1], lerp(pts[i][2], pts[i + 1][2], p)]);
  }
  return out;
};

const Slab = ({ z, k, color }: { z: number; k: number; color: string }) => (
  <mesh position={[0, 0.02, z]} scale={[k, 1, k]} receiveShadow castShadow>
    <boxGeometry args={[2.9, 0.04, 1.3]} />
    <meshStandardMaterial color={color} roughness={0.9} />
  </mesh>
);

export const Walks3D = ({ s }: { s: number }) => {
  if (s < 4.8 || s > 10.8) return null;

  const people = Array.from({ length: 12 }, (_, i) => {
    const p = prog(s, at("12") + i * 0.05, at("12") + 0.7 + i * 0.05, EASE_OUT) * (1 - prog(s, 5.9 + i * 0.02, 6.5 + i * 0.02, EASE_IN_OUT));
    return { x: -0.9 + (i % 6) * 0.36, z: -0.15 + Math.floor(i / 6) * 0.38, p };
  });

  const cityIn = prog(s, 6.0, 6.9, EASE_OUT);
  const cityOut = prog(s, 9.3, 10.1, EASE_IN_OUT);
  const cityRoute = prog(s, at("crowded") - 0.3, at("and") + 0.1, EASE_IN_OUT);
  const forestIn = prog(s, 7.4, 8.3, EASE_OUT);
  const forestOut = prog(s, 9.8, 10.7, EASE_IN_OUT);
  const forestRoute = prog(s, at("one", 7.9) - 0.1, at("forest", 8.5) + 0.5, EASE_IN_OUT);

  const cityPts = resample(CITY_PATH, 120, cityRoute);
  const forestPts = resample(FOREST_PATH, 120, forestRoute);
  const cityK = cityIn * (1 - cityOut);
  const forestK = forestIn * (1 - forestOut);

  return (
    <group>
      {people.map((m, i) =>
        m.p > 0.001 ? (
          <mesh key={i} position={[m.x, 0.2 * m.p, m.z]} scale={m.p} castShadow>
            <capsuleGeometry args={[0.085, 0.2, 8, 16]} />
            <meshStandardMaterial color={P.clay} roughness={0.85} />
          </mesh>
        ) : null,
      )}

      {cityK > 0.001 && (
        <group>
          <Slab z={CITY_Z} k={cityK} color={P.clay} />
          {BLOCKS.map((b, i) => {
            const g = prog(cityK, b.d * 0.4, b.d * 0.4 + 0.6);
            return g > 0.001 ? (
              <mesh key={i} position={[b.x, 0.04 + (b.h * g) / 2, b.z]} castShadow receiveShadow>
                <boxGeometry args={[0.36, b.h * g, 0.3]} />
                <meshStandardMaterial color={P.clay} roughness={0.85} />
              </mesh>
            ) : null;
          })}
          {cityRoute > 0.01 && cityOut < 0.5 && <Tube points={cityPts} radius={0.028} color={P.stress} segments={200} />}
          {cityRoute > 0.01 && cityOut < 0.5 && (
            <mesh position={cityPts[cityPts.length - 1]} castShadow>
              <sphereGeometry args={[0.07, 24, 24]} />
              <meshStandardMaterial color={P.stress} roughness={0.6} />
            </mesh>
          )}
        </group>
      )}

      {forestK > 0.001 && (
        <group>
          <Slab z={FOREST_Z} k={forestK} color={P.clay} />
          {TREES.map((t, i) => {
            const g = prog(forestK, t.d * 0.4, t.d * 0.4 + 0.6, EASE_OUT) * t.s;
            return g > 0.001 ? (
              <group key={i} position={[t.x, 0.04, t.z]} scale={g}>
                <mesh position={[0, 0.06, 0]} castShadow>
                  <cylinderGeometry args={[0.02, 0.025, 0.12, 8]} />
                  <meshStandardMaterial color={P.clay} roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.28, 0]} castShadow>
                  <coneGeometry args={[0.13, 0.36, 7]} />
                  <meshStandardMaterial color={P.calm} roughness={0.85} flatShading />
                </mesh>
              </group>
            ) : null;
          })}
          {forestRoute > 0.01 && forestOut < 0.5 && <Tube points={forestPts} radius={0.028} color={P.paper} segments={200} />}
          {forestRoute > 0.01 && forestOut < 0.5 && (
            <mesh position={forestPts[forestPts.length - 1]} castShadow>
              <sphereGeometry args={[0.07, 24, 24]} />
              <meshStandardMaterial color={P.paper} roughness={0.6} />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
};

export const WALK_ANCHORS = { city: [-1.45, 0, CITY_Z - 0.7] as V, forest: [-1.45, 0, FOREST_Z - 0.62] as V };
