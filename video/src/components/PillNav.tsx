import { EASE_IN_OUT, lerp, prog, reveal } from "../lib/anim";
import { INK, SERIF } from "../lib/constants";
import { StaggerWords } from "./StaggerWords";

const DOT = 66;
const PILL = 199;
const GAP = 34;

type Item = { label: string; on: number; off?: number; numberAtStart: boolean };

// Chapter pills: each one widens into a labelled pill while its section plays.
const ITEMS: Item[] = [
  { label: "Less Leg Mass", on: 9.25, off: 16.6, numberAtStart: false },
  { label: "Burn Fat", on: 17.1, off: 29.8, numberAtStart: true },
  { label: "Altitude", on: 30.3, numberAtStart: true },
];
const APPEAR = 8.2;

export const PillNav = ({ s }: { s: number }) => {
  if (s < APPEAR) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 107,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: GAP,
      }}
    >
      {ITEMS.map((item, i) => {
        const pop = prog(s, APPEAR + i * 0.1, APPEAR + i * 0.1 + 0.5);
        const grow = prog(s, item.on, item.on + 0.38, EASE_IN_OUT);
        const shrink = item.off ? prog(s, item.off + 0.15, item.off + 0.45, EASE_IN_OUT) : 0;
        const width = lerp(DOT, PILL, grow * (1 - shrink));

        const labelOut = item.off ? 1 - prog(s, item.off, item.off + 0.25) : 1;
        const numIn = item.numberAtStart ? prog(s, 8.7 + i * 0.1, 9.1 + i * 0.1) : 0;
        const numOutOnActivate = 1 - prog(s, item.on - 0.08, item.on + 0.08);
        const numBack = item.off ? prog(s, item.off + 0.4, item.off + 0.7) : 0;
        const num = Math.max(numIn * numOutOnActivate, numBack);

        return (
          <div
            key={item.label}
            style={{
              position: "relative",
              width,
              height: DOT,
              borderRadius: DOT,
              background: INK,
              opacity: pop,
              transform: `scale(${lerp(0.4, 1, pop)})`,
              filter: pop < 1 ? `blur(${(1 - pop) * 6}px)` : undefined,
              color: "white",
              fontFamily: SERIF,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                ...reveal(num, 0, 6),
              }}
            >
              {i + 1}
            </div>
            {s >= item.on && labelOut > 0 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  fontSize: 33,
                  opacity: labelOut,
                  filter: labelOut < 1 ? `blur(${(1 - labelOut) * 6}px)` : undefined,
                }}
              >
                <StaggerWords s={s} text={item.label} start={item.on + 0.3} stagger={0.13} dur={0.5} rise={0} blur={6} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
