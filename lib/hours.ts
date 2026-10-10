import site from "@/content/site.json";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type Hours = Record<DayKey, { open: string; close: string }>;

const order: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const dayLabel: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export function getBusinessDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((entry) => entry.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function hasSeasonalHours(date = getBusinessDate()) {
  return date >= site.seasonalHours.validFrom && date <= site.seasonalHours.validThrough;
}

export function getHoursForDate(date = getBusinessDate()): Hours {
  return hasSeasonalHours(date)
    ? { ...site.hours, ...site.seasonalHours.hours }
    : site.hours;
}

export function getHoursNote(date = getBusinessDate()) {
  return hasSeasonalHours(date) ? site.seasonalHours.note : null;
}

export function formatTime(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const period = hh >= 12 ? "pm" : "am";
  const h12 = ((hh + 11) % 12) + 1;
  const minutes = mm === 0 ? "" : `:${String(mm).padStart(2, "0")}`;
  return `${h12}${minutes}${period}`;
}

export function formatHoursLines(hours: Hours) {
  const groups: { days: DayKey[]; open: string; close: string }[] = [];

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
        : `${dayLabel[g.days[0]]}-${dayLabel[g.days[g.days.length - 1]]}`;

    return `${days}: ${formatTime(g.open)}-${formatTime(g.close)}`;
  });
}
