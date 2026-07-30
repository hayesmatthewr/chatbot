import { StarRating } from "./icons";

const QUOTES = [
  { quote: "I take one before dinner and the bloating I used to get is just gone.", name: "Maria S." },
  { quote: "Dairy and beans don't wreck me anymore. I can finally eat what I want.", name: "James W." },
  { quote: "Comfortable after big meals for the first time in years. So simple.", name: "Priya N." },
];

export function ProofStrip() {
  return (
    <section className="mt-9 border-t border-[#e9e8e2] px-5 pt-6.5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <div className="flex items-center gap-2">
        <StarRating rating={4.6} className="text-[#16160f]" />
        <span className="font-medium text-[11px] tracking-[0.05em] text-[#3a3a33]">
          4.6 · 250,000+ FIVE-STAR REVIEWS
        </span>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {QUOTES.map((q) => (
          <div
            key={q.name}
            className="w-[78%] shrink-0 rounded-[10px] border border-[#e9e8e2] p-4 sm:w-[46%] lg:w-[32%]"
          >
            <StarRating rating={5} />
            <p className="mt-2.5 text-sm text-[#16160f]">&ldquo;{q.quote}&rdquo;</p>
            <div className="mt-2.5 flex items-center gap-2 text-xs text-[#6d6d65]">
              <span
                aria-hidden="true"
                className="size-6.5 shrink-0 rounded-full bg-gradient-to-br from-[#c9c2b6] to-[#b3a89a]"
              />
              {q.name} · Verified Buyer
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
