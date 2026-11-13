import { EASE_IN_OUT, EASE_OUT, tween } from "../lib/anim";
import { MONO, SANS, SERIF } from "../lib/constants";
import { CaptionText } from "../components/Caption";
import { Placeholder } from "../components/Placeholder";
import { StaggerWords } from "../components/StaggerWords";

/** Stand-in for the cut-out portrait of the runner holding his shoe. */
const RunnerCutout = () => (
  <svg width={720} height={1280} style={{ position: "absolute", inset: 0 }}>
    <defs>
      <linearGradient id="jacket" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f0567a" />
        <stop offset="1" stopColor="#c8244c" />
      </linearGradient>
    </defs>
    <path d="M97 1280 L118 760 Q140 600 300 560 L560 548 Q700 560 720 640 L720 1280 Z" fill="url(#jacket)" />
    <path d="M330 560 L520 560 L500 640 L350 640 Z" fill="#2b1d18" />
    <ellipse cx="428" cy="410" rx="104" ry="128" fill="#3a2a24" />
    <g transform="rotate(-9 420 930)">
      <rect x="290" y="840" width="280" height="190" rx="6" fill="#f4f4f2" />
      <text x="430" y="945" textAnchor="middle" fontFamily={MONO} fontSize="15" letterSpacing="2" fill="#555">
        RUNNER CUTOUT
      </text>
    </g>
  </svg>
);

export const Intro = ({ s }: { s: number }) => {
  if (s > 4.2) return null;
  const pan = tween(s, 3.3, 4.1, 0, 760, EASE_IN_OUT);
  const cardX = tween(s, 0.35, 1.3, -440, 0, EASE_OUT);

  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${pan}px)` }}>
      <RunnerCutout />

      <StaggerWords
        s={s}
        text="Born To Run?"
        start={0.18}
        stagger={0.24}
        dur={0.7}
        rise={20}
        blur={12}
        scaleFrom={1.18}
        style={{
          position: "absolute",
          left: 0,
          width: 680,
          top: 182,
          textAlign: "center",
          fontFamily: SERIF,
          fontSize: 68,
          letterSpacing: "-0.02em",
          color: "#151617",
        }}
      />

      <StaggerWords
        s={s}
        text={"Sabastian Sawe,\nLong-Distance Runner"}
        start={0.45}
        stagger={0.1}
        dur={0.5}
        rise={8}
        style={{
          position: "absolute",
          left: 136,
          top: 497,
          fontFamily: SANS,
          fontSize: 21,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#1d1f20",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 147,
          top: 644,
          width: 361,
          height: 358,
          borderRadius: 6,
          overflow: "hidden",
          transform: `translateX(${cardX}px)`,
        }}
      >
        <Placeholder
          video
          s={s}
          dark
          label="Finish-line footage"
          fill="linear-gradient(180deg, #d9435b 0%, #b8344a 45%, #7c6b62 46%, #5d514b 100%)"
        />
      </div>

      <CaptionText lines={["Sabastian Sawe ran the first sub-two", "hour marathon time"]} color="#ffffff" />
    </div>
  );
};
