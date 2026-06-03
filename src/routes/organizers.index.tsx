import { createFileRoute } from "@tanstack/react-router";
import { OrganizersPage } from "@/components/pages/OrganizersPage";

export const Route = createFileRoute("/organizers/")({
  head: () => ({
    meta: [
      { title: "Organizers — WhereWeDance" },
      { name: "description", content: "Studios, collectives, and community groups behind Boston's bachata nights." },
      { property: "og:title", content: "Boston Bachata Organizers" },
      { property: "og:description", content: "Studios, collectives, and community groups behind Boston's bachata nights." },
    ],
  }),
  component: OrganizersPage,
});