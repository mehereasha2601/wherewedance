import { AppShell } from "@/components/wwd/shell";
import { EventCard } from "@/components/wwd/event-card";
import { Link } from "@/components/wwd/ui-router";
import { eventById, organizerBySlug } from "@/data/mock";

export function OrganizerProfilePage({ slug }: { slug: string }) {
  const organizer = organizerBySlug(slug);
  if (!organizer) {
    return (
      <AppShell>
        <div className="px-5 py-20 text-center">
          <h1 className="font-display italic text-3xl text-ink">Organizer not found</h1>
          <Link to="/" className="inline-block mt-4 text-terracotta font-bold uppercase text-[11px] tracking-widest">
            ← Home
          </Link>
        </div>
      </AppShell>
    );
  }
  const recurring = organizer.recurringEventIds.map(eventById).filter(Boolean) as NonNullable<ReturnType<typeof eventById>>[];

  return (
    <AppShell>
      <section className="px-5 pt-4">
        <Link to="/" className="text-[11px] font-bold uppercase tracking-widest text-ink/60">
          ← Home
        </Link>
      </section>

      <section className="px-5 pt-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta">Organizer</p>
        <h1 className="font-display italic font-semibold text-4xl leading-tight text-ink mt-2 text-balance">
          {organizer.name}
        </h1>
        <p className="text-sm text-ink/75 mt-3 leading-relaxed">{organizer.bio}</p>
      </section>

      <section className="px-5 mt-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55 mb-2">
          What they stand for
        </p>
        <ul className="flex flex-wrap gap-2">
          {organizer.values.map((v) => (
            <li key={v} className="px-3 py-1.5 bg-mango/30 text-ink rounded-full text-[12px] font-medium">
              {v}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">
          Recurring nights
        </h2>
        <div className="grid gap-4">
          {recurring.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}