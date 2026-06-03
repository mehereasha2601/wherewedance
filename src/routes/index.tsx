import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhereWeDance — Boston Bachata" },
      { name: "description", content: "Find where to dance, who's going, and how to join in. A local guide to Boston's bachata scene." },
      { property: "og:title", content: "WhereWeDance — Boston Bachata" },
      { property: "og:description", content: "Find where to dance, who's going, and how to join in." },
    ],
  }),
  component: HomePage,
});
