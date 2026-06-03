/**
 * Day-of-week / Bachata-relevance / pop-up filter controls used on the Events and This Week pages. Pure presentational — filter state is owned by the parent page.
 */
import { useMemo, useState } from "react";
import type { Event } from "@/data/mock";
import { isEventTonight, catalogDateLabel } from "@/data/mock";
import {
  getCurrentWeekLabels,
  getOccurrenceInWeek,
  getStartOfWeekMonday,
  getTodayInBoston,
  parseIsoDate,
  type DayName,
} from "@/lib/event-dates";
import { EventCard } from "./event-card";

export type FilterKey =
  | "tonight"
  | "weekend"
  | "bachata-heavy"
  | "beginner-friendly"
  | "free"
  | "no-alcohol"
  | "class-before-social";

const LABELS: Record<FilterKey, string> = {
  tonight: "Tonight",
  weekend: "This weekend",
  "bachata-heavy": "Bachata-heavy",
  "beginner-friendly": "Beginner-friendly",
  free: "Outdoor / free",
  "no-alcohol": "No alcohol",
  "class-before-social": "Class before social",
};

// Weekend means Fri/Sat/Sun inside the current Mon–Sun week, but only from
// today forward — so on Sunday we don't show last Friday's events.
function isUpcomingWeekendEvent(e: Event, today: Date = getTodayInBoston()): boolean {
  const weekStart = getStartOfWeekMonday(today);
  let when: Date | null = null;
  if (e.fixedDate) when = parseIsoDate(e.fixedDate);
  else if (!e.popUp) when = getOccurrenceInWeek(e.dayOfWeek as DayName, weekStart);
  if (!when) return false;
  const dow = when.getDay(); // 0=Sun..6=Sat
  const isFriSatSun = dow === 5 || dow === 6 || dow === 0;
  if (!isFriSatSun) return false;
  const t = new Date(when);
  t.setHours(12, 0, 0, 0);
  const today12 = new Date(today);
  today12.setHours(12, 0, 0, 0);
  return t.getTime() >= today12.getTime();
}

const PREDICATES: Record<FilterKey, (e: Event) => boolean> = {
  tonight: (e) => isEventTonight(e),
  weekend: (e) => isUpcomingWeekendEvent(e),
  "bachata-heavy": (e) => e.bachataRelevance === "Bachata-heavy",
  "beginner-friendly": (e) => e.beginnerLabel === "Beginner-friendly",
  free: (e) => e.cost.toLowerCase().includes("free"),
  "no-alcohol": (e) =>
    /\b(dry|no alcohol)\b/i.test(e.alcoholPolicy ?? ""),
  "class-before-social": (e) => e.classBeforeSocial.offered === true,
};


export function EventFilters({
  events,
  chips,
  layout,
  allowTbaGroup = true,
  initialActive,
}: {
  events: Event[];
  chips: FilterKey[];
  layout: "grid" | "by-day";
  allowTbaGroup?: boolean;
  initialActive?: FilterKey[];
}) {
  const [active, setActive] = useState<Set<FilterKey>>(
    () => new Set(initialActive ?? []),
  );
  // Ordered date labels for the current Monday–Sunday week, derived from the
  // real Boston date at render time. Events whose dateLabel isn't in this
  // list fall into the "Pop-ups / date TBA" group.
  const WEEK_DATE_ORDER = useMemo(
    () => getCurrentWeekLabels(getTodayInBoston()),
    [],
  );

  const toggle = (k: FilterKey) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };
  const clear = () => setActive(new Set());

  const filtered = useMemo(() => {
    if (active.size === 0) return events;
    return events.filter((e) => [...active].every((k) => PREDICATES[k](e)));
  }, [events, active]);

  const hasActive = active.size > 0;

  return (
    <div>
      <div className="w-full max-w-full overflow-x-auto overscroll-x-contain no-scrollbar pb-2 px-5 scroll-px-5 [-webkit-overflow-scrolling:touch]">
        <div className="flex flex-nowrap items-center gap-2">
        {chips.map((k) => {
          const on = active.has(k);
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggle(k)}
              aria-pressed={on}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-colors ${
                on
                  ? "bg-oxblood text-paper ring-1 ring-oxblood"
                  : "bg-paper text-ink ring-1 ring-ink/10"
              }`}
            >
              {LABELS[k]}
              {on && <span aria-hidden className="text-paper/80">✕</span>}
            </button>
          );
        })}
        </div>
      </div>

      {hasActive && (
        <div className="px-5 mt-3 flex items-center justify-between text-[11px]">
          <span className="uppercase tracking-widest font-bold text-ink/55">
            {filtered.length} match{filtered.length === 1 ? "" : "es"}
          </span>
          <button
            type="button"
            onClick={clear}
            className="font-bold uppercase tracking-widest text-terracotta border-b border-terracotta/40 pb-0.5"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="px-5">
            <div className="bg-paper ring-1 ring-ink/10 rounded-2xl p-6 text-center">
              <p className="font-display italic text-xl text-ink">
                No events match these filters. Try fewer.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-3 inline-block text-[11px] font-bold uppercase tracking-widest text-terracotta border-b border-terracotta/40 pb-0.5"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : layout === "grid" ? (
          <div className="px-5 grid gap-4">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} dateLabel={catalogDateLabel(e)} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {WEEK_DATE_ORDER.map((d) => {
              const items = filtered.filter((e) => e.dateLabel === d);
              if (items.length === 0) return null;
              return (
                <section key={d}>
                  <div className="px-5 mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mb-1">
                        {items.length} event{items.length === 1 ? "" : "s"}
                      </p>
                      <h2 className="font-display italic font-semibold text-3xl leading-none text-ink">
                        {d}
                      </h2>
                    </div>
                  </div>
                  <div className="px-5 grid gap-4">
                    {items.map((e) => (
                      <EventCard key={e.id} event={e} />
                    ))}
                  </div>
                </section>
              );
            })}
            {(() => {
              if (!allowTbaGroup) return null;
              const known = new Set<string>(WEEK_DATE_ORDER);
              const tba = filtered.filter((e) => !known.has(e.dateLabel));
              if (tba.length === 0) return null;
              return (
                <section>
                  <div className="px-5 mb-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mb-1">
                      {tba.length} event{tba.length === 1 ? "" : "s"}
                    </p>
                    <h2 className="font-display italic font-semibold text-3xl leading-none text-ink">
                      Pop-ups / date TBA
                    </h2>
                  </div>
                  <div className="px-5 grid gap-4">
                    {tba.map((e) => (
                      <EventCard key={e.id} event={e} />
                    ))}
                  </div>
                </section>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}