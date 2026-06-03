import type { ReactNode } from "react";

type Variant = "feature" | "contact" | "organizer" | "safety";

interface ComingSoonBannerProps {
  eyebrow?: string;
  title?: ReactNode;
  description: ReactNode;
  bullets?: string[];
  variant?: Variant;
  className?: string;
}

export function ComingSoonBanner({
  eyebrow = "Coming soon",
  title,
  description,
  bullets,
  variant = "feature",
  className = "",
}: ComingSoonBannerProps) {
  // Single shared pink/magenta visual treatment across Ask, Buddies,
  // Organizer Dashboard, and Contact. Variant is accepted for future use
  // but currently maps to one consistent pink style.
  void variant;

  return (
    <section
      className={`bg-magenta/10 ring-1 ring-magenta/25 rounded-3xl p-4 ${className}`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="inline-block size-2 rounded-full bg-magenta" />
        <span className="text-[10px] uppercase tracking-widest font-bold bg-oxblood text-paper px-2 py-0.5 rounded-full">
          {eyebrow}
        </span>
      </div>
      {title && (
        <p className="font-display italic font-semibold text-lg text-ink leading-tight mb-1">
          {title}
        </p>
      )}
      <p className="text-[13px] text-ink/80 leading-relaxed">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1">
          {bullets.map((b) => (
            <li key={b} className="text-[12px] text-ink/75 leading-snug">
              · {b}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}