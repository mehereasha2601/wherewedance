import { createFileRoute } from "@tanstack/react-router";
import { AskPage } from "@/components/pages/AskPage";
import { askPrompts } from "@/data/mock";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Ask WhereWeDance - Local Bachata Guide" },
      { name: "description", content: "A grounded local guide to Boston bachata. Answers cite the events and resources they came from." },
      { property: "og:title", content: "Ask WhereWeDance" },
      { property: "og:description", content: "A grounded local guide to Boston bachata." },
      { property: "og:url", content: "/ask" },
    ],
    links: [{ rel: "canonical", href: "/ask" }],
    scripts: [
      {
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: askPrompts.map((p) => ({
            "@type": "Question",
            name: p.prompt,
            acceptedAnswer: {
              "@type": "Answer",
              text: p.answer.body,
            },
          })),
        }),
      },
    ],
  }),
  component: AskPage,
});