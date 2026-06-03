# Content & Editorial Guide

All user-visible content in WhereWeDance lives in
`src/data/mock.ts`. This guide is the editorial contract for that
file: how to add events, organizers, resources, and Ask prompts
without breaking the product's safety/accuracy posture.

## Golden rules

1. **If you can't verify it, don't claim it.** Use the existing
   `sourceStatus` and `lastVerified` fields. Prefer wording like
   "check official Instagram" / "check Facebook for latest updates"
   over hardcoded dates and one-off promises.
2. **Don't invent stale "next:" phrases.** Avoid "this Friday",
   "next Saturday", "next one is June 20". Use
   "Monthly / occasional — check official Instagram for current date"
   or `fixedDate: "YYYY-MM-DD"` plus the date helpers.
3. **Past one-off events should not be recommended as upcoming.**
   `isPastOneOff(event)` is already used by `AskAnswer` to filter
   recommendations. Keep the data accurate and the helper does the
   right thing.
4. **Bachata-heavy vs Bachata-included** is a precise label, not a
   vibe word. Use one of them exactly. **Never** use "Bachata-forward"
   or "Salsa-first with Bachata" in public copy — say
   "Bachata-focused" or "mixed Salsa/Bachata" instead.
5. **Prototype surfaces are clearly labeled.** Coming-soon pages
   (Ask, Buddies, Contact, Safety, Organizer Dashboard) must always
   render the shared `<ComingSoonBanner>` so users know nothing is
   submitted, sent, or AI-generated.

## Adding a new event

1. Pick an `id` (`evt-...` for socials, `event-...` for community
   outings) and a URL-safe `slug`.
2. Set `organizerId` to an existing entry in `organizers`. If the
   organizer is new, add them first.
3. Required fields: `title`, `venue`, `address`, `dayOfWeek`,
   `startsAt`, `endsAt`, `cover`, `bachataRelevance`,
   `beginnerLabel`, `classBeforeSocial`, `waterAvailability`,
   `alcoholPolicy`, `scheduleReliability`, `sourceStatus`,
   `lastVerified`, `goodToKnow`, `rsvps`, `cost`, `dateLabel`,
   `scheduleLabel`.
4. For one-off / pop-up events, set `popUp: true` and
   `fixedDate: "YYYY-MM-DD"`. `dateLabel` may be left as `""` — the
   date helpers will format it.
5. For community outings (e.g. Starry Boston), set
   `eventType: "Community outing"` and use `tags` like `Outdoor`,
   `Free`, `Community outing`. **Do not** set `bachataRelevance` to
   `Bachata-heavy` — community outings are not Bachata socials.
6. Provide a real official link in `officialUrl` / `websiteUrl` /
   `instagramUrl` / `facebookUrl` / `sourceUrl` so the card can link
   back to a verifiable source.
7. If the address is vague ("Location TBA", "TBA"),
   `mapUrlForEvent()` will return `null` and the Open Maps button
   will hide automatically — leave the address as-is, don't invent
   a fallback street address.

## Adding a new organizer

- `id` is `org-<slug-shape>`. `slug` is the URL path used by
  `/organizers/$id`.
- `bio` is a short paragraph, written in plain prose.
- `values` is a short bullet list (3–5 items) shown as pills.
- `recurringEventIds` links to events the organizer runs weekly.
- Always include `websiteUrl` and at least one social link when one
  exists; otherwise omit the field.
- `sourceStatus` and `lastVerified` apply here too.

## Adding a new resource

- Pick the right `category` from the `ResourceCategory` union
  (`Group chats`, `Playlists`, `Studios`, `Competitions`, etc.).
- Set `privacyStatus` honestly:
  - `Public link` — anyone can open it.
  - `DM to join` — requires a DM to a known organizer.
  - `Ask organizer` — surface a name, not a link.
  - `Private group` — listed for awareness only.
  - `Needs validation` — we haven't confirmed it yet.
- For purely internal links (`/values`, `/beginner-guide`, etc.),
  put the path in `link` or `websiteUrl`. `ResourceCard` will only
  render an internal `<Link>` if the path is in the
  `KNOWN_INTERNAL_ROUTES` allowlist — add the route there if you
  introduce a new internal target.
- External URLs always open in a new tab with safe rel attributes.

## Adding an Ask prompt

`askPrompts` powers the `/ask` page (Coming Soon mock answers).

- Keep `prompt` phrased as a real question a user would ask.
- `answer.body` must NOT contain hardcoded "this Friday" / "next is"
  language. Use "when currently listed", "if date-relevant", "check
  Facebook/Instagram for latest updates" wording.
- `recommendations` reference `eventId`s — past one-offs are filtered
  by `isPastOneOff` automatically. You can still list them as
  `sourceEventIds` for citation.
- For queer-friendly / inclusive answers, you can reference Next
  Level Fusion as a resource even when a specific event has passed —
  the resource is the persistent thing, the event is not.
- For BOBAS, the safe wording is "check Facebook for latest updates"
  (and Instagram as a secondary source).
- For Starry Boston community outings: mention them only when
  currently listed/date-relevant; never frame them as recurring
  Bachata socials.
- Always include `generalNote` if the answer relies on
  pop-up/outdoor events that can be cancelled.

## Coming Soon copy

Pages: Ask, Buddies, Contact, Safety, Organizer Dashboard.

- Use one `<ComingSoonBanner>` per page, near the top of the
  content area.
- Eyebrow: `"Coming soon"` for feature pages, `"Prototype only"`
  for form pages (Contact, Safety).
- Description and bullets should explicitly say what is NOT real
  yet (no submission, no AI, no DMs, no login). It is better to
  over-disclose than to imply functionality that doesn't exist.

## Wording cheatsheet

| Don't say                       | Do say                                             |
|---------------------------------|----------------------------------------------------|
| Bachata-forward                 | Bachata-focused                                    |
| Salsa-first with Bachata        | mixed Salsa/Bachata                                |
| this Friday / next Saturday     | when currently listed / if date-relevant           |
| The next one is June 20         | Monthly / occasional — check official Instagram    |
| Official site (for an RSVP)     | RSVP here                                          |
| Website (for a Partiful link)   | RSVP here                                          |
| AI-generated answer             | Mock preview · Coming soon                         |

## Verification workflow

When you update an entry:

1. Open the official source (organizer's IG / FB / website).
2. Confirm the date, time, address, cost, and class-before-social
   info match what's in `mock.ts`.
3. Update `lastVerified` to today (`YYYY-MM-DD`).
4. If you can't verify a field, set `sourceStatus` to
   `"Needs validation"` or `"Check official source"` and soften the
   public copy accordingly.