import { Link } from "./ui-router";

export function OrganizerCTA() {
  return (
    <section className="bg-ink text-paper rounded-3xl p-6 ring-1 ring-black/5">
      <p className="text-[10px] uppercase tracking-widest font-bold text-mango">
        For organizers
      </p>
      <h2 className="font-display italic font-semibold text-2xl leading-tight mt-2 text-balance">
        Hosting a class, social, pop-up, or community event?
      </h2>
      <p className="text-sm text-paper/75 mt-3 leading-relaxed max-w-[34ch]">
        Create or claim your organizer profile so dancers can find you, RSVP,
        and see a verified source on every listing.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/organizer-dashboard"
          className="inline-flex items-center px-4 py-2.5 rounded-full bg-mango text-ink text-[12px] font-bold uppercase tracking-widest"
        >
          Claim organizer profile
        </Link>
        <Link
          to="/organizer-dashboard"
          className="inline-flex items-center px-4 py-2.5 rounded-full border border-paper/30 text-[12px] font-bold uppercase tracking-widest"
        >
          See dashboard
        </Link>
      </div>
    </section>
  );
}