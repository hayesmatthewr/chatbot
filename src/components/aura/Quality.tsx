import Image from "next/image";
import { Reveal } from "./Reveal";

const badges = ["Sustainably Sourced in the USA", "Non-GMO Project Verified", "Third-Party Tested"];

export function Quality() {
  return (
    <section aria-labelledby="quality-title" className="bg-aura-red text-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-20 md:grid-cols-12 md:gap-8 md:px-8 md:py-32">
        <Reveal className="md:col-span-6">
          <h2 id="quality-title" className="max-w-[14ch] text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
            Rigorous Quality Standards
          </h2>
          <p className="mt-5 max-w-[44ch] text-[18px] leading-[1.55]">
            What goes into your body matters. Every softgel is held to standards you can check: where it&apos;s grown, what&apos;s left out and who tested it.
          </p>
          <ul className="mt-10 flex flex-col gap-3">
            {badges.map((b, i) => (
              <Reveal as="li" key={b} delay={120 + i * 80} className="flex items-center gap-4">
                <span className="h-12 w-8 shrink-0 rounded-full bg-white" aria-hidden />
                <span className="text-[clamp(20px,2vw,28px)] leading-[1.15] font-bold tracking-[-0.02em]">{b}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="md:col-span-5 md:col-start-8">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-[999px] bg-aura-paper">
            <Image src="/images/aura/petri-dish.jpg" alt="A hand holding a dish of red astaxanthin extract" fill sizes="(min-width: 768px) 35vw, 90vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
