import { Composition } from "remotion";
import { BornToRun } from "./BornToRun";
import { DURATION_S, FPS, HEIGHT, WIDTH } from "./lib/constants";

export const Root = () => (
  <Composition
    id="BornToRun"
    component={BornToRun}
    durationInFrames={Math.ceil(DURATION_S * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
