import { Placeholder } from "@/components/im8/Placeholder";

const EXPERTS = [
  { name: "Dr. Dawn Mussallem", title: "Cancer Survivor & CMO of Fountain Life" },
  { name: "Bobby Rich", title: "Trainer to David Beckham and World-class Athletes" },
  { name: "Dr. Suzanne Devkota", title: "Gut Health Expert & Prof at Cedars Sinai" },
  { name: "Tavi Castro", title: "Breathwork Expert & Free-Diving World Record Holder" },
  { name: "Dr. Amy Shah", title: 'Double-Board Certified Physician and Host of "Save Yourself" Podcast' },
  { name: "Dr. Ara Suppiah", title: "Performance & Longevity Physician at LIV Golf" },
];

/**
 * Cream promo card advertising the quarterly-subscriber masterclass
 * program, with a horizontally scrollable strip of expert cards.
 */
export function TransformationProgram() {
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: "#F6F1EA" }}>
      <p className="text-[11px] font-semibold tracking-wide text-[#50000B]">
        QUARTERLY SUBSCRIBERS ONLY
      </p>
      <h3
        className="mt-1 text-2xl"
        style={{ fontFamily: "var(--font-im8-display), serif", color: "#50000B" }}
      >
        90-Day IM8 Transformation Program
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-black/70">
        Exclusive access to quarterly masterclasses with our world-class Medical and Performance
        Experts
      </p>

      <div className="mt-5 flex gap-5 overflow-x-auto pb-1">
        {EXPERTS.map((expert) => (
          <div key={expert.name} className="flex w-24 shrink-0 flex-col items-center text-center">
            <Placeholder className="aspect-square w-20 rounded-full" />
            <span className="mt-2 text-[12px] font-semibold text-[#1a1a1a]">{expert.name}</span>
            <span className="mt-0.5 text-[11px] leading-tight text-black/60">{expert.title}</span>
          </div>
        ))}
      </div>

      <a
        href="#transformation-program"
        className="mt-5 inline-block text-[13px] font-semibold text-[#50000B] underline underline-offset-2"
      >
        LEARN MORE ABOUT THE PROGRAM →
      </a>
    </div>
  );
}
