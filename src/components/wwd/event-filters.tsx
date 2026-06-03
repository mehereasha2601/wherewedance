import { useMemo, useState } from "react";
import type { Event } from "@/data/mock";
import { isEventTonight } from "@/data/mock";
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

const PREDICATES: Record<FilterKey, (e: Event) => boolean> = {
  tonight: (e) => isEventTonight(e),
  weekend: (e) => e.dayOfWeek === "Friday" || e.dayOfWeek === "Saturday" || e.dayOfWeek === "Sunday",
  "bachata-heavy": (e) => e.bachataRelevance === "Bachata-heavy",
  "beginner-friendly": (e) => e.beginnerLabel === "Beginner-friendly",
  free: (e) => e.cost.toLowerCase().includes("free"),
  "no-alcohol": (e) => e.alcoholPolicy === "Dry event",
  "class-before-social": (e) => e.classBeforeSocial.offered === true,
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export function EventFilters({
  events,
  chips,
  layout,
}: {
  events: Event[];
  chips: FilterKey[];
  layout: "grid" | "by-day";
}) {
  const [active, setActive] = useState<Set<FilterKey>>(new Set());

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
      <div className="px-5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {chips.map((k) => {
          const on = active.has(k);
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggle(k)}
              aria-pressed={on}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-colors ${
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
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {DAYS.map((d) => {
              const items = filtered.filter((e) => !e.popUp && e.dayOfWeek === d);
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
              const popUps = filtered.filter((e) => e.popUp);
              if (popUps.length === 0) return null;
              return (
                <section>
                  <div className="px-5 mb-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mb-1">
                      {popUps.length} pop-up{popUps.length === 1 ? "" : "s"}
                    </p>
                    <h2 className="font-display italic font-semibold text-3xl leading-none text-ink">
                      Pop-up · Check Instagram
                    </h2>
                  </div>
                  <div className="px-5 grid gap-4">
                    {popUps.map((e) => (
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