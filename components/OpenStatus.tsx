"use client";

import { useEffect, useState } from "react";
import site from "@/content/site.json";

type OpenState = "open" | "open-soon" | "closed";

const OPEN_SOON_MINUTES = 90;
const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

function buildOpenCloseForDate(baseDate: Date, dayKey: keyof typeof site.hours) {
  const hours = site.hours[dayKey];
  if (!hours) return null;

  const [openHour, openMin] = hours.open.split(":").map(Number);
  const [closeHour, closeMin] = hours.close.split(":").map(Number);

  const openTime = new Date(baseDate);
  openTime.setHours(openHour, openMin, 0, 0);

  const closeTime = new Date(baseDate);
  closeTime.setHours(closeHour, closeMin, 0, 0);

  // Handle closing after midnight
  if (
    closeHour < openHour ||
    (closeHour === openHour && closeMin < openMin)
  ) {
    closeTime.setDate(closeTime.getDate() + 1);
  }

  return { openTime, closeTime };
}

function getStatusNow(): OpenState {
  const now = new Date();

  const todayIndex = now.getDay();
  const yesterdayIndex = (todayIndex + 6) % 7;

  const todayKey = dayMap[todayIndex];
  const yesterdayKey = dayMap[yesterdayIndex];

  const todayDate = new Date(now);
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const todayWindow = buildOpenCloseForDate(todayDate, todayKey);
  const yesterdayWindow = buildOpenCloseForDate(yesterdayDate, yesterdayKey);

  // 1. Check if currently open from yesterday's late-night hours spilling past midnight
  if (
    yesterdayWindow &&
    now >= yesterdayWindow.openTime &&
    now <= yesterdayWindow.closeTime
  ) {
    return "open";
  }

  // 2. Check if currently open during today's hours
  if (todayWindow && now >= todayWindow.openTime && now <= todayWindow.closeTime) {
    return "open";
  }

  // 3. Check if today's opening is within the "open soon" window
  if (todayWindow) {
    const openSoonTime = new Date(
      todayWindow.openTime.getTime() - OPEN_SOON_MINUTES * 60 * 1000
    );

    if (now >= openSoonTime && now < todayWindow.openTime) {
      return "open-soon";
    }
  }

  return "closed";
}

export default function OpenStatus() {
  const [status, setStatus] = useState<OpenState>("closed");

  useEffect(() => {
    setStatus(getStatusNow());

    const interval = setInterval(() => {
      setStatus(getStatusNow());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      {status === "open" ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-green-600/20 px-4 py-2 font-semibold text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Open Now
        </div>
      ) : status === "open-soon" ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-600/20 px-4 py-2 font-semibold text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Open Soon
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 px-4 py-2 font-semibold text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          Closed
        </div>
      )}
    </div>
  );
}