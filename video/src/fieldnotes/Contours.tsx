import { contours } from "d3-contour";
import { geoPath } from "d3-geo";
import { createNoise3D } from "simplex-noise";
import { random } from "remotion";

const noise = createNoise3D(() => random("contours"));
const CELL = 16;
const path = geoPath();

type Props = { s: number; width: number; height: number; color: string; opacity?: number; levels?: number; seed?: number };

/** Slowly drifting topographic contour lines (marching squares over 3D simplex noise). */
export const Contours = ({ s, width, height, color, opacity = 1, levels = 11, seed = 0 }: Props) => {
  const nx = Math.ceil(width / CELL) + 1;
  const ny = Math.ceil(height / CELL) + 1;
  const values = new Array<number>(nx * ny);
  const z = s * 0.045 + seed;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const x = i * 0.055;
      const y = j * 0.055;
      values[j * nx + i] = noise(x, y, z) * 0.7 + noise(x * 2.1, y * 2.1, z * 1.3) * 0.3;
    }
  }
  const thresholds = Array.from({ length: levels }, (_, k) => -0.9 + (1.8 * k) / (levels - 1));
  const polys = contours().size([nx, ny]).thresholds(thresholds)(values);
  return (
    <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0, opacity }}>
      <g transform={`scale(${CELL})`}>
        {polys.map((p, k) => (
          <path key={k} d={path(p) ?? ""} fill="none" stroke={color} strokeWidth={(k % 4 === 0 ? 1.6 : 0.9) / CELL} />
        ))}
      </g>
    </svg>
  );
};
