import { AbsoluteFill } from "remotion";

/** Cool grey gradient with a faint paper grain, sampled from the source video. */
export const Background = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg, #e1e6e5 0%, #d2d9d8 50%, #b9c3c4 100%)" }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.18, mixBlendMode: "multiply" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);
