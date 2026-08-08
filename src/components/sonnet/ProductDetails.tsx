"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";

const SECTIONS = [
  {
    label: "Description",
    content:
      "Our Core formulation provides the building blocks for long-term sleep health to help you gently (but quickly) ease into sleep, maintain a state of deep sleep, and wake up feeling refreshed and restored.",
  },
  {
    label: "Key Ingredients",
    content: "Venetron (Rafuma Extract), Valerian Root, Sensoril Ashwagandha, GABA (Gamma-Aminobutyric Acid).",
  },
  {
    label: "Shipping & Returns",
    content:
      "Free shipping on orders of $50+. 30-day money back guarantee. Subscriptions can be skipped, gifted, or cancelled anytime.",
  },
];

const BADGES = [
  { title: "Safe", desc: "Safe, drug-free, and non habit-forming. No antihistamines and no alcohol." },
  { title: "Effective", desc: "Expert-designed formulas contain ingredients at dosage levels clinically proven to improve your sleep." },
  { title: "Tailored", desc: "Natural, vegan, gluten/dairy/sugar-free, non-GMO. Allergen-free. No artificial colors or binders." },
  { title: "USA Manufactured", desc: "Produced in a FDA-approved facility that is Good Manufacturing Practices and Guidelines (CGMP) compliant." },
];

export function ProductDetails() {
  const [open, setOpen] = useState<string | null>("Description");

  return (
    <div className="mt-10 border-t border-black/10">
      {SECTIONS.map((s) => (
        <div key={s.label} className="border-b border-black/10">
          <button
            onClick={() => setOpen(open === s.label ? null : s.label)}
            className="w-full flex items-center justify-between py-4 font-semibold"
          >
            {s.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${open === s.label ? "rotate-180" : ""}`} />
          </button>
          {open === s.label && <p className="pb-4 text-sm text-[#221D35]/70 leading-relaxed">{s.content}</p>}
        </div>
      ))}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {BADGES.map((b) => (
          <div key={b.title}>
            <h4 className="font-semibold mb-1">{b.title}</h4>
            <p className="text-sm text-[#221D35]/70 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
