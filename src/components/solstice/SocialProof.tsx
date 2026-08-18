import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I've had a coffee subscription for years. This is the first one where I can actually taste the roast date on the label — it makes a real difference.",
    name: "Priya N.",
    detail: "Subscriber since 2024",
  },
  {
    quote:
      "Eclipse is the first dark roast that doesn't taste burnt to me. Ordered the trio next and now I rotate all three.",
    name: "Marcus T.",
    detail: "Verified buyer",
  },
  {
    quote:
      "The 48-hour shipping claim is real — mine arrived two days after roasting and it's noticeably fresher than what I get locally.",
    name: "Elena R.",
    detail: "Verified buyer",
  },
];

export function SocialProof() {
  return (
    <section id="reviews" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-solstice-display)] text-3xl font-semibold text-foreground sm:text-4xl">
            4.9 out of 5, from 2,400+ orders
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <Quote className="size-6 text-accent" />
              <div className="mt-3 flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-accent" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                &quot;{t.quote}&quot;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-foreground">{t.name}</span>
                <span className="text-muted-foreground"> — {t.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
