import { describe, expect, it } from "vitest";
import { formatHoursLines, getBusinessDate, getHoursForDate, getHoursNote } from "@/lib/hours";
import { getOpenStatus } from "@/lib/openStatus";

describe("2026 seasonal weekend hours", () => {
  it("shows separate Saturday and Sunday hours only in the seasonal period", () => {
    expect(formatHoursLines(getHoursForDate("2026-10-10"))).toEqual([
      "Mon-Fri: 3pm-2am", "Sat: 11am-2am", "Sun: 12pm-2am",
    ]);
    expect(getHoursForDate("2026-12-31").sat.open).toBe("11:00");
    for (const date of ["2026-10-09", "2027-01-01"]) {
      expect(getHoursForDate(date).sat.open).toBe("14:00");
      expect(getHoursForDate(date).sun.open).toBe("14:00");
      expect(getHoursNote(date)).toBeNull();
    }
  });

  it("uses Fort Worth's date across the year boundary", () => {
    expect(getBusinessDate(new Date("2027-01-01T05:59:00Z"))).toBe("2026-12-31");
    expect(getBusinessDate(new Date("2027-01-01T06:00:00Z"))).toBe("2027-01-01");
  });

  it.each([
    ["2026-10-10T10:59:00-05:00", "open-soon", "2026-10-10T11:00:00-05:00"],
    ["2026-10-10T11:00:00-05:00", "open", "2026-10-10T11:00:00-05:00"],
    ["2026-10-11T11:59:00-05:00", "open-soon", "2026-10-11T12:00:00-05:00"],
    ["2026-10-11T12:00:00-05:00", "open", "2026-10-11T12:00:00-05:00"],
    ["2026-12-26T11:00:00-06:00", "open", "2026-12-26T11:00:00-06:00"],
    ["2026-12-27T01:30:00-06:00", "open", "2026-12-26T11:00:00-06:00"],
    ["2026-12-27T12:00:00-06:00", "open", "2026-12-27T12:00:00-06:00"],
    ["2027-01-02T11:00:00-06:00", "closed", "2027-01-02T14:00:00-06:00"],
  ])("reports the right status at %s", (now, state, opens) => {
    const status = getOpenStatus(new Date(now));
    expect(status.state).toBe(state);
    expect(status.openTime).toEqual(new Date(opens));
  });
});
