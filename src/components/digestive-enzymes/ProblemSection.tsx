const GAPS = [
  {
    b: "Enzyme production slows with age.",
    t: "Foods you once handled easily can start to feel harder to digest.",
  },
  {
    b: "Dairy, beans & fatty foods are harder.",
    t: "They need specific enzymes many people simply run low on.",
  },
  {
    b: "Undigested food ferments.",
    t: "When food isn't broken down, it ferments in the gut and produces gas.",
  },
];

export function ProblemSection() {
  return (
    <section className="mt-10 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <h2 className="text-[23px] leading-[1.22] font-semibold tracking-[-0.02em] text-[#16160f]">
        It&rsquo;s not the food. It&rsquo;s your enzymes.
      </h2>
      <p className="mt-2 text-[14.5px] text-[#6d6d65]">
        You eat well and still feel heavy and bloated. That&rsquo;s not willpower, it&rsquo;s your
        body running low on the enzymes that break food down:
      </p>
      <div className="mt-4.5 flex flex-col gap-3.5">
        {GAPS.map((row) => (
          <div key={row.b} className="flex items-start gap-3">
            <span className="min-h-5 w-[3px] shrink-0 self-stretch rounded-sm bg-[#CA133D]" />
            <p className="text-[14.5px] leading-[1.5] text-[#6d6d65]">
              <b className="font-semibold text-[#16160f]">{row.b}</b> {row.t}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
