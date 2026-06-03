import { Link } from "./ui-router";

const steps = [
  {
    n: "01",
    title: "Take a class first",
    body: "Lili Latin Mon–Thu or Bachata Room Wednesday at 7:30pm. One hour, no partner needed.",
    cta: { label: "See beginner classes", to: "/beginner-guide" as const },
  },
  {
    n: "02",
    title: "Try a beginner-friendly social",
    body: "Havana Club Monday has an 8pm intro and a beginner table. Bachata Room's Wednesday class flows into the social.",
    cta: { label: "Tonight's options", to: "/this-week" as const },
  },
  {
    n: "03",
    title: "Find a practice buddy",
    body: "Drilling 20 minutes with the same person matters more than another class. Post on the buddy board.",
    cta: { label: "Buddy board", to: "/buddies" as const },
  },
];

export function BeginnerPathway({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-mango/15 ring-1 ring-mango/40 rounded-3xl p-5">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-display italic font-semibold text-2xl leading-none text-ink">
          Beginner <span className="text-terracotta">pathway</span>
        </h3>
        <span className="text-[10px] uppercase tracking-widest font-bold text-ink/50">
          3 steps
        </span>
      </div>
      <p className="text-sm text-ink/70 mb-5 max-w-[36ch]">
        A safe order to enter the Boston bachata scene from zero.
      </p>
      <ol className="space-y-4">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="font-display italic text-terracotta text-3xl leading-none shrink-0 pt-1">
              {s.n}
            </span>
            <div className="flex-1">
              <h4 className="font-display italic font-semibold text-lg leading-tight text-ink">
                {s.title}
              </h4>
              <p className="text-[13px] text-ink/75 mt-1 leading-relaxed">{s.body}</p>
              {!compact && (
                <Link
                  to={s.cta.to}
                  className="inline-block mt-2 text-[11px] font-bold uppercase tracking-widest text-terracotta border-b border-terracotta/40 pb-0.5"
                >
                  {s.cta.label} →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}