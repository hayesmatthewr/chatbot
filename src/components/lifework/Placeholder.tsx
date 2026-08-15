import { cn } from "@/lib/utils";

/**
 * Stand-in for real photography/video — no licensed Lifework assets are
 * available yet. Renders a quiet diagonal-hatched card so layout and
 * whitespace read correctly without implying a specific shot.
 */
export function Placeholder({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-[#EFEAE2]", className)}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#DCD4C4" strokeWidth="0.6" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#DCD4C4" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="7" fill="none" stroke="#B7AB8E" strokeWidth="0.8" />
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white">
          {label}
        </span>
      )}
    </div>
  );
}
