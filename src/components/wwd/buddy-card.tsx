import type { Buddy } from "@/data/mock";

export function BuddyCard({ buddy }: { buddy: Buddy }) {
  return (
    <article className="bg-paper rounded-2xl ring-1 ring-ink/10 p-4 border-l-4 border-terracotta">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] leading-relaxed text-ink">"{buddy.lookingFor}"</p>
        <span className="text-[10px] text-ink/50 whitespace-nowrap">{buddy.postedAt}</span>
      </div>
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-mango grid place-items-center text-[10px] font-bold text-ink">
            {buddy.initials}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-ink leading-none">{buddy.name}</p>
            <p className="text-[10px] text-ink/60 mt-0.5">
              {buddy.level} · {buddy.role} · {buddy.neighborhood}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-ink text-paper opacity-90"
          title="Visual only - messaging is out of scope for this prototype."
        >
          Wave hello
        </button>
      </div>
    </article>
  );
}