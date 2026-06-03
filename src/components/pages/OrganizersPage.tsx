import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { Link } from "@/components/wwd/ui-router";
import { SourceLabel } from "@/components/wwd/source-label";
import { OfficialLinks } from "@/components/wwd/official-links";
import { events, organizers } from "@/data/mock";

export function OrganizersPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Public directory"
        title={<>Who's running <span className="text-terracotta">the floor.</span></>}
        description="Studios, collectives, and community groups behind Boston's bachata nights. Tap any card to see their profile."
      />

      <SectionHeader eyebrow={`${organizers.length} organizers`} title="Boston" />
      <ul className="px-5 grid gap-3">
        {organizers.map((o) => {
          const recurring = events.filter((e) => o.recurringEventIds.includes(e.id));
          const verifyFrom = recurring[0];
          return (
            <li
              key={o.id}
              className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display italic font-semibold text-2xl leading-tight text-ink">
                    <Link to="/organizers/$id" params={{ id: o.slug }}>
                      {o.name}
                    </Link>
                  </h3>
                  {o.type && (
                    <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mt-1">
                      {o.type}
                    </p>
                  )}
                </div>
              </div>

              {o.bestFor && (
                <p className="mt-3 text-[13px] text-ink/75 leading-snug">
                  <span className="font-bold text-ink">Best for: </span>
                  {o.bestFor}
                </p>
              )}

              {recurring.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55 mb-1.5">
                    Recurring events
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {recurring.map((e) => (
                      <li key={e.id}>
                        <Link
                          to="/events/$id"
                          params={{ id: e.slug }}
                          className="inline-block bg-ink/5 ring-1 ring-ink/10 rounded-md px-2 py-1 text-[11px] font-medium text-ink"
                        >
                          {e.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <OfficialLinks
                subject={o.name}
                websiteUrl={o.websiteUrl}
                instagramUrl={o.instagramUrl}
                facebookUrl={o.facebookUrl}
                email={o.email}
                className="mt-3"
              />

              <div className="mt-3 flex items-center justify-between">
                {verifyFrom ? (
                  <SourceLabel status={verifyFrom.sourceStatus} lastVerified={verifyFrom.lastVerified} />
                ) : (
                  <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">
                    No live events
                  </span>
                )}
                <Link
                  to="/organizers/$id"
                  params={{ id: o.slug }}
                  className="text-[11px] font-bold uppercase tracking-widest text-terracotta border-b border-terracotta/40 pb-0.5"
                >
                  Profile →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}