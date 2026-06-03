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
  { word: "Switch", def: "Dancing both lead and follow, sometimes within the same song. Common in inclusive scenes." },
  { word: "Social", def: "An open dance event, no instruction. Sometimes preceded by a beginner class." },
  { word: "Class before social", def: "A short lesson taught right before the social, usually included in the cover." },
  { word: "Beginner-friendly", def: "Structured for people new to dancing — clear teaching, easier music, more patient floor." },
  { word: "Beginner-welcome", def: "New dancers are welcome but the event isn't built around teaching basics." },
  { word: "Bachata-heavy", def: "An event where most of the music is bachata, not salsa or kizomba." },
  { word: "Bachata-included", def: "A mixed Latin event that plays bachata as part of the mix, not the focus." },
  { word: "Sensual Bachata", def: "A bachata style with close body connection. Requires explicit consent." },
  { word: "Jack & Jill", def: "A competition format where leads and follows are randomly paired." },
];

const etiquette = [
  { t: "Ask, then dance", d: "A clear 'Want to dance?' is the norm. A 'no thank you' is always a complete sentence." },
  { t: "Mind the connection", d: "Frame, not force. If something feels uncomfortable, adjust or step apart." },
  { t: "Thank each other", d: "End the song with a 'thank you' — it closes the dance cleanly, whatever happened." },
];

const nextSteps = [
  { t: "Add a second weekly class", d: "Once basics feel familiar, layering a second class makes socials click faster." },
  { t: "Try a Bachata-heavy night", d: "When you're ready, Havana Monday/Thursday or Bachata Room give you more dedicated practice." },
  { t: "Find a practice buddy", d: "A regular partner outside class is the fastest path to comfort on the social floor." },
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
        <ul className="space-y-3">
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
        <p className="px-5 -mt-2 mb-4 text-[12px] text-ink/65 leading-relaxed">
          A short, deliberately small list — one beginner class + social, plus one bigger social with a lesson up front.
        </p>
        <div id="recommended-first-events" className="px-5 grid gap-4">
          {(() => {
            const order = ["evt-bachata-room-wed", "evt-havana-sat"];
            return order
              .map((id) => events.find((e) => e.id === id))
              .filter((e): e is NonNullable<typeof e> => Boolean(e))
              .map((e) => <EventCard key={e.id} event={e} />);
          })()}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="When you're ready" title="Explore after basics" />
        <p className="px-5 -mt-2 mb-4 text-[12px] text-ink/65 leading-relaxed">
          Once you've done a few socials, these are good places to keep growing — Bachata-heavy nights, mixed Latin socials, outdoor pop-ups, and inclusive events. Check the official source before going.
        </p>
        <div className="px-5 grid gap-4">
          {(() => {
            const order = [
              "evt-havana-mon",
              "evt-havana-thu",
              "evt-bobas",
              "evt-saborcito",
              "evt-dantes-sat",
              "evt-tambo-fri",
              "evt-jl",
              "evt-lili-monthly-social",
              "evt-next-level-queer-jun6",
            ];
            return order
              .map((id) => events.find((e) => e.id === id))
              .filter((e): e is NonNullable<typeof e> => Boolean(e))
              .map((e) => <EventCard key={e.id} event={e} />);
          })()}
        </div>
      </section>

      <section className="px-5 mt-10 mb-4">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Next steps after basics</h2>
        <ul className="space-y-3">
          {nextSteps.map((x) => (
            <li key={x.t} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
              <p className="font-display italic font-semibold text-lg text-ink">{x.t}</p>
              <p className="text-[13px] text-ink/75 mt-1 leading-relaxed">{x.d}</p>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
