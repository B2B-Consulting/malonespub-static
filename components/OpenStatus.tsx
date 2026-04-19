"use client";

import { useEffect, useState } from "react";
import site from "@/content/site.json";

type OpenState = "open" | "open-soon" | "closed";

const OPEN_SOON_MINUTES = 90;

function getStatusNow(): OpenState {
  const now = new Date();
  const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  const todayKey = dayMap[now.getDay()];
  const today = site.hours[todayKey as keyof typeof site.hours];

  if (!today) return "closed";

  const [openHour, openMin] = today.open.split(":").map(Number);
  const [closeHour, closeMin] = today.close.split(":").map(Number);

  const openTime = new Date(now);
  openTime.setHours(openHour, openMin, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeHour, closeMin, 0, 0);

  // Handle bars closing after midnight
  if (closeHour < openHour) {
    if (now.getHours() < openHour) {
      openTime.setDate(openTime.getDate() - 1);
    } else {
      closeTime.setDate(closeTime.getDate() + 1);
    }
  }

  const openSoonTime = new Date(openTime.getTime() - OPEN_SOON_MINUTES * 60 * 1000);

  if (now >= openTime && now <= closeTime) {
    return "open";
  }

  if (now >= openSoonTime && now < openTime) {
    return "open-soon";
  }

  return "closed";
}

export default function OpenStatus() {
  const [status, setStatus] = useState<OpenState>("closed");

  useEffect(() => {
    setStatus(getStatusNow());
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