"use client";

import { useEffect, useState } from "react";

function secondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

function format(secs: number) {
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** Real, resetting countdown to local midnight - not a static/fake timer. */
export function useMidnightCountdown() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLabel(format(secondsUntilMidnight()));
    // Deferred via setTimeout so the initial value lands asynchronously,
    // keeping the server/client first-paint markup identical (avoids a
    // hydration mismatch, since this value is only meaningful client-side).
    const kickoff = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, []);

  return label;
}
