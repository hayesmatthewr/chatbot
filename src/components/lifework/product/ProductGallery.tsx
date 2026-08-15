"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/lifework/Placeholder";

const GALLERY_IMAGES = [
  "Clean hero bottle shot",
  "Bottle + softgel close-up",
  "Lifestyle hand holding softgel",
  "Astaxanthin / microalgae ingredient visual",
  "85+ Human Studies clinical proof graphic",
];

/**
 * Left column of the product hero: a large main image placeholder with a
 * clickable thumbnail strip beneath it. Real product photography is
 * intentionally replaced with <Placeholder /> per clone scope.
 */
export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Placeholder
        className="aspect-square w-full rounded-2xl"
        label={GALLERY_IMAGES[activeIndex]}
      />
      <div className="flex gap-3 overflow-x-auto pb-1">
        {GALLERY_IMAGES.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${label}`}
            aria-pressed={activeIndex === index}
            className={cn(
              "shrink-0 overflow-hidden rounded-xl transition-shadow",
              activeIndex === index
                ? "ring-2 ring-offset-2 ring-[var(--lifework-red)]"
                : "ring-1 ring-offset-2 ring-[var(--lifework-line)] hover:ring-[var(--lifework-red)]/40"
            )}
          >
            <Placeholder className="aspect-square w-16 rounded-xl" />
          </button>
        ))}
      </div>
    </div>
  );
}
