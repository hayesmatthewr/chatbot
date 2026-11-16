import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_IN_OUT, EASE_OUT, lerp, prog, reveal } from "../lib/anim";

/**
 * "Studies" stack — Aura version of a page-flip reference: a stack of research pages on a slate
 * background, the top page hard-cutting to the next study every 0.25 s while the stack slowly
 * pushes in, under a word-by-word headline and a serif italic caption.
 *
 * Every word on a page is verbatim from the Aura PDP (claims, study copy, citations, chart
 * numbers). Body text beyond that is drawn as abstract grey bars, never invented prose.
 */
export const STUDY_STACK_DURATION_S = 8;

const W = 1080;
const H = 1920;
const BG = "#97B0BA";
const SERIF = "'Times New Roman', 'Liberation Serif', Georgia, serif";
const INTER = "Inter, sans-serif";
const DISPLAY = "'Instrument Serif', serif";

type Chart = { kind: "line"; ticks: string[]; delta: string; up: boolean } | { kind: "bar"; a: string; b: string; delta: string; up: boolean };
type Page =
  | { type: "study"; area: string; claim: string; abstract: string; chart: Chart; tag: string }
  | { type: "quote"; quote: string; who: string; cite: string };

// Verbatim from the Aura page (#cards and the researcher quotes).
const PAGES: Page[] = [
  { type: "study", area: "Skin Health", claim: "Shown to raise UV tolerance 12% in a 9-week human study.", abstract: "In a 9-week human study, people taking astaxanthin tolerated 12% more UV before their skin reddened. Protection that works from the inside, under your sunscreen.", chart: { kind: "line", ticks: ["Wk 0", "Wk 5", "Wk 9"], delta: "+12%", up: true }, tag: "Higher sun tolerance" },
  { type: "quote", quote: "Astaxanthin modulated mitochondrial functions by a novel mechanism independent of its antioxidant function.", who: "Karen Hecht, PhD", cite: "Nishida, Hecht et al., Nutrients, 2021" },
  { type: "study", area: "Eye Health", claim: "Shown to cut refocusing lag 63% in a 4-week human study.", abstract: "Hours on screens lock your eyes at one distance until they ache. In 4 weeks, astaxanthin cut the lag in refocusing by 63%.", chart: { kind: "line", ticks: ["Wk 0", "Wk 2", "Wk 4"], delta: "−63%", up: false }, tag: "Faster eye refocusing" },
  { type: "study", area: "Performance & Recovery", claim: "Shown to lower blood lactate 17% in a max-effort human trial.", abstract: "At max effort, people taking astaxanthin produced less lactate, the burn that ends a set early. Back-to-back sessions cost you less.", chart: { kind: "bar", a: "11.2", b: "9.35", delta: "−17%", up: false }, tag: "Less burn at max effort" },
  { type: "quote", quote: "Astaxanthin has the potential to act as an important antioxidant in erythrocytes.", who: "Teruo Miyazawa, PhD", cite: "Nakagawa, Miyazawa et al., British Journal of Nutrition, 2011" },
  { type: "study", area: "Healthy Aging", claim: "Shown to raise mitochondrial biogenesis signals 25% in a 12-week human study.", abstract: "Energy fades with age because your mitochondria do. In 12 weeks, astaxanthin raised the signals cells use to build new ones by 25%.", chart: { kind: "bar", a: "100", b: "124.6", delta: "+25%", up: true }, tag: "More mitochondrial renewal" },
  { type: "study", area: "Immune Health", claim: "Shown to strengthen immune cell response 18% in an 8-week human study.", abstract: "Constant oxidative stress wears immune signalling down. In 8 weeks, astaxanthin strengthened immune cell response by 18%.", chart: { kind: "line", ticks: ["Wk 0", "Wk 4", "Wk 8"], delta: "+18%", up: true }, tag: "Stronger immune response" },
  { type: "quote", quote: "A nutrient with unique cell membrane actions and diverse clinical benefits.", who: "Parris Kidd, PhD", cite: "Alternative Medicine Review, 2011" },
  { type: "study", area: "Metabolic Health", claim: "Shown to lower fasting glucose by 16 mg/dL, pooled across 9 trials.", abstract: "Fasting glucose is the first number to drift as metabolism slows. Pooled across nine trials, astaxanthin lowered it by 16 mg/dL.", chart: { kind: "bar", a: "106.1", b: "90", delta: "−16 mg/dL", up: false }, tag: "Lower fasting glucose" },
  { type: "study", area: "Heart Health", claim: "Shown to drop triglycerides 25% in a 12-week human study.", abstract: "In 12 weeks, astaxanthin dropped triglycerides 25% and raised good HDL cholesterol 15%, the numbers your doctor watches.", chart: { kind: "line", ticks: ["Wk 0", "Wk 6", "Wk 12"], delta: "−25%", up: false }, tag: "Lower triglycerides" },
  { type: "quote", quote: "We found a very novel effect of natural astaxanthin to improve overall cardiovascular function.", who: "Shawn Talbott, PhD", cite: "Interview, NutraIngredients, 2017" },
  { type: "study", area: "Brain Health", claim: "Shown to raise cognitive test scores 8% in a 12-week study of 96 adults.", abstract: "Your brain burns about a fifth of your oxygen. In a 12-week study of 96 adults, those taking astaxanthin scored higher on cognitive tests.", chart: { kind: "bar", a: "100", b: "108", delta: "+8%", up: true }, tag: "Sharper cognitive scores" },
];

const PW = 734; // paper width (68% of frame, as in the reference)
const PH = 900;
const SWAP = 0.25; // seconds per page
const FIRST = 0.1;

/** Grey "text" bars: page texture, not prose. */
const Bars = ({ seed, lines, width }: { seed: string; lines: number; width: number }) => (
  <div>
    {Array.from({ length: lines }, (_, i) => {
      // paragraph every ~8-12 lines: short last line, then a gap
      const para = (i + 1) % (8 + Math.floor(random(`${seed}q`) * 5)) === 0;
      const last = i === lines - 1 || para;
      const w = last ? 0.35 + random(`${seed}${i}`) * 0.4 : 0.93 + random(`${seed}${i}`) * 0.07;
      return <div key={i} style={{ height: 2.6, width: width * w, background: "#bdbdbd", borderRadius: 1, marginBottom: para ? 14 : 6.4 }} />;
    })}
  </div>
);

const Figure = ({ c }: { c: Chart }) => {
  const red = "#2a2a2a"; // monochrome, like a journal figure
  if (c.kind === "bar") {
    const a = parseFloat(c.a);
    const b = parseFloat(c.b);
    const max = Math.max(a, b) * 1.15;
    return (
      <svg width={300} height={170} viewBox="0 0 300 170">
        <line x1={20} y1={140} x2={290} y2={140} stroke="#222" strokeWidth={1} />
        {[
          { v: a, x: 70, fill: "#d4d4d4", l: "Placebo", n: c.a },
          { v: b, x: 180, fill: red, l: "Astaxanthin", n: c.b },
        ].map((d) => (
          <g key={d.l}>
            <rect x={d.x} y={140 - (d.v / max) * 120} width={60} height={(d.v / max) * 120} fill={d.fill} />
            <text x={d.x + 30} y={134 - (d.v / max) * 120} textAnchor="middle" fontFamily={SERIF} fontSize={11} fill="#222">{d.n}</text>
            <text x={d.x + 30} y={156} textAnchor="middle" fontFamily={SERIF} fontSize={11} fill="#222">{d.l}</text>
          </g>
        ))}
        <text x={290} y={18} textAnchor="end" fontFamily={SERIF} fontSize={12} fontWeight={700} fill={red}>{c.delta}</text>
      </svg>
    );
  }
  const y1 = c.up ? 40 : 120;
  return (
    <svg width={300} height={170} viewBox="0 0 300 170">
      <line x1={20} y1={140} x2={290} y2={140} stroke="#222" strokeWidth={1} />
      <line x1={20} y1={20} x2={20} y2={140} stroke="#222" strokeWidth={1} />
      <path d="M30 90 L155 92 L280 91" fill="none" stroke="#9a9a9a" strokeWidth={1.4} strokeDasharray="4 3" />
      <path d={`M30 90 L155 ${(90 + y1) / 2 + (c.up ? 6 : -6)} L280 ${y1}`} fill="none" stroke={red} strokeWidth={2} />
      {[30, 155, 280].map((x, i) => (
        <text key={x} x={x} y={156} textAnchor="middle" fontFamily={SERIF} fontSize={11} fill="#222">{c.ticks[i]}</text>
      ))}
      <text x={282} y={84} textAnchor="end" fontFamily={SERIF} fontSize={10} fill="#777">Placebo</text>
      <text x={282} y={c.up ? 30 : 134} textAnchor="end" fontFamily={SERIF} fontSize={12} fontWeight={700} fill={red}>{c.delta}</text>
    </svg>
  );
};

/** One research-style page. */
const Paper = ({ p, i }: { p: Page; i: number }) => {
  const col = (PW - 92 - 26) / 2;
  return (
    <div style={{ position: "absolute", inset: 0, padding: "54px 46px 40px", fontFamily: SERIF, color: "#111" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#444", borderBottom: "1px solid #222", paddingBottom: 6 }}>
        <span>{p.type === "study" ? `Human clinical evidence · ${p.area}` : p.cite}</span>
        <span>{String(i + 1).padStart(2, "0")}</span>
      </div>
      {p.type === "study" ? (
        <>
          <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.18, marginTop: 26 }}>{p.claim.replace(/\.$/, "")}</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12 }}>{p.area} · {p.tag}</div>
          <div style={{ display: "flex", gap: 26, marginTop: 26 }}>
            <div style={{ width: col }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.4, textAlign: "justify" }}>
                <b>Abstract</b>&nbsp; {p.abstract}
              </div>
              <div style={{ marginTop: 14 }}>
                <Bars seed={`a${i}`} lines={42} width={col} />
              </div>
            </div>
            <div style={{ width: col }}>
              <Figure c={p.chart} />
              <div style={{ fontSize: 10.5, color: "#333", marginTop: 4 }}>
                <b>Fig. 1</b> {p.tag}. Placebo vs. astaxanthin.
              </div>
              <div style={{ marginTop: 16 }}>
                <Bars seed={`b${i}`} lines={36} width={col} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.22, marginTop: 30 }}>“{p.quote.replace(/[“”]/g, "")}”</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 16 }}>{p.who}</div>
          <div style={{ fontSize: 12, marginTop: 4, color: "#333" }}>{p.cite}</div>
          <div style={{ display: "flex", gap: 26, marginTop: 34 }}>
            <div style={{ width: col }}>
              <Bars seed={`c${i}`} lines={58} width={col} />
            </div>
            <div style={{ width: col }}>
              <Bars seed={`d${i}`} lines={58} width={col} />
            </div>
          </div>
        </>
      )}
      <div style={{ position: "absolute", left: 46, right: 46, bottom: 34, fontSize: 10, color: "#555", borderTop: "1px solid #bbb", paddingTop: 6 }}>
        Results from published human studies on astaxanthin. Individual results vary.
      </div>
    </div>
  );
};

/** Sheets behind the top page give the stack its thickness. */
const Sheet = ({ dx, dy, rot }: { dx: number; dy: number; rot: number }) => (
  <div style={{ position: "absolute", left: dx, top: dy, width: PW, height: PH, background: "#fbfbfb", transform: `rotate(${rot}deg)`, boxShadow: "0 2px 6px rgba(30,50,60,0.18)" }} />
);

const CURL = 74;

const Words = ({ s, text, start, step, style }: { s: number; text: string; start: number; step: number; style: React.CSSProperties }) => (
  <div style={style}>
    {text.split("\n").map((line, li, lines) => {
      const before = lines.slice(0, li).join(" ").split(" ").filter(Boolean).length;
      return (
        <div key={li}>
          {line.split(" ").map((w, wi) => {
            const p = prog(s, start + (before + wi) * step, start + (before + wi) * step + 0.45, EASE_OUT);
            const r = reveal(p, 0, 10);
            return (
              <span key={wi} style={{ display: "inline-block", whiteSpace: "pre", opacity: r.opacity, filter: r.filter }}>
                {w}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </div>
      );
    })}
  </div>
);

export const StudyStack = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  const idx = Math.max(0, Math.floor((s - FIRST) / SWAP)) % PAGES.length;
  const push = lerp(0.97, 1.05, prog(s, 0, STUDY_STACK_DURATION_S, (t) => t));
  const enter = 1; // frame zero is a finished picture: the stack is already there
  const out = prog(s, STUDY_STACK_DURATION_S - 0.5, STUDY_STACK_DURATION_S, EASE_IN_OUT);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      {/* soft vignette like the reference's lit backdrop */}
      <AbsoluteFill style={{ background: "radial-gradient(90% 60% at 50% 45%, rgba(255,255,255,0.07), rgba(0,0,0,0) 60%, rgba(20,40,50,0.18) 100%)" }} />

      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(38,62,74,0.42) 0%, rgba(38,62,74,0.26) 22%, rgba(38,62,74,0) 34%, rgba(38,62,74,0) 72%, rgba(38,62,74,0.3) 82%, rgba(38,62,74,0.46) 100%)" }} />
      <Words
        s={s}
        text={"Backed by 85+ human\nclinical studies"}
        start={0.45}
        step={0.11}
        style={{ position: "absolute", top: 196, left: 0, right: 0, textAlign: "center", fontFamily: INTER, fontWeight: 300, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.035em", color: "#ffffff" }}
      />

      <AbsoluteFill style={{ perspective: 2000 }}>
        <div
          style={{
            position: "absolute",
            left: W / 2 - PW / 2,
            top: 386,
            width: PW,
            height: PH,
            opacity: enter * (1 - out),
            transform: `scale(${push}) rotateY(-7deg) rotateX(3deg) rotateZ(-0.6deg)`,
            transformOrigin: "50% 70%",
          }}
        >
          <Sheet dx={14} dy={-14} rot={0.8} />
          <Sheet dx={7} dy={-7} rot={0.35} />
          {/* top page, corner cut for the curl */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#ffffff",
              clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${CURL}px), calc(100% - ${CURL}px) 100%, 0 100%)`,
              boxShadow: "0 30px 60px rgba(30,50,60,0.25)",
            }}
          >
            <Paper p={PAGES[idx]} i={idx} />
          </div>
          {/* sheet edges fanning out under the curl */}
          {[0, 1].map((k) => (
            <div
              key={k}
              style={{
                position: "absolute",
                right: -2 - k * 3,
                bottom: -2 - k * 3,
                width: CURL + 6,
                height: CURL + 6,
                background: k ? "#eef1f2" : "#f7f8f8",
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                boxShadow: "0 1px 2px rgba(30,50,60,0.2)",
              }}
            />
          ))}
          {/* curled corner: paper underside, white to light grey, shadow along the crease */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: CURL,
              height: CURL,
              background: "linear-gradient(135deg, #ffffff 0%, #eceeef 45%, #c9d0d3 100%)",
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              filter: "drop-shadow(-4px -4px 5px rgba(30,50,60,0.3))",
            }}
          />
        </div>
      </AbsoluteFill>

      <Words
        s={s}
        text={"Every study behind Aura, in one library"}
        start={1.3}
        step={0.16}
        style={{ position: "absolute", top: 1532, left: 60, right: 60, textAlign: "center", fontFamily: DISPLAY, fontStyle: "italic", fontSize: 60, lineHeight: 1.1, color: "rgba(255,255,255,0.94)" }}
      />
    </AbsoluteFill>
  );
};
