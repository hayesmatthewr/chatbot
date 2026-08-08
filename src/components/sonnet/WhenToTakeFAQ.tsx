"use client";

import { useState } from "react";
import Image from "next/image";
import { BarsIcon, ChevronDown } from "./icons";

const FAQS = [
  {
    q: "Are Sonnet supplements habit-forming?",
    a: "No, our supplements are drug-free, carefully formatted by our resident PhD, and reviewed by a world class panel of experts to ensure they are safe to take for both short-term and long-term use.",
  },
  {
    q: "How will you feel?",
    a: `Sonnet will gently help you relax, fall asleep and stay asleep. Think of it as feeling more like a good, natural night of sleep.\n\nDo not expect to feel "knocked out," drugged or groggy. You will awake to normal noises. Note that 79% of Sonnet customers had less frequent issues staying asleep and 78% were more satisfied with waking up refreshed.`,
  },
  {
    q: "What's that smell?",
    a: "Because Sonnet is formulated with real botanicals like valerian root and Sensoril® Ashwagandha, you may notice a naturally earthy aroma when you open the bottle. That's the scent of authentic, plant-based ingredients – not artificial fragrances. Rather than masking it with synthetic additives, we include a small, all-natural peppermint sachet inside each bottle and refill pouch to keep your experience fresh while preserving formulation integrity.",
  },
];

export function WhenToTakeFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-[#EEF1EA]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          <BarsIcon className="w-8 h-4 mb-6 text-[#345E9E]/60" />
          <div className="absolute right-6 top-24 w-40 h-40 rounded-full bg-[#F5EF9C] -z-0" />
          <div className="relative space-y-6 max-w-md">
            <div>
              <h3 className="text-xl font-semibold text-[#345E9E]">When should I take Core Sleep?</h3>
              <p className="mt-2 text-[#345E9E]/80">Take 2 capsules with water 30-40 minutes before bed.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#345E9E]">How long does it take to begin working?</h3>
              <p className="mt-2 text-[#345E9E]/80">
                Take Core Sleep for at least 5 consecutive nights to begin feeling the benefits of supported,
                high-quality sleep.
              </p>
              <p className="mt-2 text-[#345E9E]/80">
                Many will feel the effects the first night or within several days; however, for maximum benefits, 4
                weeks of regular usage is recommended. Results vary based on your biochemistry and metabolism.
              </p>
            </div>
          </div>
          <Image
            src="/images/sonnet/Sonnet_Core_Sleep.png"
            alt="Core Sleep capsules"
            width={200}
            height={200}
            className="absolute right-8 top-16 w-40 h-auto"
          />
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <BarsIcon className="w-8 h-4 mb-6 text-[#345E9E]/60" />
          <h2 className="text-2xl font-semibold text-[#345E9E] mb-4">FAQ</h2>
          <div className="divide-y divide-[#345E9E]/10">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left font-semibold text-[#345E9E]"
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <p className="mt-2 text-[#345E9E]/80 whitespace-pre-line leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
