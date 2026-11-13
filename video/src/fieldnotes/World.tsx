import { AbsoluteFill, random } from "remotion";
import { C } from "./theme";
import { Contours } from "./Contours";

const GRID = 64;

/** City street grid with flickering blocks. */
export const CityGrid = ({ s, width = 720, height = 1280, seed = "city" }: { s: number; width?: number; height?: number; seed?: string }) => {
  const tick = Math.floor(s * 7);
  const cols = Math.ceil(width / GRID);
  const rows = Math.ceil(height / GRID);
  const blocks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = random(`${seed}-${r}-${c}`);
      if (v < 0.42) {
        const on = random(`${seed}-${r}-${c}-${Math.floor(tick / (2 + Math.floor(v * 6)))}`) > 0.5;
        blocks.push(
          <rect key={`${r}-${c}`} x={c * GRID + 7} y={r * GRID + 7} width={GRID - 14} height={GRID - 14} fill={C.ink} opacity={on ? 0.11 : 0.05} />,
        );
      }
    }
  }
  return (
    <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0 }}>
      {blocks}
      {Array.from({ length: cols + 1 }, (_, c) => (
        <line key={`v${c}`} x1={c * GRID} y1={0} x2={c * GRID} y2={height} stroke={C.ink} strokeOpacity={0.16} strokeWidth={1} />
      ))}
      {Array.from({ length: rows + 1 }, (_, r) => (
        <line key={`h${r}`} x1={0} y1={r * GRID} x2={width} y2={r * GRID} stroke={C.ink} strokeOpacity={0.16} strokeWidth={1} />
      ))}
    </svg>
  );
};

const Grain = ({ opacity }: { opacity: number }) => (
  <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "overlay" }}>
    <filter id="fn-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#fn-grain)" />
  </svg>
);

/** Concrete ⇄ forest background with a fog dissolve between them. */
export const World = ({ s, w }: { s: number; w: number }) => {
  const fog = Math.sin(Math.PI * w);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.concrete}, ${C.concreteDeep})` }}>
        <CityGrid s={s} />
      </AbsoluteFill>
      {w > 0 && (
        <AbsoluteFill style={{ opacity: w, background: `radial-gradient(120% 80% at 50% 35%, ${C.moss}, ${C.mossDeep})` }}>
          <Contours s={s} width={720} height={1280} color={C.sage} opacity={0.42} />
        </AbsoluteFill>
      )}
      {fog > 0.01 && <AbsoluteFill style={{ background: C.paper, opacity: fog * 0.35, filter: "blur(20px)" }} />}
      <Grain opacity={0.35} />
    </AbsoluteFill>
  );
};
