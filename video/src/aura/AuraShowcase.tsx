import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_IN_OUT, EASE_OUT, LINEAR, lerp, prog, tween } from "../lib/anim";

/**
 * Aura PDP — studio showcase. No audio, no added text: only the site itself.
 * Every state is a pure function of time `s` (seconds).
 */
export const AURA_DURATION_S = 30;

const img = (f: string) => staticFile(`aura/${f}`);

// page.jpg is the full mobile page: 415 css px wide at 2 image px per css px.
const PAGE_W = 415;
// Section tops on the page (css px), measured from the live artifact at 390 px wide.
const Y = { plans: 520, benefits: 2271, science: 3239, expect: 4811, quality: 5394, reviews: 6008, final: 7907 };

type V = React.CSSProperties;

/**
 * A studio hero phone: brushed-titanium rim lit from the upper left, black bezel, glass with an
 * environment reflection, side buttons, and the page scrolling inside. Screens are masked with
 * clip-path (overflow+radius is unreliable under 3D transforms).
 */
const Phone = ({ scroll, k = 1, style }: { scroll: number; k?: number; style?: V }) => {
  const R = 66 * k;
  return (
    <div
      style={{
        position: "absolute",
        width: 418 * k,
        height: 872 * k,
        marginLeft: -209 * k,
        marginTop: -436 * k,
        transformStyle: "flat", // flatten: coplanar rim/bezel/screen must composite in DOM order
        ...style,
      }}
    >
      {/* side buttons */}
      {[
        { side: -1, top: 190, h: 36 },
        { side: -1, top: 250, h: 66 },
        { side: -1, top: 330, h: 66 },
        { side: 1, top: 280, h: 104 },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: b.top * k,
            height: b.h * k,
            width: 6 * k,
            left: b.side < 0 ? -3 * k : undefined,
            right: b.side > 0 ? -3 * k : undefined,
            borderRadius: 3 * k,
            background: "linear-gradient(90deg, #5d575a, #b9b3b5 50%, #4a4447)",
          }}
        />
      ))}
      {/* titanium rim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: R,
          background: "linear-gradient(135deg, #d9d4d6 0%, #7d777a 14%, #3b3638 40%, #6f696c 70%, #c7c1c3 100%)",
          boxShadow: `0 ${60 * k}px ${110 * k}px rgba(8,0,2,0.5), 0 ${14 * k}px ${28 * k}px rgba(8,0,2,0.35)`,
        }}
      />
      {/* black bezel */}
      <div style={{ position: "absolute", inset: 5 * k, borderRadius: R - 5 * k, background: "#070606" }} />
      {/* screen */}
      <div
        style={{
          position: "absolute",
          left: 14 * k,
          top: 14 * k,
          width: 390 * k,
          height: 844 * k,
          borderRadius: R - 14 * k,
          overflow: "hidden",
          // The page is drawn as a background so only the visible window is rasterised;
          // an 18k-px <img> under 3D transforms tiles badly (seams, grey bands).
          backgroundColor: "#38030A",
          backgroundImage: `url(${img("page.jpg")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${PAGE_W * k}px auto`,
          backgroundPosition: `0px ${-scroll * k}px`,
        }}
      >
        {/* glass: soft environment reflection, lit from the upper left */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(118deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 32%, rgba(255,255,255,0) 58%)" }} />
      </div>
      {/* dynamic island */}
      <div style={{ position: "absolute", left: "50%", top: 26 * k, width: 116 * k, height: 34 * k, marginLeft: -58 * k, borderRadius: 20 * k, background: "#030303" }} />
    </div>
  );
};

/** Soft contact shadow on an implied floor, drawn under a phone (not rotated with it). */
const FloorShadow = ({ x, y, w, o = 1 }: { x: number; y: number; w: number; o?: number }) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y,
      width: w,
      height: w * 0.16,
      borderRadius: "50%",
      background: "radial-gradient(closest-side, rgba(8,0,2,0.8), rgba(8,0,2,0))",
      filter: "blur(10px)",
      opacity: o,
    }}
  />
);

/** A captured component, clipped to its real corner radius, floating with a soft shadow. */
const Card = ({ file, w, r, style }: { file: string; w: number; r: number; style?: V }) => (
  <div
    style={{
      position: "absolute",
      width: w,
      borderRadius: r,
      overflow: "hidden",
      boxShadow: "0 40px 90px rgba(12,0,3,0.45), 0 10px 24px rgba(12,0,3,0.25)",
      ...style,
    }}
  >
    <Img src={img(file)} style={{ display: "block", width: "100%" }} />
  </div>
);

/** Fade-through with a little blur and scale — the only transition used. */
const fade = (s: number, a: number, b: number, c: number, d: number): V => {
  const i = prog(s, a, b, EASE_OUT);
  const o = 1 - prog(s, c, d, EASE_IN_OUT);
  const v = Math.min(i, o);
  return { opacity: v, filter: v < 1 ? `blur(${(1 - v) * 14}px)` : undefined };
};

const Stage = ({ children, style }: { children: React.ReactNode; style?: V }) => (
  <AbsoluteFill style={{ perspective: 2400, perspectiveOrigin: "50% 45%", ...style }}>
    <div style={{ position: "absolute", left: "50%", top: "50%", transformStyle: "preserve-3d" }}>{children}</div>
  </AbsoluteFill>
);

// ---------- Scenes ----------

const Opening = ({ s }: { s: number }) => {
  if (s > 10.6) return null;
  // frame zero is a finished picture: the phone is already in place and only settles
  const rise = prog(s, 0, 2.4, EASE_OUT);
  const aside = prog(s, 5.0, 6.4, EASE_IN_OUT);
  const scroll = tween(s, 2.2, 4.8, 0, Y.plans, EASE_IN_OUT) + tween(s, 6.6, 10.2, 0, Y.benefits - Y.plans + 40, EASE_IN_OUT);
  const rx = lerp(14, 8, rise) - 3 * aside;
  const ry = lerp(-18, -12, rise) + tween(s, 2.4, 5.0, 0, 5, LINEAR) + 26 * aside;
  const x = lerp(0, -300, aside);
  const y = lerp(36, -10, rise);
  const k = lerp(1.06, 1.0, aside);

  // pricing + checklist float out beside the phone
  const c1 = prog(s, 5.6, 6.8, EASE_OUT);
  const c2 = prog(s, 6.0, 7.2, EASE_OUT);
  const c3 = prog(s, 6.4, 7.6, EASE_OUT);
  const drift = tween(s, 5.6, 10.6, 0, -60, LINEAR);

  return (
    <Stage style={fade(s, -1, 0, 9.9, 10.6)}>
      <FloorShadow x={x} y={420} w={520 * k} />
      <Phone scroll={scroll} k={k} style={{ transform: `translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)` }} />
      <div style={{ transformStyle: "preserve-3d", transform: `translate3d(190px, ${drift}px, 0) rotateY(-16deg) rotateX(6deg)` }}>
        <Card file="card01.jpg" w={350 * 1.55} r={12 * 1.55} style={{ left: -40, top: -360, opacity: c1, transform: `translate3d(0, ${(1 - c1) * 80}px, ${lerp(-260, 40, c1)}px)` }} />
        <Card file="card02.jpg" w={342 * 1.55} r={12 * 1.55} style={{ left: -28, top: -20, opacity: c2, transform: `translate3d(0, ${(1 - c2) * 80}px, ${lerp(-260, 0, c2)}px)` }} />
        <Card file="card20.jpg" w={179 * 1.35} r={12 * 1.35} style={{ left: 20, top: 210, opacity: c3, transform: `translate3d(0, ${(1 - c3) * 80}px, ${lerp(-260, 70, c3)}px)` }} />
        <Card file="card21.jpg" w={179 * 1.35} r={12 * 1.35} style={{ left: 280, top: 190, opacity: c3, transform: `translate3d(0, ${(1 - c3) * 100}px, ${lerp(-260, 20, c3)}px)` }} />
      </div>
    </Stage>
  );
};

const PANELS: { f: string; h: number }[] = [
  { f: "sec-hero.jpg", h: 479 },
  { f: "sec-benefits.jpg", h: 968 },
  { f: "sec-quality.jpg", h: 598 },
  { f: "sec-reviews.jpg", h: 943 },
  { f: "sec-final.jpg", h: 765 },
];

/** Isometric spread of the page's sections. */
const Isometric = ({ s }: { s: number }) => {
  if (s < 9.9 || s > 16.4) return null;
  const pan = tween(s, 10.0, 16.4, 180, -180, LINEAR);
  const k = 0.62;
  return (
    <Stage style={fade(s, 9.9, 10.9, 15.7, 16.4)}>
      <div style={{ transformStyle: "preserve-3d", transform: `translate(60px, -70px) rotateX(52deg) rotateZ(-34deg) translate3d(${pan}px, ${-pan * 0.25}px, 0)` }}>
        {PANELS.map((p, i) => {
          const e = prog(s, 10.1 + i * 0.14, 11.3 + i * 0.14, EASE_OUT);
          const x = (i - 2) * (390 * k + 130) - 195 * k;
          const y = (i % 2 ? -1 : 1) * 60 - (p.h * k) / 2;
          return (
            <div
              key={p.f}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 390 * k,
                height: p.h * k,
                borderRadius: 18,
                opacity: e,
                transform: `translateZ(${lerp(-420, 0, e) + (i % 3) * 24}px)`,
                // slab edge (thickness) + soft cast shadow on the floor
                boxShadow:
                  "1px 1px 0 #5a0a14, 2px 2px 0 #4f0811, 3px 3px 0 #45070f, 4px 4px 0 #3c060d, 5px 5px 0 #33050b, 6px 6px 0 #2b0409, -30px 50px 70px rgba(10,0,2,0.5)",
                background: "#38030A",
                overflow: "hidden",
              }}
            >
              <Img src={img(p.f)} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

const BENTO: { f: string; w: number; r: number; col: number; y: number; z: number }[] = [
  { f: "card11.jpg", w: 307, r: 14.4, col: 0, y: -520, z: 40 },
  { f: "card30.jpg", w: 366, r: 12, col: 0, y: 60, z: 0 },
  { f: "card24.jpg", w: 366, r: 12, col: 1, y: -430, z: 90 },
  { f: "card12.jpg", w: 307, r: 14.4, col: 2, y: -600, z: 0 },
  { f: "card33.jpg", w: 307, r: 14.4, col: 2, y: 10, z: 60 },
  { f: "card19.jpg", w: 307, r: 14.4, col: 3, y: -360, z: 20 },
  { f: "card31.jpg", w: 366, r: 12, col: 3, y: 230, z: 80 },
  { f: "card13.jpg", w: 307, r: 14.4, col: 4, y: -560, z: 50 },
  { f: "card22.jpg", w: 179, r: 12, col: 4, y: 40, z: 10 },
  { f: "card23.jpg", w: 179, r: 12, col: 4, y: 40, z: 30 },
];
const COL_X = [-900, -470, -20, 400, 830];
const COL_SPEED = [70, -50, 90, -40, 60];

/** A floating wall of the page's components, columns drifting at different speeds. */
const Bento = ({ s }: { s: number }) => {
  if (s < 15.6 || s > 22.2) return null;
  const t = tween(s, 15.6, 22.2, 0, 1, LINEAR);
  const k = 1.08;
  return (
    <Stage style={fade(s, 15.6, 16.6, 21.5, 22.2)}>
      <div style={{ transformStyle: "preserve-3d", transform: `rotateX(10deg) rotateY(-9deg) rotateZ(-2deg) scale(${lerp(1.0, 0.94, t)})` }}>
        {BENTO.map((b, i) => {
          const e = prog(s, 15.8 + i * 0.09, 17.0 + i * 0.09, EASE_OUT);
          const pair = b.f === "card23.jpg" ? 179 * k + 16 : 0;
          return (
            <Card
              key={b.f}
              file={b.f}
              w={b.w * k}
              r={b.r * k}
              style={{
                left: COL_X[b.col] + pair,
                top: b.y * k,
                opacity: e,
                transform: `translate3d(0, ${(1 - e) * 120 + lerp(0, -COL_SPEED[b.col] * 2, t)}px, ${lerp(-300, b.z, e)}px)`,
              }}
            />
          );
        })}
      </div>
    </Stage>
  );
};

/** Three phones, each scrolling a different chapter of the page. */
const Trio = ({ s }: { s: number }) => {
  if (s < 21.5 || s > 27.4) return null;
  const k = 0.8;
  const phones = [
    { x: -560, y: 40, from: Y.benefits - 20, to: Y.science - 300, ry: 14 },
    { x: 0, y: -20, from: Y.science + 380, to: Y.expect + 40, ry: 0 },
    { x: 560, y: 40, from: Y.reviews + 60, to: Y.reviews + 900, ry: -14 },
  ];
  return (
    <Stage style={fade(s, 21.5, 22.5, 26.8, 27.4)}>
      {phones.map((p, i) => {
        const e = prog(s, 21.6 + i * 0.18, 23.0 + i * 0.18, EASE_OUT);
        const scroll = tween(s, 22.6, 27.2, p.from, p.to, EASE_IN_OUT);
        return [
          <FloorShadow key={`sh${i}`} x={p.x} y={p.y + 360} w={400} o={e} />,
          <Phone
            key={i}
            scroll={scroll}
            k={k}
            style={{
              opacity: e,
              transform: `translate3d(${p.x}px, ${p.y + (1 - e) * 160}px, ${lerp(-300, 0, e)}px) rotateX(6deg) rotateY(${p.ry}deg)`,
            }}
          />,
        ];
      })}
    </Stage>
  );
};

/** Product close-up, then the final chapter on the phone; ends on the studio backdrop. */
const Finale = ({ s }: { s: number }) => {
  if (s < 26.8) return null;
  // full-res pouch (3x capture, shown below native size so it stays sharp), then the phone takes the ending alone
  const zoom = tween(s, 26.8, 28.6, 1.0, 1.05, LINEAR);
  const handoff = prog(s, 28.0, 28.9, EASE_IN_OUT);
  const ph = prog(s, 28.2, 29.3, EASE_OUT);
  return (
    <Stage style={fade(s, 26.8, 27.6, 29.45, 30)}>
      <Card
        file="pouch.png"
        w={780}
        r={34}
        style={{
          left: -390,
          top: -331,
          opacity: 1 - handoff,
          filter: handoff > 0 ? `blur(${handoff * 10}px)` : undefined,
          transform: `scale(${zoom * lerp(1, 0.9, handoff)})`,
          boxShadow: "0 60px 120px rgba(8,0,2,0.6), 0 16px 34px rgba(8,0,2,0.4)",
        }}
      />
      <FloorShadow x={0} y={410} w={520} o={ph} />
      <Phone
        scroll={Y.final + 40}
        k={0.96}
        style={{ opacity: ph, transform: `translate3d(0px, ${lerp(90, 0, ph)}px, 0) rotateX(6deg) rotateY(${lerp(-18, -8, ph)}deg)` }}
      />
    </Stage>
  );
};

/** Deep wine studio backdrop with a soft spotlight and grain. Constant through the film. */
const Backdrop = ({ s }: { s: number }) => (
  <AbsoluteFill style={{ background: "#160204" }}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(70% 75% at ${lerp(46, 54, (Math.sin(s * 0.35) + 1) / 2)}% 42%, #8a1222 0%, #45040c 46%, #160103 100%)`,
      }}
    />
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.12, mixBlendMode: "overlay" }}>
      <filter id="aura-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#aura-grain)" />
    </svg>
  </AbsoluteFill>
);

export const AuraShowcase = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop s={s} />
      <Opening s={s} />
      <Isometric s={s} />
      <Bento s={s} />
      <Trio s={s} />
      <Finale s={s} />
    </AbsoluteFill>
  );
};
