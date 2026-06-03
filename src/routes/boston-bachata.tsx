import { createFileRoute } from "@tanstack/react-router";
import { BostonBachataPage } from "@/components/pages/BostonBachataPage";

export const Route = createFileRoute("/boston-bachata")({
  head: () => ({
    meta: [
      { title: "Boston Bachata Scene - WhereWeDance" },
      { name: "description", content: "A plain-words guide to Boston bachata: weekly rhythm, key venues, etiquette." },
      { property: "og:title", content: "Boston Bachata Scene" },
      { property: "og:description", content: "A plain-words guide to Boston bachata." },
      { property: "og:url", content: "/boston-bachata" },
    ],
    links: [{ rel: "canonical", href: "/boston-bachata" }],
  }),
  component: BostonBachataPage,
});