import { createFileRoute } from "@tanstack/react-router";
import { MorePage } from "@/components/pages/MorePage";

export const Route = createFileRoute("/more")({
  head: () => ({
    meta: [
      { title: "More - WhereWeDance" },
      { name: "description", content: "Beginner guide, values, safety, resources, and organizer tools." },
      { property: "og:title", content: "More - WhereWeDance" },
      { property: "og:description", content: "Beginner guide, values, safety, resources, and organizer tools." },
    ],
  }),
  component: MorePage,
});