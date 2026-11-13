import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { PillNav, type PillItem } from "../components/PillNav";
import { loadFonts } from "../lib/fonts";
import { Control } from "./Control";
import { DoomScroll } from "./DoomScroll";
import { Hook } from "./Hook";
import { Study } from "./Study";
import { Trade } from "./Trade";
import { WordCaptions } from "./WordCaptions";
import { at } from "./words";

loadFonts();

export const OVERRIDDEN_DURATION_S = 20.37;

const ITEMS: PillItem[] = [
  { label: "Doom-Scroll", on: at("The"), off: 11.05, numberAtStart: false, width: 190 },
  { label: "Executive Control", on: 11.45, off: 15.95, numberAtStart: true, width: 250 },
  { label: "The Trade", on: 16.3, numberAtStart: true, width: 180 },
];

/** "Overridden": the doom-scrolling explainer, timed to the word timings of the voiceover. */
export const Overridden = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />
      <Hook s={s} />
      <Study s={s} />
      <DoomScroll s={s} />
      <Control s={s} />
      <Trade s={s} />
      <PillNav s={s} items={ITEMS} appear={6.65} />
      <WordCaptions s={s} />
      <Audio src={staticFile("audio2/voiceover-2.m4a")} />
    </AbsoluteFill>
  );
};
