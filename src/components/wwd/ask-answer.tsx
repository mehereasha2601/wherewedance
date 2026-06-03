import type { AskPrompt } from "@/data/mock";
import { eventById, resourceById } from "@/data/mock";
import { Link } from "./ui-router";
import { AiCaveat } from "./ai-caveat";
import { BeginnerPathway } from "./beginner-pathway";
import { GoodToKnow } from "./good-to-know";

export function AskAnswer({ prompt }: { prompt: AskPrompt }) {
  const sourceEvents = (prompt.answer.sourceEventIds ?? [])
    .map(eventById)
    .filter((e): e is NonNullable<ReturnType<typeof eventById>> => Boolean(e));
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

        {sourceEvents.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-2">
              Pulled from these events
            </p>
            <div className="space-y-2">
              {sourceEvents.map((e) => (
                <Link
                  key={e.id}
                  to="/events/$id"
                  params={{ id: e.slug }}
                  className="flex items-center justify-between bg-paper ring-1 ring-ink/10 rounded-xl p-3"
                >
                  <div>
                    <p className="font-display italic font-semibold text-base leading-tight text-ink">
                      {e.title}
                    </p>
                    <p className="text-[11px] text-ink/60">
                      {e.dayOfWeek} · {e.startsAt} · {e.venue}
                    </p>
                  </div>
                  <span className="text-terracotta text-lg">→</span>
                </Link>
              ))}
            </div>
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

        {prompt.answer.showGoodToKnow && sourceEvents[0] && (
          <GoodToKnow event={sourceEvents[0]} />
        )}

        {prompt.answer.showBeginnerPathway && <BeginnerPathway compact />}
      </div>
    </article>
  );
}