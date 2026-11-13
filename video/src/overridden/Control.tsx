import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal, tween } from "../lib/anim";
import { StaggerWords } from "../components/StaggerWords";
import { Diamond } from "../scenes/Enzyme";
import { BanIcon, CheckIcon, TargetIcon } from "./icons";
import { at } from "./words";
import { SANS, SERIF } from "../lib/constants";

export const Control = ({ s }: { s: number }) => {
  if (s < 11.25 || s > 16.25) return null;
  const out = prog(s, 15.95, 16.2, EASE_IN_OUT);

  const appear = prog(s, 12.5, 12.9);
  const drop = tween(s, 12.5, 13.3, 560, 706, EASE_IN_OUT);
  const scale = tween(s, 12.5, 13.1, 0.55, 1);
  const spread = prog(s, 12.95, 13.6, EASE_OUT);

  const steps = [
    { x: lerp(360, 160, spread), t: at("no"), lines: ["SAY", "NO"], icon: <BanIcon /> },
    { x: 360, t: at("focus", 14), lines: ["HOLD", "FOCUS"], icon: <TargetIcon /> },
    { x: lerp(360, 560, spread), t: at("task"), lines: ["STAY ON", "TASK"], icon: <CheckIcon /> },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out, filter: out > 0 ? `blur(${out * 10}px)` : undefined }}>
      <StaggerWords
        s={s}
        text={"Executive\ncontrol"}
        start={at("executive") - 0.05}
        stagger={at("control", 11) - at("executive")}
        dur={0.55}
        rise={20}
        blur={12}
        scaleFrom={1.12}
        style={{ position: "absolute", top: 220, left: 0, right: 0, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 84, lineHeight: 1, color: "#151617" }}
      />
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: SANS,
          fontSize: 18,
          letterSpacing: "0.36em",
          paddingLeft: "0.36em",
          color: "#2a2c2e",
          ...reveal(prog(s, at("brain") - 0.05, at("brain") + 0.45), 8, 8),
        }}
      >
        YOUR BRAIN'S BRAKE SYSTEM
      </div>

      {steps.map((st, i) => {
        const hit = prog(s, st.t - 0.06, st.t + 0.12, EASE_OUT) * (1 - prog(s, st.t + 0.12, st.t + 0.5, EASE_IN_OUT));
        return (
          <div key={i}>
            <Diamond x={st.x} y={drop} scale={scale * (1 + hit * 0.12)} opacity={appear}>
              {st.icon}
            </Diamond>
            <div style={{ position: "absolute", left: st.x - 100, width: 200, top: 802, textAlign: "center", fontFamily: SANS, fontSize: 21, lineHeight: 0.95, color: "#1f2122" }}>
              {st.lines.map((l, k) => (
                <div key={l} style={reveal(prog(s, st.t - 0.08 + k * 0.1, st.t + 0.35 + k * 0.1), 6, 8)}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
