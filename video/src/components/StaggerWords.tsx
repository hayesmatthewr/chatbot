import { prog, reveal } from "../lib/anim";

type Props = {
  s: number;
  text: string;
  start: number;
  stagger?: number;
  dur?: number;
  rise?: number;
  blur?: number;
  /** Optional per-word scale-in (title words start slightly larger). */
  scaleFrom?: number;
  style?: React.CSSProperties;
};

/** Word-by-word blur/fade/rise reveal. Newlines in `text` force line breaks. */
export const StaggerWords = ({ s, text, start, stagger = 0.12, dur = 0.55, rise = 14, blur = 10, scaleFrom = 1, style }: Props) => {
  let i = 0;
  return (
    <div style={style}>
      {text.split("\n").map((line, li) => (
        <div key={li}>
          {line.split(" ").map((word, wi) => {
            const p = prog(s, start + i * stagger, start + i * stagger + dur);
            i++;
            const r = reveal(p, rise, blur);
            const scale = scaleFrom + (1 - scaleFrom) * p;
            return (
              <span
                key={wi}
                style={{ display: "inline-block", whiteSpace: "pre", ...r, transform: `${r.transform} scale(${scale})` }}
              >
                {word}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
