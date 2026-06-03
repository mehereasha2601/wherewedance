import type { Resource, ResourcePrivacy } from "@/data/mock";
import { SourceLabel } from "./source-label";
import { OfficialLinks } from "./official-links";

const privacyStyle: Record<ResourcePrivacy, string> = {
  "Public link": "bg-mango text-ink",
  "DM to join": "bg-terracotta text-paper",
  "Ask organizer": "bg-oxblood text-paper",
  "Private group": "bg-ink text-paper",
  "Needs validation": "bg-paper text-ink ring-1 ring-ink/30",
};

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="bg-paper rounded-2xl ring-1 ring-ink/10 p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display italic font-semibold text-lg leading-tight text-ink">
          {resource.name}
        </h3>
        <span
          className={`shrink-0 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${privacyStyle[resource.privacyStatus]}`}
        >
          {resource.privacyStatus}
        </span>
      </div>
      <p className="text-[13px] text-ink/75 leading-relaxed">{resource.description}</p>
      {resource.howToJoin && (
        <p className="mt-2 text-[12px] text-ink/70 leading-relaxed">
          <span className="font-bold text-ink">How to join: </span>
          {resource.howToJoin}
        </p>
      )}
      <OfficialLinks
        subject={resource.name}
        websiteUrl={resource.websiteUrl ?? resource.link}
        instagramUrl={resource.instagramUrl}
        facebookUrl={resource.facebookUrl}
        className="mt-3"
      />
      <div className="mt-3 pt-3 border-t border-ink/10 flex items-center justify-between flex-wrap gap-2">
        <SourceLabel status={resource.sourceStatus} lastVerified={resource.lastVerified} />
        <span className="text-[10px] uppercase tracking-widest font-bold text-ink/50">
          {resource.category}
        </span>
      </div>
    </article>
  );
}