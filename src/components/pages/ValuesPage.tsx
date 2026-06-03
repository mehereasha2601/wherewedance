import { AppShell, PageHero } from "@/components/wwd/shell";
import { values } from "@/data/mock";

export function ValuesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Our floor, our values"
        title={<>The kind of floor we <span className="text-terracotta">want.</span></>}
        description="A living guide for safer, kinder social dancing."
      />

      <section className="px-5 mt-6">
        <div className="bg-mango/15 ring-1 ring-mango/40 rounded-2xl p-4 text-[13px] text-ink/80 leading-relaxed">
          These values are not a replacement for organizer policies or emergency support. They are a shared guide for the kind of floor we want to encourage.
        </div>
      </section>

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