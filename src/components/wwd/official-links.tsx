/**
 * Icon row of canonical outbound links (website, Instagram, Facebook, RSVP, Open maps). For community outings on Partiful, the website link is relabeled 'RSVP here'.
 */
import { Globe, Instagram, Facebook, MapPin, Ticket, Mail } from "lucide-react";

type LinkSpec = {
  href?: string;
  label: string;
  ariaLabel: string;
  icon: typeof Globe;
};

function IconLink({ href, label, ariaLabel, icon: Icon, showLabel = false }: LinkSpec & { showLabel?: boolean }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={ariaLabel}
      className={
        showLabel
          ? "inline-flex items-center gap-2 px-3 py-2 rounded-full bg-paper ring-1 ring-ink/15 text-ink text-[12px] font-semibold hover:-translate-y-0.5 hover:ring-terracotta/60 transition"
          : "inline-grid place-items-center size-9 rounded-full bg-paper ring-1 ring-ink/15 text-ink hover:-translate-y-0.5 hover:text-terracotta hover:ring-terracotta/60 transition"
      }
    >
      <Icon size={showLabel ? 14 : 16} strokeWidth={2} />
      {showLabel && <span>{label}</span>}
    </a>
  );
}

type OfficialLinksProps = {
  subject: string; // for aria labels, e.g. "Havana Club"
  websiteUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  ticketUrl?: string;
  officialUrl?: string;
  mapUrl?: string | null;
  email?: string;
  variant?: "icons" | "labeled";
  size?: "sm" | "md";
  className?: string;
};

function isPartifulLink(href?: string) {
  return Boolean(href && href.includes("partiful.com"));
}

/**
 * Renders a row of small icon buttons for the official/social links available
 * on an organizer, event, or resource. Hides any link that isn't set.
 * Returns null when there's nothing to show.
 */
export function OfficialLinks({
  subject,
  websiteUrl,
  instagramUrl,
  facebookUrl,
  ticketUrl,
  officialUrl,
  mapUrl,
  email,
  variant = "icons",
  className = "",
}: OfficialLinksProps) {
  // For Partiful/RSVP links, show "RSVP here" label instead of generic "Official" / "Website"
  const rsvpUrl = isPartifulLink(officialUrl) ? officialUrl : isPartifulLink(websiteUrl) ? websiteUrl : undefined;
  const websiteForDisplay = rsvpUrl ? undefined : websiteUrl;
  const officialForDisplay = rsvpUrl ? undefined : officialUrl;

  const links: LinkSpec[] = [
    { href: rsvpUrl, label: "RSVP here", ariaLabel: `RSVP to ${subject}`, icon: Ticket },
    { href: officialForDisplay, label: "Official", ariaLabel: `Open ${subject} official page`, icon: Globe },
    { href: websiteForDisplay, label: "Website", ariaLabel: `Open ${subject} website`, icon: Globe },
    { href: instagramUrl, label: "Instagram", ariaLabel: `Open ${subject} Instagram`, icon: Instagram },
    { href: facebookUrl, label: "Facebook", ariaLabel: `Open ${subject} Facebook`, icon: Facebook },
    { href: ticketUrl, label: "Tickets", ariaLabel: `Open ${subject} tickets / RSVP`, icon: Ticket },
    { href: mapUrl ?? undefined, label: "Open maps", ariaLabel: `Open ${subject} location in maps`, icon: MapPin },
    { href: email ? `mailto:${email}` : undefined, label: "Email", ariaLabel: `Email ${subject}`, icon: Mail },
  ];
  // Dedupe website vs official (if both point to same href, prefer Official)
  const seen = new Set<string>();
  const visible = links.filter((l) => {
    if (!l.href) return false;
    const key = `${l.icon.displayName ?? l.label}:${l.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (visible.length === 0) return null;
  const showLabel = variant === "labeled";
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {visible.map((l, i) => (
        <IconLink key={`${l.label}-${i}`} {...l} showLabel={showLabel} />
      ))}
    </div>
  );
}