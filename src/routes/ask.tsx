import { createFileRoute } from "@tanstack/react-router";
import { AskPage } from "@/components/pages/AskPage";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Ask WhereWeDance — Local Bachata Guide" },
      { name: "description", content: "A grounded local guide to Boston bachata. Answers cite the events and resources they came from." },
      { property: "og:title", content: "Ask WhereWeDance" },
      { property: "og:description", content: "A grounded local guide to Boston bachata." },
    ],
  }),
  component: AskPage,
});