import { createFileRoute } from "@tanstack/react-router";
import { ValuesPage } from "@/components/pages/ValuesPage";

export const Route = createFileRoute("/values")({
  head: () => ({
    meta: [
      { title: "Community Values — WhereWeDance" },
      { name: "description", content: "The floor we're trying to keep. Co-written with local organizers." },
      { property: "og:title", content: "WhereWeDance Community Values" },
      { property: "og:description", content: "The floor we're trying to keep." },
    ],
  }),
  component: ValuesPage,
});