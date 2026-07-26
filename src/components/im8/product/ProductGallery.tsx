"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/im8/Placeholder";

const THUMBNAIL_COUNT = 6;

/**
 * Left column of the product hero: a large "main shot" placeholder with a
 * clickable thumbnail strip beneath it. Real product photography is
 * intentionally replaced with <Placeholder /> per clone scope.
 */
export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Placeholder className="aspect-square w-full rounded-lg" />
      <div className="flex gap-3 overflow-x-auto pb-1">
        {Array.from({ length: THUMBNAIL_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View product image ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={cn(
              "shrink-0 rounded transition-colors",
              activeIndex === index
                ? "ring-2 ring-offset-2 ring-[#50000B]"
                : "ring-1 ring-offset-2 ring-black/10 hover:ring-[#A40011]/50"
            )}
          >
            <Placeholder className="aspect-square w-16 rounded" />
          </button>
        ))}
      </div>
    </div>
  );
}
