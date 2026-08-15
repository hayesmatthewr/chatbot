"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/lifework/icons";

// ---------------------------------------------------------------------------
// Hero study chart — hand-authored inline SVG, following the clinical chart
// convention established in src/components/im8/science/NadDeclineChart.tsx:
// dashed gridlines, a bold bracket delta annotation, thin error-bar caps,
// and a strict two-color palette (neutral gray vs. the brand accent).
// ---------------------------------------------------------------------------

const CHART_TICKS = [0, 4, 8, 12];
const CHART_MAX = 14;
const PLOT_TOP = 70;
const PLOT_BOTTOM = 280;

function valueToY(value: number) {
  return PLOT_BOTTOM - (value / CHART_MAX) * (PLOT_BOTTOM - PLOT_TOP);
}

function UvThresholdChart() {
  const astaxanthinValue = 11.8;
  const placeboValue = 3.0;
  const center1 = 120;
  const center2 = 220;
  const barWidth = 60;

  const top1 = valueToY(astaxanthinValue);
  const top2 = valueToY(placeboValue);

  return (
    <svg
      viewBox="0 0 320 340"
      className="h-auto w-full"
      role="img"
      aria-label="Bar chart comparing improvement in UV threshold after 9 weeks: astaxanthin plus 11.8 percent versus placebo plus 3.0 percent"
    >
      {/* Gridlines + y-axis labels */}
      {CHART_TICKS.map((t) => {
        const y = valueToY(t);
        return (
          <g key={t}>
            <line
              x1={40}
              y1={y}
              x2={300}
              y2={y}
              stroke="var(--lifework-line)"
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            <text x={34} y={y + 3} textAnchor="end" fontSize={9} fill="var(--lifework-ink-faint)">
              {t}%
            </text>
          </g>
        );
      })}

      {/* Baseline */}
      <line
        x1={40}
        y1={PLOT_BOTTOM}
        x2={300}
        y2={PLOT_BOTTOM}
        stroke="var(--lifework-ink-faint)"
        strokeWidth={1}
      />

      {/* Placebo bar — neutral */}
      <rect
        x={center2 - barWidth / 2}
        y={top2}
        width={barWidth}
        height={PLOT_BOTTOM - top2}
        rx={3}
        fill="var(--lifework-line)"
        stroke="var(--lifework-ink-faint)"
        strokeWidth={1}
      />
      {/* Astaxanthin bar — accent */}
      <rect
        x={center1 - barWidth / 2}
        y={top1}
        width={barWidth}
        height={PLOT_BOTTOM - top1}
        rx={3}
        fill="var(--lifework-red)"
      />

      {/* Error-bar caps */}
      <line x1={center1} y1={top1} x2={center1} y2={top1 - 10} stroke="var(--lifework-red-dark)" strokeWidth={1} />
      <line x1={center1 - 8} y1={top1 - 10} x2={center1 + 8} y2={top1 - 10} stroke="var(--lifework-red-dark)" strokeWidth={1} />
      <line x1={center2} y1={top2} x2={center2} y2={top2 - 10} stroke="var(--lifework-ink-faint)" strokeWidth={1} />
      <line x1={center2 - 8} y1={top2 - 10} x2={center2 + 8} y2={top2 - 10} stroke="var(--lifework-ink-faint)" strokeWidth={1} />

      {/* Value labels */}
      <text x={center1} y={top1 - 18} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--lifework-red)">
        +11.8%
      </text>
      <text x={center2} y={top2 - 18} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--lifework-ink-soft)">
        +3.0%
      </text>

      {/* Bracket delta annotation */}
      <path
        d={`M ${center1} 46 L ${center1} 78 M ${center1} 46 L ${center2} 46 M ${center2} 46 L ${center2} 198`}
        fill="none"
        stroke="var(--lifework-ink)"
        strokeWidth={1}
      />
      <text x={(center1 + center2) / 2} y={38} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--lifework-red)">
        +8.8 pts higher
      </text>

      {/* Category labels */}
      <text x={center1} y={300} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--lifework-red)">
        Astaxanthin
      </text>
      <text x={center2} y={300} textAnchor="middle" fontSize={11} fontWeight={500} fill="var(--lifework-ink-soft)">
        Placebo
      </text>

      {/* Y-axis title */}
      <text
        x={-160}
        y={14}
        textAnchor="middle"
        fontSize={9}
        fill="var(--lifework-ink-faint)"
        letterSpacing="0.08em"
        transform="rotate(-90)"
      >
        IMPROVEMENT IN UV THRESHOLD
      </text>
    </svg>
  );
}

function HeroStudy() {
  return (
    <div className="mt-14 rounded-2xl border border-[var(--lifework-line)] bg-[var(--lifework-surface)] p-8 md:p-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <span className="inline-flex items-center rounded-full border border-[var(--lifework-line)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--lifework-ink-soft)]">
            SKIN RESILIENCE
          </span>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--lifework-ink)] sm:text-3xl">
            Built-in resilience to UV stress.
          </h3>

          <p className="mt-6 font-mono text-xs tabular-nums uppercase tracking-[0.08em] text-[var(--lifework-ink-faint)]">
            After 9 weeks
          </p>

          <div className="mt-4 space-y-1 text-sm text-[var(--lifework-ink-soft)]">
            <p>[Study title / publication]</p>
            <p>[Participants]</p>
            <p>[Dosage]</p>
          </div>

          <a
            href="#"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--lifework-red)] transition-colors hover:text-[var(--lifework-red-dark)]"
          >
            View Study
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <UvThresholdChart />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Evidence categories — client tabs, 3 placeholder study cards each.
// ---------------------------------------------------------------------------

type CategoryId = "skin" | "eyes" | "performance" | "cognition" | "cellular";

interface Category {
  id: CategoryId;
  label: string;
  outcomes: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "skin",
    label: "Skin",
    outcomes: [
      "Improved skin hydration and elasticity",
      "Reduced visible signs of UV-induced skin aging",
      "Smoother skin texture with consistent use",
    ],
  },
  {
    id: "eyes",
    label: "Eyes",
    outcomes: [
      "Reduced visual fatigue during screen use",
      "Supported tear film stability",
      "Improved focus (accommodation) speed",
    ],
  },
  {
    id: "performance",
    label: "Performance",
    outcomes: [
      "Faster post-exercise recovery",
      "Reduced exercise-induced muscle fatigue",
      "Improved endurance capacity",
    ],
  },
  {
    id: "cognition",
    label: "Cognition",
    outcomes: [
      "Supported working memory performance",
      "Reduced mental fatigue during sustained tasks",
      "Supported reaction time under fatigue",
    ],
  },
  {
    id: "cellular",
    label: "Cellular Health",
    outcomes: [
      "Reduced markers of oxidative stress",
      "Supported mitochondrial function",
      "Reduced lipid peroxidation markers",
    ],
  },
];

function EvidenceCategories() {
  const [active, setActive] = useState<CategoryId>("skin");
  const category = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  return (
    <div className="mt-20">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Evidence categories">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === c.id
                ? "border-[var(--lifework-red)] bg-[var(--lifework-red)] text-white"
                : "border-[var(--lifework-line)] text-[var(--lifework-ink-soft)] hover:border-[var(--lifework-ink-faint)] hover:text-[var(--lifework-ink)]"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {category.outcomes.map((outcome) => (
          <div
            key={outcome}
            className="rounded-xl border border-[var(--lifework-line)] bg-[var(--lifework-cream)] p-6"
          >
            <p className="text-base font-medium leading-snug text-[var(--lifework-ink)]">{outcome}</p>
            <div className="mt-4 space-y-1 font-mono text-xs tabular-nums text-[var(--lifework-ink-soft)]">
              <p>[Result]</p>
              <p>Duration: [X weeks]</p>
              <p>Dose: [X mg]</p>
              <p>Participants: [n]</p>
              <p>[Publication]</p>
            </div>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--lifework-red)] transition-colors hover:text-[var(--lifework-red-dark)]"
            >
              View Study
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClinicalProof() {
  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
          CLINICALLY STUDIED
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--lifework-ink)] sm:text-4xl">
          85+ human clinical studies. One remarkable molecule.
        </h2>
        <p className="mt-4 max-w-xl text-base text-[var(--lifework-ink-soft)]">
          Astaxanthin has been studied across skin, eye, exercise, cognitive, and cellular health.*
        </p>

        <HeroStudy />
        <EvidenceCategories />
      </div>
    </section>
  );
}
