"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/lifework/icons";

type PlanId = "4-week" | "12-week" | "one-time";

type Plan = {
  id: PlanId;
  name: string;
  badges: string[];
  subtext: string;
  price: string;
  originalPrice?: string;
  perUnit?: string;
};

const PLANS: Plan[] = [
  {
    id: "4-week",
    name: "4 Week Delivery",
    badges: ["Save 20%"],
    subtext: "Delivered every 4 weeks",
    price: "$37",
    originalPrice: "$49.99",
    perUnit: "$9.25/week",
  },
  {
    id: "12-week",
    name: "12 Week Delivery",
    badges: ["BEST VALUE", "Save 40%"],
    subtext: "Delivered every 12 weeks",
    price: "$74",
    originalPrice: "$148.50",
    perUnit: "$6.17/week",
  },
  {
    id: "one-time",
    name: "One-Time Purchase",
    badges: [],
    subtext: "No subscription, no discount",
    price: "$49.99",
  },
];

const TRUST_ITEMS = ["Free shipping", "Easily pause or cancel", "30-day guarantee"];

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
        "w-full rounded-2xl border p-4 text-left transition-colors sm:p-5",
        selected
          ? "border-[var(--lifework-red)] bg-white"
          : "border-[var(--lifework-line)] bg-white hover:border-[var(--lifework-ink-faint)]"
      )}
      style={selected ? { boxShadow: "0 0 0 4px var(--lifework-red-tint)" } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
              selected ? "border-[var(--lifework-red)]" : "border-[var(--lifework-line)]"
            )}
          >
            {selected && <span className="h-2.5 w-2.5 rounded-full bg-[var(--lifework-red)]" />}
          </span>
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-medium text-[var(--lifework-ink)]">{plan.name}</span>
              {plan.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-[var(--lifework-red-tint)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--lifework-red)]"
                >
                  {badge}
                </span>
              ))}
            </div>
            <span className="text-sm text-[var(--lifework-ink-soft)]">{plan.subtext}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
            <span className="text-xl font-semibold text-[var(--lifework-ink)]">{plan.price}</span>
            {plan.originalPrice && (
              <span className="text-sm text-[var(--lifework-ink-faint)] line-through">
                {plan.originalPrice}
              </span>
            )}
          </div>
          {plan.perUnit && (
            <span className="font-mono text-xs tabular-nums text-[var(--lifework-ink-soft)]">
              {plan.perUnit}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/**
 * Client-side purchase flow: owns the selected-plan state driving the plan
 * cards, CTA label, and the Welcome Kit callout that only applies to the
 * 12-week subscription.
 */
export function PlanPicker() {
  const [selectedId, setSelectedId] = useState<PlanId>("12-week");
  const isTwelveWeek = selectedId === "12-week";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={plan.id === selectedId}
            onSelect={() => setSelectedId(plan.id)}
          />
        ))}
      </div>

      <button
        type="button"
        className="w-full rounded-full bg-[var(--lifework-red)] py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--lifework-red-dark)]"
      >
        Start Your Lifework
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center text-xs text-[var(--lifework-ink-soft)]">
        {TRUST_ITEMS.map((item, index) => (
          <span key={item} className="inline-flex items-center gap-2">
            {index > 0 && (
              <span className="text-[var(--lifework-ink-faint)]" aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </div>

      {isTwelveWeek && (
        <div className="flex items-center gap-2.5 rounded-xl border border-[var(--lifework-line)] bg-[var(--lifework-surface)] px-4 py-3">
          <CheckIcon className="h-4 w-4 shrink-0 text-[var(--lifework-red)]" />
          <p className="text-sm text-[var(--lifework-ink)]">
            Free Welcome Kit with your first subscription — $28 value
          </p>
        </div>
      )}
    </div>
  );
}
