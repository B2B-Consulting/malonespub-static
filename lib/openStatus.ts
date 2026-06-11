import { worldCupMatches } from "@/data/worldCupSchedule";
import site from "@/content/site.json";

export type OpenState = "open" | "open-soon" | "closed";
export type OpenTimeSource = "regular" | "worldCupEarly";

type DayKey = keyof typeof site.hours;

export type EffectiveOpenTime = {
  openTime: Date;
  source: OpenTimeSource;
};

export type OpenStatusResult = {
  state: OpenState;
  openTime: Date | null;
  closeTime: Date | null;
  source: OpenTimeSource;
};

const MALONES_TIME_ZONE = "America/Chicago";
const OPEN_SOON_MINUTES = 90;
const WORLD_CUP_START_DATE = "2026-06-11";
const WORLD_CUP_END_DATE = "2026-07-19";
const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

function getZonedDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MALONES_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  };
}

function getTimeZoneOffsetMs(date: Date) {
  const parts = getZonedDateParts(date);
  const zonedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return zonedAsUtc - date.getTime();
}

function toMalonesDateTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));
  const offset = getTimeZoneOffsetMs(utcGuess);

  return new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0) - offset);
}

function getMalonesDateString(date: Date) {
  const parts = getZonedDateParts(date);

  return [
    String(parts.year).padStart(4, "0"),
    String(parts.month).padStart(2, "0"),
    String(parts.day).padStart(2, "0"),
  ].join("-");
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0, 0));

  return next.toISOString().slice(0, 10);
}

function getDayKey(date: string): DayKey {
  const [year, month, day] = date.split("-").map(Number);
  const dayIndex = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0)).getUTCDay();

  return dayMap[dayIndex];
}

function getRegularWindowForDate(date: string) {
  const dayKey = getDayKey(date);
  const hours = site.hours[dayKey];
  if (!hours) return null;

  const openTime = toMalonesDateTime(date, hours.open);
  const closeDate = hours.close <= hours.open ? addDays(date, 1) : date;
  const closeTime = toMalonesDateTime(closeDate, hours.close);

  return { openTime, closeTime };
}

function isWorldCupDate(date: string) {
  return date >= WORLD_CUP_START_DATE && date <= WORLD_CUP_END_DATE;
}

function getFirstWorldCupMatchTime(date: string) {
  const matches = worldCupMatches
    .filter((match) => match.date === date)
    .map((match) => toMalonesDateTime(match.date, match.time))
    .sort((a, b) => a.getTime() - b.getTime());

  return matches[0] ?? null;
}

function getEffectiveOpenTimeForDate(date: string): EffectiveOpenTime | null {
  const regularWindow = getRegularWindowForDate(date);
  if (!regularWindow) return null;

  if (!isWorldCupDate(date)) {
    return { openTime: regularWindow.openTime, source: "regular" };
  }

  const firstMatchTime = getFirstWorldCupMatchTime(date);
  if (!firstMatchTime) {
    return { openTime: regularWindow.openTime, source: "regular" };
  }

  const worldCupOpenTime = new Date(firstMatchTime.getTime() - 60 * 60 * 1000);

  if (worldCupOpenTime < regularWindow.openTime) {
    return { openTime: worldCupOpenTime, source: "worldCupEarly" };
  }

  return { openTime: regularWindow.openTime, source: "regular" };
}

export function getEffectiveOpenTime(now: Date): EffectiveOpenTime | null {
  return getEffectiveOpenTimeForDate(getMalonesDateString(now));
}

function buildOpenCloseForDate(date: string) {
  const regularWindow = getRegularWindowForDate(date);
  if (!regularWindow) return null;

  const effectiveOpenTime = getEffectiveOpenTimeForDate(date);

  return {
    openTime: effectiveOpenTime?.openTime ?? regularWindow.openTime,
    closeTime: regularWindow.closeTime,
    source: effectiveOpenTime?.source ?? "regular",
  };
}

export function getOpenStatus(now = new Date()): OpenStatusResult {
  const todayDate = getMalonesDateString(now);
  const yesterdayDate = addDays(todayDate, -1);

  const todayWindow = buildOpenCloseForDate(todayDate);
  const yesterdayWindow = buildOpenCloseForDate(yesterdayDate);

  if (
    yesterdayWindow &&
    now >= yesterdayWindow.openTime &&
    now <= yesterdayWindow.closeTime
  ) {
    return {
      state: "open",
      openTime: yesterdayWindow.openTime,
      closeTime: yesterdayWindow.closeTime,
      source: yesterdayWindow.source,
    };
  }

  if (todayWindow && now >= todayWindow.openTime && now <= todayWindow.closeTime) {
    return {
      state: "open",
      openTime: todayWindow.openTime,
      closeTime: todayWindow.closeTime,
      source: todayWindow.source,
    };
  }

  if (todayWindow) {
    const openSoonTime = new Date(
      todayWindow.openTime.getTime() - OPEN_SOON_MINUTES * 60 * 1000
    );

    if (now >= openSoonTime && now < todayWindow.openTime) {
      return {
        state: "open-soon",
        openTime: todayWindow.openTime,
        closeTime: todayWindow.closeTime,
        source: todayWindow.source,
      };
    }
  }

  return {
    state: "closed",
    openTime: todayWindow?.openTime ?? null,
    closeTime: todayWindow?.closeTime ?? null,
    source: todayWindow?.source ?? "regular",
  };
}

export function formatMalonesTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: MALONES_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
