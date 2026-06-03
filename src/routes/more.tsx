import { createFileRoute } from "@tanstack/react-router";
import { MorePage } from "@/components/pages/MorePage";

export const Route = createFileRoute("/more")({
  head: () => ({
    meta: [
      { title: "Dance Resources & Community Tools — WhereWeDance" },
      { name: "description", content: "Beginner guide, community values, safety policies, curated resources, and tools for organizers running Boston bachata events." },
      { property: "og:title", content: "Dance Resources & Community Tools" },
      { property: "og:description", content: "Beginner guide, community values, safety policies, curated resources, and tools for organizers running Boston bachata events." },
      { property: "og:url", content: "/more" },
    ],
    links: [{ rel: "canonical", href: "/more" }],
  }),
  component: MorePage,
});