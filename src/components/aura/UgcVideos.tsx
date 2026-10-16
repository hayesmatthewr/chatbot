import Image from "next/image";
import { Play } from "lucide-react";
import { ugc } from "./content";
import { Reveal } from "./Reveal";
import { Stars } from "./Stars";

export function UgcVideos() {
  return (
    <section aria-labelledby="ugc-title" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="ugc-title" className="max-w-[16ch] text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
            What daily users are saying
          </h2>
          <a
            href="#buy"
            className="rounded-full bg-aura-ink px-7 py-3.5 text-[16px] font-bold text-white transition-[transform,background-color] hover:bg-aura-red active:scale-95"
          >
            Get Started
          </a>
        </Reveal>
      </div>
      <ul className="aura-no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:px-8">
        {ugc.map((card, i) => (
          <Reveal as="li" key={card.tag} delay={i * 70} className="w-[72vw] max-w-[300px] shrink-0 snap-start">
            <article className="group relative aspect-[9/16] overflow-hidden rounded-[999px] bg-aura-night text-white">
              <Image src={card.image} alt="" fill sizes="300px" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-black/30" aria-hidden />
              <span className="absolute top-[14%] left-1/2 -translate-x-1/2 rounded-full bg-white px-3.5 py-1 text-[13px] font-bold text-aura-ink">
                {card.tag}
              </span>
              <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-aura-red transition-transform group-hover:scale-110">
                <Play className="size-6 fill-white" aria-hidden />
                <span className="sr-only">Video coming soon</span>
              </span>
              <div className="absolute inset-x-0 bottom-[12%] px-8 text-center">
                <Stars className="justify-center text-white" size={14} />
                <p className="mt-2 text-[19px] leading-[1.15] font-bold">“{card.quote}”</p>
                <p className="mt-2 text-[13px] text-white/85">Name, City · placeholder</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
