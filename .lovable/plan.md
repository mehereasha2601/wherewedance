# WhereWeDance — UI Prototype (Approved)

Mobile-first UI prototype for the Boston Bachata community. UI only, mock data. Built on the existing TanStack Start template (Node-compatible: `npm install && npm run dev`), structured to be trivially portable to Next.js App Router.

## Portability rules (strict)

- Route files = thin shells: `createFileRoute(...)({ component: PageX })` + `head()` meta only. No loaders, no server functions, no env-dependent code.
- All UI in `src/components/wwd/**` and `src/components/pages/**` as plain React components.
- Mock data in `src/data/mock.ts` as plain typed objects, shaped like future Prisma seed data.
- Standard Node-compatible deps only.

## Design tokens (in `src/styles.css`, oklch)

paper #f9f6f1, ink #2b1a1a, terracotta #cc4e31, oxblood #631919, mango #f59e0b, magenta #be185d. Fonts: Fraunces Variable (display italic) + Instrument Sans Variable (body) via `@fontsource-variable`.

## Bottom nav (5 tabs)

Explore · This Week · Ask · Buddies · Values.

## Routes

`/`, `/boston-bachata`, `/this-week`, `/ask`, `/events`, `/events/$id`, `/organizers/$id`, `/beginner-guide`, `/values`, `/buddies`, `/safety`, `/resources`, `/organizer-dashboard`.

## Reusable components

EventCard, EventCardCompact, GoodToKnow (first-class section), BeginnerPathway (homepage / scene / beginner-guide / Ask), SceneTag, BeginnerTag, AskCard, AskAnswer (with caveat), MarqueeTicker, OrganizerCard, ResourceCard (privacy label: Public link / DM to join / Ask organizer / Private group / Needs validation), BuddyCard, ValueItem, OrganizerCTA, SafetyForm (strong copy: private, anonymous optional, not a public accusation wall, not an emergency service), BottomNav, AiCaveat, SourceLabel.

## Mock data fields per event

bachataRelevance, beginnerLabel, classBeforeSocial, waterAvailability, alcoholPolicy, scheduleReliability, sourceStatus, lastVerified, goodToKnow, communityNote, rsvps, cost, plus organizer/venue references. Seed events: Havana Club Monday, Havana Saturday, Bachata Room Wednesday, J&L Underground, Lili Latin Dance, BOBAS, Bachata by the River, Saborcito.

## Out of scope

No Cloud / Supabase / auth / real AI / DMs / payments / scraping / carpooling / public accusations / server functions.

Building now.
