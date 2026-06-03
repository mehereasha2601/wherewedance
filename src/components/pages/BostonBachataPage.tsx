import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { BeginnerPathway } from "@/components/wwd/beginner-pathway";
import { EventCard } from "@/components/wwd/event-card";
import { events, organizers } from "@/data/mock";

const rhythm = [
  { day: "Monday", desc: "Havana Club anchors the week with a beginner intro." },
  { day: "Wednesday", desc: "Bachata Room — the bachata-heavy mid-week reset." },
  { day: "Pop-up", desc: "BOBAS outdoor Salsa/Bachata at the Charles River Dock — weather-dependent, check Instagram." },
  { day: "Friday", desc: "Lili Latin first-Friday social + J&L Underground for advanced sensual." },
  { day: "Saturday", desc: "Havana live band night + Saborcito's late multi-genre set." },
  { day: "Sunday", desc: "Bachata by the River on the Esplanade in summer." },
];

export function BostonBachataPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="The scene"
        title={<>Boston bachata, <span className="text-terracotta">in plain words.</span></>}
        description="What a normal week looks like, who runs it, and how to fit in without being weird about it."
      />

      <section className="px-5 mt-8 space-y-3">
        <h2 className="font-display italic font-semibold text-2xl text-ink">The weekly rhythm</h2>
        <ol className="bg-paper ring-1 ring-ink/10 rounded-2xl divide-y divide-ink/10">
          {rhythm.map((r) => (
            <li key={r.day} className="flex gap-4 p-4">
              <span className="font-display italic text-terracotta text-xl w-24 shrink-0">{r.day}</span>
              <span className="text-[13px] text-ink/80 leading-relaxed">{r.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 mt-10">
        <BeginnerPathway />
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Anchor nights" title="Key venues" />
        <div className="px-5 grid gap-4">
          {events.slice(0, 3).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="px-5 mt-10">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Etiquette, short version</h2>
        <ul className="space-y-2 text-[13px] text-ink/80 leading-relaxed">
          <li><span className="text-terracotta font-bold">·</span> Ask out loud, listen for the answer. A nod isn't yes.</li>
          <li><span className="text-terracotta font-bold">·</span> Thank your partner after every song. Don't ghost.</li>
          <li><span className="text-terracotta font-bold">·</span> No teaching on the floor unless they asked you to.</li>
          <li><span className="text-terracotta font-bold">·</span> Bring a small towel and a clean shirt. Boston floors get warm.</li>
        </ul>
      </section>

      <section className="px-5 mt-10">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Who runs the nights</h2>
        <ul className="grid gap-3">
          {organizers.map((o) => (
            <li key={o.id} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
              <p className="font-display italic font-semibold text-lg text-ink">{o.name}</p>
              <p className="text-[12px] text-ink/65 mt-1 line-clamp-2">{o.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}