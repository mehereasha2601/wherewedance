import { AppShell, PageHero } from "@/components/wwd/shell";

export function SafetyPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Safety concern"
        title={<>Report <span className="text-terracotta">privately.</span></>}
        description="Submitted only to the WhereWeDance safety team. Nothing here is published."
      />

      <section className="px-5 mt-6 space-y-3">
        <div className="bg-mango text-ink rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Prototype</p>
          <p className="text-[13px] font-medium leading-snug">
            Prototype only — no report is submitted yet.
          </p>
        </div>
        <div className="bg-ink text-paper rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-widest font-bold text-mango mb-2">
            Before you submit
          </p>
          <ul className="space-y-2 text-[13px] leading-relaxed">
            <li>· <span className="font-bold">Reports are private.</span> Only the safety team reads them.</li>
            <li>· <span className="font-bold">Anonymous submission is optional.</span> Leave your name blank if you prefer.</li>
            <li>· <span className="font-bold">This is not a public accusation wall.</span> We do not publish names, screenshots, or stories.</li>
            <li>· <span className="font-bold">This is not an emergency service.</span> For emergencies, contact local emergency services or a trusted person nearby.</li>
          </ul>
        </div>
      </section>

      <form
        className="px-5 mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Prototype only — no submission is sent.");
        }}
      >
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest font-bold text-ink/60">
            What happened
          </span>
          <textarea
            rows={5}
            placeholder="Describe in your own words. As much or as little as you want to share."
            className="mt-1 w-full bg-paper ring-1 ring-ink/15 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest font-bold text-ink/60">
            Where / when (optional)
          </span>
          <input
            type="text"
            placeholder="Event, venue, date"
            className="mt-1 w-full bg-paper ring-1 ring-ink/15 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest font-bold text-ink/60">
            Your name (optional — leave blank to stay anonymous)
          </span>
          <input
            type="text"
            placeholder="Anonymous"
            className="mt-1 w-full bg-paper ring-1 ring-ink/15 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </label>

        <label className="flex items-start gap-2 text-[12px] text-ink/75 leading-relaxed">
          <input type="checkbox" className="mt-0.5" />
          <span>
            I understand this is not an emergency service and not a public
            accusation wall.
          </span>
        </label>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-terracotta text-paper text-[12px] font-bold uppercase tracking-widest"
        >
          Send privately to safety team
        </button>

        <p className="text-[11px] text-ink/55 leading-relaxed">
          Prototype only — this form does not submit anywhere.
        </p>
      </form>
    </AppShell>
  );
}