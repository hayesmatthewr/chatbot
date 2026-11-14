import { useEffect, useMemo } from "react";
import { LatheGeometry, Vector2 } from "three";
import { Easing, interpolateColors } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { P } from "./theme";
import { Clay, Glass } from "./materials";

const H = 2.2;
const R = 0.36; // outer radius
const WALL = 0.035;
const SLOW = Easing.bezier(0.45, 0, 0.2, 1);
export const VIAL_X = [-1.1, 0, 1.1];

/** Fill fraction of each vial over time (forest values; the city cut overrides them). */
export const fills = (s: number): number[] => {
  const t = lerp(0.82, 0.3, prog(s, at("dropped") - 0.2, at("dropped") + 1.4, SLOW));
  const d = lerp(0.72, 0.32, prog(s, at("eased") - 0.2, at("eased") + 1.4, SLOW));
  const v = lerp(0.28, 0.5, prog(s, at("vigor") - 0.1, at("vigor") + 1.2, SLOW)) + 0.38 * prog(s, at("rose") - 0.2, at("rose") + 1.3, SLOW);
  return [t, d, v];
};

export const cityMode = (s: number) => {
  if (s < 17.26) return 0;
  if (s < at("forest", 19)) return 1;
  return 1 - prog(s, at("forest", 19), at("forest", 19) + 1.3, EASE_IN_OUT);
};

/** Glass tube profile: rounded base, real wall thickness, rolled rim lip. */
const tubeProfile = () => {
  const pts: Vector2[] = [];
  const rb = 0.16; // base fillet
  for (let k = 0; k <= 10; k++) {
    const a = (Math.PI / 2) * (k / 10);
    pts.push(new Vector2((R - rb) + rb * Math.sin(a), rb - rb * Math.cos(a)));
  }
  pts.unshift(new Vector2(0.001, 0));
  pts.push(new Vector2(R, H - 0.04));
  for (let k = 0; k <= 8; k++) {
    const a = Math.PI * (k / 8);
    pts.push(new Vector2(R + 0.012 + 0.025 * Math.sin(a), H - 0.04 + 0.035 * (1 - Math.cos(a)) / 2 + 0.02 * Math.sin(a)));
  }
  pts.push(new Vector2(R - WALL, H - 0.03));
  pts.push(new Vector2(R - WALL, rb));
  for (let k = 10; k >= 0; k--) {
    const a = (Math.PI / 2) * (k / 10);
    pts.push(new Vector2((R - WALL - rb) + (rb - WALL) * Math.sin(a), WALL + (rb - WALL) - (rb - WALL) * Math.cos(a)));
  }
  pts.push(new Vector2(0.001, WALL));
  return pts;
};

/** Liquid: one volume following the base, with a concave meniscus that climbs the wall. */
const liquidProfile = (level: number) => {
  const r = R - WALL - 0.004;
  const rb = 0.16 - WALL;
  const pts: Vector2[] = [new Vector2(0.001, WALL + 0.002)];
  for (let k = 0; k <= 10; k++) {
    const a = (Math.PI / 2) * (k / 10);
    pts.push(new Vector2((r - rb) + rb * Math.sin(a), WALL + rb - rb * Math.cos(a)));
  }
  const top = Math.max(level, WALL + rb + 0.02);
  pts.push(new Vector2(r, top + 0.014));
  for (let k = 1; k <= 12; k++) {
    const x = r * (1 - k / 12);
    const climb = 0.014 * Math.pow(x / r, 10);
    pts.push(new Vector2(Math.max(x, 0.001), top + climb));
  }
  return pts;
};

const Liquid = ({ level, color }: { level: number; color: string }) => {
  const geo = useMemo(() => new LatheGeometry(liquidProfile(level), 96), [level]);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} castShadow>
      <meshPhysicalMaterial color={color} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} emissive={color} emissiveIntensity={0.22} />
    </mesh>
  );
};

export const Vials = ({ s, w }: { s: number; w: number }) => {
  const tube = useMemo(() => new LatheGeometry(tubeProfile(), 128), []);
  useEffect(() => () => tube.dispose(), [tube]);
  if (s < 10.2 || s > 21.2) return null;
  const city = cityMode(s);
  const f = fills(s);
  const fillColor = interpolateColors(Math.max(w - city, 0), [0, 1], ["#9a9fa2", "#3f9a55"]);

  return (
    <group>
      {VIAL_X.map((x, i) => {
        const appear = prog(s, 10.4 + i * 0.25, 11.4 + i * 0.25, EASE_OUT);
        const leave = prog(s, 20.2 + i * 0.12, 21.0 + i * 0.12, EASE_IN_OUT);
        const k = appear * (1 - leave);
        if (k < 0.001) return null;
        const level = WALL + lerp(f[i], 0.5, city) * (H - 0.3);
        return (
          <group key={i} position={[x, 0, 0]} scale={[k, k, k]}>
            <mesh position={[0, 0.03, 0]} receiveShadow castShadow>
              <cylinderGeometry args={[R + 0.1, R + 0.12, 0.06, 96]} />
              <Clay />
            </mesh>
            <group position={[0, 0.06, 0]}>
              <Liquid level={Math.round(level * 400) / 400} color={fillColor} />
              <mesh geometry={tube} castShadow>
                <Glass />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
};

export { H as VIAL_H };
