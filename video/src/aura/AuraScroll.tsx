import { AbsoluteFill, Freeze, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
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
const FPS = 30;

const SRC = staticFile("aura/scroll.mp4");

type Rect = { x: number; y: number; w: number; h: number };

/**
 * Module rects in viewport css px, measured by the recorder at each hold (scroll.rects.json).
 * `slotH` darkens the whole module in the page even when the lift shows a clean sub-crop.
 * `r` is the module's own corner radius (css px).
 */
const HL: { id: string; rect: Rect; slotH?: number; r: number; a: number; b: number }[] = [
  { id: "plan", rect: { x: 20, y: 80.5, w: 350, h: 194.4 }, r: 12, a: 5.3, b: 8.4 },
  { id: "card", rect: { x: 12, y: 77.9, w: 307.4, h: 442.6 }, r: 14.4, a: 17.2, b: 19.6 },
  { id: "cmp", rect: { x: 12, y: 69.5, w: 366, h: 530 }, slotH: 623, r: 12, a: 24.8, b: 27.2 },
  { id: "rev", rect: { x: 12, y: 70.8, w: 366, h: 184 }, r: 12, a: 32.0, b: 33.8 },
];
const INSET = 1.4; // css px trimmed off each crop edge so no background pixels ride along

/** Lit studio set for the phone bookends: warm key pool behind the device, darker floor. */
const Backdrop = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(75% 55% at 50% 40%, #b31a2e 0%, #6e0816 42%, #2a0207 78%, #120103 100%)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(8,0,2,0.55) 100%)" }} />
  </AbsoluteFill>
);

/** The recording, frozen on one frame (used by the closing pull-back so the page rests cleanly). */
const Page = ({ freezeAt }: { freezeAt?: number }) =>
  freezeAt === undefined ? (
    <OffthreadVideo src={SRC} muted style={{ width: W, height: H }} />
  ) : (
    <Freeze frame={freezeAt}>
      <OffthreadVideo src={SRC} muted style={{ width: W, height: H }} />
    </Freeze>
  );

/**
 * A modern phone (≈0.46 screen aspect, thin uniform bezel, side buttons, rim light, contact
 * shadow). As `z` → 1 the device grows until its screen is the full 9:16 frame: the screen
 * widens to 9:16, corners square off and the bezel leaves the frame — a seamless hand-off to
 * the full-bleed recording.
 */
const PhoneShot = ({ z, tilt, freezeAt }: { z: number; tilt: number; freezeAt?: number }) => {
  const sh = H * lerp(0.8, 1, z); // screen height
  const sw = sh * lerp(0.462, 9 / 16, z); // screen width
  const bez = lerp(16, 30, z);
  const r = lerp(64, 0, prog(z, 0.8, 1));
  const ox = W / 2 - sw / 2 - bez;
  const oy = H / 2 - sh / 2 - bez - lerp(30, 0, z);
  const rest = 1 - z;
  // The page fills the screen width (never cropped). The taller phone screen leaves room above
  // and below: a status-bar strip and a browser toolbar, which shrink to 0 as the screen
  // reaches 9:16.
  const vScale = sw / W;
  const pageH = H * vScale;
  const gap = Math.max(0, sh - pageH);
  const topGap = gap * 0.42;
  return (
    <AbsoluteFill style={{ perspective: 3000 }}>
      {/* contact shadow on the floor */}
      <div
        style={{
          position: "absolute",
          left: W / 2 - sw * 0.6,
          top: oy + sh + bez * 2 - 26,
          width: sw * 1.2,
          height: 90,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(4,0,1,0.85), rgba(4,0,1,0))",
          filter: "blur(12px)",
          opacity: rest,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: ox,
          top: oy,
          width: sw + bez * 2,
          height: sh + bez * 2,
          transform: `rotateX(${tilt}deg) rotateY(${-tilt * 0.9}deg)`,
          transformStyle: "flat",
        }}
      >
        {/* side buttons */}
        {[
          { side: -1, top: 0.2, h: 0.04 },
          { side: -1, top: 0.27, h: 0.075 },
          { side: -1, top: 0.36, h: 0.075 },
          { side: 1, top: 0.3, h: 0.12 },
        ].map((b2, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: b2.top * (sh + bez * 2),
              height: b2.h * (sh + bez * 2),
              width: 9,
              left: b2.side < 0 ? -5 : undefined,
              right: b2.side > 0 ? -5 : undefined,
              borderRadius: 4,
              background: "linear-gradient(90deg, #4c4648, #c9c3c5 50%, #3f393b)",
              opacity: rest,
            }}
          />
        ))}
        {/* titanium frame with a rim light on the key side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: r + bez,
            background: "linear-gradient(135deg, #f1ecee 0%, #8f898c 10%, #3d383a 38%, #575154 70%, #b6b0b2 100%)",
            boxShadow: `0 90px 160px rgba(6,0,2,${0.6 * rest}), 0 24px 48px rgba(6,0,2,${0.4 * rest}), inset 2px 2px 1px rgba(255,255,255,0.7), inset -2px -2px 2px rgba(0,0,0,0.4)`,
          }}
        />
        <div style={{ position: "absolute", inset: 4, borderRadius: r + bez - 4, background: "#060505" }} />
        {/* screen */}
        <div style={{ position: "absolute", left: bez, top: bez, width: sw, height: sh, borderRadius: r, overflow: "hidden", background: "#2a0207" }}>
          <div style={{ position: "absolute", left: 0, top: topGap, width: sw, height: pageH, overflow: "hidden" }}>
            <div style={{ width: W, height: H, transform: `scale(${vScale})`, transformOrigin: "0 0" }}>
              <Page freezeAt={freezeAt} />
            </div>
          </div>
          {/* browser toolbar: address pill + home indicator */}
          {gap > 4 && (
            <div style={{ position: "absolute", left: 0, right: 0, top: topGap + pageH, height: gap - topGap, background: "#1d0105" }}>
              <div style={{ position: "absolute", left: "14%", right: "14%", top: (gap - topGap) * 0.22, height: (gap - topGap) * 0.34, borderRadius: 999, background: "rgba(255,255,255,0.13)" }} />
              <div style={{ position: "absolute", left: "36%", right: "36%", bottom: (gap - topGap) * 0.14, height: 7, borderRadius: 4, background: "rgba(255,255,255,0.75)" }} />
            </div>
          )}
          <div style={{ position: "absolute", inset: 0, opacity: rest, background: "linear-gradient(118deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 28%, rgba(255,255,255,0) 52%)" }} />
          {/* dynamic island */}
          <div style={{ position: "absolute", left: sw / 2 - 70, top: 22, width: 140, height: 40, borderRadius: 22, background: "#030303", opacity: rest }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** The slot a lifted module leaves behind: a deep translucent red recess. */
const Slot = ({ s, rect, slotH, r, a, b }: { s: number; rect: Rect; slotH?: number; r: number; a: number; b: number }) => {
  const t = prog(s, a, a + 0.35, EASE_OUT) * (1 - prog(s, b - 0.3, b, EASE_IN_OUT));
  if (t <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x * SC,
        top: rect.y * SC,
        width: rect.w * SC,
        height: (slotH ?? rect.h) * SC,
        borderRadius: r * SC,
        background: `rgba(72,4,14,${0.82 * t})`,
        boxShadow: `inset 0 14px 34px rgba(0,0,0,${0.5 * t})`,
      }}
    />
  );
};

/** A module lifted out of its slot: the exact pixels of the current frame, rising toward camera. */
const Lift = ({ s, rect, r, a, b }: { s: number; rect: Rect; r: number; a: number; b: number }) => {
  const up = prog(s, a, a + 0.8, EASE_OUT);
  const down = prog(s, b - 0.7, b, EASE_IN_OUT);
  const t = up * (1 - down);
  if (t <= 0.001) return null;
  const x = (rect.x + INSET) * SC;
  const y = (rect.y + INSET) * SC;
  const w = (rect.w - INSET * 2) * SC;
  const h = (rect.h - INSET * 2) * SC;
  // at least 1.1×, up to 92% of frame width / 72% of height
  const target = Math.max(1.1, Math.min((W * 0.92) / w, (H * 0.72) / h));
  const k = lerp(1, target, t);
  const cx = lerp(x + w / 2, W / 2, t);
  const cy = lerp(y + h / 2, H * 0.46, t);
  const drift = Math.sin((s - a) * 0.9) * 1.2 * t;
  const tiltIn = (1 - up) * 10; // a little perspective on the way in
  return (
    <AbsoluteFill style={{ perspective: 2000 }}>
      <div
        style={{
          position: "absolute",
          left: cx - w / 2,
          top: cy - h / 2,
          width: w,
          height: h,
          transform: `scale(${k}) rotateX(${4 * t + drift + tiltIn}deg) rotateY(${-5 * t + drift}deg)`,
          filter: `drop-shadow(0 ${46 * t}px ${50 * t}px rgba(10,0,3,${0.6 * t})) drop-shadow(0 ${10 * t}px ${12 * t}px rgba(10,0,3,${0.35 * t}))`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: (r - INSET) * SC }}>
          <div style={{ position: "absolute", left: -x, top: -y, width: W, height: H }}>
            <Page />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const AuraScroll = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  // bookends: push into the phone; pull back out at the end on a clean, frozen page state
  const zin = prog(s, 0.5, 3.3, EASE_IN_OUT);
  const zout = 1 - prog(s, 36.0, 37.6, EASE_IN_OUT);
  const ending = s >= 36.0;
  const z = ending ? zout : zin;
  const tilt = lerp(8, 0, z);
  const full = z >= 0.999;
  const freezeAt = ending ? Math.round(36.0 * FPS) : undefined;

  // dim + soften the page while a module is lifted
  const dim = Math.max(...HL.map((h) => prog(s, h.a, h.a + 0.8, EASE_OUT) * (1 - prog(s, h.b - 0.7, h.b, EASE_IN_OUT))));

  return (
    <AbsoluteFill style={{ background: "#140103", overflow: "hidden" }}>
      {full ? (
        <AbsoluteFill style={{ filter: dim > 0.01 ? `blur(${dim * 6}px) brightness(${1 - dim * 0.4})` : undefined, transform: `scale(${1 + dim * 0.05})` }}>
          <Page freezeAt={freezeAt} />
          {HL.map((h) => (
            <Slot key={h.id} s={s} rect={h.rect} slotH={h.slotH} r={h.r} a={h.a} b={h.b} />
          ))}
        </AbsoluteFill>
      ) : (
        <>
          <Backdrop />
          <PhoneShot z={z} tilt={tilt} freezeAt={freezeAt} />
        </>
      )}
      {HL.map((h) => (
        <Lift key={h.id} s={s} rect={h.rect} r={h.r} a={h.a} b={h.b} />
      ))}
    </AbsoluteFill>
  );
};
