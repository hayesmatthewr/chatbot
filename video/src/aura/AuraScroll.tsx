import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog } from "../lib/anim";

/**
 * Aura PDP — 9:16 scroll film for Instagram. Silent, no added text.
 *
 * The page itself is a frame-accurate recording of the live artifact scrolling along a fixed
 * path (scripts/record-scroll.cjs + scripts/aura-scroll-path.json), so the softgel slide-in,
 * reveals and canvases play exactly as on the site. This composition adds the phone
 * bookends and the module "lift" highlights on top of that recording.
 */
export const AURA_SCROLL_DURATION_S = 38;

const W = 1080;
const H = 1920;
const VW = 390; // recorded viewport, css px
const SC = W / VW; // css px -> output px

const SRC = staticFile("aura/scroll.mp4");

type Rect = { x: number; y: number; w: number; h: number };

/** Module rects in viewport css px, measured by the recorder at each hold (scroll.rects.json). */
const HL: { id: string; rect: Rect; a: number; b: number }[] = [
  { id: "plan", rect: { x: 20, y: 81, w: 350, h: 194 }, a: 5.3, b: 8.4 },
  { id: "card", rect: { x: 12, y: 88, w: 307, h: 443 }, a: 17.2, b: 19.6 },
  { id: "cmp", rect: { x: 12, y: 29, w: 366, h: 640 }, a: 24.8, b: 27.2 },
  { id: "rev", rect: { x: 12, y: 81, w: 366, h: 184 }, a: 32.0, b: 33.8 },
];

/** Studio backdrop, seen only around the phone bookends. */
const Backdrop = () => (
  <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 42%, #8a1222 0%, #45040c 48%, #140103 100%)" }} />
);

/**
 * Phone whose screen is exactly the recording (9:16). `k` scales the device; at k = SC/1 the
 * screen is the full frame. The screen's corner radius eases to 0 as it fills the frame.
 */
const PhoneShot = ({ z, tilt }: { z: number; tilt: number }) => {
  const k = lerp(1.62, SC, z); // device scale (css px -> output px)
  const sw = VW * k;
  const sh = (VW * 16) / 9 * k;
  const bez = 14 * (k / SC) * SC * 0.55;
  const r = lerp(46, 0, prog(z, 0.82, 1)) * (k / 1.62) * 0.62;
  return (
    <AbsoluteFill style={{ perspective: 2600 }}>
      <div
        style={{
          position: "absolute",
          left: W / 2 - sw / 2 - bez,
          top: H / 2 - sh / 2 - bez,
          width: sw + bez * 2,
          height: sh + bez * 2,
          borderRadius: r + bez,
          background: "linear-gradient(135deg, #dcd6d8 0%, #7d777a 14%, #3b3638 40%, #6f696c 70%, #c7c1c3 100%)",
          boxShadow: "0 80px 160px rgba(8,0,2,0.55), 0 20px 40px rgba(8,0,2,0.35)",
          transform: `rotateX(${tilt}deg) rotateY(${-tilt * 0.8}deg)`,
          transformStyle: "flat",
        }}
      >
        <div style={{ position: "absolute", inset: bez * 0.35, borderRadius: r + bez * 0.65, background: "#070606" }} />
        <div style={{ position: "absolute", left: bez, top: bez, width: sw, height: sh, borderRadius: r, overflow: "hidden" }}>
          <OffthreadVideo src={SRC} muted style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** A module lifted out of the page: the exact pixels of the current frame, scaled up toward camera. */
const Lift = ({ s, rect, a, b }: { s: number; rect: Rect; a: number; b: number }) => {
  const up = prog(s, a, a + 0.8, EASE_OUT);
  const down = prog(s, b - 0.7, b, EASE_IN_OUT);
  const t = up * (1 - down);
  if (t <= 0.001) return null;
  const x = rect.x * SC;
  const y = rect.y * SC;
  const w = rect.w * SC;
  const h = rect.h * SC;
  // target: centred, 90% of frame width (capped by height)
  const target = Math.min((W * 0.9) / w, (H * 0.72) / h);
  const k = lerp(1, target, t);
  const cx = lerp(x + w / 2, W / 2, t);
  const cy = lerp(y + h / 2, H * 0.47, t);
  const drift = Math.sin((s - a) * 0.9) * 1.2 * t;
  return (
    <AbsoluteFill style={{ perspective: 2200 }}>
      <div
        style={{
          position: "absolute",
          left: cx - w / 2,
          top: cy - h / 2,
          width: w,
          height: h,
          overflow: "hidden",
          borderRadius: 14 * SC * 0.5,
          transform: `scale(${k}) rotateX(${(4 + drift) * t}deg) rotateY(${-5 * t + drift}deg)`,
          boxShadow: `0 ${40 * t}px ${90 * t}px rgba(10,0,3,${0.55 * t}), 0 ${10 * t}px ${24 * t}px rgba(10,0,3,${0.35 * t})`,
        }}
      >
        <div style={{ position: "absolute", left: -x, top: -y, width: W, height: H }}>
          <OffthreadVideo src={SRC} muted style={{ width: W, height: H }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const AuraScroll = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  // bookends: push into the phone, pull back out at the end
  const zin = prog(s, 0.6, 3.3, EASE_IN_OUT);
  const zout = 1 - prog(s, 36.0, 37.6, EASE_IN_OUT);
  const z = s < 20 ? zin : zout;
  const tilt = lerp(9, 0, z);
  const full = z >= 0.999;

  // dim + soften the page while a module is lifted
  const dim = Math.max(...HL.map((h) => prog(s, h.a, h.a + 0.8, EASE_OUT) * (1 - prog(s, h.b - 0.7, h.b, EASE_IN_OUT))));

  return (
    <AbsoluteFill style={{ background: "#140103", overflow: "hidden" }}>
      {full ? (
        <AbsoluteFill style={{ filter: dim > 0.01 ? `blur(${dim * 6}px) brightness(${1 - dim * 0.45})` : undefined, transform: `scale(${1 - dim * 0.04})` }}>
          <OffthreadVideo src={SRC} muted style={{ width: W, height: H }} />
        </AbsoluteFill>
      ) : (
        <>
          <Backdrop />
          <PhoneShot z={z} tilt={tilt} />
        </>
      )}
      {HL.map((h) => (
        <Lift key={h.id} s={s} rect={h.rect} a={h.a} b={h.b} />
      ))}
    </AbsoluteFill>
  );
};
