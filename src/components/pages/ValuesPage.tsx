import { AppShell, PageHero } from "@/components/wwd/shell";
import { values } from "@/data/mock";

export function ValuesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Our floor, our rules"
        title={<>The non-<span className="text-terracotta">negotiables.</span></>}
        description="Co-written with local organizers. Not enforcement, not policing — just the floor we're trying to keep."
      />

      <ol className="px-5 mt-8 space-y-4">
        {values.map((v, i) => (
          <li key={v.id} className="bg-ink text-paper rounded-3xl p-6 ring-1 ring-black/5">
            <div className="flex gap-4">
              <span className="font-display italic text-mango text-3xl leading-none shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display italic font-semibold text-2xl leading-tight">
                  {v.title}
                </h2>
                <p className="text-sm text-paper/70 mt-1">{v.short}</p>
                <p className="text-[13px] text-paper/80 mt-3 leading-relaxed">{v.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </AppShell>
  );
}