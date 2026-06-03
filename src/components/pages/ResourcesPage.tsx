import { useState, useMemo } from "react";
import { AppShell, PageHero } from "@/components/wwd/shell";
import { ResourceCard } from "@/components/wwd/resource-card";
import {
  ResourceFilters,
  ResourceCategoryFilters,
} from "@/components/wwd/resource-filters";
import type {
  FilterValue,
  CategoryFilterValue,
} from "@/components/wwd/resource-filters";
import { resources } from "@/data/mock";

export function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilterValue>("All");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const privacyMatch =
        activeFilter === "All" || r.privacyStatus === activeFilter;
      const categoryMatch =
        activeCategory === "All" ||
        (activeCategory === "Needs validation"
          ? r.privacyStatus === "Needs validation" ||
            r.sourceStatus === "Needs validation"
          : r.category === activeCategory);
      return privacyMatch && categoryMatch;
    });
  }, [activeFilter, activeCategory]);

  return (
    <AppShell>
      <PageHero
        eyebrow="Resource directory"
        title={<>Beyond the <span className="text-terracotta">dance floor.</span></>}
        description="Community docs, comps, playlists, and groups. Each has a clear privacy label and a last-verified date."
      />

      <section className="px-5 mt-6 bg-paper ring-1 ring-ink/10 rounded-2xl p-4 text-[12px] text-ink/70">
        <p className="font-bold text-ink mb-1">What the labels mean</p>
        <ul className="space-y-1">
          <li>· <span className="font-semibold text-ink">Public link</span> - open to anyone.</li>
          <li>· <span className="font-semibold text-ink">DM to join</span> - message the listed contact.</li>
          <li>· <span className="font-semibold text-ink">Ask organizer</span> - intro through a known organizer first.</li>
          <li>· <span className="font-semibold text-ink">Private group</span> - invite-only, listed for awareness.</li>
          <li>· <span className="font-semibold text-ink">Needs validation</span> - heard of it, haven't confirmed.</li>
        </ul>
      </section>

      <div className="mt-6 space-y-4">
        <ResourceCategoryFilters
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <ResourceFilters
          active={activeFilter}
          onChange={setActiveFilter}
          count={filtered.length}
        />
      </div>

      <section className="px-5 mt-5 grid gap-3">
        {filtered.length === 0 ? (
          <div className="bg-paper ring-1 ring-ink/10 rounded-2xl p-6 text-center">
            <p className="font-display italic text-xl text-ink">
              No resources match these filters yet.
            </p>
          </div>
        ) : (
          filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))
        )}
      </section>

      <section className="px-5 mt-8 mb-4">
        <div className="bg-paper ring-1 ring-ink/10 rounded-2xl p-5 text-center">
          <p className="font-display italic text-xl text-ink leading-tight">
            Know a useful group, playlist, guide, or organizer?
          </p>
          <p className="mt-1.5 text-[13px] text-ink/70">
            Suggest a resource for WhereWeDance.
          </p>
          <button
            type="button"
            onClick={() =>
              alert(
                "Prototype only - suggestions do not submit yet.",
              )
            }
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-oxblood text-paper text-[11px] font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-transform"
          >
            Suggest resource
          </button>
          <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-ink/45">
            Prototype only - suggestions do not submit yet.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
