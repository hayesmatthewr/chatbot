"use client";

import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "./icons";

const FORMULAS = ["Core Sleep", "Sleep + Calm", "Sleep + Restore"];
const CONTAINERS = ["Bottle", "Pouch"];

const PRESS = [
  { name: "People", quote: `"The most medically-\nbacked method I've tried."`, className: "italic font-serif text-2xl" },
  { name: "Yahoo!life", quote: `"The #1 Best Supplement\nTo Take While Traveling."`, className: "font-bold text-xl text-[#5f01d1]" },
  { name: "Forbes", quote: `"The sleep vitamin is unlike traditional medication but still works to improve overall sleep and health."`, className: "font-serif font-bold text-2xl" },
];

export function BuyBox() {
  const [formula, setFormula] = useState(FORMULAS[0]);
  const [container, setContainer] = useState(CONTAINERS[0]);
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">("subscribe");
  const [frequency, setFrequency] = useState("Every 30 Days");
  const [qty, setQty] = useState(1);

  const price = 39.99;
  const subscribePrice = 35.99;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-[#221D35]/60 mb-1">Core Sleep</p>
        <h1 className="text-4xl font-semibold">Core Sleep</h1>
      </div>
      <p className="text-[#221D35]/80 leading-relaxed">
        It&apos;s our core formulation of Venetron (Rafuma Extract), SenSoril, GABA, and Valerian root, crafted to help
        you sleep well and wake up refreshed, without the sleep hangover.
      </p>

      <div className="flex flex-wrap gap-6 text-sm font-medium">
        {["Safe", "Effective", "Tailored"].map((label) => (
          <span key={label} className="flex items-center gap-1.5">
            <CheckIcon className="w-4 h-4" />
            {label}
          </span>
        ))}
      </div>

      {/* Formula */}
      <fieldset className="border border-black/15 rounded-lg px-4 pb-4 pt-0">
        <legend className="px-1 text-sm font-medium">Formula: {formula}</legend>
        <div className="flex flex-wrap gap-2">
          {FORMULAS.map((f) => (
            <button
              key={f}
              onClick={() => setFormula(f)}
              className={`px-4 py-2 rounded-md border-2 text-[15px] font-semibold transition-colors ${
                formula === f ? "bg-[#221D35] text-white border-[#221D35]" : "border-[#221D35] hover:border-[#221D35]/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Container */}
      <fieldset className="border border-black/15 rounded-lg px-4 pb-4 pt-0">
        <legend className="px-1 text-sm font-medium">Container: {container}</legend>
        <div className="flex flex-wrap gap-2">
          {CONTAINERS.map((c) => (
            <button
              key={c}
              onClick={() => setContainer(c)}
              className={`px-4 py-2 rounded-md border-2 text-[15px] font-semibold transition-colors ${
                container === c ? "bg-[#221D35] text-white border-[#221D35]" : "border-[#221D35] hover:border-[#221D35]/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Purchase type */}
      <div className="flex flex-col gap-3">
        <label
          className={`rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            purchaseType === "subscribe" ? "border-[#221D35]" : "border-black/15"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === "subscribe"}
              onChange={() => setPurchaseType("subscribe")}
              className="mt-1.5 accent-[#221D35]"
            />
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-lg">Subscribe &amp; Save 10%</span>
                <span className="flex items-baseline gap-2">
                  <span className="line-through text-[#221D35]/40 text-sm">${price.toFixed(2)}</span>
                  <span className="font-semibold">${subscribePrice.toFixed(2)}</span>
                </span>
              </div>
              <ul className="mt-2 text-sm text-[#221D35]/70 space-y-1">
                <li>• Free shipping</li>
                <li>• Risk-free first 30 days</li>
                <li>• Easy skip, gift, or cancel anytime</li>
              </ul>
              {purchaseType === "subscribe" && (
                <label className="mt-3 flex items-center gap-2 text-sm">
                  Deliver Every
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="border border-black/15 rounded px-2 py-1"
                  >
                    <option>Every 30 Days</option>
                    <option>Every 60 Days</option>
                  </select>
                </label>
              )}
            </div>
          </div>
        </label>

        <label
          className={`rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            purchaseType === "onetime" ? "border-[#221D35]" : "border-black/15"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === "onetime"}
              onChange={() => setPurchaseType("onetime")}
              className="accent-[#221D35]"
            />
            <div className="flex-1 flex items-baseline justify-between">
              <span className="font-semibold text-lg">One Time Purchase</span>
              <span className="font-semibold">${price.toFixed(2)}</span>
            </div>
          </div>
        </label>
      </div>

      {/* Quantity + Add to bag */}
      <div className="flex items-center border border-black/15 rounded-lg overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-5 py-3 hover:bg-black/5"
          aria-label="Decrease quantity"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className="flex-1 text-center font-medium">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} className="px-5 py-3 hover:bg-black/5" aria-label="Increase quantity">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      <button className="w-full bg-[#221D35] text-white rounded-lg py-4 font-semibold text-lg hover:bg-[#221D35]/90 transition-colors">
        Add to Bag
      </button>

      <div className="flex items-center justify-between text-sm text-[#221D35]/70">
        <span>✔️ Free Shipping on orders of $50+</span>
        <span>✔️ Money back Guarantee</span>
      </div>

      {/* Press */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 items-center">
        {PRESS.map((p) => (
          <div key={p.name} className="flex flex-col gap-2">
            <span className={p.className}>{p.name}</span>
            <p className="text-xs text-[#221D35]/70 whitespace-pre-line">{p.quote}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#221D35]/60">Sleep Foundation 2021 Best Overall Melatonin Supplement</p>
    </div>
  );
}
