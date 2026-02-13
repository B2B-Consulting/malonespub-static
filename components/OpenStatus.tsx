"use client";

import { useEffect, useState } from "react";
import site from "@/content/site.json";

function isOpenNow() {
  const now = new Date();
  const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayKey = dayMap[now.getDay()];
  const today = site.hours[todayKey as keyof typeof site.hours];

  if (!today) return false;

  const [openHour, openMin] = today.open.split(":").map(Number);
  const [closeHour, closeMin] = today.close.split(":").map(Number);

  const openTime = new Date();
  openTime.setHours(openHour, openMin, 0);

  const closeTime = new Date();
  closeTime.setHours(closeHour, closeMin, 0);

  // Handle bars closing after midnight
  if (closeHour < openHour) {
    if (now.getHours() < openHour) {
      openTime.setDate(openTime.getDate() - 1);
    } else {
      closeTime.setDate(closeTime.getDate() + 1);
    }
  }

  return now >= openTime && now <= closeTime;
}

export default function OpenStatus() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpenNow());
  }, []);

  return (
    <div className="mt-6">
      {open ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-green-600/20 px-4 py-2 text-green-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Open Now
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 px-4 py-2 text-red-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          Closed
        </div>
      )}
    </div>
  );
}
