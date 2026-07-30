"use client";

import { usePageState } from "./PageState";

const POINTS = [
  {
    n: "01",
    title: "Built for real meals",
    body: "16 enzymes chosen to cover every major food group, not just the easy ones.",
  },
  {
    n: "02",
    title: "Acid-resistant by design",
    body: "The soil-based probiotic strains are tough enough to survive stomach acid and reach the gut intact.",
  },
  {
    n: "03",
    title: "Verified, not just claimed",
    body: "Third-party tested for safety, purity, and potency, so what's on the label is what's in the bottle.",
  },
];

export function DoctorsSection() {
  const { scrollToCta } = usePageState();

  return (
    <>
      <section className="mt-12.5 bg-[#CA133D] px-5 py-11.5 text-white lg:px-10">
        <div className="lg:mx-auto lg:max-w-[860px]">
          <div className="font-semibold text-[11px] tracking-[0.14em] text-white/72 uppercase">
            Trust
          </div>
          <h2 className="mt-3 max-w-[22ch] text-[27px] leading-[1.18] font-medium tracking-[-0.01em] text-white">
            Developed with doctors. Trusted by millions.
          </h2>
          <p className="mt-3.5 text-[15px] leading-[1.6] text-white/88">
            This isn&rsquo;t a generic enzyme blend. It&rsquo;s developed with our Scientific
            Advisory Board of practicing doctors, third-party tested, and the #1 probiotic and
            enzyme brand in the US, with over 250,000 five-star reviews.
            <sup className="ml-px text-[0.58em] leading-none font-normal">♢</sup>
          </p>
          <div className="mt-6.5 flex flex-col">
            {POINTS.map((p) => (
              <div key={p.n} className="flex gap-3.5 border-t border-white/22 py-4 last:border-b">
                <div className="w-6 shrink-0 pt-0.5 font-semibold text-[11px] text-white/60">
                  {p.n}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-[1.55] text-white/82">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5.5 text-xs leading-[1.5] text-white/66">
            <sup className="mr-px text-[0.58em] leading-none font-normal">♢</sup>Developed with
            our team of Physician&rsquo;s Choice doctors. Please talk to your doctor before
            starting any new health routine.
          </p>
        </div>
      </section>

      <div className="mt-11 px-5 text-center lg:px-0">
        <button
          type="button"
          onClick={scrollToCta}
          className="inline-flex items-center gap-2 rounded-full bg-[#16160f] px-7.5 py-4 font-semibold text-sm tracking-[0.03em] text-white shadow-[0_6px_20px_rgba(22,22,15,0.2)] transition-[background,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-black hover:shadow-[0_10px_26px_rgba(22,22,15,0.3)]"
        >
          Get Digestive Enzymes <span aria-hidden="true">→</span>
        </button>
        <div className="mt-2.5 text-xs text-[#6d6d65]">60-day guarantee · Free shipping</div>
      </div>
    </>
  );
}
