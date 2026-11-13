import { SANS } from "../lib/constants";

type Cue = { at: number; lines: string[] };

// Timings read off the source video's burned-in captions (hard cuts, no animation).
export const CUES: Cue[] = [
  { at: 3.9, lines: ["And it's no surprise that the Kenyan", "record breaker"] },
  { at: 6.4, lines: ["was from the Kalenjin tribe"] },
  { at: 8.15, lines: ["They have significantly less lower leg", "mass compared to other runners"] },
  { at: 11.95, lines: ["making the leg easier to swing like a", "pendulum"] },
  { at: 14.75, lines: ["reducing oxygen consumption"] },
  { at: 16.5, lines: ["Muscle biopsies revealed that Kalenjin", "runners have higher concentrations of"] },
  { at: 20.95, lines: ["3-hydroxyacyl-CoA dehydrogenase", "which allows their muscles to burn fat"] },
  { at: 26.75, lines: ["more efficiently while sparing glycogen", "during prolonged effort"] },
  { at: 30.25, lines: ["They grow up at high altitude which", "forces the body to"] },
  { at: 33.15, lines: ["produce more red blood cells and", "haemoglobin"] },
  { at: 35.9, lines: ["increasing oxygen delivery to muscles"] },
];

export const CaptionText = ({ lines, color = "#1d1f20" }: { lines: string[]; color?: string }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 1107,
      transform: "translateY(-50%)",
      textAlign: "center",
      fontFamily: SANS,
      fontWeight: 400,
      fontSize: 23.5,
      lineHeight: 1.08,
      letterSpacing: "-0.015em",
      color,
    }}
  >
    {lines.map((l) => (
      <div key={l}>{l}</div>
    ))}
  </div>
);

export const Captions = ({ s }: { s: number }) => {
  const cue = [...CUES].reverse().find((c) => s >= c.at);
  return cue ? <CaptionText lines={cue.lines} /> : null;
};
