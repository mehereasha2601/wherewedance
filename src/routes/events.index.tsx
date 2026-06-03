import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/pages/EventsPage";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "All Events - WhereWeDance" },
      { name: "description", content: "Every listed bachata social and class in Boston." },
      { property: "og:title", content: "All Boston Bachata Events" },
      { property: "og:description", content: "Every listed bachata social and class in Boston." },
    ],
  }),
  component: EventsPage,
});