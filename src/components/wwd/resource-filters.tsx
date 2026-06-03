import { useState } from "react";
import type { ResourcePrivacy } from "@/data/mock";

export type FilterValue = "All" | ResourcePrivacy;

const FILTERS: FilterValue[] = [
  "All",
  "Public link",
  "DM to join",
  "Ask organizer",
  "Private group",
  "Needs validation",
];

const LABEL_MAP: Record<FilterValue, string> = {
  "All": "All",
  "Public link": "Public link",
  "DM to join": "DM to join",
  "Ask organizer": "Ask organizer",
  "Private group": "Private group",
  "Needs validation": "Needs validation",
};

interface ResourceFiltersProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  count: number;
}

export function ResourceFilters({ active, onChange, count }: ResourceFiltersProps) {
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
              {LABEL_MAP[f]}
              {isActive && f !== "All" && (
                <span aria-hidden className="text-paper/80">✕</span>
              )}
            </button>
          );
        })}
      </div>
      {active !== "All" && (
        <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-ink/55">
          {count} resource{count === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
}
