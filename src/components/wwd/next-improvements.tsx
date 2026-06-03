/**
 * Roadmap list of upcoming improvements, shown on the More page.
 */
const ROADMAP = [
  {
    title: "Real-time verified listings",
    body: "Move from curated mock data to database-backed event and organizer pages with source links, last-verified dates, and correction requests.",
    accent: "bg-terracotta",
  },
  {
    title: "Organizer onboarding",
    body: "Let organizers claim profiles, submit event updates, and manage RSVP interest.",
    accent: "bg-oxblood",
  },
  {
    title: "RSVP + who's going",
    body: "Let dancers RSVP with privacy controls and see who else is going.",
    accent: "bg-mango",
  },
  {
    title: "Ask WhereWeDance AI",
    body: "Turn the mock concierge into a real retrieval-grounded assistant that answers from verified WhereWeDance data.",
    accent: "bg-magenta",
  },
  {
    title: "Practice Buddy Board",
    body: "Launch safer practice buddy posts with level, goals, availability, comfort preferences, and public-first safety guidance.",
    accent: "bg-ink",
  },
  {
    title: "More cities and dance styles",
    body: "Expand beyond Boston Bachata into Salsa, Zouk, and other local dance scenes.",
    accent: "bg-terracotta",
  },
  {
    title: "Better resources",
    body: "Add playlists, online learning, private group access instructions, shoes/apparel guides, studios, organizers, and community education resources.",
    accent: "bg-oxblood",
  },
];

export function NextImprovements() {
  return (
    <section className="px-5">
      <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta mb-2">
        Roadmap
      </p>
      <h2 className="font-display italic font-semibold text-3xl text-ink leading-none mb-4">
        What's coming next
      </h2>
      <ul className="grid gap-3">
        {ROADMAP.map((r) => (
          <li
            key={r.title}
            className="bg-paper ring-1 ring-ink/10 rounded-2xl p-4"
          >
            <div className="flex items-center gap-2.5">
              <span className={`size-2.5 rounded-full ${r.accent}`} />
              <h3 className="font-display italic font-semibold text-lg text-ink leading-tight">
                {r.title}
              </h3>
            </div>
            <p className="text-[13px] text-ink/70 mt-1.5 leading-snug">
              {r.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}