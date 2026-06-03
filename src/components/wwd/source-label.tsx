import type { SourceStatus } from "@/data/mock";

const dotColor: Record<SourceStatus, string> = {
  "Verified by organizer": "bg-magenta",
  "Verified by community": "bg-terracotta",
  "From public listing": "bg-mango",
  "Official website / Instagram / public listings": "bg-emerald-500",
  "Instagram / verified": "bg-magenta",
  "Official website": "bg-emerald-500",
  "Community-known / private group": "bg-ink/60",
  "WhereWeDance guide": "bg-terracotta",
  "Official website / Facebook": "bg-emerald-500",
  "Official website / Instagram": "bg-emerald-500",
  "Instagram / community-known": "bg-magenta",
  "Instagram / Facebook": "bg-magenta",
  "Instagram / Facebook / public listing": "bg-mango",
  "Public Spotify playlist / Instagram": "bg-emerald-500",
  "Public SoundCloud / Instagram": "bg-emerald-500",
  "Community-known": "bg-ink/60",
  "Check official source": "bg-mango",
  "Official Instagram / organizer post": "bg-magenta",
  "Official Instagram / domain-expert confirmed Bachata music": "bg-magenta",
  "Community-updated / WhatsApp announcement": "bg-terracotta",
  "Partiful / community event": "bg-mango",
  "Needs validation": "bg-ink/40",
};

export function SourceLabel({
  status,
  lastVerified,
}: {
  status: SourceStatus;
  lastVerified: string;
}) {
  return (
    <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-widest text-ink/60 font-medium">
      <span className={`size-1.5 rounded-full ${dotColor[status]}`} />
      <span>{status}</span>
      <span className="text-ink/30" aria-hidden>·</span>
      <span>Verified {lastVerified}</span>
    </div>
  );
}