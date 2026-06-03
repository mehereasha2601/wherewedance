import type { Event } from "@/data/mock";
import { Link } from "./ui-router";
import { BeginnerTag, SceneTag } from "./tags";

export function EventCardCompact({ event }: { event: Event }) {
  return (
    <article className="bg-paper rounded-2xl ring-1 ring-ink/10 overflow-hidden flex flex-col">
      <div className={`h-16 bg-gradient-to-br ${event.cover} relative`}>
        {event.tonight && (
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
        <p className="text-[11px] text-ink/60">
          {event.dayOfWeek} · {event.startsAt} · <span className="font-bold text-ink/80">{event.cost}</span>
        </p>
        {event.goodToKnow[0] && (
          <p className="text-[11px] text-ink/70 border-l-2 border-mango pl-2 italic">
            {event.goodToKnow[0]}
          </p>
        )}
      </div>
    </article>
  );
}