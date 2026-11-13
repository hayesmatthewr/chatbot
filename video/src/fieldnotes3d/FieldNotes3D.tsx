import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, Audio, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFonts } from "../lib/fonts";
import { cameraAt, FOV } from "./camera";
import { Core } from "./Core";
import { Overlay } from "./Overlay";
import { P, worldAt } from "./theme";
import { ThoughtLine } from "./ThoughtLine";
import { Vials } from "./Vials";
import { Walks3D } from "./Walks3D";

loadFonts();

export const FIELD_NOTES_3D_DURATION_S = 29.33;

const CameraRig = ({ s }: { s: number }) => {
  const camera = useThree((st) => st.camera);
  const { pos, target } = cameraAt(s);
  camera.position.set(...pos);
  camera.lookAt(...target);
  return null;
};

/** Plain two-tone backdrop: concrete grey ⇄ deep moss, with a soft fog dissolve. Nothing else moves back here. */
const Backdrop = ({ w }: { w: number }) => {
  const fog = Math.sin(Math.PI * w);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${P.cityTop}, ${P.cityBottom})` }} />
      <AbsoluteFill style={{ opacity: w, background: `radial-gradient(110% 70% at 50% 40%, ${P.forestTop}, ${P.forestBottom})` }} />
      {fog > 0.01 && <AbsoluteFill style={{ background: P.paper, opacity: fog * 0.3 }} />}
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.18))" }} />
    </AbsoluteFill>
  );
};

/** "Field Notes" rebuilt as a minimal clay 3D piece. */
export const FieldNotes3D = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = frame / fps;
  const w = worldAt(s);
  const sky = interpolateColors(w, [0, 1], ["#ffffff", "#e8efe4"]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop w={w} />
      <ThreeCanvas width={width} height={height} shadows="soft" camera={{ fov: FOV, position: [0, 0.6, 9.6], near: 0.1, far: 100 }}>
        <CameraRig s={s} />
        <hemisphereLight args={[sky, "#9da3a6", 0.95 - 0.25 * w]} />
        <directionalLight
          position={[3.5, 7, 5]}
          intensity={1.7}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-radius={8}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.35} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.12 + 0.22 * w} />
        </mesh>
        <ThoughtLine s={s} />
        <Walks3D s={s} />
        <Vials s={s} w={w} />
        <Core s={s} />
      </ThreeCanvas>
      <Overlay s={s} w={w} />
      <Audio src={staticFile("audio3/voiceover-3.m4a")} />
    </AbsoluteFill>
  );
};
