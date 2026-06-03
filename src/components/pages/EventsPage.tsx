import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { EventCard } from "@/components/wwd/event-card";
import { events } from "@/data/mock";

export function EventsPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="All listings"
        title={<>Every <span className="text-terracotta">listed</span> social.</>}
        description="Every event has a source label and a last-verified date. If something feels off, you can flag it from the detail page."
      />

      <nav className="px-5 mt-6 flex gap-2 overflow-x-auto no-scrollbar">
        {["All scenes", "Bachata-heavy", "Bachata-included", "Beginner-friendly", "Intermediate+", "Free", "Dry event"].map(
          (c, i) => (
            <button
              key={c}
              className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 ${
                i === 0 ? "bg-oxblood text-paper" : "bg-paper text-ink ring-1 ring-ink/10"
              }`}
            >
              {c}
            </button>
          ),
        )}
      </nav>

      <SectionHeader eyebrow={`${events.length} events`} title="Boston" />
      <div className="px-5 grid gap-4">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </AppShell>
  );
}