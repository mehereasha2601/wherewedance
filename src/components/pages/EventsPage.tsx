import { AppShell, PageHero } from "@/components/wwd/shell";
import { EventFilters } from "@/components/wwd/event-filters";
import { events, isPastOneOff } from "@/data/mock";

export function EventsPage() {
  // /events is the evergreen catalog. Hide past one-off events so stale
  // dates never linger; recurring weekly events stay (shown as recurrence).
  const catalog = events.filter((e) => !isPastOneOff(e));
  return (
    <AppShell>
      <PageHero
        eyebrow="All listings"
        title={<>Every <span className="text-terracotta">listed</span> social.</>}
        description="Every event has a source label and a last-verified date. If something feels off, you can flag it from the detail page."
      />
      <p className="px-5 mt-4 text-[12px] text-ink/65 leading-relaxed">
        Not every listing is Bachata-heavy. We include Bachata-heavy events and mixed events where Bachata is meaningfully included.
      </p>
      <div className="mt-6">
        <EventFilters
          events={catalog}
          layout="grid"
          chips={["bachata-heavy","beginner-friendly","free","no-alcohol","class-before-social"]}
        />
      </div>
    </AppShell>
  );
}