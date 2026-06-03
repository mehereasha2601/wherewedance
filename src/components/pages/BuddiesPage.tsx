import { AppShell, PageHero } from "@/components/wwd/shell";
import { BuddyCard } from "@/components/wwd/buddy-card";
import { ComingSoonBanner } from "@/components/wwd/coming-soon-banner";
import { buddies } from "@/data/mock";

export function BuddiesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Practice Buddy Board"
        title={<>Find someone to <span className="text-terracotta">drill with</span> - coming soon.</>}
        description="We're designing a safer way for dancers to find practice partners based on level, goals, location, availability, and comfort preferences."
      />

      <section className="px-5 mt-6">
        <ComingSoonBanner
          description="This feature is not active yet. No posts are real, and no private messaging is available in this prototype."
          bullets={[
            "Create a dancer profile.",
            "Share your level, role, goals, and availability.",
            "Choose what information is public.",
            "Connect at public classes, socials, or practice spaces first.",
          ]}
        />
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">
          How it will work
        </h2>
        <ul className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4 space-y-1.5">
          {[
            "Create a dancer profile.",
            "Share your level, role, goals, and availability.",
            "Choose what information is public.",
            "Find dancers with similar practice goals.",
            "Connect at public classes, socials, or practice spaces first.",
          ].map((s) => (
            <li key={s} className="text-[13px] text-ink/80 leading-snug">· {s}</li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-6 bg-mango/15 ring-1 ring-mango/40 rounded-2xl p-4">
        <p className="text-[10px] uppercase tracking-widest font-bold text-ink mb-1">
          Safety note
        </p>
        <p className="text-[12px] text-ink/80 leading-relaxed">
          Practice buddies are best for dancers who have taken at least a few
          classes. If you are completely new, start with structured classes first.
        </p>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-3">
          Community safety
        </h2>
        <ul className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4 space-y-1.5">
          {[
            "Meet in public dance spaces when possible.",
            "Discuss goals and comfort before practicing.",
            "Do not attempt dips, tricks, lifts, or advanced sensual movements without training and consent.",
            "Respect boundaries and end practice if either person feels uncomfortable.",
          ].map((s) => (
            <li key={s} className="text-[13px] text-ink/80 leading-snug">· {s}</li>
          ))}
        </ul>
      </section>

      <section className="px-5 mt-8">
        <h2 className="font-display italic font-semibold text-2xl text-ink mb-1">
          Example practice posts
        </h2>
        <p className="text-[11px] text-ink/60 mb-3">
          Example posts only - not real users.
        </p>
        <div className="space-y-3">
          {buddies.map((b) => (
            <BuddyCard key={b.id} buddy={b} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}