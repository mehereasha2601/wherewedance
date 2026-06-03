// Single source of truth for event date computation.
// The public site uses the REAL current date in Boston/Eastern time. There is
// no simulated pilot date. "This Week" means the current Monday–Sunday
// calendar week derived from today in America/New_York.

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

// Today's date anchored to noon local time, computed from America/New_York.
// We never use plain new Date() / toISOString() for the "today" comparison
// because UTC can shift the day during evening hours in Boston.
export function getTodayInBoston(): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return new Date(get("year"), get("month") - 1, get("day"), 12, 0, 0);
}

// Returns the next calendar date for the given weekday on or after fromDate.
// If fromDate is already that weekday, fromDate is returned.
export function getNextOccurrence(
  dayOfWeek: DayName,
  fromDate: Date = getTodayInBoston(),
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

// Monday-anchored start of week (00:00 local). Monday=1 ... Sunday=0/7.
export function getStartOfWeekMonday(date: Date = getTodayInBoston()): Date {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  const dow = d.getDay(); // 0=Sun..6=Sat
  const offset = dow === 0 ? -6 : 1 - dow; // back to Monday
  d.setDate(d.getDate() + offset);
  return d;
}

export function getEndOfWeekSunday(date: Date = getTodayInBoston()): Date {
  const start = getStartOfWeekMonday(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return end;
}

export function isDateInCurrentWeek(
  date: Date,
  today: Date = getTodayInBoston(),
): boolean {
  const start = getStartOfWeekMonday(today);
  const end = getEndOfWeekSunday(today);
  const t = new Date(date);
  t.setHours(12, 0, 0, 0);
  return t.getTime() >= start.getTime() && t.getTime() <= end.getTime();
}

// Given a Monday weekStart, return the date inside that Monday–Sunday week
// matching the requested weekday.
export function getOccurrenceInWeek(
  dayOfWeek: DayName,
  weekStart: Date,
): Date {
  const target = DAYS.indexOf(dayOfWeek); // 0=Sun..6=Sat
  const offset = target === 0 ? 6 : target - 1; // Mon=0..Sun=6
  const d = new Date(weekStart);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

// 7 dates Monday→Sunday for the week containing `today`.
export function getCurrentWeekDates(today: Date = getTodayInBoston()): Date[] {
  const start = getStartOfWeekMonday(today);
  const out: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    out.push(d);
  }
  return out;
}

export function getCurrentWeekLabels(today: Date = getTodayInBoston()): string[] {
  return getCurrentWeekDates(today).map(formatDateLabel);
}

export function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}