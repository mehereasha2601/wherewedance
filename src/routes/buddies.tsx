import { createFileRoute } from "@tanstack/react-router";
import { BuddiesPage } from "@/components/pages/BuddiesPage";

export const Route = createFileRoute("/buddies")({
  head: () => ({
    meta: [
      { title: "Practice Buddy Board - WhereWeDance" },
      { name: "description", content: "Find someone to drill with. Public posts only, no DMs." },
      { property: "og:title", content: "Practice Buddy Board" },
      { property: "og:description", content: "Find someone to drill with." },
    ],
  }),
  component: BuddiesPage,
});