import type { Event } from "@/data/mock";
import { logisticsSummary, isEventTonight } from "@/data/mock";
import { Link } from "./ui-router";
import { BeginnerTag, SceneTag } from "./tags";
import { ExternalLink } from "lucide-react";

export function EventCardCompact({ event }: { event: Event }) {
  const primaryHref = event.officialUrl ?? event.websiteUrl ?? event.instagramUrl ?? event.facebookUrl;
  const logistics = logisticsSummary(event);
  const tonight = isEventTonight(event);
  return (
    <article className="bg-paper rounded-2xl ring-1 ring-ink/10 overflow-hidden flex flex-col">
      <div className={`h-16 bg-gradient-to-br ${event.cover} relative`}>
        {tonight && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1.5 bg-paper/95 text-ink px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-magenta animate-pulse" />
            Tonight
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex gap-1.5 flex-wrap">
          <SceneTag value={event.bachataRelevance} />
          <BeginnerTag value={event.beginnerLabel} />
        </div>
        <h3 className="font-display italic font-semibold text-lg leading-tight text-ink">
          <Link to="/events/$id" params={{ id: event.slug }}>
            {event.title}
          </Link>
        </h3>
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium text-ink/70 leading-relaxed">
            {event.venue}
          </p>
          <p className="text-[11px] text-ink/60 leading-relaxed">
            {event.address}
          </p>
        </div>
        <p className="text-[11px] text-ink/60">
          {event.popUp
            ? <>Pop-up · Check Instagram · <span className="font-bold text-ink/80">{event.cost}</span></>
            : <>{event.dayOfWeek} · {event.startsAt} · <span className="font-bold text-ink/80">{event.cost}</span></>}
        </p>
        {logistics && (
          <p className="text-[10px] text-ink/65 font-medium leading-snug">
            {logistics}
          </p>
        )}
        {event.goodToKnow[0] && (
          <p className="text-[11px] text-ink/70 border-l-2 border-mango pl-2 italic">
            {event.goodToKnow[0]}
          </p>
        )}
        {primaryHref && (
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${event.title} details`}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-terracotta self-start"
          >
            <ExternalLink size={11} strokeWidth={2.5} />
            Details
          </a>
        )}
      </div>
    </article>
  );
}