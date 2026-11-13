import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFonts } from "../lib/fonts";
import { Body } from "./Body";
import { NoteCaptions } from "./NoteCaptions";
import { Opening } from "./Opening";
import { Results } from "./Results";
import { worldAt } from "./theme";
import { Walks } from "./Walks";
import { World } from "./World";

loadFonts();

export const FIELD_NOTES_DURATION_S = 29.33;

/** "Field Notes": city ⇄ forest. One line changes shape through the whole video. */
export const FieldNotes = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <World s={s} w={worldAt(s)} />
      <Opening s={s} />
      <Walks s={s} />
      <Results s={s} />
      <Body s={s} />
      <NoteCaptions s={s} />
      <Audio src={staticFile("audio3/voiceover-3.m4a")} />
    </AbsoluteFill>
  );
};
