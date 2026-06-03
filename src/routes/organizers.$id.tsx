import { createFileRoute } from "@tanstack/react-router";
import { OrganizerProfilePage } from "@/components/pages/OrganizerProfilePage";
import { organizerBySlug } from "@/data/mock";

export const Route = createFileRoute("/organizers/$id")({
  head: ({ params }) => {
    const o = organizerBySlug(params.id);
    const title = o ? `${o.name} - WhereWeDance` : "Organizer - WhereWeDance";
    const desc = o?.bio ?? "Boston bachata organizer.";
    const path = `/organizers/${params.id}`;
    const scripts = o
      ? [
          {
            type: "application/ld+json" as const,
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: o.name,
              description: desc,
              url: o.websiteUrl ?? `https://wherewedance.lovable.app${path}`,
            }),
          },
        ]
      : [];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: path },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts,
    };
  },
  component: function OrganizerRoute() {
    const { id } = Route.useParams();
    return <OrganizerProfilePage slug={id} />;
  },
});