import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./components/Background";
import { Captions } from "./components/Caption";
import { PillNav } from "./components/PillNav";
import { loadFonts } from "./lib/fonts";
import { Altitude } from "./scenes/Altitude";
import { BurnFat } from "./scenes/BurnFat";
import { Enzyme } from "./scenes/Enzyme";
import { Intro } from "./scenes/Intro";
import { Legs } from "./scenes/Legs";
import { MapScene } from "./scenes/MapScene";

loadFonts();

/**
 * "Born To Run?" — every scene reads absolute time in seconds, so timings map 1:1
 * onto the original edit and the voiceover.
 */
export const BornToRun = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />
      <MapScene s={s} />
      <Intro s={s} />
      <Legs s={s} />
      <BurnFat s={s} />
      <Enzyme s={s} />
      <Altitude s={s} />
      <PillNav s={s} />
      {s >= 3.9 && <Captions s={s} />}
      <Audio src={staticFile("voiceover.m4a")} />
    </AbsoluteFill>
  );
};
