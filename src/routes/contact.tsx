import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact WhereWeDance - Suggest, Correct, or Onboard" },
      {
        name: "description",
        content:
          "Report inaccurate listings, suggest resources, ask about organizer onboarding, request a new city or style, or share product feedback.",
      },
      { property: "og:title", content: "Contact WhereWeDance" },
      {
        property: "og:description",
        content:
          "Help us keep Boston Bachata listings accurate, useful, and community-safe.",
      },
    ],
  }),
  component: ContactPage,
});