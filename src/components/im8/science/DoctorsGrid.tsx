import { Placeholder } from "@/components/im8/Placeholder";

interface Doctor {
  quote: string;
  name: string;
  title: string;
}

const doctors: Doctor[] = [
  {
    quote:
      "IM8's Daily Ultimate Longevity Powder represents the pinnacle of nutritional science. The therapeutic dosing and synergistic combination of compounds targeting all hallmarks of aging is unprecedented in the supplement industry.",
    name: "Dr. James DiNicolantonio",
    title:
      "Cardiovascular Research Scientist & Doctor of Pharmacy, Best-selling Author of 12+ Books on Health",
  },
  {
    quote:
      "After decades studying the effects of space on the human body, I recognize the importance of comprehensive cellular protection. IM8's formulation addresses aging at the most fundamental level.",
    name: "Dr. James L. Green",
    title: "Former Chief Scientist of NASA, Space Medicine & Human Performance Expert",
  },
  {
    quote:
      "In my practice focused on longevity medicine, I've never seen a supplement that so comprehensively addresses the biological mechanisms of aging. IM8 is truly revolutionary.",
    name: "Dr. Darshan Shah",
    title: "Board Certified Surgeon & Physician, CEO and Founder of Next Health",
  },
  {
    quote:
      "As a physician focused on integrative medicine, I'm impressed by IM8's comprehensive approach. This isn't just another supplement — it's a complete longevity system backed by rigorous science.",
    name: "Dr. Amy Shah",
    title: "Double-Board Certified Physician, Host of Podcast 'Save Yourself'",
  },
];

export function DoctorsGrid() {
  return (
    <section className="bg-white py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          Backed by World-Class Longevity Doctors and Scientists
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
          Our Scientific Advisory Board brings together leading experts from NASA, Mayo Clinic,
          and top research institutions
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 text-left sm:mt-16 md:grid-cols-2 md:gap-10">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <Placeholder className="h-14 w-14 rounded-full shrink-0" />
              <p className="italic text-neutral-700 leading-relaxed">&ldquo;{doctor.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-[#50000B]">— {doctor.name}</p>
                <p className="mt-1 text-sm text-neutral-500">{doctor.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
