import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";
import { at } from "../fieldnotes/words";
import { P } from "./theme";
import { Tube } from "./Tube";

const N = 160;
type V = [number, number, number];

const knot = (i: number): V => {
  const u = (i / (N - 1)) * Math.PI * 2 * 3;
  const r = 0.75 + 0.32 * Math.sin(2.3 * u + 0.6);
  return [r * Math.cos(u + 0.45 * Math.sin(2 * u)), 0.6 + 0.85 * r * Math.sin(1.06 * u), 0.55 * Math.sin(3.1 * u)];
};

const wave = (i: number, bump: number): V => {
  const x = -1.75 + (3.5 * i) / (N - 1);
  const d = 0.32 * Math.exp(-(((x - bump) / 0.28) ** 2));
  return [x, 0.6 + d, 0];
};

/** Opening: a clay knot (overthinking) that slowly untangles into a calm line with one nerve pulse. */
export const ThoughtLine = ({ s }: { s: number }) => {
  if (s > 5.4) return null;
  const grow = prog(s, 0, 1.4, EASE_OUT);
  const tighten = prog(s, at("stress") - 0.1, at("stress") + 0.7, EASE_IN_OUT);
  const unravel = prog(s, 1.8, 3.6, EASE_IN_OUT);
  const bump = lerp(-2.6, 2.6, prog(s, 3.0, 4.6, EASE_IN_OUT));
  const thin = prog(s, 4.6, 5.3, EASE_IN_OUT);

  const pts: V[] = Array.from({ length: N }, (_, i) => {
    const a = knot(i);
    const b = wave(i, bump);
    return [lerp(a[0], b[0], unravel), lerp(a[1], b[1], unravel), lerp(a[2], b[2], unravel)];
  });
  const scale = lerp(0.6, 1, grow) * (1 - 0.18 * tighten * (1 - unravel));
  const spin = (1 - unravel) * s * 0.18;

  return (
    <group position={[0, 0.6, 0]} scale={scale} rotation={[0, spin, 0]}>
      <group position={[0, -0.6, 0]}>
        <Tube points={pts} radius={0.075 * (1 - thin)} color={P.clay} />
      </group>
    </group>
  );
};
