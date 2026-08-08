import Image from "next/image";
import { BarsIcon, StarIcon } from "./icons";

const CHART_ROWS = [
  { label: "Feeling Refreshed", before: 53, after: 89 },
  { label: "Morning Grogginess", before: 43, after: 89 },
  { label: "Daytime Energy Level", before: 53, after: 92 },
  { label: "Feeling Irritable", before: 57, after: 79 },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#345E9E]">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="w-4 h-4" />
      ))}
    </div>
  );
}

export function TestimonialAndChart() {
  return (
    <section className="bg-[#EEF1EA]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Testimonial */}
        <div>
          <BarsIcon className="w-8 h-4 mb-6 text-[#345E9E]/60" />
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="relative h-72">
              <Image
                src="/images/sonnet/sonnet-sleep-calm-bottle-capsules.jpg"
                alt="Sonnet Sleep + Calm"
                width={200}
                height={280}
                className="absolute left-0 top-4 w-36 rotate-[-8deg] rounded-lg shadow-lg object-cover"
              />
              <Image
                src="/images/sonnet/sonnet-core-sleep-bottle-capsules.jpg"
                alt="Sonnet Core Sleep"
                width={200}
                height={280}
                className="absolute left-16 top-24 w-40 rotate-[4deg] rounded-lg shadow-lg object-cover"
              />
              <Image
                src="/images/sonnet/sonnet-sleep-restore-bottle-capsules.jpg"
                alt="Sonnet Sleep + Restore"
                width={200}
                height={280}
                className="absolute left-4 bottom-0 w-32 rotate-[10deg] rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#345E9E] leading-snug">
                I&apos;ve suffered from tossing and turning for years now. Now I can&apos;t wait to go to sleep!
              </p>
              <p className="mt-3 font-semibold text-[#345E9E]/80">Jason, restless sleeper</p>
              <Stars />

              <p className="mt-10 text-2xl font-semibold text-[#345E9E] leading-snug">
                0% groggy
                <br />
                100% recharged
              </p>
              <p className="mt-3 font-semibold text-[#345E9E]/80">Gabe, can&apos;t-fall-asleep sleeper</p>
              <Stars />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div>
          <BarsIcon className="w-8 h-4 mb-6 text-[#345E9E]/60" />
          <h2 className="text-3xl font-semibold text-[#345E9E]">Natural, clean ingredients that build benefits over time</h2>
          <p className="mt-4 text-[#345E9E]/80">
            <strong className="text-[#345E9E]">Sonnet</strong> works best over time to help you fall asleep and stay
            asleep so you can wake up refreshed and ready to tackle your day. Users who tried Sonnet saw an increase in
            improvement in sleep with prolonged use.
          </p>

          <div className="mt-8 flex items-center gap-4 text-xs text-[#345E9E]/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5FE0D0]" /> &lt;10 nights
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#345E9E]" /> 10+ nights
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {CHART_ROWS.map((row) => (
              <div key={row.label}>
                <p className="text-sm text-[#345E9E]/80 mb-1">{row.label}</p>
                <div className="space-y-1">
                  <div className="h-4 bg-[#345E9E]/10 rounded-r-full relative" style={{ width: `${row.before}%` }}>
                    <div className="h-4 bg-[#5FE0D0] rounded-r-full flex items-center justify-end pr-2 text-[10px] font-semibold text-[#221D35]/80">
                      {row.before}
                    </div>
                  </div>
                  <div className="h-4 bg-[#345E9E]/10 rounded-r-full relative" style={{ width: `${row.after}%` }}>
                    <div className="h-4 bg-[#345E9E] rounded-r-full flex items-center justify-end pr-2 text-[10px] font-semibold text-white">
                      {row.after}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#345E9E]/60">% of Sonnet customers who saw improvements</p>
        </div>
      </div>
    </section>
  );
}
