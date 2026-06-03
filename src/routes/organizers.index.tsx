import { createFileRoute } from "@tanstack/react-router";
import { OrganizersPage } from "@/components/pages/OrganizersPage";
import { organizers } from "@/data/mock";

export const Route = createFileRoute("/organizers/")({
  head: () => ({
    meta: [
      { title: "Organizers - WhereWeDance" },
      { name: "description", content: "Studios, collectives, and community groups behind Boston's bachata nights." },
      { property: "og:title", content: "Boston Bachata Organizers" },
      { property: "og:description", content: "Studios, collectives, and community groups behind Boston's bachata nights." },
      { property: "og:url", content: "/organizers" },
    ],
    links: [{ rel: "canonical", href: "/organizers" }],
    scripts: [
      {
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Boston Bachata Organizers",
          itemListElement: organizers.map((o, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://wherewedance.lovable.app/organizers/${o.slug}`,
            name: o.name,
          })),
        }),
      },
    ],
  }),
  component: OrganizersPage,
});