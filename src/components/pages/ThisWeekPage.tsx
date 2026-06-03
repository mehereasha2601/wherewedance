import { AppShell, PageHero } from "@/components/wwd/shell";
import { EventFilters } from "@/components/wwd/event-filters";
import { getThisWeekEvents } from "@/data/mock";
import { getRouteApi } from "@tanstack/react-router";
import { normalizeFilterParam } from "@/lib/filter-params";

export function ThisWeekPage() {
  const search = getRouteApi("/this-week").useSearch();
  const initial = normalizeFilterParam(search.filter);
  return (
    <AppShell>
      <PageHero
        eyebrow="Boston · 7 days"
        title={<>This week, <span className="text-terracotta">night by night.</span></>}
        description="Filter by what matters: scene, level, cost, indoors or out. Every card shows what to know before you go."
      />

      <div className="mt-6">
        <EventFilters
          events={getThisWeekEvents()}
          layout="by-day"
          allowTbaGroup={false}
          chips={["tonight","weekend","bachata-heavy","beginner-friendly","free","no-alcohol","class-before-social"]}
          initialActive={initial ? [initial] : undefined}
        />
      </div>
    </AppShell>
  );
}