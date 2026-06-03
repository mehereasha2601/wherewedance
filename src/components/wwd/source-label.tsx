import type { SourceStatus } from "@/data/mock";

const dotColor: Record<SourceStatus, string> = {
  "Verified by organizer": "bg-magenta",
  "Verified by community": "bg-terracotta",
  "From public listing": "bg-mango",
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