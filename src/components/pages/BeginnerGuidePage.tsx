import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { BeginnerPathway } from "@/components/wwd/beginner-pathway";
import { EventCard } from "@/components/wwd/event-card";
import { events } from "@/data/mock";

const expect = [
  { t: "You will mess up", d: "Everyone does. Smile, reset, keep dancing. No one is watching as hard as you think." },
  {
    t: "Rotations are normal",
    d: "At a class or beginner social, partners change every few minutes — not because they don't like you.",
  },
  { t: "Saying no is normal too", d: "You don't owe anyone a dance. Don't owe an explanation either." },
];

const glossary = [
  { word: "Lead / Follow", def: "Two roles in partner dance. Either role can be danced by any gender." },
  { word: "Social", def: "An open dance event, no instruction. Sometimes preceded by a beginner class." },
  { word: "Bachata-heavy", def: "An event where most of the music is bachata, not salsa or kizomba." },
  { word: "Sensual", def: "A bachata style with close body connection. Requires explicit consent." },
  { word: "Jack & Jill", def: "A competition format where leads and follows are randomly paired." },
];

export function BeginnerGuidePage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Brand new? Start here."
        title={
          <>
            From <span className="text-terracotta">zero</span> to your first social.
          </>
        }
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

      <section className="mt-10">
        <SectionHeader eyebrow="Soft landings" title="Recommended first events" />
        <div className="px-5 grid gap-4">
          {events
            .filter((e) => e.classBeforeSocial.offered && e.beginnerLabel === "Beginner-friendly")
            .map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
        </div>
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
    </AppShell>
  );
}
