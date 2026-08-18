import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label: string;
  className?: string;
  aspect?: string;
}

export function Placeholder({ label, className, aspect }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,color-mix(in_oklab,var(--border)_60%,transparent)_10px,color-mix(in_oklab,var(--border)_60%,transparent)_11px)]",
        aspect,
        className
      )}
    >
      <span className="rounded bg-background/90 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}
