import { cn } from "@/lib/utils";

export function Stars({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-aura-red", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </span>
  );
}
