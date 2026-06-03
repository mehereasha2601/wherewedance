import { createFileRoute } from "@tanstack/react-router";
import { EventDetailPage } from "@/components/pages/EventDetailPage";
import { eventBySlug } from "@/data/mock";

export const Route = createFileRoute("/events/$id")({
  head: ({ params }) => {
    const e = eventBySlug(params.id);
    const title = e ? `${e.title} - WhereWeDance` : "Event - WhereWeDance";
    const desc = e
      ? `${e.dayOfWeek}s at ${e.venue}. ${e.beginnerLabel}. ${e.bachataRelevance}.`
      : "Boston bachata event details.";
    const path = `/events/${params.id}`;
    const scripts = e
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: e.title,
              description: desc,
              startDate: e.fixedDate ?? undefined,
              location: {
                "@type": "Place",
                name: e.venue,
                address: e.address,
              },
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
        { property: "og:type", content: "article" },
        { property: "og:url", content: path },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts,
    };
  },
  component: function EventDetailRoute() {
    const { id } = Route.useParams();
    return <EventDetailPage slug={id} />;
  },
});