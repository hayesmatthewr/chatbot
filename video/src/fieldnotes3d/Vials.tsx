import { Easing, interpolateColors } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { P } from "./theme";

const H = 2.2;
const R = 0.34;
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

export const Vials = ({ s, w }: { s: number; w: number }) => {
  if (s < 10.2 || s > 21.2) return null;
  const city = cityMode(s);
  const f = fills(s);
  const fillColor = interpolateColors(w, [0, 1], [P.neutral, P.calm]);

  return (
    <group>
      {VIAL_X.map((x, i) => {
        const appear = prog(s, 10.4 + i * 0.25, 11.4 + i * 0.25, EASE_OUT);
        const leave = prog(s, 20.2 + i * 0.12, 21.0 + i * 0.12, EASE_IN_OUT);
        const k = appear * (1 - leave);
        if (k < 0.001) return null;
        const level = lerp(f[i], 0.5, city) * H;
        return (
          <group key={i} position={[x, 0, 0]} scale={[k, k, k]}>
            <mesh position={[0, 0.03, 0]} receiveShadow castShadow>
              <cylinderGeometry args={[R + 0.08, R + 0.08, 0.06, 64]} />
              <meshStandardMaterial color={P.clay} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.06 + level / 2, 0]} castShadow>
              <cylinderGeometry args={[R - 0.05, R - 0.05, Math.max(level, 0.001), 64]} />
              <meshStandardMaterial color={fillColor} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.06 + H / 2, 0]}>
              <cylinderGeometry args={[R, R, H, 64, 1, true]} />
              <meshStandardMaterial color="#ffffff" roughness={0.15} transparent opacity={0.14} depthWrite={false} side={2} />
            </mesh>
            <mesh position={[0, 0.06 + H, 0]}>
              <torusGeometry args={[R, 0.012, 12, 64]} />
              <meshStandardMaterial color={P.clay} roughness={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const vialTop = (i: number) => [VIAL_X[i], 0, 0] as [number, number, number];
export { H as VIAL_H };
// keep EASE_OUT referenced for future tweaks
void EASE_OUT;
