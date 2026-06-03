import { createFileRoute } from "@tanstack/react-router";
import { OrganizerDashboardPage } from "@/components/pages/OrganizerDashboardPage";

export const Route = createFileRoute("/organizer-dashboard")({
  head: () => ({
    meta: [
      { title: "Organizer Dashboard - WhereWeDance" },
      { name: "description", content: "Submissions, verification status, and weekly RSVPs at a glance." },
      { property: "og:title", content: "Organizer Dashboard" },
      { property: "og:description", content: "Submissions, verification status, and weekly RSVPs." },
      { property: "og:url", content: "/organizer-dashboard" },
    ],
    links: [{ rel: "canonical", href: "/organizer-dashboard" }],
  }),
  component: OrganizerDashboardPage,
});