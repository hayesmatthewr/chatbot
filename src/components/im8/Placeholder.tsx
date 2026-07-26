import { cn } from "@/lib/utils";

/**
 * Stand-in for real photography (per clone scope: placeholders instead of
 * real images). Renders a soft diagonal-hatched card so layout/whitespace
 * reads correctly without implying a specific photo.
 */
export function Placeholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#eae5da]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#cfc7b4" strokeWidth="0.6" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#cfc7b4" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="7" fill="none" stroke="#a89d84" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
