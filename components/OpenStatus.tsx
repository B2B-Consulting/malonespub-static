"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatusResult } from "@/lib/openStatus";

export default function OpenStatus() {
  const [status, setStatus] = useState<OpenStatusResult>(() => getOpenStatus());

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
          Open Now
        </div>
      ) : status.state === "open-soon" ? (
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
