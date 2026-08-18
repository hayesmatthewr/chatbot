import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label: string;
  className?: string;
  /** Neutral flat fill, for product-photography slots (vs. the default hatch used for diagrams/charts). */
  photo?: boolean;
}

export function Placeholder({ label, className, photo }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-sm border border-border",
        photo ? "bg-muted" : "bg-card",
        className
      )}
      style={
        photo
          ? undefined
          : {
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 9px, color-mix(in oklab, var(--border) 80%, transparent) 9px, color-mix(in oklab, var(--border) 80%, transparent) 10px)",
            }
      }
    >
      <span className="rounded-sm border border-border bg-card px-3 py-1 font-[family-name:var(--font-lifework-red-mono)] text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}
