import { PerspectiveCamera, Vector3 } from "three";
import { EASE_IN_OUT, LINEAR } from "../lib/anim";

export const FOV = 35;
type V3 = [number, number, number];
/** A shot: look-at target, distance, elevation (deg, card: 35–55), azimuth (deg). */
type Key = { t: number; target: V3; dist: number; el: number; az: number; ease?: (x: number) => number };

// Every subject fills 60–85 % of frame width; elevation 35–42° throughout. Linear drifts keep time from freezing.
const KEYS: Key[] = [
  { t: 0, target: [0, 0.55, 0], dist: 6.3, el: 35, az: -8 },
  { t: 4.6, target: [0, 0.55, 0], dist: 6.0, el: 37, az: 6, ease: LINEAR },
  { t: 5.3, target: [0, 0.05, 0.02], dist: 6.0, el: 40, az: 0, ease: EASE_IN_OUT },
  { t: 5.9, target: [0, 0.05, 0.02], dist: 5.8, el: 40, az: 3, ease: LINEAR },
  // the two routes on a bare floor (scale models were cut — see DECISIONS.md)
  { t: 6.6, target: [0, 0, 0], dist: 7.0, el: 40, az: -4, ease: EASE_IN_OUT },
  { t: 9.3, target: [0, 0, 0], dist: 6.6, el: 42, az: 5, ease: LINEAR },
  { t: 10.7, target: [0, 1.1, 0], dist: 10.2, el: 35, az: 0, ease: EASE_IN_OUT },
  { t: 20.2, target: [0, 1.1, 0], dist: 9.7, el: 37, az: 8, ease: LINEAR },
  { t: 21.4, target: [0, 0.95, 0], dist: 7.6, el: 35, az: 0, ease: EASE_IN_OUT },
  { t: 29.4, target: [0, 0.95, 0], dist: 7.2, el: 37, az: -7, ease: LINEAR },
];

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const rad = (d: number) => (d * Math.PI) / 180;

const shotAt = (s: number) => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (s <= b.t) {
      const p = (b.ease ?? LINEAR)(Math.min(1, Math.max(0, (s - a.t) / (b.t - a.t))));
      return {
        target: [0, 1, 2].map((k) => lerp(a.target[k], b.target[k], p)) as V3,
        dist: lerp(a.dist, b.dist, p),
        el: lerp(a.el, b.el, p),
        az: lerp(a.az, b.az, p),
      };
    }
  }
  return KEYS[KEYS.length - 1];
};

export const cameraAt = (s: number) => {
  const { target, dist, el, az } = shotAt(s);
  const pos: V3 = [
    target[0] + dist * Math.cos(rad(el)) * Math.sin(rad(az)),
    target[1] + dist * Math.sin(rad(el)),
    target[2] + dist * Math.cos(rad(el)) * Math.cos(rad(az)),
  ];
  return { pos, target };
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
