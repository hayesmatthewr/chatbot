"use client";

import { usePageState } from "./PageState";

const PAIRS = [
  { food: "Protein", enzyme: "proteases" },
  { food: "Starch", enzyme: "amylase" },
  { food: "Dairy", enzyme: "lactase" },
  { food: "Fat", enzyme: "lipase" },
];

export function ScienceNote() {
  const { openSheet } = usePageState();

  return (
    <section
      id="science"
      className="mt-12.5 border-y border-[#e9e8e2] bg-[#f7f6f2] px-5 py-12 lg:px-10"
    >
      <div className="lg:mx-auto lg:max-w-[860px]">
        <div className="font-semibold text-[11px] tracking-[0.14em] text-[#CA133D] uppercase">
          The Science
        </div>
        <h2 className="mt-3.5 max-w-[20ch] text-[29px] leading-[1.16] font-medium tracking-[-0.015em] text-[#16160f]">
          It&rsquo;s not a willpower problem. It&rsquo;s an enzyme problem.
        </h2>
        <div className="mt-5">
          <p className="mb-4 text-[18px] leading-[1.62] text-[#3a3a33]">
            <span className="font-medium text-[#16160f]">
              You eat well and still feel heavy after meals.
            </span>{" "}
            That&rsquo;s usually not what you ate, it&rsquo;s your body running low on the
            enzymes that break food apart. Each food needs its own: protein needs proteases,
            dairy needs lactase, fat needs lipase. Short on one, and that food ferments instead of
            digesting, so the bloating starts.
          </p>
          <div className="my-4.5 flex flex-wrap gap-2">
            {PAIRS.map((p) => (
              <span
                key={p.food}
                className="rounded-md border border-[#cfcec7] bg-white px-2.5 py-1.5 text-[11px] tracking-[0.02em] text-[#3a3a33]"
              >
                <b className="font-semibold text-[#CA133D]">{p.food}</b> → {p.enzyme}
              </span>
            ))}
          </div>
          <p className="text-[18px] leading-[1.62] text-[#3a3a33]">
            Your body makes some on its own, but production slows with age and big meals ask for
            more. That&rsquo;s the idea behind this formula: 16 enzymes, every major food group,
            taken with your meal, so food breaks down the way it should.
            <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
          </p>
        </div>
        <button
          type="button"
          onClick={() => openSheet("science")}
          className="mt-6.5 flex w-full items-center gap-3.5 rounded-[11px] border-[1.5px] border-[#16160f] bg-white p-3.5 text-left transition-colors hover:bg-[#faf9f6] sm:w-auto"
        >
          <span className="flex shrink-0">
            {[0, 1, 2].map((i) => (
              <i
                key={i}
                className="box-content block size-8.5 rounded-full border-2 border-white bg-gradient-to-br from-[#c9c2b6] to-[#b3a89a] shadow-[0_0_0_1px_#e9e8e2] -ml-2.5 first:ml-0"
              />
            ))}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] leading-[1.2] font-bold text-[#16160f]">
              Physician&rsquo;s Choice Scientific Advisory Board
            </span>
            <span className="mt-0.5 block text-[11.5px] text-[#6d6d65]">
              Leading doctors and experts in gut health
            </span>
          </span>
          <span aria-hidden="true" className="ml-1 shrink-0 text-lg font-bold text-[#16160f]">
            →
          </span>
        </button>
      </div>
    </section>
  );
}
