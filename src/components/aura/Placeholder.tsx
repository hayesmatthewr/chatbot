import type { ReactNode } from "react";

// Visible marker for copy the client still has to supply. Remove before launch.
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p data-placeholder className="mt-3 rounded-[16px] bg-aura-flag px-4 py-3 text-[15px] leading-[1.45] text-aura-ink">
      <span className="font-bold">Placeholder: </span>
      {children}
    </p>
  );
}
