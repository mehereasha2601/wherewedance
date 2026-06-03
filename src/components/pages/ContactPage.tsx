import { useState } from "react";
import { AppShell, PageHero } from "@/components/wwd/shell";

/*
 * TODO production:
 * Submit this form to a server-side route that sends email to
 * process.env.CONTACT_TO_EMAIL.
 * Do not expose the destination email in client-side code.
 * Set CONTACT_TO_EMAIL in server environment variables only
 * (never hardcode the address in JSX, and never use mailto: from this page).
 */

const TOPICS = [
  "Inaccurate event or organizer data",
  "Add a new event",
  "Add a new organizer/studio/resource",
  "Organizer onboarding",
  "Add a new city or dance style",
  "Safety/community concern",
  "Product feedback",
  "Other",
];

export function ContactPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [acknowledged, setAcknowledged] = useState(false);
  const isSafety = topic === "Safety/community concern";

  return (
    <AppShell>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Contact <span className="text-terracotta">WhereWeDance.</span>
          </>
        }
        description="Help us keep Boston Bachata listings accurate, useful, and community-safe."
      />

      <section className="px-5 mt-6">
        <p className="text-[13px] text-ink/75 leading-relaxed">
          Use this page to report inaccurate event data, suggest a new
          resource, ask about organizer onboarding, request a new city or
          style page, or share product feedback.
        </p>
      </section>

      <section className="px-5 mt-6 bg-magenta/15 ring-1 ring-magenta/40 rounded-2xl p-4">
        <p className="text-[10px] uppercase tracking-widest font-bold text-magenta mb-1">
          Prototype only
        </p>
        <p className="text-[12px] text-ink/80 leading-relaxed">
          No message is submitted yet. This form is a UI preview while we
          finish the backend.
        </p>
      </section>

      <form
        className="px-5 mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">
            Name (optional)
          </label>
          <input
            type="text"
            autoComplete="name"
            className="w-full bg-paper ring-1 ring-ink/15 rounded-xl px-3 py-2.5 text-[14px] text-ink"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">
            Email (optional)
          </label>
          <input
            type="email"
            autoComplete="email"
            className="w-full bg-paper ring-1 ring-ink/15 rounded-xl px-3 py-2.5 text-[14px] text-ink"
            placeholder="So we can follow up"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-paper ring-1 ring-ink/15 rounded-xl px-3 py-2.5 text-[14px] text-ink"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {isSafety && (
          <div className="bg-oxblood/10 ring-1 ring-oxblood/30 rounded-xl p-3 text-[12px] text-ink/80 leading-relaxed">
            If you are in immediate danger, contact local emergency services
            or a trusted person nearby. WhereWeDance is a community resource,
            not an emergency response service.
          </div>
        )}

        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">
            Related link (optional)
          </label>
          <input
            type="url"
            className="w-full bg-paper ring-1 ring-ink/15 rounded-xl px-3 py-2.5 text-[14px] text-ink"
            placeholder="Event page, Instagram post, official website, etc."
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">
            Message <span className="text-terracotta">*</span>
          </label>
          <textarea
            required
            rows={6}
            className="w-full bg-paper ring-1 ring-ink/15 rounded-xl px-3 py-2.5 text-[14px] text-ink resize-y"
            placeholder="Tell us what should be corrected, added, or improved."
          />
        </div>

        <label className="flex items-start gap-2 text-[12px] text-ink/75 leading-snug">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-0.5"
          />
          <span>I understand this prototype does not submit yet.</span>
        </label>

        <div>
          <button
            type="submit"
            disabled
            aria-disabled="true"
            title="Coming soon - submissions are not active in this prototype."
            className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-ink/40 text-paper text-[11px] font-bold uppercase tracking-widest cursor-not-allowed"
          >
            Submit feedback - coming soon
          </button>
          <p className="mt-2 text-[11px] text-ink/55 text-center">
            Prototype only - no message is submitted yet.
          </p>
        </div>
      </form>

      <section className="px-5 mt-10 mb-4">
        <div className="bg-ink/5 rounded-2xl p-4 text-[12px] text-ink/70 leading-relaxed">
          <p className="font-bold text-ink mb-1">What this is not</p>
          <p>
            Not a public message wall, not a private chat with organizers,
            and not an emergency channel. We don't display submitted
            messages and we don't route safety concerns to a public space.
          </p>
        </div>
      </section>
    </AppShell>
  );
}