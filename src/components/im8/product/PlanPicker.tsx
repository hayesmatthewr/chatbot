"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/im8/Placeholder";
import { CheckIcon } from "@/components/im8/product/icons";

type PlanId = "90-day" | "30-day";

type Plan = {
  id: PlanId;
  name: string;
  save: string;
  price: string;
  originalPrice: string;
  billing: string;
  perServing: string;
  bestValue?: boolean;
  checklist: string[];
};

const PLANS: Plan[] = [
  {
    id: "90-day",
    name: "90-Day Supply",
    save: "SAVE 30%",
    price: "$104",
    originalPrice: "$149",
    billing: "Billed $312.00 USD every 12 weeks",
    perServing: "$3.47 USD / SERVING",
    bestValue: true,
    checklist: [
      "Exclusive Access to 90 Day IM8 Transformation Program",
      "Free Welcome Kit (US$89 in value)",
      "Maximum savings — lowest price per serving",
      "Cancel or pause anytime",
      "90-Day Money-Back Guarantee",
    ],
  },
  {
    id: "30-day",
    name: "30-Day Supply",
    save: "SAVE 20%",
    price: "$119",
    originalPrice: "$149",
    billing: "Billed $119.00 USD every 4 weeks",
    perServing: "$3.97 USD / SERVING",
    checklist: [
      "Free Welcome Kit (US$71 in value)",
      "Save 20% — great value per serving",
      "Cancel or pause anytime",
      "30-Day Money-Back Guarantee",
    ],
  },
];

const WELCOME_KIT_ITEMS = [
  { price: "$18", label: "5x Bonus Sachets" },
  { price: "US$8", label: "Sachets Storage Box" },
  { price: "$18", label: "Luxe Edition Mixer" },
  { price: "$45", label: "Luxe Edition Signature Bottle" },
];

const goldChip = "linear-gradient(90deg, #DBB15C 0%, #FDE9BF 50%, #DBB15C 100%)";
const maroonGradient = "linear-gradient(135deg, #50000B 0%, #6B0011 100%)";

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border-2 p-5 text-left transition-colors",
        selected ? "border-[#50000B] bg-white" : "border-black/10 bg-white hover:border-black/20"
      )}
    >
      {plan.bestValue && (
        <span
          className="absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-[11px] font-semibold tracking-wide text-white"
          style={{ background: maroonGradient }}
        >
          BEST VALUE
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-[#50000B]" : "border-black/25"
          )}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#50000B]" />}
        </span>
        <span className="text-[17px] font-medium text-[#1a1a1a]">{plan.name}</span>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-bold text-[#50000B]"
          style={{ background: goldChip }}
        >
          {plan.save}
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl" style={{ fontFamily: "var(--font-im8-display), serif", color: "#50000B" }}>
          {plan.price}
        </span>
        <span className="text-base text-black/40 line-through">{plan.originalPrice}</span>
        <span className="text-sm text-black/60">/mo</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-4 text-[13px] text-black/60">
        <span>{plan.billing}</span>
        <span className="font-semibold text-[#50000B]">{plan.perServing}</span>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {plan.checklist.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-[#1a1a1a]">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#50000B]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {plan.id === "90-day" && (
        <div className="mt-5 border-t border-black/10 pt-4">
          <p className="text-[11px] font-semibold tracking-wide text-black/60">
            WELCOME KIT — ARRIVES WITH FIRST ORDER
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {WELCOME_KIT_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                <Placeholder className="aspect-square w-full rounded" />
                <span className="text-[11px] leading-tight text-black/70">
                  {item.price} {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

/**
 * Client-side plan selector. Owns the selected-plan state so the "one time
 * purchase" row and the Add to Cart button below it can reflect whichever
 * plan is currently selected without prop-drilling across a server/client
 * boundary.
 */
export function PlanPicker() {
  const [selectedId, setSelectedId] = useState<PlanId>("90-day");
  const selectedPlan = PLANS.find((plan) => plan.id === selectedId) ?? PLANS[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[13px] font-semibold tracking-wide text-[#1a1a1a]">SUBSCRIBE &amp; SAVE:</p>
        <div className="mt-3 flex flex-col gap-4">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={plan.id === selectedId}
              onSelect={() => setSelectedId(plan.id)}
            />
          ))}
        </div>

        <div className="mt-4 text-center text-[13px] text-black/60">
          One Time Purchase (Pay Full Price) - $149
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-full py-4 text-[15px] font-bold text-white shadow-sm transition-opacity hover:opacity-95"
        style={{ background: maroonGradient }}
      >
        Add to cart - {selectedPlan.price} USD/mo
      </button>

      <p className="text-[13px] italic leading-relaxed text-black/60">
        Your purchase gives back — every IM8 subscription helps provide life-saving nutrition to
        mothers &amp; children in need, reaching 400,000 lives via Vitamin Angels.
      </p>
    </div>
  );
}
