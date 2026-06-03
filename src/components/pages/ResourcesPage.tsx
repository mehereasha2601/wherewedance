import { useState, useMemo } from "react";
import { AppShell, PageHero } from "@/components/wwd/shell";
import { ResourceCard } from "@/components/wwd/resource-card";
import { ResourceFilters } from "@/components/wwd/resource-filters";
import { resources } from "@/data/mock";
import type { FilterValue } from "@/components/wwd/resource-filters";

export function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return resources;
    return resources.filter((r) => r.privacyStatus === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
  };

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

      <div className="mt-6">
        <ResourceFilters
          active={activeFilter}
          onChange={handleFilterChange}
          count={filtered.length}
        />
      </div>

      <section className="px-5 mt-5 grid gap-3">
        {filtered.length === 0 ? (
          <div className="bg-paper ring-1 ring-ink/10 rounded-2xl p-6 text-center">
            <p className="font-display italic text-xl text-ink">
              No resources match this label yet.
            </p>
          </div>
        ) : (
          filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))
        )}
      </section>
    </AppShell>
  );
}
