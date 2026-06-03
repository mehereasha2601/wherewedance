import type { AskPrompt } from "@/data/mock";
import { eventById, resourceById } from "@/data/mock";
import { Link } from "./ui-router";
import { AiCaveat } from "./ai-caveat";
import { BeginnerPathway } from "./beginner-pathway";
import { GoodToKnow } from "./good-to-know";

export function AskAnswer({ prompt }: { prompt: AskPrompt }) {
  const recommendations = (prompt.answer.recommendations ?? [])
    .map((r) => ({ ...r, event: eventById(r.eventId) }))
    .filter((r): r is typeof r & { event: NonNullable<ReturnType<typeof eventById>> } => Boolean(r.event));
  const sourceResources = (prompt.answer.sourceResourceIds ?? [])
    .map(resourceById)
    .filter((r): r is NonNullable<ReturnType<typeof resourceById>> => Boolean(r));

  return (
    <article className="bg-paper ring-1 ring-ink/10 rounded-3xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 bg-ink text-paper">
        <p className="text-[10px] uppercase tracking-widest font-bold text-mango">
          You asked
        </p>
        <p className="font-display italic text-xl leading-snug mt-1">
          "{prompt.prompt}"
        </p>
      </div>

      <div className="p-5 space-y-4">
        <AiCaveat />
        <p className="text-[14px] leading-relaxed text-ink">{prompt.answer.body}</p>

        {recommendations.length > 0 && (
          <div className="space-y-4">
            {recommendations.map(({ event, label, whyThisFits }) => (
              <div
                key={event.id}
                className="rounded-2xl ring-1 ring-ink/10 bg-paper overflow-hidden"
              >
                <div className="px-4 pt-4 pb-3 border-b border-ink/10">
                  <p
                    className={`text-[10px] uppercase tracking-widest font-bold ${
                      label === "Top recommendation" ? "text-terracotta" : "text-ink/50"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="font-display italic font-semibold text-lg leading-tight text-ink mt-1">
                    {event.title}
                  </p>
                  <p className="text-[11px] text-ink/60 mt-0.5">
                    {event.popUp ? `Pop-up · Check Instagram · ${event.venue}` : `${event.dayOfWeek} · ${event.startsAt} · ${event.venue}`}
                  </p>
                  <p className="text-[13px] text-ink/80 leading-relaxed mt-2">
                    <span className="font-bold text-ink">Why this fits: </span>
                    {whyThisFits}
                  </p>
                  <Link
                    to="/events/$id"
                    params={{ id: event.slug }}
                    className="inline-block mt-2 text-[11px] font-bold uppercase tracking-widest text-terracotta"
                  >
                    View event page →
                  </Link>
                </div>
                <div className="p-4">
                  <GoodToKnow event={event} />
                </div>
              </div>
            ))}
          </div>
        )}

        {prompt.answer.generalNote && (
          <div className="rounded-2xl bg-ink/5 ring-1 ring-ink/10 p-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55 mb-1">
              General note for this answer
            </p>
            <p className="text-[13px] text-ink/80 leading-relaxed">
              {prompt.answer.generalNote}
            </p>
          </div>
        )}

        {sourceResources.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-2">
              Resources cited
            </p>
            <ul className="space-y-1">
              {sourceResources.map((r) => (
                <li key={r.id} className="text-[12px] text-ink/80">
                  · {r.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {prompt.answer.showBeginnerPathway && <BeginnerPathway compact />}
      </div>
    </article>
  );
}