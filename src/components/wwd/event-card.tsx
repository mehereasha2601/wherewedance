import type { Event } from "@/data/mock";
import { organizerById } from "@/data/mock";
import { Link } from "./ui-router";
import { BeginnerTag, SceneTag } from "./tags";
import { GoodToKnow } from "./good-to-know";
import { SourceLabel } from "./source-label";

export function EventCard({ event, full = false }: { event: Event; full?: boolean }) {
  const organizer = organizerById(event.organizerId);
  return (
    <article className="bg-paper rounded-3xl ring-1 ring-ink/10 overflow-hidden flex flex-col">
      <div className={`relative aspect-[5/3] bg-gradient-to-br ${event.cover}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <SceneTag value={event.bachataRelevance} />
          <BeginnerTag value={event.beginnerLabel} />
        </div>
        {event.tonight && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-paper/95 text-ink px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-magenta animate-pulse" />
            Tonight
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-paper">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">
              {event.dayOfWeek} · {event.startsAt}
            </p>
          </div>
          <span className="font-display italic font-bold text-lg leading-none bg-ink/40 backdrop-blur px-2 py-1 rounded-md">
            {event.cost}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-display italic font-semibold text-2xl leading-tight text-ink">
            <Link to="/events/$id" params={{ id: event.slug }}>
              {event.title}
            </Link>
          </h3>
          <p className="text-[12px] text-ink/60 mt-0.5">
            {event.venue} · {event.address}
          </p>
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

        <div className="flex items-center justify-between pt-1">
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