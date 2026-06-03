import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/pages/EventsPage";
import { events } from "@/data/mock";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "All Events - WhereWeDance" },
      { name: "description", content: "Every listed bachata social and class in Boston — with venues, beginner labels, and verification status." },
      { property: "og:title", content: "All Boston Bachata Events" },
      { property: "og:description", content: "Every listed bachata social and class in Boston — with venues, beginner labels, and verification status." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
    scripts: [
      {
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Boston Bachata Events",
          itemListElement: events.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://wherewedance.lovable.app/events/${e.slug}`,
            name: e.title,
          })),
        }),
      },
    ],
  }),
  component: EventsPage,
});