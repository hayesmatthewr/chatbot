import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal, tween } from "../lib/anim";
import { SANS } from "../lib/constants";
import { LinkIcon, MinusCircleIcon, PersonIcon } from "../components/Icons";
import { Placeholder } from "../components/Placeholder";

const SIDE = 99;

const Diamond = ({ children, x, y, scale = 1, opacity = 1 }: { children: React.ReactNode; x: number; y: number; scale?: number; opacity?: number }) => (
  <div style={{ position: "absolute", left: x - 70, top: y - 70, width: 140, height: 140, opacity, transform: `scale(${scale})` }}>
    <div
      style={{
        position: "absolute",
        left: (140 - SIDE) / 2,
        top: (140 - SIDE) / 2,
        width: SIDE,
        height: SIDE,
        borderRadius: 8,
        background: "linear-gradient(135deg, #34383b, #121314)",
        transform: "rotate(45deg)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset",
      }}
    />
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
  </div>
);

const Label = ({ s, x, start, lines }: { s: number; x: number; start: number; lines: string[] }) => (
  <div
    style={{
      position: "absolute",
      left: x - 100,
      width: 200,
      top: 802,
      textAlign: "center",
      fontFamily: SANS,
      fontSize: 21,
      lineHeight: 0.95,
      color: "#1f2122",
    }}
  >
    {lines.map((l, i) => (
      <div key={l} style={reveal(prog(s, start + i * 0.15, start + i * 0.15 + 0.45), 6, 8)}>
        {l}
      </div>
    ))}
  </div>
);

/** Runner clip + three enzyme-step diamonds (section 2, second half). Hard cut out at 30.25s. */
export const Enzyme = ({ s }: { s: number }) => {
  if (s < 25.15 || s >= 30.25) return null;

  const appear = prog(s, 25.2, 25.6);
  const drop = tween(s, 25.2, 26.3, 540, 706, EASE_IN_OUT);
  const scale = tween(s, 25.2, 26.0, 0.55, 1);
  const spread = prog(s, 26.3, 27.3, EASE_OUT);

  const clip = prog(s, 26.0, 27.0);
  const clipTop = tween(s, 26.0, 27.0, 40, 193);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          left: 179,
          top: clipTop,
          width: 361,
          height: 360,
          borderRadius: 8,
          overflow: "hidden",
          opacity: clip,
          filter: clip < 1 ? `blur(${(1 - clip) * 8}px)` : undefined,
        }}
      >
        <Placeholder
          video
          s={s}
          dark
          label="Runner tracking shot"
          fill="linear-gradient(180deg, #2a2427 0%, #2a2427 38%, #1a1a1c 39%, #222224 80%, #4a3b3a 81%, #3b302f 100%)"
        >
          <div
            style={{
              position: "absolute",
              left: 150 + Math.sin(s * 9) * 6,
              top: 70,
              width: 60,
              height: 200,
              borderRadius: 30,
              background: "linear-gradient(180deg, #ff6a73 0%, #ff6a73 50%, #20181a 51%)",
              opacity: 0.85,
            }}
          />
        </Placeholder>
      </div>

      <Diamond x={lerp(360, 160, spread)} y={drop} scale={scale} opacity={appear}>
        <LinkIcon />
      </Diamond>
      <Diamond x={360} y={drop} scale={scale} opacity={appear}>
        <MinusCircleIcon />
      </Diamond>
      <Diamond x={lerp(360, 560, spread)} y={drop} scale={scale} opacity={appear}>
        <PersonIcon />
      </Diamond>

      <Label s={s} x={160} start={27.35} lines={["BINDS", "SUBSTRATE"]} />
      <Label s={s} x={360} start={27.95} lines={["REMOVES", "HYDROGEN"]} />
      <Label s={s} x={560} start={28.25} lines={["RELEASES", "PRODUCT"]} />
    </div>
  );
};
