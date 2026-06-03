// Single source of truth for event date computation.
// PILOT_BASE_DATE drives the mocked "current week" for /this-week and the
// next-occurrence resolver for recurring weekly events. Changing this one
// constant updates every computed date across the app.

export const PILOT_BASE_DATE = new Date("2026-06-03T12:00:00");

export type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

const DAYS: DayName[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Returns the next calendar date for the given weekday on or after fromDate.
// If fromDate is already that weekday, fromDate is returned.
export function getNextOccurrence(
  dayOfWeek: DayName,
  fromDate: Date = PILOT_BASE_DATE,
): Date {
  const target = DAYS.indexOf(dayOfWeek);
  const from = new Date(fromDate);
  from.setHours(12, 0, 0, 0);
  const diff = (target - from.getDay() + 7) % 7;
  const d = new Date(from);
  d.setDate(d.getDate() + diff);
  return d;
}

export function formatDateLabel(d: Date): string {
  return `${DAY_ABBR[d.getDay()]}, ${MONTH_ABBR[d.getMonth()]} ${d.getDate()}`;
}

export function parseIsoDate(iso: string): Date {
  // Anchor at noon to avoid TZ drift when formatting.
  return new Date(`${iso}T12:00:00`);
}

// 7 consecutive dates starting at base (inclusive).
export function getPilotWeekDates(base: Date = PILOT_BASE_DATE): Date[] {
  const out: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + i);
    out.push(d);
  }
  return out;
}

export function getPilotWeekLabels(base: Date = PILOT_BASE_DATE): string[] {
  return getPilotWeekDates(base).map(formatDateLabel);
}