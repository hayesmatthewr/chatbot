const TICKER_ITEMS = [
  "LEAN MUSCLE",
  "CLARITY",
  "NON GMO",
  "ENDURANCE",
  "RECOVERY",
  "BONE DENSITY",
  "ANTI-AGING",
]

function TickerGroup() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={false}>
      {TICKER_ITEMS.map((item, index) => (
        <span
          key={index}
          className="flex items-center whitespace-nowrap px-4 text-[11px] font-medium tracking-[0.15em] text-foreground/80 uppercase"
        >
          {item}
          <span className="ml-4 text-foreground/40">&bull;</span>
        </span>
      ))}
    </div>
  )
}

export function ScrollingTicker() {
  return (
    <section className="w-full overflow-hidden border-y border-border bg-muted py-2.5">
      <style>{`
        @keyframes story-ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .story-ticker-track {
          animation: story-ticker-scroll 30s linear infinite;
        }
      `}</style>
      <div className="story-ticker-track flex w-max">
        <TickerGroup />
        <TickerGroup />
        <TickerGroup />
        <TickerGroup />
      </div>
    </section>
  )
}
