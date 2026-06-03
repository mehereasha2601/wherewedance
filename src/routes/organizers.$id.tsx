import { createFileRoute } from "@tanstack/react-router";
import { OrganizerProfilePage } from "@/components/pages/OrganizerProfilePage";
import { organizerBySlug } from "@/data/mock";

export const Route = createFileRoute("/organizers/$id")({
  head: ({ params }) => {
    const o = organizerBySlug(params.id);
    const title = o ? `${o.name} — WhereWeDance` : "Organizer — WhereWeDance";
    return {
      meta: [
        { title },
        { name: "description", content: o?.bio ?? "Boston bachata organizer." },
        { property: "og:title", content: title },
        { property: "og:description", content: o?.bio ?? "Boston bachata organizer." },
      ],
    };
  },
  component: function OrganizerRoute() {
    const { id } = Route.useParams();
    return <OrganizerProfilePage slug={id} />;
  },
});