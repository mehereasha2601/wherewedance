/**
 * Reusable CTA pointing at the Beginner Guide. Embedded inside Ask answers when an answer flags `showBeginnerPathway`.
 */
import { Link } from "./ui-router";

type StepCTA =
  | { label: string; to: "/resources"; search?: { category?: string } }
  | { label: string; to: "/this-week"; search?: { filter?: string } }
  | { label: string; to: "/events" }
  | { label: string; to: "/ask" };

const steps: Array<{
  n: string;
  title: string;
  body: string;
  cta: StepCTA;
  badge?: string;
}> = [
  {
    n: "01",
    title: "Take a structured class first",
    body: "Start with J&L Dance Studio or Lili Latin Dance if you are brand new. No partner needed. A class gives you timing, basics, and comfort before entering a social floor.",
    cta: { label: "See beginner classes", to: "/resources", search: { category: "Studios" } },
  },
  {
    n: "02",
    title: "Try a class + social",
    body: "Once you know the basics, try Bachata Room Wednesday or Havana Saturday. Both have a class before the social, which makes entering the room easier.",
    cta: { label: "See beginner-friendly socials", to: "/this-week", search: { filter: "beginner-friendly" } },
  },
  {
    n: "03",
    title: "Use resources and community context",
    body: "Use the resource directory for playlists, online learning, group access info, community values, and studio links. This helps you practice outside class and understand the scene before showing up.",
    cta: { label: "Explore resources", to: "/resources" },
  },
  {
    n: "04",
    title: "Get better recommendations",
    body: "Coming soon: personalized recommendations based on your level, comfort, music preference, whether you are going alone, and whether you prefer class-first, outdoor, dry/no-alcohol, or bigger-crowd events.",
    cta: { label: "Ask WhereWeDance", to: "/ask" },
    badge: "Coming soon",
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
          4 steps
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
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="font-display italic font-semibold text-lg leading-tight text-ink">
                  {s.title}
                </h4>
                {s.badge && (
                  <span className="text-[9px] uppercase tracking-widest font-bold text-ink/60 bg-paper ring-1 ring-ink/15 px-1.5 py-0.5 rounded">
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-ink/75 mt-1 leading-relaxed">{s.body}</p>
              {!compact && (
                <Link
                  to={s.cta.to}
                  search={"search" in s.cta ? (s.cta.search as never) : undefined}
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