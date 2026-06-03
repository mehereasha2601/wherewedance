import { AppShell, PageHero } from "@/components/wwd/shell";
import { Link } from "@/components/wwd/ui-router";
import { NextImprovements } from "@/components/wwd/next-improvements";

type Item = {
  to:
    | "/beginner-guide"
    | "/values"
    | "/safety"
    | "/resources"
    | "/organizers"
    | "/organizer-dashboard"
    | "/contact";
  label: string;
  blurb: string;
  accent: string;
};

const items: Item[] = [
  { to: "/beginner-guide", label: "Beginner Guide", blurb: "A safe order to enter Boston bachata from zero.", accent: "bg-mango" },
  { to: "/values", label: "Community Values", blurb: "The kind of floor we're trying to keep.", accent: "bg-terracotta" },
  { to: "/safety", label: "Safety", blurb: "Report a concern privately to the safety team.", accent: "bg-magenta" },
  { to: "/resources", label: "Resources", blurb: "Community docs, comps, playlists, and groups.", accent: "bg-oxblood" },
  { to: "/organizers", label: "Organizers", blurb: "Studios, collectives, and people running the floors.", accent: "bg-ink" },
  { to: "/contact", label: "Contact / Feedback", blurb: "Suggest a correction, a resource, or a new city or style.", accent: "bg-terracotta" },
  { to: "/organizer-dashboard", label: "Organizer Dashboard Preview", blurb: "Mock-only - what organizers see when they sign in.", accent: "bg-ink/60" },
];

export function MorePage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="More"
        title={<>Everything <span className="text-terracotta">else.</span></>}
        description="Beginner guide, values, safety, resources, and organizer tools."
      />
      <ul className="px-5 mt-6 grid gap-3">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="block bg-paper ring-1 ring-ink/10 rounded-2xl p-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center gap-3">
                <span className={`size-3 rounded-full ${i.accent}`} />
                <h2 className="font-display italic font-semibold text-xl text-ink">
                  {i.label}
                </h2>
              </div>
              <p className="text-[13px] text-ink/70 mt-1.5 leading-snug">{i.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <NextImprovements />
      </div>
    </AppShell>
  );
}