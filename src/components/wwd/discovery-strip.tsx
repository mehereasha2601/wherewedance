/**
 * Horizontally scrollable strip of compact event cards used on the homepage to surface tonight / this-week picks.
 */
import { Link } from "./ui-router";

type ChipTo = "/beginner-guide" | "/values" | "/safety" | "/resources" | "/organizers";

const chips: { to: ChipTo; label: string; dot: string; rotate: string }[] = [
  { to: "/beginner-guide", label: "Beginner Guide", dot: "bg-mango", rotate: "-rotate-1" },
  { to: "/values", label: "Values", dot: "bg-terracotta", rotate: "rotate-1" },
  { to: "/safety", label: "Safety", dot: "bg-magenta", rotate: "-rotate-1" },
  { to: "/resources", label: "Resources", dot: "bg-oxblood", rotate: "rotate-1" },
  { to: "/organizers", label: "Organizers", dot: "bg-ink", rotate: "-rotate-1" },
];

export function DiscoveryStrip() {
  return (
    <nav
      aria-label="Discover"
      className="px-5"
    >
      <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55 mb-2">
        Start here
      </p>
      <ul className="flex gap-2 flex-wrap">
        {chips.map((c) => (
          <li key={c.to}>
            <Link
              to={c.to}
              className={`inline-flex items-center gap-2 bg-paper ring-1 ring-ink/15 rounded-2xl px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-widest text-ink shadow-[2px_2px_0_0_rgba(43,26,26,0.12)] hover:-translate-y-0.5 transition-transform ${c.rotate}`}
            >
              <span className={`size-2 rounded-full ${c.dot}`} />
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}