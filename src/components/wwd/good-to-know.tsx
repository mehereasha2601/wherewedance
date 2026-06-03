import type { Event } from "@/data/mock";

// First-class section. Renders on EventCard, event detail, This Week cards, and AI answer cards.
export function GoodToKnow({ event, compact = false }: { event: Event; compact?: boolean }) {
  const rows = [
    {
      label: "Class before social",
      value: event.classBeforeSocial.offered
        ? (() => {
            const level = event.classBeforeSocial.level?.trim() ?? "";
            const at = event.classBeforeSocial.startsAt?.trim() ?? "";
            const TIME_RE = /\b(\d{1,2}:\d{2}|\d{1,2}\s?(?:AM|PM|am|pm))\b/;
            const levelHasTime = TIME_RE.test(level);
            const parts = [level];
            if (at && !levelHasTime) {
              parts.push(/^\d/.test(at) ? `@ ${at}` : at);
            }
            const body = parts.filter(Boolean).join(" ");
            return body ? `Yes — ${body}` : "Yes";
          })()
        : "No intro class",
    },
    { label: "Water", value: event.waterAvailability },
    { label: "Alcohol", value: event.alcoholPolicy },
    ...(event.paymentNotes ? [{ label: "Payment", value: event.paymentNotes }] : []),
    ...(event.coatCheck ? [{ label: "Coat check", value: event.coatCheck }] : []),
    { label: "Schedule", value: event.scheduleReliability },
  ];

  return (
    <section className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
      <div className="flex items-baseline justify-between mb-3">
        <h4 className="font-display italic text-lg text-ink leading-none">
          Good to Know <span className="text-terracotta">Before You Go</span>
        </h4>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 mb-3">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[9px] uppercase tracking-widest text-ink/50 font-bold">
              {r.label}
            </dt>
            <dd className="text-[11px] text-ink leading-snug">{r.value}</dd>
          </div>
        ))}
      </dl>
      {!compact && (
        <ul className="space-y-1.5 pt-3 border-t border-ink/10">
          {event.goodToKnow.map((g, i) => (
            <li key={i} className="text-[12px] leading-relaxed text-ink/80 flex gap-2">
              <span className="text-terracotta font-bold">·</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      )}
      {event.communityNote && (
        <p className="mt-3 pt-3 border-t border-ink/10 font-display italic text-[12px] text-ink/70 leading-relaxed">
          "{event.communityNote}"
        </p>
      )}
    </section>
  );
}