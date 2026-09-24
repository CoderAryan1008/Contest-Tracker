import { useEffect, useState } from "react";

const LOOKAHEAD_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, for the ring fill on upcoming contests

/**
 * Ticks every second and derives a human label + ring progress for a contest.
 * @param {string|number|Date} startTime
 * @param {number} durationSeconds
 */
export function useCountdown(startTime, durationSeconds = 0) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const start = new Date(startTime).getTime();
  const end = start + durationSeconds * 1000;
  const isLive = now >= start && now < end;
  const isPast = now >= end;
  const remaining = Math.max(0, (isLive ? end : start) - now);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  let label;
  let shortLabel;
  if (isPast) {
    label = "Contest ended";
    shortLabel = "Ended";
  } else if (isLive) {
    label = `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m left`;
    shortLabel = "Live";
  } else if (days > 0) {
    label = `${days}d ${String(hours).padStart(2, "0")}h`;
    shortLabel = `${days}d`;
  } else if (hours > 0) {
    label = `${hours}h ${String(minutes).padStart(2, "0")}m`;
    shortLabel = `${hours}h`;
  } else {
    label = `${minutes}m ${String(seconds).padStart(2, "0")}s`;
    shortLabel = `${minutes}m`;
  }

  let progress;
  if (isPast) {
    progress = 1;
  } else if (isLive) {
    progress = 1 - remaining / Math.max(durationSeconds * 1000, 1);
  } else {
    progress = 1 - Math.min(remaining, LOOKAHEAD_WINDOW_MS) / LOOKAHEAD_WINDOW_MS;
  }

  return { isLive, isPast, days, hours, minutes, seconds, label, shortLabel, progress };
}