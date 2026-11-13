import { MONO } from "../lib/constants";

type Props = {
  label: string;
  /** CSS background for the placeholder fill. */
  fill: string;
  /** Animated diagonal stripes to read as "video" rather than a still. */
  video?: boolean;
  s?: number;
  dark?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Stand-in for a photo or clip from the original edit. Drop real assets in later. */
export const Placeholder = ({ label, fill, video, s = 0, dark, style, children }: Props) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: fill, ...style }}>
    {video && (
      <div
        style={{
          position: "absolute",
          inset: -80,
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.07) 0 22px, rgba(255,255,255,0) 22px 54px)",
          transform: `translateX(${-((s * 60) % 58)}px)`,
        }}
      />
    )}
    {children}
    <div
      style={{
        position: "absolute",
        left: 10,
        bottom: 9,
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.5)",
      }}
    >
      {video ? "▶ " : ""}
      {label}
    </div>
  </div>
);
