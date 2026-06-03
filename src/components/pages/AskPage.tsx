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
        description="Mock answers in this prototype — no AI calls. Every reply cites the listed events and resources it pulled from."
      />

      <section className="px-5 mt-6">
        <AiCaveat />
      </section>

      <section className="px-5 mt-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-ink/55 mb-2">
          Suggested prompts
        </p>
        <div className="flex flex-wrap gap-2">
          {askPrompts.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`px-3 py-2 rounded-lg text-[12px] font-medium ring-1 transition-colors ${
                p.id === activeId
                  ? "bg-terracotta text-paper ring-terracotta"
                  : "bg-paper text-ink ring-ink/15"
              }`}
            >
              "{p.prompt}"
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <AskAnswer prompt={active} />
      </section>

      <section className="px-5 mt-8">
        <div className="bg-ink/5 rounded-2xl p-4 text-[12px] text-ink/70 leading-relaxed">
          <p className="font-bold text-ink mb-1">What this is not</p>
          <p>
            Not a chatbot, not a private messaging tool, and not a substitute
            for the organizer's own announcements. We don't store your
            questions or share them with organizers.
          </p>
        </div>
      </section>
    </AppShell>
  );
}