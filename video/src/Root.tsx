import { Composition } from "remotion";
import { BornToRun } from "./BornToRun";
import { DURATION_S, FPS, HEIGHT, WIDTH } from "./lib/constants";
import { OVERRIDDEN_DURATION_S, Overridden } from "./overridden/Overridden";
import { FIELD_NOTES_3D_DURATION_S, FieldNotes3D } from "./fieldnotes3d/FieldNotes3D";
import { FIELD_NOTES_DURATION_S, FieldNotes } from "./fieldnotes/FieldNotes";

export const Root = () => (
  <>
    <Composition
      id="BornToRun"
      component={BornToRun}
      durationInFrames={Math.ceil(DURATION_S * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="Overridden"
      component={Overridden}
      durationInFrames={Math.ceil(OVERRIDDEN_DURATION_S * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="FieldNotesFlat"
      component={FieldNotes}
      durationInFrames={Math.ceil(FIELD_NOTES_DURATION_S * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="FieldNotes"
      component={FieldNotes3D}
      durationInFrames={Math.ceil(FIELD_NOTES_3D_DURATION_S * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
