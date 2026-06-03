import { createFileRoute } from "@tanstack/react-router";
import { BeginnerGuidePage } from "@/components/pages/BeginnerGuidePage";

export const Route = createFileRoute("/beginner-guide")({
  head: () => ({
    meta: [
      { title: "Beginner Guide — WhereWeDance" },
      { name: "description", content: "From zero to your first social. A safe route into Boston bachata." },
      { property: "og:title", content: "Beginner Guide to Boston Bachata" },
      { property: "og:description", content: "From zero to your first social." },
    ],
  }),
  component: BeginnerGuidePage,
});