import { AppShell, PageHero } from "@/components/wwd/shell";
import { BuddyCard } from "@/components/wwd/buddy-card";
import { buddies } from "@/data/mock";

export function BuddiesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Practice buddy board"
        title={<>Find someone to <span className="text-terracotta">drill with.</span></>}
        description="Public posts only. No private messaging in this prototype - connect at the next social you both list."
      />

      <section className="px-5 mt-6 bg-mango/15 ring-1 ring-mango/40 rounded-2xl p-4">
        <p className="text-[12px] text-ink/80 leading-relaxed">
          <span className="font-bold">How this works:</span> post what you're
          working on. Other dancers wave hello publicly. No DMs, no carpooling,
          no phone numbers shared on platform.
        </p>
      </section>

      <section className="px-5 mt-6">
        <button className="w-full py-4 rounded-2xl bg-ink text-paper text-[12px] font-bold uppercase tracking-widest">
          + Post what you're working on
        </button>
      </section>

      <section className="px-5 mt-6 space-y-3">
        {buddies.map((b) => (
          <BuddyCard key={b.id} buddy={b} />
        ))}
      </section>
    </AppShell>
  );
}