import { PerspectiveCamera, Vector3 } from "three";
import { EASE_IN_OUT, LINEAR } from "../lib/anim";

export const FOV = 40;
type V3 = [number, number, number];
type Key = { t: number; pos: V3; target: V3; ease?: (x: number) => number };

// Camera path. Long linear drifts between eased moves keep everything slow.
const KEYS: Key[] = [
  { t: 0, pos: [0, 0.6, 9.6], target: [0, 0.6, 0] },
  { t: 4.7, pos: [0, 0.8, 8.9], target: [0, 0.6, 0], ease: LINEAR },
  { t: 5.9, pos: [0, 6.3, 5.6], target: [0, 0, -0.05], ease: EASE_IN_OUT },
  { t: 9.3, pos: [0.25, 5.9, 5.2], target: [0, 0, 0.05], ease: LINEAR },
  { t: 10.7, pos: [0, 2.3, 8.2], target: [0, 1.0, 0], ease: EASE_IN_OUT },
  { t: 20.2, pos: [0.5, 2.0, 7.4], target: [0, 1.0, 0], ease: LINEAR },
  { t: 21.4, pos: [0, 1.4, 8.4], target: [0, 1.2, 0], ease: EASE_IN_OUT },
  { t: 29.4, pos: [-0.3, 1.6, 7.6], target: [0, 1.25, 0], ease: LINEAR },
];

const mix = (a: V3, b: V3, p: number): V3 => [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p];

export const cameraAt = (s: number) => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (s <= b.t) {
      const raw = Math.min(1, Math.max(0, (s - a.t) / (b.t - a.t)));
      const p = (b.ease ?? LINEAR)(raw);
      return { pos: mix(a.pos, b.pos, p), target: mix(a.target, b.target, p) };
    }
  }
  const last = KEYS[KEYS.length - 1];
  return { pos: last.pos, target: last.target };
};

const cam = new PerspectiveCamera(FOV, 720 / 1280, 0.1, 100);

/** Project a world point to 720x1280 screen space, using the same camera path as the 3D scene. */
export const project = (s: number, p: V3) => {
  const { pos, target } = cameraAt(s);
  cam.position.set(...pos);
  cam.lookAt(...target);
  cam.updateMatrixWorld();
  cam.updateProjectionMatrix();
  const v = new Vector3(...p).project(cam);
  return { x: ((v.x + 1) / 2) * 720, y: ((1 - v.y) / 2) * 1280 };
};
