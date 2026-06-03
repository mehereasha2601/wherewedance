import type { AskPrompt } from "@/data/mock";
import { eventById, resourceById, isPastOneOff, getAskDateLabel } from "@/data/mock";
import { Link } from "./ui-router";
import { AiCaveat } from "./ai-caveat";
import { BeginnerPathway } from "./beginner-pathway";
import { GoodToKnow } from "./good-to-know";

export function AskAnswer({ prompt }: { prompt: AskPrompt }) {
  const recommendationsAll = (prompt.answer.recommendations ?? [])
    .map((r) => ({ ...r, event: eventById(r.eventId) }))
    .filter((r): r is typeof r & { event: NonNullable<ReturnType<typeof eventById>> } => Boolean(r.event));
  const recommendations = recommendationsAll.filter((r) => !isPastOneOff(r.event));
  const filteredOutPast = recommendationsAll.length > 0 && recommendations.length === 0;
  const sourceResources = (prompt.answer.sourceResourceIds ?? [])
    .map(resourceById)
    .filter((r): r is NonNullable<ReturnType<typeof resourceById>> => Boolean(r));
  const sourceEvents = (prompt.answer.sourceEventIds ?? [])
    .map(eventById)
    .filter((e): e is NonNullable<ReturnType<typeof eventById>> => Boolean(e));

  return (
    <article className="bg-paper ring-1 ring-ink/10 rounded-3xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 bg-ink text-paper">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-widest font-bold text-mango">
            You asked
          </p>
          <span className="shrink-0 text-[9px] uppercase tracking-widest font-bold bg-mango/20 text-mango px-2 py-1 rounded-full">
            Mock preview · Coming soon
          </span>
        </div>
        <p className="font-display italic text-xl leading-snug mt-1">
          "{prompt.prompt}"
        </p>
      </div>

      <div className="p-5 space-y-4">
        <AiCaveat />
        <p className="text-[14px] leading-relaxed text-ink">{prompt.answer.body}</p>

        {recommendations.length > 0 && (
          <div className="space-y-4">
            {recommendations.map(({ event, label, whyThisFits }) => {
              const isTop = label === "Top recommendation";
              const askDate = getAskDateLabel(event);
              return (
              <div
                key={event.id}
                className="rounded-2xl ring-1 ring-ink/10 bg-paper overflow-hidden"
              >
                <div className="px-4 pt-4 pb-3 border-b border-ink/10">
                  <p
                    className={`text-[10px] uppercase tracking-widest font-bold ${
                      isTop ? "text-terracotta" : "text-ink/50"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="font-display italic font-semibold text-lg leading-tight text-ink mt-1">
                    {event.title}
                  </p>
                  <p className="text-[11px] text-ink/60 mt-0.5">
                    {`${askDate}${event.scheduleLabel ? ` · ${event.scheduleLabel}` : ""} · ${event.venue}`}
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
                  <GoodToKnow event={event} compact={!isTop} />
                </div>
              </div>
            );
            })}
          </div>
        )}

        {filteredOutPast && (
          <div className="rounded-2xl bg-ink/5 ring-1 ring-ink/10 p-4">
            <p className="text-[13px] text-ink/80 leading-relaxed">
              No currently listed matching event is available in the mock data.
              Check official sources or browse{" "}
              <Link to="/this-week" className="font-bold text-terracotta">
                This Week
              </Link>
              .
            </p>
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

        {(sourceEvents.length > 0 || sourceResources.length > 0) && (
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-2">
              Sources used
            </p>
            <ul className="space-y-1">
              {sourceEvents.map((e) => (
                <li key={e.id} className="text-[12px] text-ink/80">
                  ·{" "}
                  <Link
                    to="/events/$id"
                    params={{ id: e.slug }}
                    className="font-bold text-terracotta hover:underline"
                  >
                    {e.title}
                  </Link>
                </li>
              ))}
              {sourceResources.map((r) => {
                const href = r.websiteUrl ?? r.sourceUrl ?? r.link;
                if (!href) {
                  return (
                    <li key={r.id} className="text-[12px] text-ink/80">
                      · {r.name}
                    </li>
                  );
                }
                if (href.startsWith("/")) {
                  return (
                    <li key={r.id} className="text-[12px] text-ink/80">
                      ·{" "}
                      <Link to={href} className="font-bold text-terracotta hover:underline">
                        {r.name}
                      </Link>
                    </li>
                  );
                }
                if (/^https?:\/\//i.test(href)) {
                  return (
                    <li key={r.id} className="text-[12px] text-ink/80">
                      ·{" "}
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-terracotta hover:underline"
                      >
                        {r.name} ↗
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={r.id} className="text-[12px] text-ink/80">
                    · {r.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {prompt.answer.showBeginnerPathway && <BeginnerPathway compact />}
      </div>
    </article>
  );
}