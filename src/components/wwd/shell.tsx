import type { ReactNode } from "react";
import { Link } from "./ui-router";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto w-full max-w-md min-h-screen relative pb-32">
        <header className="px-5 pt-6 flex justify-between items-center">
          <Link
            to="/"
            className="font-display italic font-semibold text-xl leading-none text-ink"
          >
            Where<span className="text-terracotta">We</span>Dance
          </Link>
          <Link
            to="/boston-bachata"
            className="text-[10px] uppercase tracking-widest font-bold text-ink/60 border border-ink/15 rounded-full px-3 py-1.5"
          >
            Boston Bachata
          </Link>
        </header>
        <main className="mt-4">{children}</main>
        <footer className="px-5 mt-16 mb-8 space-y-3">
          <p className="text-[11px] text-ink/65 leading-relaxed">
            Based on currently listed WhereWeDance data. Check the organizer's official posts before going - we're a local guide, not a live source of truth.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">
            © 2026 WhereWeDance · Boston pilot · UI prototype
          </p>
          <nav className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-ink/55">
            <Link to="/values">Values</Link>
            <Link to="/safety">Safety</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/beginner-guide">Beginner guide</Link>
            <Link to="/organizers">Organizers</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </footer>
      </div>
      <BottomNav />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  trailing,
}: {
  eyebrow?: string;
  title: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="px-5 mb-4 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display italic font-semibold text-3xl leading-none text-ink">
          {title}
        </h2>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="px-5 pt-8 pb-2">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display italic font-semibold text-5xl leading-[0.95] text-ink tracking-tight text-balance">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-lg leading-snug font-medium text-ink/75 text-pretty max-w-[32ch]">
          {description}
        </p>
      )}
    </section>
  );
}