import { useState } from "react";
import { AppShell, PageHero } from "@/components/wwd/shell";
import { AskAnswer } from "@/components/wwd/ask-answer";
import { AiCaveat } from "@/components/wwd/ai-caveat";
import { askPrompts } from "@/data/mock";

export function AskPage() {
  const [activeId, setActiveId] = useState(askPrompts[0].id);
  const active = askPrompts.find((p) => p.id === activeId) ?? askPrompts[0];

  return (
    <AppShell>
      <PageHero
        eyebrow="Ask WhereWeDance"
        title={<>A grounded <span className="text-terracotta">local guide.</span></>}
        description="Preview curated answers from listed events, organizers, and resources. Real AI-powered recommendations are coming soon."
      />

      <section className="px-5 mt-6">
        <div className="rounded-2xl bg-mango/15 ring-1 ring-mango/40 px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest font-bold text-oxblood mb-1">
            Coming soon
          </p>
          <p className="text-[13px] text-ink leading-relaxed">
            Ask WhereWeDance is a prototype preview. These are curated mock
            answers based on currently listed events and resources. No real AI
            calls are made yet.
          </p>
        </div>
      </section>

      <section className="px-5 mt-3">
        <AiCaveat />
      </section>

      <section className="px-5 mt-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55 mb-2">
          Suggested prompts
        </p>
        <div className="w-full max-w-full overflow-x-auto overscroll-x-contain no-scrollbar pb-2 [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-nowrap items-center gap-2">
            {askPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-lg text-[12px] font-medium ring-1 transition-colors ${
                  p.id === activeId
                    ? "bg-terracotta text-paper ring-terracotta"
                    : "bg-paper text-ink ring-ink/15"
                }`}
              >
                "{p.prompt}"
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 mt-8">
        <AskAnswer prompt={active} />
      </section>

      <section className="px-5 mt-8">
        <div className="bg-ink/5 rounded-2xl p-4 text-[12px] text-ink/70 leading-relaxed">
          <p className="font-bold text-ink mb-1">What this is not</p>
          <p>
            This is not a live chatbot yet, not private messaging, not an
            emergency/safety reporting service, and not a replacement for
            organizer announcements. The current version shows curated mock
            answers only.
          </p>
        </div>
      </section>
    </AppShell>
  );
}