import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage } from "@/components/pages/ResourcesPage";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resource Directory - WhereWeDance" },
      { name: "description", content: "Community docs, comps, playlists, and groups. Each clearly labeled by privacy and verification." },
      { property: "og:title", content: "Boston Bachata Resources" },
      { property: "og:description", content: "Community docs, comps, playlists, and groups." },
    ],
  }),
  component: ResourcesPage,
});