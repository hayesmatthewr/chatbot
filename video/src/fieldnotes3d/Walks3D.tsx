import { useMemo } from "react";
import { random } from "remotion";
import { IcosahedronGeometry } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createNoise3D } from "simplex-noise";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { Clay, Glaze } from "./materials";
import { CONFIG } from "./config";
import { P } from "./theme";
import { Tube } from "./Tube";

type V = [number, number, number];
const CITY_Z = -1.35;
const FOREST_Z = 1.05;

const BLOCKS = Array.from({ length: 15 }, (_, i) => {
  const c = i % 5;
  const r = Math.floor(i / 5);
  return { x: -1.04 + c * 0.52, z: CITY_Z - 0.44 + r * 0.44, h: 0.3 + random(`bh${i}`) * 0.8, d: random(`bd${i}`) };
});
const CITY_PATH: V[] = [
  [-1.3, 0.1, CITY_Z + 0.22],
  [-0.78, 0.1, CITY_Z + 0.22],
  [-0.78, 0.1, CITY_Z - 0.22],
  [0.26, 0.1, CITY_Z - 0.22],
  [0.26, 0.1, CITY_Z + 0.22],
  [1.3, 0.1, CITY_Z + 0.22],
];
// A soft meander (dense points so the resample stays smooth).
const FOREST_PATH: V[] = Array.from({ length: 40 }, (_, i) => {
  const x = -1.3 + (2.6 * i) / 39;
  return [x, 0.1, FOREST_Z + 0.24 * Math.sin(x * 2.4)] as V;
});

/** Resample a polyline to n points up to fraction `upto` of its length. */
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
const FOREST_DENSE = resample(FOREST_PATH, 80, 1);

// Trees: clustered rounded canopies, kept clear of the path.
const TREES = Array.from({ length: 22 }, (_, i) => ({
  x: -1.25 + random(`fx${i}`) * 2.5,
  z: FOREST_Z - 0.52 + random(`fz${i}`) * 1.04,
  s: 0.75 + random(`fs${i}`) * 0.55,
  d: random(`fd${i}`),
  tint: random(`ft${i}`),
})).filter((t) => FOREST_DENSE.every((p) => Math.hypot(p[0] - t.x, p[2] - t.z) > 0.2));

const Slab = ({ z, k }: { z: number; k: number }) => {
  const geo = useMemo(() => new RoundedBoxGeometry(2.95, 0.1, 1.35, 4, 0.04), []);
  return (
    <mesh geometry={geo} position={[0, 0.05, z]} scale={[k, 1, k]} receiveShadow castShadow>
      <Clay />
    </mesh>
  );
};

const Block = ({ x, z, h, g }: { x: number; z: number; h: number; g: number }) => {
  const base = useMemo(() => new RoundedBoxGeometry(0.36, h, 0.3, 5, 0.04), [h]);
  const crown = useMemo(() => new RoundedBoxGeometry(0.24, 0.12, 0.2, 5, 0.035), []);
  const k = Math.max(g, 0.001);
  return (
    <group position={[x, 0.1, z]} scale={[1, k, 1]}>
      <mesh geometry={base} position={[0, h / 2, 0]} castShadow receiveShadow>
        <Clay facadeRelief />
      </mesh>
      <mesh geometry={crown} position={[0, h + 0.06, 0]} castShadow>
        <Clay />
      </mesh>
    </group>
  );
};

// Organic tree crowns: noise-sculpted icospheres (irregular, soft lobes), a few variants shared by all trees.
const noise = createNoise3D(() => random("crowns"));
const CROWNS = [0, 1, 2].map((v) => {
  const g = mergeVertices(new IcosahedronGeometry(0.17, 6));
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n = noise(x * 6 + v * 10, y * 6, z * 6) * 0.22 + noise(x * 13, y * 13 + v * 7, z * 13) * 0.08;
    const k = 1 + n;
    pos.setXYZ(i, x * k, y * k * 1.25, z * k);
  }
  g.computeVertexNormals();
  return g;
});

/** A walker: tapered torso with shoulders, head, two legs mid-stride. */
const Figure = ({ x, z, k, stride }: { x: number; z: number; k: number; stride: number }) => (
  <group position={[x, 0, z]} scale={k} rotation={[0, 0.5, 0]}>
    {[-1, 1].map((side) => (
      <mesh key={side} position={[side * 0.05, 0.13, side * stride * 0.03]} rotation={[side * stride * 0.28, 0, 0]} castShadow>
        <capsuleGeometry args={[0.035, 0.17, 8, 24]} />
        <Clay />
      </mesh>
    ))}
    <mesh position={[0, 0.36, 0]} scale={[1, 1, 0.72]} castShadow>
      <cylinderGeometry args={[0.1, 0.07, 0.26, 32]} />
      <Clay />
    </mesh>
    <mesh position={[0, 0.49, 0]} scale={[1, 0.45, 0.72]} castShadow>
      <sphereGeometry args={[0.1, 32, 32]} />
      <Clay />
    </mesh>
    <mesh position={[0, 0.62, 0]} castShadow>
      <sphereGeometry args={[0.072, 48, 48]} />
      <Clay />
    </mesh>
  </group>
);

const Tree = ({ x, z, g, tint }: { x: number; z: number; g: number; tint: number }) => {
  const leaf = tint > 0.5 ? "#7fae7c" : "#94bf8f";
  return (
    <group position={[x, 0.1, z]} scale={g}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.016, 0.03, 0.2, 16]} />
        <Clay color="#d9d2c4" />
      </mesh>
      <mesh geometry={CROWNS[Math.floor(tint * 3) % 3]} position={[0, 0.36, 0]} rotation={[0, tint * 6, 0]} castShadow receiveShadow>
        <Clay color={leaf} />
      </mesh>
    </group>
  );
};

export const Walks3D = ({ s }: { s: number }) => {
  if (s < 4.8 || s > 10.8) return null;

  const people = Array.from({ length: 12 }, (_, i) => {
    // all 12 are in place by 5.45 s (hold frame), leave at 5.9
    const p = prog(s, at("12") - 0.1 + i * 0.03, at("12") + 0.25 + i * 0.03, EASE_OUT) * (1 - prog(s, 5.9 + i * 0.02, 6.5 + i * 0.02, EASE_IN_OUT));
    return { x: -0.66 + (i % 4) * 0.44, z: -0.4 + Math.floor(i / 4) * 0.42, p };
  });

  const cityIn = prog(s, 6.0, 6.9, EASE_OUT);
  const cityOut = CONFIG.dioramas ? prog(s, 7.9, 8.5, EASE_IN_OUT) : prog(s, 9.3, 10.1, EASE_IN_OUT);
  const cityRoute = prog(s, at("crowded") - 0.3, at("and") + 0.1, EASE_IN_OUT);
  const forestIn = prog(s, 7.4, 8.3, EASE_OUT);
  const forestOut = prog(s, 9.8, 10.7, EASE_IN_OUT);
  const forestRoute = prog(s, at("one", 7.9) - 0.1, at("forest", 8.5) + 0.5, EASE_IN_OUT);

  const dz = CONFIG.dioramas ? [0, 0] : [0.7, -0.45];
  const dy = CONFIG.dioramas ? 0 : -0.06;
  const sx = CONFIG.dioramas ? 1 : 0.76;
  const shift = (pts: V[], z: number): V[] => pts.map(([x, y, zz]) => [x * sx, y + dy, zz + z]);
  const cityPts = shift(resample(CITY_PATH, 120, cityRoute), dz[0]);
  const forestPts = shift(resample(FOREST_PATH, 160, forestRoute), dz[1]);
  const cityK = cityIn * (1 - cityOut);
  const forestK = forestIn * (1 - forestOut);

  return (
    <group>
      {people.map((m, i) =>
        m.p > 0.001 ? (
          CONFIG.figures ? (
            <Figure key={i} x={m.x} z={m.z} k={m.p} stride={i % 2 ? 1 : -1} />
          ) : (
          <mesh key={i} position={[m.x, 0.07 * m.p, m.z]} scale={[m.p, m.p * 0.62, m.p]} castShadow receiveShadow>
            <sphereGeometry args={[0.16, 64, 48]} />
            <Clay />
          </mesh>
          )
        ) : null,
      )}

      {cityK > 0.001 && (
        <group>
          {CONFIG.dioramas && <Slab z={CITY_Z} k={cityK} />}
          {CONFIG.dioramas && BLOCKS.map((b, i) => {
            const g = prog(cityK, b.d * 0.4, b.d * 0.4 + 0.6);
            return g > 0.001 ? <Block key={i} x={b.x} z={b.z} h={b.h} g={g} /> : null;
          })}
          {cityRoute > 0.01 && cityOut < 0.5 && <Tube points={cityPts} radius={CONFIG.dioramas ? 0.03 : 0.05} color={P.stress} segments={200} glaze />}
          {cityRoute > 0.01 && cityOut < 0.5 && (
            <mesh position={cityPts[cityPts.length - 1]} castShadow>
              <sphereGeometry args={[0.075, 32, 32]} />
              <Glaze color={P.stress} />
            </mesh>
          )}
        </group>
      )}

      {forestK > 0.001 && (
        <group>
          {CONFIG.dioramas && <Slab z={FOREST_Z} k={forestK} />}
          {CONFIG.dioramas && TREES.map((t, i) => {
            const g = prog(forestK, t.d * 0.4, t.d * 0.4 + 0.6, EASE_OUT) * t.s;
            return g > 0.001 ? <Tree key={i} x={t.x} z={t.z} g={g} tint={t.tint} /> : null;
          })}
          {forestRoute > 0.01 && forestOut < 0.5 && <Tube points={forestPts} radius={CONFIG.dioramas ? 0.03 : 0.05} color={P.calm} segments={300} glaze />}
          {forestRoute > 0.01 && forestOut < 0.5 && (
            <mesh position={forestPts[forestPts.length - 1]} castShadow>
              <sphereGeometry args={[0.075, 32, 32]} />
              <Glaze color={P.calm} />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
};

// labels sit just in front of each slab, clear of the geometry
export const WALK_ANCHORS = CONFIG.dioramas
  ? { city: [0, 1.45, CITY_Z - 0.55] as V, forest: [0, 0, FOREST_Z + 0.95] as V }
  : { city: [0, 0, -1.15] as V, forest: [0, 0, 1.15] as V };
