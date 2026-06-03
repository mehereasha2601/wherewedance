import { createFileRoute } from "@tanstack/react-router";
import { SafetyPage } from "@/components/pages/SafetyPage";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety Concern — WhereWeDance" },
      { name: "description", content: "Report privately to the safety team. Anonymous optional." },
      { property: "og:title", content: "Report a Safety Concern" },
      { property: "og:description", content: "Private. Anonymous optional. Not a public accusation wall. Not an emergency service." },
    ],
  }),
  component: SafetyPage,
});