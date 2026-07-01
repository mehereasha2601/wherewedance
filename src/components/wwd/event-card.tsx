/**
 * Full-width event card used in lists (This Week, Events, Organizer profile). Renders date, venue, tags, source label, and official-link row. For Partiful community outings the primary CTA reads 'RSVP here' instead of 'Website'.
 */
import type { Event } from "@/data/mock";
import { organizerById, mapUrlForEvent, logisticsSummary, isEventTonight } from "@/data/mock";
import { Link } from "./ui-router";
import { BeginnerTag, SceneTag, CrowdFavoriteTag, CommunityOutingTag, FreeTag } from "./tags";
import { GoodToKnow } from "./good-to-know";
import { SourceLabel } from "./source-label";
import { ExternalLink, MapPin } from "lucide-react";

export function EventCard({ event, full = false, dateLabel }: { event: Event; full?: boolean; dateLabel?: string }) {
  const organizer = organizerById(event.organizerId);
  const primaryHref = event.officialUrl ?? event.websiteUrl ?? event.instagramUrl ?? event.facebookUrl;
  const mapHref = mapUrlForEvent(event);
  const logistics = logisticsSummary(event);
  const tonight = isEventTonight(event);
  const displayDate = dateLabel ?? event.dateLabel;
  const isCrowdFavorite = event.secondaryTags?.includes("Crowd favorite");
  const isCommunityOuting = event.secondaryTags?.includes("Community outing") || event.bachataRelevance === null;
  return (
    <article className="relative bg-paper rounded-3xl ring-1 ring-ink/10 overflow-hidden flex flex-col transition hover:-translate-y-0.5 hover:ring-ink/25 focus-within:ring-2 focus-within:ring-terracotta">
      <Link
        to="/events/$id"
        params={{ id: event.slug }}
        aria-label={`Open ${event.title}`}
        className="absolute inset-0 z-0 focus:outline-none"
      />
      <div className={`relative aspect-[5/3] bg-gradient-to-br ${event.cover}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <SceneTag value={event.bachataRelevance} />
          {isCommunityOuting && <CommunityOutingTag />}
          <BeginnerTag value={event.beginnerLabel} />
          {isCrowdFavorite && <CrowdFavoriteTag />}
        </div>
        {tonight && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-paper/95 text-ink px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-magenta animate-pulse" />
            Tonight
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-paper gap-2">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-90 truncate">
              {displayDate}
              {event.scheduleLabel ? ` · ${event.scheduleLabel}` : ""}
            </p>
          </div>
          <span className="font-display italic font-bold text-lg leading-none bg-ink/40 backdrop-blur px-2 py-1 rounded-md">
            {event.cost}
          </span>
        </div>
      </div>

      <div className="relative z-10 p-4 flex flex-col gap-3 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <div>
          <h3 className="font-display italic font-semibold text-2xl leading-tight text-ink">
            {event.title}
          </h3>
          <div className="mt-2 space-y-0.5">
            <p className="text-[13px] font-semibold text-ink/80 leading-relaxed">
              {event.venue}
            </p>
            <p className="text-[12px] text-ink/60 leading-relaxed">
              {event.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {event.rsvps.initials.map((i, idx) => (
              <div
                key={i}
                className={`size-7 rounded-full border-2 border-paper grid place-items-center text-[9px] font-bold ${
                  ["bg-terracotta text-paper", "bg-mango text-ink", "bg-magenta text-paper"][idx % 3]
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-[12px] text-ink/60 font-medium">
            +{event.rsvps.count} going
          </span>
        </div>

        <GoodToKnow event={event} compact={!full} />

        {logistics && (
          <p className="text-[11px] text-ink/70 font-medium leading-snug">
            {logistics}
          </p>
        )}

        {(primaryHref || mapHref) && (
          <div className="flex flex-wrap items-center gap-2">
            {primaryHref && (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={primaryHref.includes("partiful.com") ? `RSVP to ${event.title}` : `Open ${event.title} official source`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-paper text-[11px] font-bold uppercase tracking-widest hover:-translate-y-0.5 transition"
              >
                <ExternalLink size={12} strokeWidth={2.5} />
                {primaryHref.includes("partiful.com") ? "RSVP here" : "Official source"}
              </a>
            )}
            {mapHref && (
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${event.venue} in maps`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper ring-1 ring-ink/15 text-ink text-[11px] font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:ring-terracotta/60 transition"
              >
                <MapPin size={12} strokeWidth={2.5} />
                Open maps
              </a>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <SourceLabel status={event.sourceStatus} lastVerified={event.lastVerified} />
          {organizer && (
            <Link
              to="/organizers/$id"
              params={{ id: organizer.slug }}
              className="text-[10px] font-bold uppercase tracking-widest text-ink/60 underline decoration-ink/20 underline-offset-2"
            >
              {organizer.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}