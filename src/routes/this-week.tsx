import { createFileRoute } from "@tanstack/react-router";
import { ThisWeekPage } from "@/components/pages/ThisWeekPage";

export const Route = createFileRoute("/this-week")({
  head: () => ({
    meta: [
      { title: "This Week in Boston Bachata - WhereWeDance" },
      { name: "description", content: "Every Boston bachata social and class, night by night." },
      { property: "og:title", content: "This Week in Boston Bachata" },
      { property: "og:description", content: "Every Boston bachata social and class, night by night." },
    ],
  }),
  component: ThisWeekPage,
});