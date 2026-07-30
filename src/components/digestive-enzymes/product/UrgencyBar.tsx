"use client";

import { ClockIcon } from "../icons";
import { useMidnightCountdown } from "../useMidnightCountdown";

export function UrgencyBar() {
  const timer = useMidnightCountdown();

  return (
    <div
      role="status"
      className="mt-4 flex items-center justify-center gap-2 rounded-[10px] border border-[#cfcec7] bg-[#f7f6f2] px-3.5 py-2.5 text-[12.5px] text-[#3a3a33]"
    >
      <ClockIcon className="shrink-0 text-[#DC2626]" />
      <span>
        Today&rsquo;s pricing ends in{" "}
        <b aria-live="off" className="font-bold text-[#DC2626] tabular-nums tracking-[0.02em]">
          {timer ?? "—:—:—"}
        </b>
      </span>
    </div>
  );
}
