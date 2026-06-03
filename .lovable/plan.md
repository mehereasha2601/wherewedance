## Goal

UI-only revision pass: clean up landing page, add `/organizers` directory and `/more` hub, restructure bottom nav, make filter chips functional, fix Ask prompts, correct mock event content, and revise organizer dashboard, values, and safety copy. No backend, no visual redesign — Risograph poster style stays.

## 1. Mock data fixes (`src/data/mock.ts`)

- **Havana Monday**: `bachataRelevance: "Bachata-heavy"`, `alcoholPolicy: "Dry event"`, new `goodToKnow` (Bachata-heavy night, serious dancers, class before social, intimidating for absolute beginners but class helps), update `communityNote` accordingly.
- **Bachata Room Wednesday**: remove "Lili" mentions in `communityNote`/`goodToKnow`; neutral copy ("Bachata-heavy Wednesday social with a beginner class before the social. Bring water — free water may run out").
- **BOBAS**: rename to "BOBAS: Boston Outdoor Bachata And Salsa", `beginnerLabel: "Beginner-welcome"`, `classBeforeSocial: { offered: false }`, `goodToKnow` includes "Outdoor, weather-dependent, announced on Instagram", "Better if you know basics or go with a friend".
- **Bachata by the River**: add `classBeforeSocial: { offered: true, level: "Beginner Bachata lesson" }`, `goodToKnow` mentions "Salsa + Bachata music, beginner Bachata lesson on the lawn".
- **Bachata Room `goodToKnow`**: remove the "Solo follows are common — safe place to come alone" line; replace with "Good if going alone — rotations are facilitated".
- Update `Organizer` bios: Bachata Room bio drops Lili/Manny → neutral; BOBAS bio → "Boston Outdoor Bachata And Salsa — free outdoor weather-dependent socials".
- Add new organizer entries used by `/organizers` directory: `org-starry` (Starry Boston — community values org) and `org-next-level` (Next Level Fusion — practice group). Extend `Organizer` type with optional `type`, `bestFor`, `profileLink` fields used by the directory cards; existing organizers get those fields filled in.

## 2. Ask prompts (`src/data/mock.ts`)

Replace `askPrompts` entries to:
- "I'm completely new. Where should I start?" (Beginner, pathway + Lili/J&L)
- "I'm nervous to go alone. What should I try?" (Beginner, Bachata Room + Lili facilitated rotations)
- "What's Bachata-heavy this week?" (Tonight, Havana Mon + Bachata Room + Havana Sat note)
- "What should I know before BOBAS?" (Logistics, outdoor/weather/IG/bring-friend)
- "What outdoor/free events are happening?" (Logistics, BOBAS + River)
- "Where can I go if I don't want alcohol?" (Logistics, Bachata Room + Lili + BOBAS dry events)

Remove: safe-first-social, solo-follow-safe, parking, and any "solo-follow safe" copy in answers.

## 3. Landing page (`src/components/pages/HomePage.tsx`)

Remove the fake filter chip nav entirely. New section order:

1. PageHero
2. Live-tonight pulse + MarqueeTicker
3. **New `DiscoveryStrip`** (see §4)
4. AskCard preview
5. **This Week preview** — 3 compact cards (new `EventCardCompact`)
6. BeginnerPathway (updated copy, see §6)
7. Bachata-heavy preview — 2 compact cards
8. Free/outdoor preview — 2 compact cards
9. Values preview (unchanged)
10. Buddies preview (unchanged)
11. OrganizerCTA (still links to `/organizer-dashboard`)

## 4. New components

- `src/components/wwd/discovery-strip.tsx` — prominent Risograph chip row: Beginner Guide → `/beginner-guide`, Values → `/values`, Safety → `/safety`, Resources → `/resources`, Organizers → `/organizers`. Wraps to 2 rows on narrow viewports; each chip has a colored accent dot (terracotta/mango/magenta/oxblood) and slight rotation.
- `src/components/wwd/event-card-compact.tsx` — smaller card variant: gradient strip, title, day · time, scene tag, beginner tag, cost, single short Good-to-Know line, source dot. Used only on landing previews.
- `src/components/wwd/event-filters.tsx` — client-only filter+list component. Props: `events`, `chips: FilterKey[]`, `layout: "grid" | "by-day"`. Internal `useState<Set<FilterKey>>`. Predicates: `tonight` (`event.tonight`), `weekend` (day ∈ Fri/Sat/Sun), `bachata-heavy`, `beginner-friendly`, `free` (`cost.toLowerCase().includes("free")`), `no-alcohol` (`alcoholPolicy === "Dry event"`), `class-before-social` (`classBeforeSocial.offered`). Multi-select AND-filters. Active chip is filled oxblood + ✕. "Clear filters" shows only when ≥1 active. Empty state: "No events match these filters. Try fewer." + Clear button. `by-day` groups results into day sections (only non-empty days rendered).
- `src/components/pages/OrganizersPage.tsx` — public directory of `organizers[]`, render card per organizer with name, type/category, "Best for", recurring event chips (resolved from `recurringEventIds`), source/last-verified (derived from first recurring event), and link to `/organizers/$slug`.
- `src/components/pages/MorePage.tsx` — hub of large tappable cards: Beginner Guide, Values, Safety, Resources, Organizers, Organizer Dashboard Preview.

## 5. Routing

- New file `src/routes/organizers.index.tsx` → `/organizers` (PublicOrganizers). Existing `src/routes/organizers.$id.tsx` continues to handle `/organizers/$id`.
- New file `src/routes/more.tsx` → `/more` (MorePage).
- Bottom nav (`src/components/wwd/bottom-nav.tsx`): replace `Values` tab with `More` → `/more`. Keep Explore · This Week · Ask · Buddies · More. Pulse dot stays on This Week.

## 6. BeginnerPathway copy (`src/components/wwd/beginner-pathway.tsx`)

Update steps to:
- **01 Take a structured class first** — Start with Lili Latin Dance or J&L Dance Studio if you're brand new. No partner needed.
- **02 Try a class + social** — Bachata Room Wednesday or Havana Saturday can help you move from class into social dancing.
- **03 Build confidence** — Bachata by the River or other outdoor socials, then explore Bachata-heavy nights like Havana Monday when ready.

Remove any "practice buddy as step 3" framing.

## 7. This Week & Events pages

- `ThisWeekPage`: replace static chip nav + manual grouping with `<EventFilters events={events} layout="by-day" chips={["tonight","weekend","bachata-heavy","beginner-friendly","free","no-alcohol","class-before-social"]} />`.
- `EventsPage`: replace static chip nav + grid with `<EventFilters events={events} layout="grid" chips={[same set]} />`. Section header shows filtered count.
- Drop static "All scenes / Bachata-included / Intermediate+ / Solo-follow safe" chips.

## 8. Values page (`src/components/pages/ValuesPage.tsx`)

- Replace any "co-written with local organizers" line with: "A living guide for safer, kinder social dancing."
- Add a callout block: "These values are not a replacement for organizer policies or emergency support. They are a shared guide for the kind of floor we want to encourage."

## 9. Safety page (`src/components/pages/SafetyPage.tsx`)

Add prominent banner at the top of the form: "Prototype only — no report is submitted yet." Keep existing copy (private / anonymous optional / not a public accusation wall / not an emergency service / for emergencies, contact local emergency services or a trusted person nearby).

## 10. Organizer dashboard (`src/components/pages/OrganizerDashboardPage.tsx`)

Rebuild structure (still mock, read-only):

- Header eyebrow: "Mock organizer view: Havana Club Boston"
- Title: "Organizer dashboard"
- Subtitle: as specified
- **Value card** "Why organizers use WhereWeDance" with the 5 bullets
- **Stats grid**: Events live 2, RSVP interest this week 179, Source status "Verified by organizer", Last checked 2026-06-02
- **Dancer questions** section with 7 bullets
- **Submissions** (existing 3 cards, unchanged)
- **Live event pages** (renamed from "Your live events") — per event: name, recurrence, RSVP count, price, source status, last verified, "View event page" + "Update details" buttons (visual only)
- **Quick schedule update** — 6 visual-only chips
- **AI copy helper** — copy + 3 visual-only buttons
- **Footer note**: "Prototype only — organizer actions are visual and do not submit yet."

## 11. Footer (`src/components/wwd/shell.tsx`)

Add caveat line above link row: "Based on currently listed WhereWeDance data. Check the organizer's official posts before going — we're a local guide, not a live source of truth." Footer links stay as secondary discovery.

## Out of scope

No backend, no URL sync, no auth, no real AI, no scraping, no payment, no DM/carpooling. No changes to Risograph palette, fonts, sticky nav style, or overall layout language.
