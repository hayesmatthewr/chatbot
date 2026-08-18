import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label: string;
  className?: string;
}

export function Placeholder({ label, className }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-[24px] border border-border bg-muted",
        className
      )}
    >
      <span className="rounded-full border border-border bg-card px-3 py-1 text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}
