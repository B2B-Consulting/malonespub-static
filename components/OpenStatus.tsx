"use client";

import { useEffect, useState } from "react";
import { formatMalonesTime, getOpenStatus, type OpenStatusResult } from "@/lib/openStatus";

function getWorldCupLabel(status: OpenStatusResult) {
  if (status.source !== "worldCupEarly") return null;

  if (status.state === "open") return "Open now for World Cup matches";
  if (status.state === "open-soon") return "Opening soon for World Cup matches";
  if (status.openTime) {
    return `Open today at ${formatMalonesTime(status.openTime)} for World Cup matches`;
  }

  return null;
}

export default function OpenStatus() {
  const [status, setStatus] = useState<OpenStatusResult>(() => getOpenStatus());
  const label = getWorldCupLabel(status);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getOpenStatus());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      {status.state === "open" ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-green-600/20 px-4 py-2 font-semibold text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {label ?? "Open Now"}
        </div>
      ) : status.state === "open-soon" ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-600/20 px-4 py-2 font-semibold text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          {label ?? "Open Soon"}
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 px-4 py-2 font-semibold text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          {label ?? "Closed"}
        </div>
      )}
    </div>
  );
}
