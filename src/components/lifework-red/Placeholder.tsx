import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label: string;
  className?: string;
  wash?: boolean;
}

export function Placeholder({ label, className, wash }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-sm border border-dashed border-border",
        className
      )}
      style={
        wash
          ? {
              background:
                "radial-gradient(60% 60% at 50% 42%, color-mix(in oklab, var(--muted) 85%, var(--accent) 15%) 0%, var(--muted) 70%)",
            }
          : {
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 9px, color-mix(in oklab, var(--border) 65%, transparent) 9px, color-mix(in oklab, var(--border) 65%, transparent) 10px)",
            }
      }
    >
      <span className="rounded-sm border border-border bg-card px-3 py-1 font-[family-name:var(--font-lifework-red-mono)] text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}
