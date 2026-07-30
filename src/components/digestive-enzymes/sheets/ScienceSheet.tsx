import { BottomSheet } from "./BottomSheet";

const ATTRS = [
  "Each enzyme targets a specific food group",
  "16 enzymes across all 6 major food groups",
  "Acid-stable, soil-based probiotic strains",
  "Third-party tested for purity & potency",
];

const STATS = [
  { num: "16", label: "Enzymes", sub: "Covering protein, carbs, dairy, fats, veggies & legumes" },
  { num: "#1", label: "Probiotic & Enzyme Brand", sub: "In the United States" },
  { num: "250k+", label: "Five-star reviews", sub: "Across Physician's Choice" },
];

function CircleCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16160f" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.2l2.6 2.6L16 9.4" />
    </svg>
  );
}

export function ScienceSheet() {
  return (
    <BottomSheet id="science" eyebrow="The Science">
      <div className="text-[30px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#16160f]">
        The science of digestive enzymes
      </div>
      <div className="mt-3.5 text-[16px] leading-[1.4] text-[#3a3a33]">
        Developed with the Physician&rsquo;s Choice Scientific Advisory Board
      </div>
      <div className="mt-1.5 text-[13px] text-[#6d6d65]">
        A team of leading doctors and experts in gut health.
        <sup className="ml-px text-[0.58em] leading-none font-normal">♢</sup>
      </div>

      <div className="mt-5.5 flex flex-col gap-4">
        {ATTRS.map((a) => (
          <div key={a} className="flex items-center gap-3.5 text-[15.5px] leading-[1.3] text-[#16160f]">
            <CircleCheck />
            {a}
          </div>
        ))}
      </div>

      <div className="mt-8 inline-block rounded-md bg-[#CA133D] px-2.5 py-1 font-semibold text-[11px] tracking-[0.06em] text-white uppercase">
        The takeaway
      </div>
      <div className="mt-4 text-[23px] leading-[1.18] font-semibold tracking-[-0.02em] text-[#16160f]">
        Why this formula is built to work:
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-[14px] border border-[#e9e8e2] px-4.5 py-4">
            <div className="w-19 shrink-0 text-center text-[28px] leading-none font-semibold tracking-[-0.02em] text-[#CA133D]">
              {s.num}
            </div>
            <div className="text-[15.5px] leading-[1.25] font-semibold text-[#16160f]">
              {s.label}
              <em className="mt-0.5 block text-[14px] font-normal text-[#6d6d65] not-italic">
                {s.sub}
              </em>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5.5 text-[11px] leading-[1.5] text-[#9d9d94]">
        <sup className="mr-px text-[0.58em] leading-none font-normal">♢</sup>Developed with our
        team of Physician&rsquo;s Choice doctors. Please talk to your doctor before starting any
        new health routine. Individual results may vary.
      </div>
    </BottomSheet>
  );
}
