type Hours = Record<string, { open: string; close: string }>;

const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const dayLabel: Record<(typeof order)[number], string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export function formatTime(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const period = hh >= 12 ? "pm" : "am";
  const h12 = ((hh + 11) % 12) + 1;
  const minutes = mm === 0 ? "" : `:${String(mm).padStart(2, "0")}`;
  return `${h12}${minutes}${period}`;
}

/**
 * Returns grouped, human-readable hour lines like:
 * - "Mon–Sat: 3pm–2am"
 * - "Sun: 6pm–2am"
 */
export function formatHoursLines(hours: Hours) {
  const groups: { days: (typeof order)[number][]; open: string; close: string }[] = [];

  for (const d of order) {
    const entry = hours[d];
    if (!entry) continue;

    const last = groups[groups.length - 1];
    if (last && last.open === entry.open && last.close === entry.close) {
      last.days.push(d);
    } else {
      groups.push({ days: [d], open: entry.open, close: entry.close });
    }
  }

  return groups.map((g) => {
    const days =
      g.days.length === 1
        ? dayLabel[g.days[0]]
        : `${dayLabel[g.days[0]]}–${dayLabel[g.days[g.days.length - 1]]}`;

    return `${days}: ${formatTime(g.open)}–${formatTime(g.close)}`;
  });
}
