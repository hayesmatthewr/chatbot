import { StarRating } from "./icons";

const REVIEWS = [
  {
    name: "Karen M.",
    date: "05/02/26",
    body: "I take one before dinner and I'm not bloated by the end of the night anymore. Simple capsule, no aftertaste, and it just works for me.",
  },
  {
    name: "David R.",
    date: "04/26/26",
    body: "Dairy and beans used to be a problem for me. With these I can eat what I want and feel fine after. Wish I'd found them sooner.",
  },
  {
    name: "Linda T.",
    date: "04/19/26",
    body: "I appreciate that it's developed with doctors and tested. I feel comfortable after big meals now, which is exactly what I wanted.",
  },
];

export function ReviewsSection() {
  return (
    <section className="mt-13 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <div className="text-center">
        <StarRating rating={4.6} size={16} className="justify-center" />
        <div className="mt-2 font-medium text-[11px] tracking-[0.06em] text-[#3a3a33]">
          4.6 · 250,000+ FIVE-STAR REVIEWS ACROSS PHYSICIAN&rsquo;S CHOICE
        </div>
        <h2 className="mt-2.5 text-[23px] font-semibold tracking-[-0.02em] text-[#16160f]">
          What customers say
        </h2>
      </div>
      <div className="mt-5">
        {REVIEWS.map((r) => (
          <div key={r.name} className="border-t border-[#e9e8e2] py-5.5 last:border-b">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-7.5 shrink-0 rounded-full bg-gradient-to-br from-[#c9c2b6] to-[#b3a89a]"
                />
                <span className="text-[15px] font-semibold text-[#16160f]">{r.name}</span>
              </div>
              <span className="shrink-0 text-[13px] text-[#6d6d65]">{r.date}</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#3a3a33]">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="8" fill="#16160f" />
                <path
                  d="M4.5 8.2l2.2 2.2 4.8-4.8"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Verified Buyer
            </div>
            <StarRating rating={5} className="mt-2.5" />
            <p className="mt-2.5 text-[14.5px] leading-[1.55] text-[#3a3a33]">{r.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4.5 text-center text-[11.5px] text-[#9d9d94]">
        Individual results may vary.
      </p>
    </section>
  );
}
