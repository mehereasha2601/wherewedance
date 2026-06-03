import { Link } from "./ui-router";
import { askPrompts } from "@/data/mock";

export function AskCard() {
  const prompts = askPrompts.slice(0, 4);
  return (
    <Link
      to="/ask"
      className="block bg-terracotta text-paper rounded-3xl p-6 relative overflow-hidden ring-1 ring-black/5"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display italic font-semibold text-2xl leading-tight">
            Ask WhereWeDance
          </h2>
          <span className="text-[10px] uppercase tracking-widest bg-paper/15 px-2 py-1 rounded-full">
            Local guide
          </span>
        </div>
        <p className="text-paper/80 text-sm leading-relaxed max-w-[34ch]">
          A grounded local concierge. Answers come from real listed events and
          community-verified resources.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {prompts.map((p) => (
            <span
              key={p.id}
              className="px-3 py-1.5 bg-paper/10 rounded-lg text-xs font-medium border border-paper/20"
            >
              "{p.prompt}"
            </span>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 size-40 bg-mango/30 rounded-full blur-2xl" />
    </Link>
  );
}