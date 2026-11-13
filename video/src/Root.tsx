import { Composition } from "remotion";
import { BornToRun } from "./BornToRun";
import { DURATION_S, FPS, HEIGHT, WIDTH } from "./lib/constants";
import { OVERRIDDEN_DURATION_S, Overridden } from "./overridden/Overridden";

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
  </>
);
