import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { useLayoutEffect, useMemo } from "react";
import { ACESFilmicToneMapping, BoxGeometry, CanvasTexture, Mesh, MeshBasicMaterial, PMREMGenerator, Scene, SRGBColorSpace } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { AbsoluteFill, Audio, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFonts } from "../lib/fonts";
import { cameraAt, FOV } from "./camera";
import { CONFIG } from "./config";
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

/**
 * The studio — sole owner of lighting, environment, tone mapping and exposure.
 * One key sun (upper right), soft room reflections, one tone map for every shot.
 */
const Studio = ({ w }: { w: number }) => {
  const { gl, scene } = useThree();
  const env = useMemo(() => {
    if (!CONFIG.envLighting) return null;
    const pm = new PMREMGenerator(gl);
    // Studio environment: the room plus two tall softbox strips, so glass and clay get long vertical highlights.
    const room = new RoomEnvironment() as unknown as Scene;
    const strip = new MeshBasicMaterial({ color: 0xffffff });
    strip.color.multiplyScalar(6);
    for (const [x, z] of [[-3.2, 2.5], [3.4, 1.5]]) {
      const m = new Mesh(new BoxGeometry(0.5, 6, 0.1), strip);
      m.position.set(x, 1.5, z);
      m.lookAt(0, 1.5, 0);
      room.add(m);
    }
    const tex = pm.fromScene(room, 0.03).texture;
    pm.dispose();
    return tex;
  }, [gl]);
  useLayoutEffect(() => {
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = CONFIG.exposure;
    scene.environment = env;
    scene.environmentIntensity = 0.16;
  }, [gl, scene, env]);
  // The backdrop lives inside the scene (not behind the canvas) so glass has something to refract.
  const bg = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 4;
    c.height = 512;
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    return { c, tex };
  }, []);
  useLayoutEffect(() => {
    if (!bg) return;
    const ctx = bg.c.getContext("2d");
    if (!ctx) return;
    const top = interpolateColors(w, [0, 1], [P.cityTop, P.forestTop]);
    const bottom = interpolateColors(w, [0, 1], [P.cityBottom, P.forestBottom]);
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 512);
    bg.tex.needsUpdate = true;
    scene.background = bg.tex;
  }, [bg, w, scene]);
  const sky = interpolateColors(w, [0, 1], ["#ffffff", "#f1f6ee"]);
  return (
    <>
      <hemisphereLight args={[sky, "#7f867d", 0.06]} />
      {/* rim: cool, from behind-left */}
      <directionalLight position={[-3.5, 4.0, -5.5]} intensity={2.4} color="#dce6ff" />
      <directionalLight
        color="#ffefd9"
        position={[4.2, 5.0, 2.6]}
        intensity={4.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={10}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      {/* cool fill ≈ 1:3 against the key */}
      <directionalLight position={[-5, 2.5, 3]} intensity={1.0} color="#e3ebff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </>
  );
};

/** Plain bright backdrop: cool grey ⇄ pale sage mist. Nothing moves back here. */
const Backdrop = ({ w }: { w: number }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${P.cityTop}, ${P.cityBottom})` }} />
    <AbsoluteFill style={{ opacity: w, background: `linear-gradient(180deg, ${P.forestTop}, ${P.forestBottom})` }} />
  </AbsoluteFill>
);

/** "Field Notes" — minimal clay 3D, pass 2 (threejs-motion card). */
export const FieldNotes3D = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = frame / fps;
  const w = worldAt(s);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop w={w} />
      <ThreeCanvas width={width} height={height} shadows="soft" camera={{ fov: FOV, position: [0, 5, 8], near: 0.1, far: 100 }}>
        <CameraRig s={s} />
        <Studio w={w} />
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
