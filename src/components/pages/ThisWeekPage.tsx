import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { EventCard } from "@/components/wwd/event-card";
import { eventsByDay } from "@/data/mock";

export function ThisWeekPage() {
  const grouped = eventsByDay().filter((g) => g.events.length > 0);
  return (
    <AppShell>
      <PageHero
        eyebrow="Boston · 7 days"
        title={<>This week, <span className="text-terracotta">night by night.</span></>}
        description="Filter by what matters: scene, level, cost, indoors or out. Every card shows what to know before you go."
      />

      <nav className="px-5 mt-6 flex gap-2 overflow-x-auto no-scrollbar">
        {["All", "Tonight", "Bachata-heavy", "Beginner-friendly", "Free", "Dry event"].map((c, i) => (
          <button
            key={c}
            className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 ${
              i === 0 ? "bg-oxblood text-paper" : "bg-paper text-ink ring-1 ring-ink/10"
            }`}
          >
            {c}
          </button>
        ))}
      </nav>

      <div className="mt-8 space-y-10">
        {grouped.map((g) => (
          <section key={g.day}>
            <SectionHeader eyebrow={`${g.events.length} event${g.events.length > 1 ? "s" : ""}`} title={g.day} />
            <div className="px-5 grid gap-4">
              {g.events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}