import { AppShell, PageHero } from "@/components/wwd/shell";
import { events, organizers } from "@/data/mock";
import { SourceLabel } from "@/components/wwd/source-label";

const submissions = [
  { title: "Saturday Bachata Pop-up", status: "Pending review", color: "bg-mango text-ink" },
  { title: "Bachata Room Wednesday", status: "Published", color: "bg-magenta text-paper" },
  { title: "Cambridge Roof Social", status: "Needs more info", color: "bg-paper text-ink ring-1 ring-ink/30" },
];

export function OrganizerDashboardPage() {
  const org = organizers[0];
  const orgEvents = events.filter((e) => e.organizerId === org.id);

  return (
    <AppShell>
      <PageHero
        eyebrow={`Signed in as ${org.name} · mock`}
        title={<>Organizer <span className="text-terracotta">dashboard</span></>}
        description="Read-only preview. Submissions, verification status, and weekly RSVPs at a glance."
      />

      <section className="px-5 mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Events live", value: orgEvents.length },
          { label: "RSVPs this week", value: orgEvents.reduce((s, e) => s + e.rsvps.count, 0) },
          { label: "Verification", value: "OK" },
        ].map((s) => (
          <div key={s.label} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-3">
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink/55">{s.label}</p>
            <p className="font-display italic text-2xl text-ink mt-1">{s.value}</p>
          </div>
        ))}
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Submissions</h2>
        <ul className="space-y-2">
          {submissions.map((s) => (
            <li key={s.title} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-ink">{s.title}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${s.color}`}>
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Your live events</h2>
        <ul className="space-y-3">
          {orgEvents.map((e) => (
            <li key={e.id} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display italic font-semibold text-lg text-ink">{e.title}</p>
                <p className="text-[11px] text-ink/60">{e.dayOfWeek}s · {e.startsAt}</p>
              </div>
              <p className="text-[12px] text-ink/65 mt-1">+{e.rsvps.count} RSVPs · {e.cost}</p>
              <div className="mt-2">
                <SourceLabel status={e.sourceStatus} lastVerified={e.lastVerified} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}