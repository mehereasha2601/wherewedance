import { Link } from "./ui-router";

const steps = [
  {
    n: "01",
    title: "Take a structured class first",
    body: "Start with Lili Latin Dance or J&L Dance Studio if you are brand new. No partner needed.",
    cta: { label: "See beginner classes", to: "/beginner-guide" as const },
  },
  {
    n: "02",
    title: "Try a class + social",
    body: "Bachata Room Wednesday or Havana Saturday can help you move from class into social dancing.",
    cta: { label: "This week", to: "/this-week" as const },
  },
  {
    n: "03",
    title: "Build confidence",
    body: "Try Bachata by the River or other outdoor socials, then explore Bachata-heavy nights like Havana Monday or Thursday when ready.",
    cta: { label: "All events", to: "/events" as const },
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