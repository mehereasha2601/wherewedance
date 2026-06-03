import { AppShell, PageHero } from "@/components/wwd/shell";
import { events, organizers, mapUrlForEvent } from "@/data/mock";
import { SourceLabel } from "@/components/wwd/source-label";
import { OfficialLinks } from "@/components/wwd/official-links";
import { ComingSoonBanner } from "@/components/wwd/coming-soon-banner";
import { Link } from "@/components/wwd/ui-router";

const submissions = [
  { title: "Saturday Bachata Pop-up", status: "Pending review", color: "bg-mango text-ink" },
  { title: "Bachata Room Wednesday", status: "Published", color: "bg-magenta text-paper" },
  { title: "Cambridge Roof Social", status: "Needs more info", color: "bg-paper text-ink ring-1 ring-ink/30" },
];

const valueBullets = [
  "Share a clean event page instead of repeating details in DMs.",
  "Help dancers understand if your event is beginner-friendly, Bachata-heavy, outdoor, dry/no-alcohol, or class-before-social.",
  "Show RSVP interest before the event.",
  "Keep source links and schedule updates visible.",
  "Help beginners know what to expect before they arrive.",
];

const dancerQuestions = [
  "Do I need a partner?",
  "Is there a class before the social?",
  "Is this beginner-friendly or beginner-welcome?",
  "Is it Bachata-heavy?",
  "Is water available?",
  "Is alcohol served?",
  "Should I check Instagram or the official website first?",
];

const scheduleUpdates = [
  "Cancelled tonight",
  "Time changed",
  "New flyer",
  "Special theme",
  "Guest instructor",
  "Venue changed",
];

const aiHelpers = [
  "Generate Good to Know draft - coming soon",
  "Draft Instagram caption - coming soon",
  "Rewrite for beginners - coming soon",
];

export function OrganizerDashboardPage() {
  const org = organizers.find((o) => o.id === "org-havana") ?? organizers[0];
  const orgEvents = events.filter((e) => e.organizerId === org.id);
  const stats = [
    { label: "Events live", value: "2" },
    { label: "RSVP interest this week", value: "179" },
    { label: "Source status", value: "Verified by organizer" },
    { label: "Last checked", value: "2026-06-02" },
  ];

  return (
    <AppShell>
      <PageHero
        eyebrow="Coming soon for organizers"
        title={<>Organizer <span className="text-terracotta">dashboard</span></>}
        description="A preview of how organizers will be able to manage event visibility, RSVP interest, schedule updates, and dancer-facing information on WhereWeDance."
      />

      <section className="px-5 mt-6">
        <ComingSoonBanner
          description="This dashboard is a prototype preview. Organizer actions are visual only and do not submit yet."
          bullets={[
            "Claim or manage organizer profiles.",
            "Submit event updates and schedule changes.",
            "Track RSVP interest.",
            "Generate clearer event copy and Good to Know notes later.",
          ]}
        />
      </section>

      <section className="px-5 mt-6">
        <div className="bg-ink text-paper rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-widest font-bold text-mango mb-2">
            Why organizers will use WhereWeDance
          </p>
          <ul className="space-y-2 text-[13px] leading-relaxed">
            {valueBullets.map((b) => (
              <li key={b}>· {b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-1">
          Example stats
        </h2>
        <p className="text-[11px] text-ink/60 mb-3">
          Example data only - not a real organizer account.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-3">
              <p className="text-[9px] uppercase tracking-widest font-bold text-ink/55">{s.label}</p>
              <p className="font-display italic text-xl text-ink mt-1 leading-tight">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">
          Dancer questions your event page answers
        </h2>
        <ul className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4 space-y-1.5">
          {dancerQuestions.map((q) => (
            <li key={q} className="text-[13px] text-ink/80 leading-snug">· {q}</li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Example submissions</h2>
        <ul className="space-y-2">
          {submissions.map((s) => (
            <li key={s.title} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-ink">{s.title}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${s.color}`}>
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Example live event pages</h2>
        <ul className="space-y-3">
          {orgEvents.map((e) => (
            <li key={e.id} className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display italic font-semibold text-lg text-ink">{e.title}</p>
                <p className="text-[11px] text-ink/60">{e.dateLabel}{e.scheduleLabel ? ` · ${e.scheduleLabel}` : ""}</p>
              </div>
              <p className="text-[12px] text-ink/65 mt-1">+{e.rsvps.count} RSVPs · {e.cost}</p>
              <div className="mt-2">
                <SourceLabel status={e.sourceStatus} lastVerified={e.lastVerified} />
              </div>
              <OfficialLinks
                subject={e.title}
                websiteUrl={e.websiteUrl ?? e.officialUrl}
                instagramUrl={e.instagramUrl}
                facebookUrl={e.facebookUrl}
                ticketUrl={e.ticketUrl}
                mapUrl={mapUrlForEvent(e)}
                className="mt-3"
              />
              <div className="mt-3 flex gap-2">
                <button type="button" className="px-3 py-1.5 rounded-full bg-ink text-paper text-[10px] font-bold uppercase tracking-widest">
                  Preview event page
                </button>
                <button type="button" disabled aria-disabled="true" className="px-3 py-1.5 rounded-full bg-paper ring-1 ring-ink/15 text-ink/50 text-[10px] font-bold uppercase tracking-widest cursor-not-allowed">
                  Update details - coming soon
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">Future quick schedule updates</h2>
        <div className="flex flex-wrap gap-2">
          {scheduleUpdates.map((u) => (
            <button
              key={u}
              type="button"
              disabled
              aria-disabled="true"
              className="px-3 py-2 rounded-full bg-paper ring-1 ring-ink/15 text-[11px] font-bold uppercase tracking-widest text-ink/50 cursor-not-allowed"
            >
              {u}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-2">Future AI copy helper</h2>
        <p className="text-[13px] text-ink/70 leading-relaxed mb-3">
          Draft clearer event descriptions, beginner-friendly blurbs, Instagram captions, and Good to Know notes from your event details.
        </p>
        <div className="flex flex-wrap gap-2">
          {aiHelpers.map((a) => (
            <button
              key={a}
              type="button"
              disabled
              aria-disabled="true"
              className="px-3 py-2 rounded-full bg-mango/50 text-ink/60 text-[11px] font-bold uppercase tracking-widest cursor-not-allowed"
            >
              {a}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <p className="text-[11px] text-ink/55 leading-relaxed">
          Prototype only - no organizer login, claim flow, edits, or submissions are active yet. Havana Club is shown as example data only.
        </p>
      </section>

      <section className="px-5 mt-8 mb-4">
        <div className="bg-paper ring-1 ring-ink/10 rounded-2xl p-5 text-center">
          <p className="font-display italic text-xl text-ink leading-tight">
            Run a class, social, pop-up, or community resource?
          </p>
          <p className="mt-1.5 text-[13px] text-ink/70">
            Contact us about organizer onboarding.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-oxblood text-paper text-[11px] font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-transform"
          >
            Organizer onboarding →
          </Link>
        </div>
      </section>
    </AppShell>
  );
}