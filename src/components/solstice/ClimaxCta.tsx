"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function ClimaxCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="climax" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 50% 100%, color-mix(in oklab, var(--accent) 30%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-solstice-display)] text-3xl font-semibold sm:text-4xl">
          Never run out of fresh coffee again.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Subscribe and save 15% on every bag, with roast day and delivery cadence
          fully in your control. Skip or cancel anytime.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#shop"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:hover:translate-y-0"
          >
            Start your subscription
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </a>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm font-medium text-white/70">
            Not ready to commit? Get one roasting tip a month, no spam.
          </p>
          {submitted ? (
            <p className="mt-4 text-sm font-semibold text-accent">
              You&apos;re on the list — first email lands next week.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-4 flex max-w-sm flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="climax-email" className="sr-only">
                Email address
              </label>
              <input
                id="climax-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 backdrop-blur-md transition-colors duration-200 outline-none focus:border-accent focus:ring-3 focus:ring-accent/30"
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer rounded-lg border-2 border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
