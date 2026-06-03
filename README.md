# WhereWeDance — Boston Bachata Guide

A community-built local guide for Bachata (and adjacent Latin) dancers in
Boston. The current build is a **UI-only prototype** running on real mock
data — no backend, no auth, no live scraping, and no real AI calls.

- **Live preview:** https://id-preview--690a79a7-a48f-488c-b3f9-c0ccf8602681.lovable.app
- **Published site:** https://wherewedance.lovable.app

---

## What it is

WhereWeDance lists:

- Recurring weekly Bachata-heavy and Bachata-included socials.
- One-off and pop-up events (BOBAS, Saborcito, Bachata by the River,
  community outings such as Starry Boston).
- Organizers, studios, and venues.
- Community resources (group chats, playlists, comps, etc.) labeled
  by privacy status and source verification.
- Editorial pages: Beginner Guide, Values, Safety, This Week.
- Coming-soon previews: Ask WhereWeDance, Practice Buddies,
  Organizer Dashboard, Contact form, Safety form.

Every event/resource carries a `sourceStatus`, `lastVerified` date, and
a link back to the organizer's official channel. The product is
deliberately conservative about claims it can't verify.

---

## Tech stack

- **Framework:** [TanStack Start v1](https://tanstack.com/start) on
  React 19 (SSR-capable, file-based routing under `src/routes/`).
- **Build tool:** Vite 7.
- **Styling:** Tailwind CSS v4 via `src/styles.css` (semantic design
  tokens in `oklch`, no `tailwind.config.js`).
- **UI primitives:** Radix UI + shadcn-style components in
  `src/components/ui/`.
- **Data:** Static typed mock data in `src/data/mock.ts`. No database,
  no fetch, no env vars at runtime.
- **Validation:** Zod (kept for future server-function work).
- **Lint/format:** ESLint + Prettier.

---

## Getting started

```bash
# install deps
bun install

# start the dev server (http://localhost:5173 by default)
bun run dev

# production build
bun run build

# preview the production build
bun run preview

# lint / format
bun run lint
bun run format
```

Node 20+ is recommended. `bun` is the preferred package manager in this
project; `npm`/`pnpm` work too.

---

## Project layout

```text
src/
  routes/              File-based TanStack Router routes (URL → page)
  components/
    pages/             One component per route, owns layout for that page
    wwd/               Project-specific shared building blocks
    ui/                shadcn/Radix primitives (button, dialog, etc.)
  data/
    mock.ts            Single source of truth for events, organizers,
                       resources, buddies, values, ask prompts
  lib/
    event-dates.ts     Boston-timezone date helpers (this-week window,
                       next occurrence of a weekday, etc.)
    utils.ts           Misc helpers (cn, etc.)
  styles.css           Tailwind v4 entry + design tokens
docs/
  ARCHITECTURE.md      How the app is structured and why
  CONTENT.md           Editorial / content-update guide for mock.ts
```

For deeper detail see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
and [`docs/CONTENT.md`](docs/CONTENT.md).

---

## Conventions

- **Design tokens only.** Components reference semantic tokens
  (`bg-paper`, `text-ink`, `text-terracotta`, `bg-magenta`, etc.)
  defined in `src/styles.css`. Don't introduce raw hex / Tailwind
  arbitrary colors in components.
- **Coming Soon banners.** Any prototype-only surface (Ask, Buddies,
  Contact, Safety, Organizer Dashboard) uses the shared
  `ComingSoonBanner` (`src/components/wwd/coming-soon-banner.tsx`).
- **Mock-data only.** Do not add real fetch/auth/DB code without a
  separate discussion — this prototype is intentionally read-only.
- **Source links.** External links open in a new tab with
  `target="_blank" rel="noopener noreferrer"`. Internal links use
  TanStack `Link` and must point at routes that actually exist
  (see the `KNOWN_INTERNAL_ROUTES` allowlist in `resource-card.tsx`).
- **Editorial wording.** Use "Bachata-heavy" vs "Bachata-included"
  precisely. Don't use "Bachata-forward" or "Salsa-first with Bachata"
  in public copy. See `docs/CONTENT.md`.

---

## Deployment

The app is deployed via Lovable. `bun run build` produces the SSR
build; the platform serves both a stable preview URL and a published
URL (see above).

---

## Contributing

1. Add or update data in `src/data/mock.ts` following the rules in
   `docs/CONTENT.md`.
2. Build UI from shared components in `src/components/wwd/`. Prefer
   composing existing primitives over forking them.
3. Keep prototypes clearly labeled as Coming Soon / Prototype only —
   never imply submissions, messages, or AI calls are real.
4. Run `bun run lint` before opening a change.