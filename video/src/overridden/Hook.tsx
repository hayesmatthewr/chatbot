import { EASE_IN_OUT, prog, reveal, tween } from "../lib/anim";
import { MONO, SERIF } from "../lib/constants";
import { at } from "./words";

/** Placeholder phone with an endlessly scrolling feed. */
export const Phone = ({ s, w = 300, h = 560 }: { s: number; w?: number; h?: number }) => {
  const cardH = 150;
  const offset = (s * 340) % (cardH + 14);
  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: 44,
        background: "#141516",
        padding: 12,
        boxShadow: "0 30px 60px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 33, overflow: "hidden", background: "#f3f4f4" }}>
        <div style={{ position: "absolute", left: 12, right: 12, top: -offset }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: cardH,
                marginBottom: 14,
                borderRadius: 14,
                background: ["#d5dada", "#c7cfd0", "#dfe3e3"][i % 3],
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", left: 12, top: 12, width: 26, height: 26, borderRadius: 13, background: "#9aa3a4" }} />
              <div style={{ position: "absolute", left: 46, top: 16, width: 110, height: 8, borderRadius: 4, background: "#a9b1b2" }} />
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, height: 70, borderRadius: 8, background: "rgba(255,255,255,0.55)" }} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center", fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "rgba(0,0,0,0.45)" }}>
          ▶ FEED SCREEN RECORDING
        </div>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 20, width: 80, height: 22, borderRadius: 11, background: "#141516", transform: "translateX(-50%)" }} />
    </div>
  );
};

const word = (s: number, t: number, dur = 0.45) => reveal(prog(s, t - 0.05, t - 0.05 + dur), 16, 12);

export const Hook = ({ s }: { s: number }) => {
  if (s > 2.75) return null;
  const out = prog(s, 2.3, 2.7, EASE_IN_OUT);
  const strike = prog(s, at("it's"), at("it's") + 0.22, EASE_IN_OUT);
  const swap = prog(s, at("overridden") - 0.05, at("overridden") + 0.4);
  const phoneIn = prog(s, 0.25, 1.1);
  // glitch jitter on "overridden"
  const g = s > at("overridden") && s < at("overridden") + 0.35;
  const jx = g ? Math.sin(s * 140) * 6 : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 1 - out,
        filter: out > 0 ? `blur(${out * 10}px)` : undefined,
        transform: `translateY(${-out * 40}px)`,
      }}
    >
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontFamily: SERIF, fontSize: 72, letterSpacing: "-0.02em", color: "#151617" }}>
        {["Your", "focus", "isn't"].map((w) => (
          <span key={w} style={{ display: "inline-block", margin: "0 9px", ...word(s, at(w)) }}>
            {w}
          </span>
        ))}
      </div>

      <div style={{ position: "absolute", top: 236, left: 0, right: 0, height: 90, fontFamily: SERIF, fontStyle: "italic", fontSize: 76, color: "#151617" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            ...word(s, at("broken")),
            opacity: prog(s, at("broken") - 0.05, at("broken") + 0.35) * (1 - swap),
            transform: `translateY(${-swap * 30}px)`,
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            broken
            <span
              style={{
                position: "absolute",
                left: -6,
                right: -6,
                top: "54%",
                height: 4,
                background: "#151617",
                transform: `scaleX(${strike})`,
                transformOrigin: "0 50%",
              }}
            />
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            ...reveal(swap, -30, 12),
            textShadow: g ? `${jx}px 0 rgba(255,40,80,0.55), ${-jx}px 0 rgba(40,160,255,0.55)` : undefined,
          }}
        >
          overridden.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 210,
          top: 420,
          opacity: phoneIn,
          filter: phoneIn < 1 ? `blur(${(1 - phoneIn) * 8}px)` : undefined,
          transform: `translateY(${tween(s, 0.25, 1.1, 260, 0)}px) translateX(${jx}px)`,
        }}
      >
        <Phone s={s} />
      </div>
    </div>
  );
};
