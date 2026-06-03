import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { BeginnerPathway } from "@/components/wwd/beginner-pathway";
import { EventCardCompact } from "@/components/wwd/event-card-compact";
import { events } from "@/data/mock";
import { Link } from "@/components/wwd/ui-router";

const expect = [
  { t: "You will mess up", d: "Everyone does. Smile, reset, keep dancing. No one is watching as hard as you think." },
  { t: "Rotations are normal", d: "At a class or beginner social, partners change every few minutes - not because they don't like you." },
  { t: "Saying no is normal too", d: "You don't owe anyone a dance. Don't owe an explanation either." },
  { t: "You do not need a partner", d: "Most beginner classes rotate partners, and many people come alone." },
];

const glossary = [
  { word: "Lead / Follow", def: "Two roles in partner dance. Either role can be danced by any gender." },
  { word: "Switch", def: "Someone who dances both lead and follow, or is learning both." },
  { word: "Social", def: "An open dance event, no instruction. Sometimes preceded by a beginner class." },
  { word: "Class before social", def: "A short lesson before the social. This is often the easiest way for beginners to enter the room." },
  { word: "Beginner-friendly", def: "A class or event with structure for beginners, usually with a lesson or guided rotation." },
  { word: "Beginner-welcome", def: "Beginners can attend, but there may not be a class or beginner support." },
  { word: "Bachata-heavy", def: "A night where most of the music is Bachata, not Salsa, Kizomba, or mixed Latin." },
  { word: "Sensual Bachata", def: "A Bachata style with closer connection and body movement. Comfort and consent matter. Do not assume someone wants close hold or sensual movement." },
  { word: "Jack & Jill", def: "A competition format where leads and follows are randomly paired." },
];

const etiquette = [
  { t: "Ask with words", d: "Use \u201CWould you like to dance?\u201D Do not pull someone by the hand or touch from behind." },
  { t: "A no is complete", d: "No explanation is needed. Smile, say \u201Cno worries,\u201D and move on." },
  { t: "Keep it simple", d: "As a beginner, basic steps with good timing and comfort are better than trying fancy moves." },
  { t: "Fresh is respectful", d: "Bring mints, use deodorant, and consider an extra shirt if you sweat a lot." },
];

const recommendedSlugs = [
  "lili-latin-social",
  "jl-underground",
  "bachata-room-wednesday",
  "bachata-by-the-river",
];

const nextSteps = [
  { label: "Try Bachata Room Wednesday", to: "/events/$id" as const, params: { id: "bachata-room-wednesday" } },
  { label: "Try Bachata by the River when in season", to: "/events/$id" as const, params: { id: "bachata-by-the-river" } },
  { label: "Try Havana Monday or Thursday for Bachata-heavy nights", to: "/events/$id" as const, params: { id: "havana-club-monday" } },
  { label: "Use the practice buddy board after taking some classes", to: "/buddies" as const, params: undefined },
  { label: "Read Community Values before going to socials regularly", to: "/values" as const, params: undefined },
];

export function BeginnerGuidePage() {
  const recommended = recommendedSlugs
    .map((s) => events.find((e) => e.slug === s))
    .filter((e): e is (typeof events)[number] => Boolean(e));
  return (
    <AppShell>
      <PageHero
        eyebrow="Brand new? Start here."
        title={<>From <span className="text-terracotta">zero</span> to your first social.</>}
        description="A safe, friendly route into Boston bachata. No prior dance, no partner, no fancy shoes."
      />

      <section className="px-5 mt-8">
        <BeginnerPathway />
      </section>

      <section className="px-5 mt-10">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">What to expect</h2>
        <ul className="space-y-3">
          {expect.map((x) => (
            <li key={x.t} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
              <p className="font-display italic font-semibold text-lg text-ink">{x.t}</p>
              <p className="text-[13px] text-ink/75 mt-1 leading-relaxed">{x.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-10">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Tiny glossary</h2>
        <dl className="bg-paper ring-1 ring-ink/10 rounded-2xl divide-y divide-ink/10">
          {glossary.map((g) => (
            <div key={g.word} className="p-4">
              <dt className="font-display italic font-semibold text-base text-terracotta">{g.word}</dt>
              <dd className="text-[13px] text-ink/75 mt-1">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-5 mt-10">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">First-night etiquette</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {etiquette.map((x) => (
            <li key={x.t} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
              <p className="font-display italic font-semibold text-lg text-ink">{x.t}</p>
              <p className="text-[13px] text-ink/75 mt-1 leading-relaxed">{x.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Soft landings" title="Recommended first events" />
        <div className="px-5 grid gap-3 sm:grid-cols-2">
          {recommended.map((e) => (
            <EventCardCompact key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="px-5 mt-10">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Next steps after your first few classes</h2>
        <p className="text-[13px] text-ink/70 mb-3">Once you know basics:</p>
        <ul className="bg-paper ring-1 ring-ink/10 rounded-2xl divide-y divide-ink/10">
          {nextSteps.map((s) => (
            <li key={s.label}>
              {s.params ? (
                <Link
                  to={s.to}
                  params={s.params as { id: string }}
                  className="flex items-center justify-between gap-3 p-4 text-[13px] text-ink hover:bg-ink/5"
                >
                  <span>{s.label}</span>
                  <span className="text-terracotta font-bold">→</span>
                </Link>
              ) : (
                <Link
                  to={s.to as "/buddies" | "/values"}
                  className="flex items-center justify-between gap-3 p-4 text-[13px] text-ink hover:bg-ink/5"
                >
                  <span>{s.label}</span>
                  <span className="text-terracotta font-bold">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}