import { AppShell, PageHero } from "@/components/wwd/shell";
import { EventFilters } from "@/components/wwd/event-filters";
import { events } from "@/data/mock";

export function ThisWeekPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Boston · 7 days"
        title={<>This week, <span className="text-terracotta">night by night.</span></>}
        description="Filter by what matters: scene, level, cost, indoors or out. Every card shows what to know before you go."
      />

      <div className="mt-6">
        <EventFilters
          events={events}
          layout="by-day"
          chips={["tonight","weekend","bachata-heavy","beginner-friendly","free","no-alcohol","class-before-social"]}
        />
      </div>
    </AppShell>
  );
}