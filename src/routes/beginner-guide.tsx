import { createFileRoute } from "@tanstack/react-router";
import { BeginnerGuidePage } from "@/components/pages/BeginnerGuidePage";

export const Route = createFileRoute("/beginner-guide")({
  head: () => ({
    meta: [
      { title: "Beginner Guide - WhereWeDance" },
      { name: "description", content: "From zero to your first social. A safe route into Boston bachata." },
      { property: "og:title", content: "Beginner Guide to Boston Bachata" },
      { property: "og:description", content: "From zero to your first social." },
      { property: "og:url", content: "/beginner-guide" },
    ],
    links: [{ rel: "canonical", href: "/beginner-guide" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Beginner Guide to Boston Bachata",
          description: "From zero to your first social. A safe route into Boston bachata.",
          author: { "@type": "Organization", name: "WhereWeDance" },
        }),
      },
    ],
  }),
  component: BeginnerGuidePage,
});