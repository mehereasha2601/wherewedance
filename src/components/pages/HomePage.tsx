import { AppShell, PageHero, SectionHeader } from "@/components/wwd/shell";
import { MarqueeTicker } from "@/components/wwd/marquee";
import { AskCard } from "@/components/wwd/ask-card";
import { BeginnerPathway } from "@/components/wwd/beginner-pathway";
import { EventCardCompact } from "@/components/wwd/event-card-compact";
import { DiscoveryStrip } from "@/components/wwd/discovery-strip";
import { OrganizerCTA } from "@/components/wwd/organizer-cta";
import { BuddyCard } from "@/components/wwd/buddy-card";
import { Link } from "@/components/wwd/ui-router";
import { buddies, events, tonightEvents, values } from "@/data/mock";

export function HomePage() {
  const tonight = tonightEvents();
  const week = events.slice(0, 3);
  const bachataHeavy = events.filter((e) => e.bachataRelevance === "Bachata-heavy").slice(0, 2);
  const outdoor = events.filter((e) => e.cost.toLowerCase().includes("free")).slice(0, 2);

  return (
    <AppShell>
      <PageHero
        eyebrow="Boston bachata · live pilot"
        title={
          <>
            Where to dance, <span className="text-terracotta">who's going,</span> and how to join in.
          </>
        }
      />

      <div className="px-5 mt-5 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-ink/55">
        <span className="size-1.5 rounded-full bg-magenta animate-pulse" />
        {tonight.length} socials live tonight
      </div>

      <div className="mt-6">
        <MarqueeTicker
          items={tonight.map((e) => `Live Tonight: ${e.title}`).concat([
            "Beginner-friendly all week",
            "Free outdoor Thursday",
          ])}
        />
      </div>

      <section className="mt-8">
        <DiscoveryStrip />
      </section>

      <section className="px-5 mt-6">
        <AskCard />
      </section>

      <section className="mt-12">
        <SectionHeader
          eyebrow="Boston · This Week"
          title="This week"
          trailing={
            <Link to="/this-week" className="text-[11px] font-bold uppercase tracking-widest text-ink border-b border-ink/40 pb-0.5">
              Full week →
            </Link>
          }
        />
        <div className="px-5 grid gap-3">
          {week.map((e) => (
            <EventCardCompact key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="px-5 mt-12">
        <BeginnerPathway />
      </section>

      <section className="mt-12">
        <SectionHeader eyebrow="For the dancers" title="Bachata-heavy nights" />
        <div className="px-5 grid gap-3">
          {bachataHeavy.map((e) => (
            <EventCardCompact key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader eyebrow="Free & outdoor" title="No cover required" />
        <div className="px-5 grid gap-3">
          {outdoor.map((e) => (
            <EventCardCompact key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="px-5 mt-12">
        <SectionHeader
          eyebrow="Our floor, our rules"
          title="Community values"
          trailing={
            <Link to="/values" className="text-[11px] font-bold uppercase tracking-widest text-ink border-b border-ink/40 pb-0.5">
              All values →
            </Link>
          }
        />
        <ul className="space-y-3">
          {values.slice(0, 3).map((v) => (
            <li
              key={v.id}
              className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4"
            >
              <h3 className="font-display italic font-semibold text-lg leading-tight text-ink">
                {v.title}
              </h3>
              <p className="text-[13px] text-ink/70 mt-1">{v.short}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-12">
        <SectionHeader
          eyebrow="Drill together"
          title="Practice buddy board"
          trailing={
            <Link to="/buddies" className="text-[11px] font-bold uppercase tracking-widest text-ink border-b border-ink/40 pb-0.5">
              See all →
            </Link>
          }
        />
        <div className="space-y-3">
          {buddies.slice(0, 2).map((b) => (
            <BuddyCard key={b.id} buddy={b} />
          ))}
        </div>
      </section>

      <section className="px-5 mt-12">
        <OrganizerCTA />
      </section>
    </AppShell>
  );
}