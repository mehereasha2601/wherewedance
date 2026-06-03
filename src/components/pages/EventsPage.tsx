import { AppShell, PageHero } from "@/components/wwd/shell";
import { EventFilters } from "@/components/wwd/event-filters";
import { events } from "@/data/mock";

export function EventsPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="All listings"
        title={<>Every <span className="text-terracotta">listed</span> social.</>}
        description="Every event has a source label and a last-verified date. If something feels off, you can flag it from the detail page."
      />
      <div className="mt-6">
        <EventFilters
          events={events}
          layout="grid"
          chips={["bachata-heavy","beginner-friendly","free","no-alcohol","class-before-social","tonight","weekend"]}
        />
      </div>
    </AppShell>
  );
}