export type OrganizerFilterValue =
  | "All"
  | "Venue / recurring social hub"
  | "Weekly Bachata social organizer"
  | "Pop-up Bachata social organizer"
  | "Dance studio"
  | "Outdoor pop-up organizer"
  | "Community education"
  | "Queer-inclusive dance community"
  | "Needs validation";

const FILTERS: OrganizerFilterValue[] = [
  "All",
  "Venue / recurring social hub",
  "Weekly Bachata social organizer",
  "Pop-up Bachata social organizer",
  "Dance studio",
  "Outdoor pop-up organizer",
  "Community education",
  "Queer-inclusive dance community",
  "Needs validation",
];

interface OrganizerFiltersProps {
  active: OrganizerFilterValue;
  onChange: (value: OrganizerFilterValue) => void;
  count: number;
}

export function OrganizerFilters({ active, onChange, count }: OrganizerFiltersProps) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => onChange(f)}
              aria-pressed={isActive}
              className={`shrink-0 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors ${
                isActive
                  ? "bg-oxblood text-paper ring-1 ring-oxblood"
                  : "bg-paper text-ink ring-1 ring-ink/10 hover:ring-ink/25"
              }`}
            >
              {f}
              {isActive && f !== "All" && (
                <span aria-hidden className="text-paper/80">✕</span>
              )}
            </button>
          );
        })}
      </div>
      {active !== "All" && (
        <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-ink/55">
          {count} organizer{count === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
}