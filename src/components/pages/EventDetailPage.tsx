import { AppShell } from "@/components/wwd/shell";
import { BeginnerTag, SceneTag } from "@/components/wwd/tags";
import { GoodToKnow } from "@/components/wwd/good-to-know";
import { SourceLabel } from "@/components/wwd/source-label";
import { Link } from "@/components/wwd/ui-router";
import { eventBySlug, organizerById, mapUrlForEvent, isEventTonight } from "@/data/mock";
import { OfficialLinks } from "@/components/wwd/official-links";

export function EventDetailPage({ slug }: { slug: string }) {
  const event = eventBySlug(slug);
  if (!event) {
    return (
      <AppShell>
        <div className="px-5 py-20 text-center">
          <h1 className="font-display italic text-3xl text-ink">Event not found</h1>
          <p className="text-sm text-ink/60 mt-2">It may have been removed or renamed.</p>
          <Link to="/this-week" className="inline-block mt-4 text-terracotta font-bold uppercase text-[11px] tracking-widest">
            ← Back to this week
          </Link>
        </div>
      </AppShell>
    );
  }
  const organizer = organizerById(event.organizerId);
  const mapUrl = mapUrlForEvent(event);
  const hasOfficialLinks = Boolean(
    event.officialUrl || event.websiteUrl || event.instagramUrl ||
    event.facebookUrl || event.ticketUrl || mapUrl
  );

  return (
    <AppShell>
      <section className="px-5 pt-4">
        <Link to="/this-week" className="text-[11px] font-bold uppercase tracking-widest text-ink/60">
          ← This week
        </Link>
      </section>

      <section className="px-5 pt-4">
        <div
          className={`relative aspect-[5/4] rounded-3xl bg-gradient-to-br ${event.cover} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <SceneTag value={event.bachataRelevance} />
            <BeginnerTag value={event.beginnerLabel} />
          </div>
          {isEventTonight(event) && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-paper/95 text-ink px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span className="size-1.5 rounded-full bg-magenta animate-pulse" />
              Tonight
            </div>
          )}
        </div>
      </section>

      <section className="px-5 mt-6">
        <h1 className="font-display italic font-semibold text-4xl leading-tight text-ink text-balance">
          {event.title}
        </h1>
        <p className="text-sm text-ink/65 mt-3 leading-relaxed">
          {event.popUp
            ? `${event.scheduleNote ?? "Pop-up · Check Instagram"} · ${event.startsAt}`
            : `${event.dayOfWeek}s · ${event.startsAt} – ${event.endsAt}`}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            {event.rsvps.initials.map((i, idx) => (
              <div
                key={i}
                className={`size-9 rounded-full border-2 border-paper grid place-items-center text-[11px] font-bold ${
                  ["bg-terracotta text-paper", "bg-mango text-ink", "bg-magenta text-paper"][idx % 3]
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-sm text-ink/65 font-medium">+{event.rsvps.count} going · {event.cost}</span>
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="font-display italic font-semibold text-xl text-ink mb-3">Location</h2>
        <div className="space-y-1">
          <p className="text-[15px] font-semibold text-ink/80 leading-relaxed">{event.venue}</p>
          <p className="text-[13px] text-ink/60 leading-relaxed">{event.address}</p>
        </div>
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${event.venue} in maps`}
            className="inline-block mt-3 text-[11px] font-bold uppercase tracking-widest text-terracotta"
          >
            Open maps →
          </a>
        )}
      </section>

      {hasOfficialLinks && (
        <section className="px-5 mt-6">
          <h2 className="font-display italic font-semibold text-xl text-ink mb-3">Official links</h2>
          <OfficialLinks
            subject={event.title}
            variant="labeled"
            websiteUrl={event.websiteUrl ?? event.officialUrl}
            instagramUrl={event.instagramUrl}
            facebookUrl={event.facebookUrl}
            ticketUrl={event.ticketUrl}
            mapUrl={mapUrl}
          />
          <p className="mt-3 text-[11px] text-ink/55 leading-relaxed">
            Links open in a new tab. We're a local guide - always check the organizer's official post before going.
          </p>
        </section>
      )}

      <section className="px-5 mt-6">
        <h2 className="font-display italic font-semibold text-xl text-ink mb-2">Schedule</h2>
        <ol className="space-y-2">
          {event.classBeforeSocial.offered && (
            <li className="flex gap-3 items-start">
              <span className="text-[10px] uppercase tracking-widest font-bold text-terracotta w-14 shrink-0 pt-1">
                {event.classBeforeSocial.startsAt && /^\d/.test(event.classBeforeSocial.startsAt)
                  ? event.classBeforeSocial.startsAt
                  : "Class"}
              </span>
              <span className="text-sm text-ink">
                {event.classBeforeSocial.level}
              </span>
            </li>
          )}
          <li className="flex gap-3 items-start">
            <span className="text-[10px] uppercase tracking-widest font-bold text-terracotta w-14 shrink-0 pt-1">
              {event.startsAt}
            </span>
            <span className="text-sm text-ink">Social dancing begins</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-[10px] uppercase tracking-widest font-bold text-terracotta w-14 shrink-0 pt-1">
              {event.endsAt}
            </span>
            <span className="text-sm text-ink">Last dance</span>
          </li>
        </ol>
      </section>

      <section className="px-5 mt-6">
        <GoodToKnow event={event} />
      </section>

      {organizer && (
        <section className="px-5 mt-6">
          <Link
            to="/organizers/$id"
            params={{ id: organizer.slug }}
            className="block bg-paper ring-1 ring-ink/10 rounded-2xl p-4"
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55">Organizer</p>
            <p className="font-display italic font-semibold text-xl text-ink leading-tight mt-1">
              {organizer.name}
            </p>
            <p className="text-[13px] text-ink/70 mt-1 line-clamp-2">{organizer.bio}</p>
          </Link>
        </section>
      )}

      <section className="px-5 mt-6">
        <SourceLabel status={event.sourceStatus} lastVerified={event.lastVerified} />
        <div className="mt-3 bg-paper ring-1 ring-ink/10 rounded-2xl p-3">
          <p className="text-[12px] text-ink/75 leading-snug">
            <span className="font-bold text-ink">Something inaccurate?</span>{" "}
            <Link
              to="/contact"
              className="text-terracotta font-bold uppercase tracking-widest text-[11px]"
            >
              Suggest a correction →
            </Link>
          </p>
        </div>
        <Link
          to="/safety"
          className="block mt-3 text-[11px] font-bold uppercase tracking-widest text-ink/60 underline decoration-ink/20 underline-offset-2"
        >
          Something feels off? Report privately →
        </Link>
      </section>
    </AppShell>
  );
}