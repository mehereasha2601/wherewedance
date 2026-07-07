/**
 * Single source of truth for everything user-visible in the app.
 *
 * This file is intentionally pure typed data — no I/O, no env vars,
 * no server calls. It is shaped like a future Prisma seed so the
 * same record structure can be lifted into a database later.
 *
 * Editorial rules for adding/updating entries live in
 * `docs/CONTENT.md`. Highlights:
 *   - Never invent dates you can't verify; prefer "check official
 *     Instagram" wording over hardcoded "next: Friday June 20".
 *   - Use `Bachata-heavy` vs `Bachata-included` precisely. Never
 *     ship "Bachata-forward" or "Salsa-first with Bachata" copy.
 *   - Past one-off events are filtered from upcoming surfaces by
 *     `isPastOneOff(event)`.
 *   - Vague addresses (`TBA`, `Location TBA`) cause
 *     `mapUrlForEvent()` to return null and hide the Open Maps CTA.
 */

import {
  formatDateLabel,
  getOccurrenceInWeek,
  getStartOfWeekMonday,
  getEndOfWeekSunday,
  getTodayInBoston,
  isSameLocalDay,
  parseIsoDate,
  type DayName,
} from "@/lib/event-dates";

export type BachataRelevance =
  | "Bachata-heavy"
  | "Bachata-included";

export type BeginnerLabel =
  | "Beginner-friendly"
  | "Beginner-welcome"
  | "Intermediate+"
  | "Community-welcome";

// Loosened to strings so events can carry verified copy from official sources
// (e.g. "Bring water recommended", "Weather-dependent pop-up — check Instagram").
// Filters still compare against canonical values like "Dry event".
export type WaterAvailability = string;
export type AlcoholPolicy = string;
export type ScheduleReliability = string;

export type SourceStatus =
  | "Verified by organizer"
  | "Verified by community"
  | "From public listing"
  | "Official website / Instagram / public listings"
  | "Instagram / verified"
  | "Official website"
  | "Community-known / private group"
  | "WhereWeDance guide"
  | "Official website / Facebook"
  | "Official website / Instagram"
  | "Instagram / community-known"
  | "Instagram / Facebook"
  | "Instagram / Facebook / public listing"
  | "Public Spotify playlist / Instagram"
  | "Public SoundCloud / Instagram"
  | "Community-known"
  | "Check official source"
  | "Official Instagram / organizer post"
  | "Official Instagram / domain-expert confirmed Bachata music"
  | "Community-updated / WhatsApp announcement"
  | "Partiful / community event"
  | "Needs validation";

export type ResourcePrivacy =
  | "Public link"
  | "DM to join"
  | "Ask organizer"
  | "Private group"
  | "Needs validation";

export type Organizer = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  values: string[];
  recurringEventIds: string[];
  type?: string;
  typeFilter?: string;
  secondaryTags?: string[];
  bestFor?: string;
  profileLink?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  email?: string;
  sourceUrl?: string;
  sourceStatus?: SourceStatus;
  lastVerified?: string;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  organizerId: string;
  venue: string;
  address: string;
  dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startsAt: string; // "20:00"
  endsAt: string;
  cover: string; // gradient seed string
  bachataRelevance: BachataRelevance | null;
  beginnerLabel: BeginnerLabel;
  classBeforeSocial: { offered: boolean; startsAt?: string; level?: string };
  waterAvailability: WaterAvailability;
  alcoholPolicy: AlcoholPolicy;
  scheduleReliability: ScheduleReliability;
  sourceStatus: SourceStatus;
  lastVerified: string; // ISO date
  // Optional ISO date (YYYY-MM-DD) for fixed-date one-off / pop-up events.
  // When set, dateLabel is derived from this; otherwise dateLabel is computed
  // from dayOfWeek as the next occurrence inside the current Mon–Sun week.
  // Pop-ups with no fixedDate render as "Monthly / date TBA".
  fixedDate?: string;
  // ISO dates (YYYY-MM-DD) on which a recurring event is cancelled / skipped.
  cancellations?: string[];
  // Date / time display fields. Cards show dateLabel · scheduleLabel.
  dateLabel: string; // populated by computeEventDateLabels(); do not hardcode
  scheduleLabel?: string; // e.g. "9:00 PM", "6:00–10:00 PM", "Time TBA"
  isTonight?: boolean; // shown as a small badge only, never as the main date
  goodToKnow: string[];
  communityNote?: string;
  rsvps: { count: number; initials: string[] };
  cost: string;
  popUp?: boolean;
  thisWeek?: boolean;
  scheduleNote?: string;
  officialUrl?: string;
  ticketUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  mapUrl?: string;
  paymentNotes?: string;
  coatCheck?: string;
  amenities?: string[];
  secondaryTags?: string[];
  // Optional fields used by community/outing events that don't fit the
  // recurring Bachata-social shape.
  eventType?: string;
  neighborhood?: string;
  city?: string;
  musicMix?: string;
  tags?: string[];
  needsValidation?: boolean;
  sourceUrl?: string;
};


export type Resource = {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  privacyStatus: ResourcePrivacy;
  sourceStatus: SourceStatus;
  lastVerified: string;
  link?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  howToJoin?: string;
  sourceUrl?: string;
  tags?: string[];
  featured?: boolean;
};

export type ResourceCategory =
  | "Group chats"
  | "Playlists"
  | "Online classes"
  | "Studios"
  | "Organizers"
  | "Venues / organizers"
  | "Shoes / apparel"
  | "Blog posts"
  | "Safety / values"
  | "Competitions"
  | "Practice spaces";

export type Buddy = {
  id: string;
  initials: string;
  name: string;
  lookingFor: string;
  level: "Brand new" | "Beginner" | "Improver" | "Intermediate" | "Advanced";
  role: "Lead" | "Follow" | "Both";
  postedAt: string;
  neighborhood: string;
};

export type Value = {
  id: string;
  title: string;
  short: string;
  body: string;
};

export type AskPrompt = {
  id: string;
  prompt: string;
  category: "Tonight" | "Beginner" | "Safety" | "Logistics" | "Community";
  answer: {
    body: string;
    sourceEventIds?: string[];
    sourceResourceIds?: string[];
    showBeginnerPathway?: boolean;
    showGoodToKnow?: boolean;
    recommendations?: {
      eventId: string;
      label: "Top recommendation" | "Also consider";
      whyThisFits: string;
    }[];
    generalNote?: string;
  };
};

// ---------- Organizers ----------

export const organizers: Organizer[] = [
  {
    id: "org-havana",
    slug: "havana-club",
    name: "Havana Club Boston",
    bio: "Latin social club at 288 Green St, Central Square, Cambridge. Runs Latin nights Monday, Tuesday, Thursday, Friday, Saturday, and Sunday (not Wednesday). Beginner + intermediate lessons before the social on operating nights. Beginners welcome, no partner required. Check the official Havana Club page before going.",
    values: ["Lessons before the social", "Beginners welcome, no partner needed", "Multiple Bachata-heavy nights per week"],
    recurringEventIds: [
      "evt-havana-mon",
      "evt-havana-tue",
      "evt-havana-thu",
      "evt-havana-fri",
      "evt-havana-sat",
      "evt-havana-sun",
    ],
    type: "Venue / recurring Latin social hub",
    typeFilter: "Venue / recurring social hub",
    bestFor: "Bachata-heavy Mondays/Thursdays/Sundays and mixed Salsa/Bachata nights with lessons before socials",
    websiteUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    sourceUrl: "https://havanaclubsalsa.com/",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-bachata-room",
    slug: "bachata-room",
    name: "The Bachata Room",
    bio: "Also known as Ninrod Angels. Bachata-heavy Wednesday night focused on traditional and modern bachata, with a beginner class before the social.",
    values: ["Bachata-first", "Mid-week reset", "Mentorship"],
    recurringEventIds: ["evt-bachata-room-wed"],
    type: "Weekly Bachata social organizer",
    typeFilter: "Weekly Bachata social organizer",
    bestFor: "Wednesday Bachata-heavy class + social, beginner-friendly social entry",
    websiteUrl: "https://www.bachataroomboston.com/",
    instagramUrl: "https://www.instagram.com/bachataroom/",
    sourceUrl: "https://www.bachataroomboston.com/",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-jl",
    slug: "jl-underground",
    name: "J&L Dance Studio",
    bio: "J&L Dance Studio is a Malden/Boston-area Latin dance studio/community known for structured classes and events. Their schedules can change, so dancers should check the official source before going.",
    values: ["Structured classes", "Beginner-to-improver progression", "Check official source"],
    recurringEventIds: ["evt-jl"],
    type: "Dance studio / social organizer",
    typeFilter: "Dance studio",
    bestFor: "Traditional and modern Bachata fundamentals, structured Salsa/Bachata classes, beginner-to-improver progression",
    websiteUrl: "https://jandldancestudio.com/",
    instagramUrl: "https://www.instagram.com/jl_dancestudio/",
    sourceUrl: "https://jandldancestudio.com/classesoffered",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-lili",
    slug: "lili-latin",
    name: "Lili Latin Dance",
    bio: "Beginner-friendly Latin dance studio at 423 W Broadway, Suite 202, South Boston. Structured Salsa/Bachata classes plus monthly / occasional studio socials with a workshop before the social. Check the official Instagram for the next social date.",
    values: ["Pathway for new dancers", "No partner needed", "Monthly / occasional studio socials"],
    recurringEventIds: ["evt-lili-monthly-social"],
    type: "Dance studio / instructor-led classes",
    typeFilter: "Dance studio",
    bestFor: "Brand-new dancers, structured Salsa/Bachata classes, beginner-friendly learning, occasional studio socials",
    websiteUrl: "https://www.lili.dance/",
    instagramUrl: "https://www.instagram.com/lililatindance/",
    sourceUrl: "https://www.lili.dance/",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-bobas",
    slug: "bobas",
    name: "BOBAS Collective",
    bio: "Community-led free outdoor Salsa/Bachata pop-ups at the Charles River Dock. Weather-dependent. Facebook is the most reliable source for updates; Instagram may also have updates.",
    values: ["Free and outdoors", "Community-led", "Bring a friend, bring water"],
    recurringEventIds: ["evt-bobas"],
    type: "Outdoor pop-up organizer",
    typeFilter: "Outdoor pop-up organizer",
    bestFor: "Free outdoor Salsa/Bachata pop-ups, community outdoor dancing, dancers who know basics",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    sourceUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-bachata-river",
    slug: "bachata-by-the-river",
    name: "Bachata by the River",
    bio: "Free outdoor Bachata event at Magazine Beach Park in Cambridge. Usually includes a beginner Bachata lesson followed by Bachata and Salsa social dancing. Monthly / seasonal - check the official source for exact dates.",
    values: ["Free and outdoors", "Beginner Bachata lesson", "Bring water, wear shoes you can spin in"],
    recurringEventIds: ["evt-river"],
    type: "Outdoor Bachata event organizer",
    typeFilter: "Outdoor pop-up organizer",
    bestFor: "Free outdoor Bachata + Salsa days at Magazine Beach Park, beginner-friendly lesson before dancing",
    facebookUrl: "https://www.facebook.com/events/magazine-beach-cambridge/bachata-by-the-river-summer-dance-party-kick-off/682022144271432/",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-saborcito",
    slug: "sabor-latino-boston",
    name: "Sabor Latino Boston",
    bio: "Sabor Latino Boston runs Saborcito - a free outdoor Latin social at The Anchor with a beginner lesson.",
    values: ["Free outdoor social", "Beginner lesson included", "mixed Salsa/Bachata"],
    recurringEventIds: ["evt-saborcito"],
    type: "Outdoor Latin dance event organizer",
    typeFilter: "Outdoor pop-up organizer",
    bestFor: "Saborcito @ The Anchor, outdoor Salsa-first/Bachata-included events",
    instagramUrl: "https://www.instagram.com/saborlatinoboston/",
    facebookUrl: "https://www.facebook.com/SaborLatinoBoston/",
    sourceUrl: "https://www.thebostoncalendar.com/events/saborcito-the-anchor-salsa-bachata-dancing--39",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-starry",
    slug: "starry-boston",
    name: "Starry Boston",
    bio: "Community education and social dance culture resource. Listed for community conversations on consent, communication, belonging, and safer-floor topics - not as a recurring Bachata social unless a specific event is verified.",
    values: ["Consent-first", "Community education", "Safer-floor culture"],
    recurringEventIds: ["event-starry-lakeside-yappin-grillin-jun-7"],
    type: "Community education / social dance culture resource",
    typeFilter: "Community education",
    bestFor: "Community conversations, consent, communication, social dance culture, belonging, safer-floor topics",
    instagramUrl: "https://www.instagram.com/starryboston/",
    sourceStatus: "From public listing",
    lastVerified: "2026-05-20",
  },
  {
    id: "org-next-level",
    slug: "next-level-fusion",
    name: "Next Level Fusion",
    bio: "Next Level Fusion is a Boston-based inclusive dance community/team founded by Tina Cavicchio. Their work centers inclusion, access, safety, creativity, and empowerment, especially for queer/trans/LGBTQIA+ dancers. They host occasional / pop-up inclusive dance events - check the official Instagram for announcements. Not a recurring weekly Bachata social organizer.",
    values: ["Queer-inclusive", "Access and safety", "Occasional / pop-up inclusive events"],
    recurringEventIds: ["evt-next-level-queer-jun6"],
    type: "Queer-inclusive dance team / inclusive dance community",
    typeFilter: "Queer-inclusive dance community",
    secondaryTags: ["Inclusive", "Community", "Bachata/Salsa-adjacent"],
    bestFor: "Queer-inclusive dance community, inclusive events, fusion performance, safety/access/inclusion-centered programming",
    websiteUrl: "https://www.nextlevelfusiondance.com/",
    instagramUrl: "https://www.instagram.com/nextlevelfusion/",
    sourceStatus: "From public listing",
    lastVerified: "2026-05-22",
  },
  {
    id: "org-rumba-y-timbal",
    slug: "rumba-y-timbal",
    name: "Rumba y Timbal",
    bio: "Rumba y Timbal is a Greater Boston Latin dance studio/company offering Salsa, Bachata, and other Latin dance classes for complete beginners through more advanced dancers.",
    values: ["Structured progression", "Beginner to performance", "Latin dance training"],
    recurringEventIds: [],
    type: "Dance studio / dance company",
    typeFilter: "Dance studio",
    bestFor: "Structured Salsa and Bachata classes, beginner-to-performance progression, Latin dance training",
    websiteUrl: "https://www.rumbaytimbal.com/",
    instagramUrl: "https://www.instagram.com/rumbaytimbal/",
    facebookUrl: "https://www.facebook.com/rumbaytimbalboston/",
    sourceStatus: "From public listing",
    lastVerified: "2026-05-22",
  },
  {
    id: "org-salsa-y-control",
    slug: "salsa-y-control",
    name: "Salsa y Control",
    bio: "Salsa y Control is a Boston dance company/studio offering structured instruction, performance opportunities, and weekly Salsa and Bachata classes. It is Salsa-first but Bachata-relevant.",
    values: ["Salsa-first", "Performance teams", "Structured classes"],
    recurringEventIds: [],
    type: "Dance studio / dance company",
    typeFilter: "Dance studio",
    bestFor: "Salsa-first structured classes, Bachata classes, performance teams, Allston/Cambridge training",
    websiteUrl: "https://www.salsaycontrol.com/",
    instagramUrl: "https://www.instagram.com/sycdancestudio/",
    facebookUrl: "https://www.facebook.com/salsaycontroldance/",
    sourceStatus: "From public listing",
    lastVerified: "2026-05-22",
  },
  {
    id: "org-moves-and-vibes",
    slug: "moves-and-vibes",
    name: "Moves & Vibes",
    bio: "Moves & Vibes offers Sensual Bachata, Brazilian Zouk, Forró, Kizomba, Samba, and related partner dance classes in Boston/Cambridge. Studio 44, 44 5th Street, Cambridge, MA 02141 per public listing.",
    values: ["Partner dance classes", "Multi-style", "Cambridge studio"],
    recurringEventIds: [],
    type: "Dance school",
    typeFilter: "Dance studio",
    secondaryTags: ["Sensual Bachata", "Zouk", "Kizomba", "Needs validation"],
    bestFor: "Sensual Bachata, Brazilian Zouk, Forró, Kizomba, Samba, Boston/Cambridge partner dance classes",
    websiteUrl: "https://movesandvibes.com/",
    sourceStatus: "Needs validation",
    lastVerified: "2026-05-22",
  },
  {
    id: "org-flow",
    slug: "flow-studios",
    name: "Flow Studios",
    bio: "Flow Studios is an instructor-led Bachata/Sensual Bachata dance brand directed by François Noel. Public listings describe Flow as offering Sensual Bachata and Latin dance classes, with no partner required. Schedules and locations may vary, so dancers should check the official site or Instagram before going.",
    values: ["Sensual Bachata", "Combo-focused training", "No partner required"],
    recurringEventIds: [],
    type: "Instructor-led Sensual Bachata / Latin dance classes",
    typeFilter: "Dance studio",
    secondaryTags: ["Sensual Bachata", "Intermediate+", "Check schedule/location"],
    bestFor: "Sensual Bachata classes, combo-focused training, dancers who want to improve technique and movement quality",
    websiteUrl: "https://flowstudios.dance/",
    instagramUrl: "https://www.instagram.com/flowstudios.dance/",
    sourceUrl: "https://flowstudios.dance/",
    sourceStatus: "Official website / Instagram / public listings",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-booze-bachata",
    slug: "booze-and-bachata",
    name: "Booze & Bachata",
    bio: "Booze & Bachata is a Bachata-focused pop-up/social dance organizer. Check Instagram for current event dates, venues, class details, tickets, and age requirements.",
    values: ["Bachata-focused", "Pop-up socials", "Social/nightlife setting"],
    recurringEventIds: [],
    type: "Pop-up Bachata social organizer",
    typeFilter: "Pop-up Bachata social organizer",
    secondaryTags: ["Pop-up", "Bachata-focused", "Social dance events", "Check Instagram"],
    bestFor: "Bachata-focused pop-up socials, intimate social dance events, and dancers looking for a Bachata event in a social/nightlife setting",
    instagramUrl: "https://www.instagram.com/boozeandbachata/",
    sourceUrl: "https://www.instagram.com/boozeandbachata/",
    sourceStatus: "Instagram / verified",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-tambo",
    slug: "tambo-salsa-social",
    name: "Tambo Salsa Social",
    bio: "Tambo Salsa Social runs a weekly Friday mixed Salsa/Bachata social at Dante Alighieri Society in Cambridge with a Salsa class before the social. mixed Salsa/Bachata, not Bachata-heavy — not Bachata-heavy.",
    values: ["Weekly Friday mixed Salsa/Bachata social", "Salsa class before social", "Bachata-included"],
    recurringEventIds: ["evt-tambo-fri"],
    type: "Weekly Salsa/Bachata social organizer",
    typeFilter: "Weekly Bachata social organizer",
    secondaryTags: ["Salsa-first", "Bachata-included", "Cambridge", "Friday"],
    bestFor: "Friday mixed Salsa/Bachata social, mixed Salsa/Bachata dancers, social dancing at Dante Alighieri Society",
    websiteUrl: "https://www.tambosalsa.com/",
    instagramUrl: "https://www.instagram.com/tambosalsa/",
    sourceUrl: "https://www.salsaycontrol.com/events",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-dantes",
    slug: "dantes-salsa-bachata",
    name: "Dante's Salsa & Bachata",
    bio: "Dante's Salsa & Bachata runs a weekly Saturday mixed Salsa/Bachata social at Dante Alighieri Society in Cambridge with a beginner-friendly lesson before the social. Mixed Latin social — not Bachata-heavy.",
    values: ["Weekly Saturday mixed social", "Beginner-friendly class", "No partner needed"],
    recurringEventIds: ["evt-dantes-sat"],
    type: "Weekly Salsa/Bachata social organizer",
    typeFilter: "Weekly Bachata social organizer",
    secondaryTags: ["Salsa-first", "Bachata-included", "Beginner-friendly", "Cambridge", "Saturday"],
    bestFor: "Saturday beginner-friendly Salsa/Bachata lesson and mixed social",
    websiteUrl: "https://www.dantessalsaboston.com/",
    instagramUrl: "https://www.instagram.com/salsabachata617/",
    facebookUrl: "https://www.facebook.com/dantessalsaandbachata/",
    sourceUrl: "https://www.dantessalsaboston.com/",
    sourceStatus: "Official website / Facebook",
    lastVerified: "2026-06-03",
  },
  {
    id: "org-edwin-pabon",
    slug: "edwin-pabon-orchestra",
    name: "Edwin Pabon and Orchestra",
    bio: "Edwin Pabon and Orchestra is a Boston-area Latin music group presenting live Salsa and Bomba concerts and cultural events.",
    values: ["Live music", "Salsa y Bomba", "Community concert"],
    recurringEventIds: ["evt-salsa-y-bomba-jun-13"],
    type: "Live music / concert organizer",
    typeFilter: "Live music organizer",
    bestFor: "Live Salsa and Bomba music events, community concerts, cultural dance events",
    instagramUrl: "https://www.instagram.com/pabon_pabon_pabon/",
    sourceUrl: "https://www.instagram.com/pabon_pabon_pabon/",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-08",
  },
];

// ---------- Events ----------

export const events: Event[] = [
  {
    id: "evt-havana-mon",
    slug: "havana-club-monday",
    title: "Havana Club Monday - Bachata Mondays",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Monday",
    startsAt: "21:15",
    endsAt: "00:30",
    cover: "from-terracotta via-oxblood to-ink",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, startsAt: "20:15", level: "Beginner + intermediate Bachata lessons 8:15–9:15 PM (doors 8:00 PM)" },
    waterAvailability: "Free water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "Official website",
    lastVerified: "2026-06-02",
    dateLabel: "",
    scheduleLabel: "Lessons 8:15–9:15 PM · Social 9:15 PM–12:30 AM",
    secondaryTags: ["Crowd favorite", "Dry event", "Class before social"],
    goodToKnow: [
      "Bachata-heavy Monday night (~90% Bachata / 10% Salsa)",
      "Doors 8:00 PM · lessons 8:15–9:15 PM · social 9:15 PM–12:30 AM",
      "Beginner + intermediate Bachata lessons before the social",
      "No partner required",
      "No alcohol / dry event · 18+",
      "$15 lesson + dance / $10 dance only",
      "More serious dancers tend to come, so complete beginners may feel intimidated - taking the class first helps a lot",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check included.",
      "Free water available.",
      "Check Havana Club's official page before going.",
    ],
    communityNote:
      "Bachata-heavy and dry - come for the dancing, not the bar. The lessons beforehand are the right entry point.",
    rsvps: { count: 47, initials: ["JS", "RL", "MK"] },
    cost: "$15 lesson+dance / $10 dance only",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash only. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Coat check available",
    amenities: ["Free water", "Coat check available", "ATM on site"],
  },
  {
    id: "evt-havana-tue",
    slug: "havana-club-tuesday",
    title: "Havana Club Tuesday - Salsa-Bachata Tuesdays",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Tuesday",
    startsAt: "21:15",
    endsAt: "00:30",
    cover: "from-mango via-terracotta to-oxblood",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "20:15", level: "Beginner + intermediate Bachata/Salsa lessons before the social" },
    waterAvailability: "Free water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-02",
    dateLabel: "",
    scheduleLabel: "Lessons 8:15–9:15 PM · Social 9:15 PM–12:30 AM",
    goodToKnow: [
      "Mixed Salsa/Bachata night (~60% Bachata / 40% Salsa where supported)",
      "Beginner + intermediate lessons before social",
      "No partner required",
      "No alcohol · 18+",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check available.",
      "Free water available.",
      "Check official source before going.",
    ],
    rsvps: { count: 31, initials: ["AL", "PE", "RI"] },
    cost: "$15",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash only. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Coat check available",
    amenities: ["Free water", "Coat check available", "ATM on site"],
  },
  {
    id: "evt-havana-thu",
    slug: "havana-club-thursday",
    title: "Havana Club Thursday - Bachata Thursdays",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Thursday",
    startsAt: "21:45",
    endsAt: "00:30",
    cover: "from-oxblood via-magenta to-terracotta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, startsAt: "20:45", level: "Beginner + intermediate Bachata lessons 8:45–9:45 PM (doors 8:30 PM)" },
    waterAvailability: "Free water",
    alcoholPolicy: "Bar on site",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "Official website",
    lastVerified: "2026-06-02",
    dateLabel: "",
    scheduleLabel: "Lessons 8:45–9:45 PM · Party 9:45 PM–12:30 AM",
    goodToKnow: [
      "Bachata-heavy Thursday night (~80% Bachata / 20% Salsa)",
      "Doors 8:30 PM · lessons 8:45–9:45 PM · party 9:45 PM–12:30 AM",
      "Beginner + intermediate Bachata lessons before the party",
      "Bar available · 21+",
      "No partner required",
      "$15 lesson + dance / $10 dance only",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check included.",
      "Free water available.",
      "Check official source before going.",
    ],
    rsvps: { count: 58, initials: ["SI", "GA", "NO"] },
    cost: "$15 lesson+dance / $10 dance only",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash only. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Coat check available",
    amenities: ["Free water", "Coat check available", "ATM on site"],
  },
  {
    id: "evt-havana-fri",
    slug: "havana-club-friday",
    title: "Havana Friday Bachata/Salsa",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Friday",
    startsAt: "21:15",
    endsAt: "02:00",
    cover: "from-magenta via-oxblood to-ink",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, startsAt: "20:15", level: "Beginner + intermediate Bachata/Salsa lessons before the party" },
    waterAvailability: "Free water",
    alcoholPolicy: "Bar on site",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-02",
    dateLabel: "",
    scheduleLabel: "Lessons before social · Party 9:15 PM–2:00 AM",
    goodToKnow: [
      "Mixed Bachata/Salsa late-night party",
      "Lessons before dancing",
      "Larger party/nightlife energy · Bar available · 21+",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check available.",
      "Free water available.",
      "Check official source before going.",
    ],
    rsvps: { count: 102, initials: ["MA", "EL", "VI"] },
    cost: "$15 / $20",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash only. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Coat check available",
    amenities: ["Free water", "Coat check available", "ATM on site"],
  },
  {
    id: "evt-havana-sun",
    slug: "havana-club-sunday",
    title: "Havana Bachata Sunday",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Sunday",
    startsAt: "20:15",
    endsAt: "23:30",
    cover: "from-terracotta via-magenta to-oxblood",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "19:15", level: "Beginner + intermediate Bachata/Salsa lessons or structured practica before/after lessons, depending on official listing" },
    waterAvailability: "Free water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-02",
    dateLabel: "",
    scheduleLabel: "Lessons/practica from 7:15 PM · Social 8:15–11:30 PM",
    goodToKnow: [
      "Bachata-heavy Sunday option",
      "No alcohol / dry event · 18+",
      "Lessons/practica structure - check official listing",
      "No partner required",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check available.",
      "Free water available.",
      "Check official source before going.",
    ],
    rsvps: { count: 36, initials: ["DA", "NI", "CL"] },
    cost: "$15",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash only. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Coat check available",
    amenities: ["Free water", "Coat check available", "ATM on site"],
  },
  {
    id: "evt-havana-sat",
    slug: "havana-club-saturday",
    title: "Havana Saturday Bachata/Salsa",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Saturday",
    startsAt: "21:15",
    endsAt: "02:00",
    cover: "from-magenta via-terracotta to-mango",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, startsAt: "20:15", level: "Beginner + intermediate Bachata/Salsa lessons before the party" },
    waterAvailability: "Free water",
    alcoholPolicy: "Bar on site",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "Official website",
    lastVerified: "2026-05-30",
    dateLabel: "",
    scheduleLabel: "Lessons before dancing · Party 9:15 PM–2:00 AM",
    goodToKnow: [
      "Large Saturday crowd (~70% Bachata / 25% Salsa / 5% Merengue)",
      "Beginner + intermediate Bachata/Salsa lessons before dancing",
      "Beginner-welcome, but bigger crowds can feel overwhelming",
      "Smart casual / elegant dress code",
      "Bar available · 21+",
      "Admission cash; bar takes cards.",
      "ATM available on site, but it may charge an extra fee.",
      "Free coat check.",
      "Free water available.",
      "No partner required.",
      "Check official source before going.",
    ],
    rsvps: { count: 132, initials: ["AN", "TP", "DV"] },
    cost: "$15 / $20",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Admission cash; bar takes cards. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Free coat check",
    amenities: ["Free water", "Free coat check", "ATM on site"],
  },
  {
    id: "evt-bachata-room-wed",
    slug: "bachata-room-wednesday",
    title: "Bachata Room Wednesday",
    organizerId: "org-bachata-room",
    venue: "La Fábrica / Bachata Room",
    address: "450 Massachusetts Ave, Cambridge, MA",
    dayOfWeek: "Wednesday",
    startsAt: "21:00",
    endsAt: "00:00",
    cover: "from-oxblood via-magenta to-terracotta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Beginner-friendly Bachata/Salsa class before the social" },
    waterAvailability: "Free water may run out / bring water recommended",
    alcoholPolicy: "Bar available · 21+ to drink",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "Official website",
    lastVerified: "2026-06-15",
    dateLabel: "",
    scheduleLabel: "9:00 PM (class + social)",
    cancellations: ["2026-06-17", "2026-06-24"],
    goodToKnow: [
      "Cancelled on Wednesday June 17 and June 24 — no class or social those nights.",
      "Wednesday June 24: Bachata & Mango Pop-Up at Coco Mango (50 Cambridgepark Dr) — see separate event.",
      "Wednesday 9:00 PM class + social.",
      "Class before social: beginner-friendly Bachata/Salsa class followed by social dancing.",
      "18+ to dance, 21+ to drink.",
      "No partner needed.",
      "Cash or Venmo accepted.",
      "No coat check.",
      "Bring water because free water may run out.",
      "Good if going alone because class/rotations help people meet dancers.",
      "Bachata-heavy Wednesday social.",
      "Check the official website before going.",
    ],
    communityNote: "Beginner track is patient and welcoming. Note: no Bachata Room on June 17 or June 24. On June 24, Bachata Room hosts a Bachata & Mango pop-up at Coco Mango (see separate event).",
    rsvps: { count: 64, initials: ["LI", "MA", "RB"] },
    cost: "$15 class + social",
    officialUrl: "https://www.bachataroomboston.com/",
    instagramUrl: "https://www.instagram.com/bachataroom/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=450%20Massachusetts%20Ave%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash or Venmo accepted.",
    coatCheck: "No coat check",
    amenities: ["Free water may run out", "No coat check"],
  },
  {
    id: "evt-jl",
    slug: "jl-underground",
    title: "J&L Underground Social",
    organizerId: "org-jl",
     venue: "J&L Underground Social",
     address: "Location TBA — check J&L's official source.",
    dayOfWeek: "Friday",
    startsAt: "TBD",
    endsAt: "TBD",
    popUp: true,
    scheduleNote: "Monthly / occasional - check official source",
    cover: "from-ink via-oxblood to-magenta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "Check official event listing" },
    waterAvailability: "Check official source",
    alcoholPolicy: "Unknown - check official source",
    scheduleReliability: "Monthly / occasional - check official source",
    sourceStatus: "Check official source",
    lastVerified: "2026-06-03",
    dateLabel: "",
    scheduleLabel: "Check official source",
    goodToKnow: [
      "J&L Dance Studio is based in Malden, but Underground event location should be confirmed from the official event post.",
      "J&L is known for structured Bachata/Salsa classes and fundamentals.",
      "Their social schedule can change.",
      "Check official source before going.",
      "Don't assume BYOB, exact time, exact price, or Cambridge location unless verified.",
    ],
    communityNote: "Schedule and venue change - always check the official J&L source before going.",
    rsvps: { count: 38, initials: ["JE", "LU", "KO"] },
    cost: "Check official source",
    officialUrl: "https://jandldancestudio.com/",
    instagramUrl: "https://www.instagram.com/jl_dancestudio/",
  },
  {
    id: "evt-lili-monthly-social",
    slug: "lili-latin-dance-monthly-social",
    title: "Lili Latin Dance Monthly Social",
    organizerId: "org-lili",
    venue: "Lili Latin Dance",
    address: "423 W Broadway, Suite 202, Boston, MA 02127",
    dayOfWeek: "Friday",
    startsAt: "18:00",
    endsAt: "22:00",
    popUp: true,
    scheduleNote: "Monthly / occasional — check official Instagram for current date",
    cover: "from-mango via-terracotta to-oxblood",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, startsAt: "18:00", level: "ChaCha workshop before social (6:00-6:55 PM)" },
    waterAvailability: "Bring water recommended - check official source",
    alcoholPolicy: "Unknown - check official source",
    scheduleReliability: "Monthly / occasional - check official source",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-03",
    fixedDate: "2026-06-20",
    dateLabel: "",
    scheduleLabel: "6:00–10:00 PM",
    goodToKnow: [
      "Monthly / occasional Lili Latin Dance studio social — check the official Instagram for the current date.",
      "Music includes Salsa, Bachata, Merengue, and some party music.",
      "ChaCha workshop from 6:00-6:55 PM.",
      "Social dance and shows from 7:00-10:00 PM.",
      "$10 general / $5 for Lili Latin Dance students.",
      "Good studio social option, but not Bachata-heavy.",
      "Check Lili Latin Dance's official Instagram post before going.",
    ],
    communityNote: "Friendly structured studio social with mixed Latin music. Better framed as Bachata-included, not Bachata-heavy.",
    rsvps: { count: 52, initials: ["SO", "NA", "EM"] },
    cost: "$10 / $5 Lili students",
    officialUrl: "https://www.lili.dance/",
    instagramUrl: "https://www.instagram.com/lililatindance/",
    websiteUrl: "https://www.lili.dance/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=423%20W%20Broadway%20Suite%20202%2C%20Boston%2C%20MA%2002127",
    paymentNotes: "$10 general / $5 for Lili Latin Dance students",
  },
  {
    id: "evt-next-level-queer-jun6",
    slug: "next-level-fusion-queer-dance-party-june-6",
    title: "Next Level Fusion Queer Dance Party",
    organizerId: "org-next-level",
    venue: "The Anchor Boston",
    address: "1 Shipyard Park, Charlestown, MA 02129",
    dayOfWeek: "Saturday",
    startsAt: "TBD",
    endsAt: "TBD",
    popUp: true,
    thisWeek: false,
    scheduleNote: "Pop-up / one-off — check Instagram for time",
    cover: "from-magenta via-oxblood to-ink",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false },
    waterAvailability: "Food/drinks at venue - bring water recommended",
    alcoholPolicy: "Bar on site - venue serves drinks",
    scheduleReliability: "Pop-up / one-off - check official source",
    sourceStatus: "Official Instagram / domain-expert confirmed Bachata music",
    lastVerified: "2026-06-06",
    fixedDate: "2026-06-06",
    dateLabel: "",
    scheduleLabel: "Time TBA",
    goodToKnow: [
      "Free queer-friendly dance party hosted by Next Level Fusion / Party with Next Level Fusion.",
      "Held at The Anchor Boston.",
      "Bachata music is included.",
      "Beginner-welcome, but check official post for exact timing, format, and full music mix.",
      "Bar/venue drinks may be available at The Anchor.",
      "Check official Instagram before going.",
    ],
    communityNote: "Inclusive queer-friendly dance/community event. Bachata music confirmed by domain expert. Not a regular weekly Bachata social - pop-up / one-off.",
    rsvps: { count: 24, initials: ["TI", "JO", "AV"] },
    cost: "Free",
    officialUrl: "https://www.instagram.com/partywithnextlevelfusion/",
    instagramUrl: "https://www.instagram.com/partywithnextlevelfusion/",
    websiteUrl: "https://www.nextlevelfusiondance.com/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1%20Shipyard%20Park%2C%20Charlestown%2C%20MA%2002129",
  },
  {
    id: "evt-bobas",
    slug: "bobas",
    title: "BOBAS: Boston Outdoor Bachata And Salsa — Friday Pop-up",
    organizerId: "org-bobas",
    venue: "Charles River Dock / outdoor pop-up",
    address: "Charles River Dock — check Facebook or Instagram for exact outdoor location",
    dayOfWeek: "Friday",
    startsAt: "Check Instagram",
    endsAt: "Check Instagram",
    popUp: true,
    thisWeek: true,
    scheduleNote: "Weather-dependent pop-up — check Facebook (most reliable) or Instagram",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "No intro class unless announced" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Weather-dependent pop-up - check Facebook or Instagram",
    sourceStatus: "Community-updated / WhatsApp announcement",
    lastVerified: "2026-06-03",
    fixedDate: "2026-06-05",
    dateLabel: "",
    scheduleLabel: "Check Facebook or Instagram",
    secondaryTags: ["Outdoor", "Free", "Pop-up", "Crowd favorite", "Beginner-welcome"],
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up.",
      "Announced close to the event because weather matters — check Facebook for the most reliable updates; Instagram may also have updates.",
      "Beginner-welcome, but not beginner-structured.",
      "Better if you know basics or go with a friend.",
      "Bring water.",
      "Check Facebook (primary) or Instagram before going.",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 88, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    officialUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
  },
  {
    id: "evt-bobas-jun-9",
    slug: "bobas-june-9",
    title: "BOBAS: Boston Outdoor Bachata And Salsa — June 9 Pop-up",
    organizerId: "org-bobas",
    venue: "Dock by Hatch Shell",
    address: "Charles River Esplanade, Boston, MA — near the Hatch Shell",
    dayOfWeek: "Tuesday",
    startsAt: "18:00",
    endsAt: "21:00",
    popUp: true,
    thisWeek: true,
    scheduleNote: "Free outdoor pop-up — check Instagram for updates",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "No intro class unless announced" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Pop-up — check official source before going",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-08",
    fixedDate: "2026-06-09",
    dateLabel: "",
    scheduleLabel: "6:00–9:00 PM",
    secondaryTags: ["Outdoor", "Free", "Pop-up", "Crowd favorite", "Beginner-welcome"],
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up at the Hatch Shell.",
      "Tuesday June 9, 6:00–9:00 PM.",
      "Beginner-welcome, but not beginner-structured — no class unless announced.",
      "Better if you know basics or go with a friend.",
      "Bring water.",
      "Check Instagram before going.",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 12, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    mapUrl: "https://maps.google.com/?q=Hatch+Shell+Boston+Esplanade",
  },
  {
    id: "evt-bobas-jun-16",
    slug: "bobas-june-16",
    title: "BOBAS: Boston Outdoor Bachata And Salsa — June 16 Pop-up",
    organizerId: "org-bobas",
    venue: "Dock by Hatch Shell",
    address: "Charles River Esplanade, Boston, MA — near the Hatch Shell",
    dayOfWeek: "Tuesday",
    startsAt: "18:00",
    endsAt: "21:00",
    popUp: true,
    thisWeek: true,
    scheduleNote: "Free outdoor pop-up — check Instagram for updates",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "No intro class unless announced" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Pop-up — check official source before going",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-15",
    fixedDate: "2026-06-16",
    dateLabel: "",
    scheduleLabel: "6:00–9:00 PM",
    secondaryTags: ["Outdoor", "Free", "Pop-up", "Crowd favorite", "Beginner-welcome"],
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up at the Hatch Shell.",
      "Tuesday June 16, 6:00–9:00 PM.",
      "Beginner-welcome, but not beginner-structured — no class unless announced.",
      "Better if you know basics or go with a friend.",
      "Bring water.",
      "Check Instagram before going.",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 9, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    mapUrl: "https://maps.google.com/?q=Hatch+Shell+Boston+Esplanade",
  },
  {
    id: "evt-bobas-jun-24",
    slug: "bobas-june-24",
    title: "BOBAS: Boston Outdoor Bachata And Salsa — June 24 Pop-up",
    organizerId: "org-bobas",
    venue: "Dock by Hatch Shell",
    address: "Charles River Esplanade, Boston, MA — near the Hatch Shell",
    dayOfWeek: "Wednesday",
    startsAt: "18:00",
    endsAt: "21:00",
    popUp: true,
    thisWeek: true,
    scheduleNote: "Free outdoor pop-up — check Instagram for updates",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "No intro class unless announced" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Pop-up — check official source before going",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-24",
    fixedDate: "2026-06-24",
    dateLabel: "",
    scheduleLabel: "6:00–9:00 PM",
    secondaryTags: ["Outdoor", "Free", "Pop-up", "Crowd favorite", "Beginner-welcome"],
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up at the Hatch Shell.",
      "Wednesday June 24, 6:00–9:00 PM.",
      "Beginner-welcome, but not beginner-structured — no class unless announced.",
      "Better if you know basics or go with a friend.",
      "Bring water.",
      "Check Instagram before going.",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 11, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    mapUrl: "https://maps.google.com/?q=Hatch+Shell+Boston+Esplanade",
  },
  {
    id: "evt-bobas-jul-2",
    slug: "bobas-july-2",
    title: "BOBAS: Boston Outdoor Bachata And Salsa — July 2 Pop-up",
    organizerId: "org-bobas",
    venue: "ICA Dock",
    address: "ICA Dock, Boston, MA — one-time location; back to Charles River Dock after this",
    dayOfWeek: "Thursday",
    startsAt: "19:20",
    endsAt: "21:00",
    popUp: true,
    thisWeek: true,
    scheduleNote: "One-time pop-up at ICA Dock — 7:20 PM start instead of usual time",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "No intro class unless announced" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Pop-up — check official source before going",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-07-01",
    fixedDate: "2026-07-02",
    dateLabel: "",
    scheduleLabel: "7:20–9:00 PM",
    secondaryTags: ["Outdoor", "Free", "Pop-up", "Crowd favorite", "Beginner-welcome"],
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up at ICA Dock.",
      "Thursday July 2, 7:20–9:00 PM — later start than usual.",
      "One-time location; back to Charles River Dock after this.",
      "Beginner-welcome, but not beginner-structured — no class unless announced.",
      "Better if you know basics or go with a friend.",
      "Bring water.",
      "Check Instagram before going.",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 14, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    mapUrl: "https://maps.google.com/?q=ICA+Boston+Dock",
  },
  {
    id: "evt-bobas-jul-8",
    slug: "bobas-july-8",
    title: "BOBAS: Boston Outdoor Bachata And Salsa — July 8",
    organizerId: "org-bobas",
    venue: "Charles River Dock / outdoor pop-up",
    address: "Charles River Dock — check Facebook or Instagram for exact outdoor location",
    dayOfWeek: "Wednesday",
    startsAt: "18:00",
    endsAt: "21:00",
    popUp: true,
    thisWeek: false,
    scheduleNote: "Free outdoor pop-up — check Instagram for updates",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "No intro class unless announced" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Pop-up — check official source before going",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-07-07",
    fixedDate: "2026-07-08",
    dateLabel: "",
    scheduleLabel: "6:00–9:00 PM",
    secondaryTags: ["Outdoor", "Free", "Pop-up", "Crowd favorite", "Beginner-welcome"],
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up at the Charles River Dock.",
      "Wednesday July 8, 6:00–9:00 PM.",
      "Beginner-welcome, but not beginner-structured — no class unless announced.",
      "Better if you know basics or go with a friend.",
      "Bring water.",
      "Check Instagram before going.",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 5, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
  },
  {
    id: "evt-river",
    slug: "bachata-by-the-river",
    title: "Bachata by the River",
    organizerId: "org-bachata-river",
    venue: "Magazine Beach Park / Nature Center",
    address: "668 Memorial Dr, Cambridge, MA",
    dayOfWeek: "Sunday",
    startsAt: "TBD",
    endsAt: "TBD",
    popUp: true,
    scheduleNote: "Monthly / seasonal - often Sunday - check official source",
    cover: "from-mango via-terracotta to-magenta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Beginner Bachata lesson before dancing, usually 6:00–7:00 PM when listed" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Monthly / seasonal - check official source",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
    dateLabel: "",
    scheduleLabel: "Usually 6:00 PM lesson · check official source",
    goodToKnow: [
      "Free outdoor event at Magazine Beach Park.",
      "Beginner Bachata lesson before dancing.",
      "Usually includes Bachata and Salsa dancing.",
      "No partner needed.",
      "Bring water and wear shoes you can spin in.",
      "Check source for exact date and meeting point.",
    ],
    rsvps: { count: 71, initials: ["TI", "AL", "BE"] },
    cost: "Free",
    officialUrl: "https://www.listerevents.com/events",
    facebookUrl: "https://www.facebook.com/events/magazine-beach-cambridge/bachata-by-the-river-summer-dance-party-kick-off/682022144271432/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=668%20Memorial%20Dr%2C%20Cambridge%2C%20MA%2002139",
  },
  {
    id: "evt-saborcito",
    slug: "saborcito-the-anchor",
    title: "Saborcito @ The Anchor",
    organizerId: "org-saborcito",
    venue: "The Anchor Boston",
    address: "1 Shipyard Park, Charlestown, MA 02129",
    dayOfWeek: "Monday",
    startsAt: "18:00",
    endsAt: "21:30",
    scheduleNote: "Seasonal outdoor recurring - check official source",
    cover: "from-oxblood via-ink to-magenta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Free beginner lesson; style may vary by date" },
    waterAvailability: "Food/drinks at venue - bring water recommended",
    alcoholPolicy: "Bar on site - venue serves drinks",
    scheduleReliability: "Seasonal outdoor recurring - check official source",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-22",
    cancellations: ["2026-06-22"],
    dateLabel: "",
    scheduleLabel: "6:00–9:30 PM · check official source",
    goodToKnow: [
      "Free outdoor dance class and social at The Anchor.",
      "Salsa-first, but Bachata is included.",
      "Beginner lesson style may vary by date.",
      "Good low-pressure outdoor option, but not Bachata-heavy.",
      "Check official source before going.",
    ],
    communityNote: "Good outdoor option for beginners who want a low-pressure setting - not Bachata-heavy.",
    rsvps: { count: 0, initials: [] },
    cost: "Free",
    instagramUrl: "https://www.instagram.com/saborlatinoboston/",
    facebookUrl: "https://www.facebook.com/SaborLatinoBoston/",
    officialUrl: "https://www.thebostoncalendar.com/events/saborcito-the-anchor-salsa-bachata-dancing--39",
    ticketUrl: "https://www.eventbrite.com/e/saborcito-the-anchor-salsa-bachata-dancing-tickets-1989160987059",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1%20Shipyard%20Park%2C%20Charlestown%2C%20MA%2002129",
  },
  {
    id: "evt-tambo-fri",
    slug: "tambo-salsa-bachata-friday",
    title: "Tambo Salsa/Bachata Social",
    organizerId: "org-tambo",
    venue: "Dante Alighieri Society",
    address: "41 Hampshire St, Cambridge, MA 02139",
    dayOfWeek: "Friday",
    startsAt: "20:45",
    endsAt: "01:00",
    cover: "from-mango via-oxblood to-ink",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, level: "Salsa class before social" },
    waterAvailability: "Check official source",
    alcoholPolicy: "Check official source",
    scheduleReliability: "Weekly / check official source",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
    dateLabel: "",
    scheduleLabel: "Class 8:45 PM · Social to 1:00 AM",
    goodToKnow: [
      "Friday mixed Salsa/Bachata social at Dante Alighieri Society.",
      "Salsa class before social; Bachata is included in the music mix.",
      "Not Bachata-heavy, but Bachata-relevant.",
      "Check official source for current cover, DJ, and timing.",
    ],
    communityNote: "Good mixed social if you want Salsa with some Bachata. Not the first pick for a Bachata-heavy night.",
    rsvps: { count: 22, initials: ["MI", "JU", "RA"] },
    cost: "$20 class + social / $15 social only",
    officialUrl: "https://www.tambosalsa.com/",
    instagramUrl: "https://www.instagram.com/tambosalsa/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=41%20Hampshire%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash / check official source",
  },
  {
    id: "evt-dantes-sat",
    slug: "dantes-salsa-bachata-saturday",
    title: "Dante's Salsa & Bachata Saturday",
    organizerId: "org-dantes",
    venue: "Dante Alighieri Society",
    address: "41 Hampshire St, Cambridge, MA 02139",
    dayOfWeek: "Saturday",
    startsAt: "20:40",
    endsAt: "01:00",
    cover: "from-terracotta via-magenta to-ink",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Beginner-friendly Salsa/Bachata lesson" },
    waterAvailability: "Check official source",
    alcoholPolicy: "Check official source",
    scheduleReliability: "Weekly / check official source",
    sourceStatus: "Official website / Facebook",
    lastVerified: "2026-06-03",
    dateLabel: "",
    scheduleLabel: "Lesson 8:40 PM · Social to 1:00 AM",
    goodToKnow: [
      "Saturday mixed Salsa/Bachata social at Dante Alighieri Society.",
      "Beginner-friendly lesson before social.",
      "No partner needed according to public listing.",
      "Not Bachata-heavy; better framed as mixed Latin social.",
      "Check official source before going.",
    ],
    communityNote: "Useful Saturday option for beginners who want a class + mixed social, but not a Bachata-heavy night.",
    rsvps: { count: 30, initials: ["VA", "DA", "NI"] },
    cost: "Check official source",
    officialUrl: "https://www.dantessalsaboston.com/",
    instagramUrl: "https://www.instagram.com/salsabachata617/",
    facebookUrl: "https://www.facebook.com/dantessalsaandbachata/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=41%20Hampshire%20St%2C%20Cambridge%2C%20MA%2002139",
  },
  {
    id: "event-starry-lakeside-yappin-grillin-jun-7",
    slug: "starry-lakeside-yappin-grillin-jun-7",
    title: "Lakeside Yappin & Grillin",
    organizerId: "org-starry",
    venue: "Shannon Beach",
    address: "481 Mystic Valley Pkwy, Medford, MA",
    neighborhood: "Mystic Lakes / Medford",
    city: "Medford",
    dayOfWeek: "Sunday",
    startsAt: "15:00",
    endsAt: "19:00",
    cover: "from-mango via-terracotta to-oxblood",
    bachataRelevance: null,
    beginnerLabel: "Community-welcome",
    classBeforeSocial: { offered: false },
    musicMix: "Community outing; dancing possible only if music is allowed",
    waterAvailability: "BYO drinks / bring water",
    alcoholPolicy: "Alcohol at your own risk",
    paymentNotes: "Free event",
    coatCheck: "No coat check / outdoor event",
    scheduleReliability: "One-off community outing — check Partiful",
    sourceStatus: "Partiful / community event",
    fixedDate: "2026-06-07",
    dateLabel: "",
    scheduleLabel: "3:00–7:00 PM",
    eventType: "Community outing",
    needsValidation: false,
    tags: [
      "Community outing",
      "Outdoor",
      "Free",
      "Starry Boston",
      "Bring supplies",
      "Not a dance social",
    ],
    secondaryTags: [
      "Community outing",
      "Outdoor",
      "Free",
      "Partiful",
      "Starry Boston",
    ],
    goodToKnow: [
      "Community outing hosted by Starry Boston.",
      "Sunday, Jun 7 from 3:00–7:00 PM at Shannon Beach.",
      "Plan includes grilling, fishing, swimming, hanging out, and possibly dancing if music is allowed.",
      "Bring a chair or blanket, sunscreen, drinks/water, fruit, grill items, swimming clothes, or fishing gear if you have it.",
      "June 6–7 is Free Fishing Weekend, so fishing license requirements may be waived for that weekend.",
      "This is not a formal Bachata social or class.",
    ],
    communityNote:
      "Good community-building event for dancers who want to meet people outside the dance floor. Not a Bachata-heavy event.",
    rsvps: { count: 12, initials: ["ST", "BO", "SU"] },
    cost: "Free",
    officialUrl: "https://partiful.com/e/5nacjILiuN7H6TvFYahX",
    sourceUrl: "https://partiful.com/e/5nacjILiuN7H6TvFYahX",
    instagramUrl: "https://www.instagram.com/starryboston/",
    lastVerified: "2026-06-03",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=481%20Mystic%20Valley%20Pkwy%2C%20Medford%2C%20MA",
  },
  {
    id: "evt-salsa-y-bomba-jun-13",
    slug: "salsa-y-bomba-concert-june-13",
    title: "Salsa y Bomba Concert",
    organizerId: "org-edwin-pabon",
    venue: "Parkway Methodist Church",
    address: "Parkway Methodist Church, Boston, MA",
    dayOfWeek: "Saturday",
    startsAt: "17:00",
    endsAt: "21:00",
    popUp: true,
    thisWeek: true,
    cover: "from-terracotta via-mango to-oxblood",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Community-welcome",
    classBeforeSocial: { offered: false },
    waterAvailability: "Check with venue",
    alcoholPolicy: "Check with venue",
    scheduleReliability: "One-time event",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-08",
    fixedDate: "2026-06-13",
    dateLabel: "",
    scheduleLabel: "5:00–9:00 PM",
    secondaryTags: ["Live music", "Concert", "Community event"],
    goodToKnow: [
      "Live Salsa and Bomba concert by Edwin Pabon and Orchestra.",
      "Saturday, June 13, 5:00–9:00 PM.",
      "Check official source for tickets and updates.",
    ],
    rsvps: { count: 8, initials: ["EP", "MA", "LU"] },
    cost: "Check official source",
    instagramUrl: "https://www.instagram.com/pabon_pabon_pabon/",
  },
  {
    id: "evt-bachata-mango-jun-24",
    slug: "bachata-mango-popup-june-24",
    title: "Bachata & Mango Pop-Up Social",
    organizerId: "org-bachata-room",
    venue: "Coco Mango",
    address: "50 Cambridgepark Dr, Cambridge, MA 02140",
    dayOfWeek: "Wednesday",
    startsAt: "20:30",
    endsAt: "00:00",
    popUp: true,
    thisWeek: true,
    cover: "from-mango via-terracotta to-magenta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Bachata class 8:30–9:30 PM before the social" },
    waterAvailability: "Check with venue",
    alcoholPolicy: "Check with venue",
    scheduleReliability: "One-time pop-up — check official source before going",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-23",
    fixedDate: "2026-06-24",
    dateLabel: "",
    scheduleLabel: "8:30 PM–12:00 AM",
    secondaryTags: ["Pop-up", "Bachata-heavy", "Class before social"],
    goodToKnow: [
      "Wednesday June 24, 8:30 PM–12:00 AM at Coco Mango.",
      "Bachata class 8:30–9:30 PM followed by social dancing 9:30 PM–12:00 AM.",
      "90% Bachata, 10% Salsa.",
      "Hosted by Bachata Room in collaboration with Flow Studios and ArtEgo Entertainment.",
      "DJs: DJ Ninrod, DJ Francois, and DJ Ascends.",
      "Check Instagram before going.",
    ],
    communityNote: "Bachata Room's pop-up replaces the usual Wednesday Bachata Room for June 24.",
    rsvps: { count: 14, initials: ["BR", "FL", "AE"] },
    cost: "Check official source",
    instagramUrl: "https://www.instagram.com/bachataroom/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=50%20Cambridgepark%20Dr%2C%20Cambridge%2C%20MA%2002140",
  },
  {
    id: "evt-syc-lawn-on-d-jun-25",
    slug: "salsa-lawn-on-d-june-25",
    title: "Salsa Dancing at The Grove at Lawn on D",
    organizerId: "org-salsa-y-control",
    venue: "The Lawn on D Pavilion",
    address: "420 D Street, Boston, MA 02210 (Seaport District)",
    dayOfWeek: "Thursday",
    startsAt: "19:00",
    endsAt: "21:30",
    popUp: true,
    thisWeek: true,
    cover: "from-terracotta via-mango to-magenta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Beginner-friendly Salsa instruction 7:00–8:00 PM" },
    waterAvailability: "Food and drinks available for purchase",
    alcoholPolicy: "Drinks available for purchase",
    scheduleReliability: "Recurring last Thursday of the month (June–October)",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-23",
    fixedDate: "2026-06-25",
    dateLabel: "",
    scheduleLabel: "7:00–9:30 PM",
    secondaryTags: ["Outdoor", "Free", "Salsa", "Beginner-friendly", "Class before social"],
    goodToKnow: [
      "Thursday June 25, 7:00–9:30 PM at The Lawn on D.",
      "7:00–8:00 PM beginner-friendly Salsa instruction by Andres Giraldo & Kelly Bachovchin.",
      "8:00–9:30 PM open social dancing.",
      "100% Salsa.",
      "No partner required.",
      "Food and drinks available for purchase. Weather permitting.",
      "Upcoming dates: June 25, July 30, August 27, September 24, October 29.",
    ],
    communityNote: "Last Thursday of every month (June–October). Outdoor, free, beginner-friendly Salsa social.",
    rsvps: { count: 22, initials: ["AN", "KE", "SY"] },
    cost: "Free",
    officialUrl: "https://luma.com/rrkfqauh",
    sourceUrl: "https://luma.com/rrkfqauh",
    instagramUrl: "https://www.instagram.com/sycdancestudio/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=420%20D%20Street%2C%20Boston%2C%20MA%2002210",
  },
  {
    id: "evt-syc-debuts-jun-26",
    slug: "syc-debuts-vol-3-june-26",
    title: "Debuts! Vol. 3",
    organizerId: "org-salsa-y-control",
    venue: "41 Hampshire St",
    address: "41 Hampshire St, Cambridge, MA",
    dayOfWeek: "Friday",
    startsAt: "20:45",
    endsAt: "01:00",
    popUp: true,
    thisWeek: true,
    cover: "from-magenta via-oxblood to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, level: "Salsa class by SyC 8:45–9:30 PM before the social" },
    waterAvailability: "Check with venue",
    alcoholPolicy: "Check with venue",
    scheduleReliability: "One-time event — check official source",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-23",
    fixedDate: "2026-06-26",
    dateLabel: "",
    scheduleLabel: "8:45 PM lesson · 9:30 PM–1:00 AM social",
    secondaryTags: ["Salsa", "Bachata", "Class before social", "Performance teams"],
    goodToKnow: [
      "Friday June 26, 2026 at 41 Hampshire St, Cambridge.",
      "8:45–9:30 PM Salsa class by Salsa y Control.",
      "9:30 PM–1:00 AM Salsa & Bachata social with DJ Sonerito & DJ Hernan.",
      "50% Salsa, 50% Bachata.",
      "Featuring SyC Sensación, SyC Veneno, and Bachata y Control.",
      "Cost: $15–$20.",
    ],
    communityNote: "Salsa y Control Debut Socials — '7 Teams, 1 Vision. Inspiring others to dance.'",
    rsvps: { count: 18, initials: ["SY", "BC", "HE"] },
    cost: "$15–$20",
    instagramUrl: "https://www.instagram.com/sycdancestudio/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=41%20Hampshire%20St%2C%20Cambridge%2C%20MA",
  },
];

// Compute dateLabel for every event from TODAY in Boston/Eastern time. The
// current Monday–Sunday week anchors recurring events to real calendar dates
// inside that fixed week. Rules:
//   - fixedDate present       → format that date
//   - popUp without fixedDate → "Monthly / date TBA"
//   - recurring weekly        → occurrence inside the current Mon–Sun week
{
  const today = getTodayInBoston();
  const weekStart = getStartOfWeekMonday(today);
  for (const e of events) {
    if (e.fixedDate) {
      e.dateLabel = formatDateLabel(parseIsoDate(e.fixedDate));
    } else if (e.popUp) {
      e.dateLabel = "Monthly / date TBA";
    } else {
      e.dateLabel = formatDateLabel(
        getOccurrenceInWeek(e.dayOfWeek as DayName, weekStart),
      );
    }
  }
}

// Directory/catalog label used by /events. Recurring weekly events show
// recurrence ("Mondays") instead of a generated next-occurrence date so the
// catalog doesn't lie about specific calendar dates. One-offs with a
// fixedDate still show the real date. Pop-ups without a fixedDate show a
// generic TBA hint.
export function catalogDateLabel(e: Event): string {
  if (e.fixedDate) return formatDateLabel(parseIsoDate(e.fixedDate));
  if (e.popUp) return "Monthly / date TBA · check official source";
  return `${e.dayOfWeek}s`;
}

// Ask-page friendly date label. Recurring weekly events show recurrence
// ("Wednesdays"), upcoming one-offs show the real date, and pop-ups with no
// fixedDate show a TBA hint. Past one-offs should be filtered out before
// calling this (see isPastOneOff).
export function getAskDateLabel(
  e: Event,
  today: Date = getTodayInBoston(),
): string {
  if (e.fixedDate) {
    if (isPastOneOff(e, today)) return "Past — check official source";
    return formatDateLabel(parseIsoDate(e.fixedDate));
  }
  if (e.popUp) return "Date TBA / check source";
  return `${e.dayOfWeek}s`;
}

// ---------- Resources ----------

export const resources: Resource[] = [
  // ---- Featured / top community resources ----
  {
    id: "res-starry-boston",
    name: "Starry Boston",
    category: "Safety / values",
    privacyStatus: "Public link",
    description: "Community education / social dance culture resource focused on consent, communication, belonging, safer-floor topics, and the less frequently discussed parts of social dance.",
    howToJoin: "Follow the public Instagram / resource page for events, posts, and community conversations.",
    instagramUrl: "https://www.instagram.com/starryboston/",
    sourceStatus: "Instagram / community-known",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.instagram.com/starryboston/",
    tags: ["Community", "Consent", "Safety", "Dance culture", "Belonging", "Public link"],
    featured: true,
  },
  {
    id: "res-community-values",
    name: "WhereWeDance Community Values",
    category: "Safety / values",
    privacyStatus: "Public link",
    description: "Consent, hygiene, asking etiquette, sensual comfort, safety, and floor culture guide.",
    howToJoin: "Read the values page.",
    websiteUrl: "/values",
    sourceStatus: "WhereWeDance guide",
    lastVerified: "2026-06-03",
    sourceUrl: "/values",
    tags: ["Safety", "Consent", "Etiquette", "Values"],
    featured: true,
  },
  {
    id: "res-next-level-fusion",
    name: "Next Level Fusion",
    category: "Safety / values",
    privacyStatus: "Public link",
    description: "Queer-inclusive dance team/community and inclusion-focused dance resource.",
    howToJoin: "Visit the official website or Instagram for current programming.",
    websiteUrl: "https://www.nextlevelfusiondance.com/",
    instagramUrl: "https://www.instagram.com/nextlevelfusion/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.nextlevelfusiondance.com/",
    tags: ["Inclusive", "Queer-friendly", "Community", "Safety / values", "Public link"],
    featured: true,
  },
  {
    id: "res-party-next-level-fusion",
    name: "Party with Next Level Fusion",
    category: "Safety / values",
    privacyStatus: "Public link",
    description: "Inclusive/queer-friendly dance events from Next Level Fusion. Check Instagram for occasional / pop-up event announcements.",
    howToJoin: "Follow the public Instagram for upcoming events.",
    websiteUrl: "https://www.nextlevelfusiondance.com/",
    instagramUrl: "https://www.instagram.com/partywithnextlevelfusion/",
    sourceStatus: "Official Instagram / organizer post",
    lastVerified: "2026-06-06",
    sourceUrl: "https://www.instagram.com/partywithnextlevelfusion/",
    tags: ["Inclusive", "Queer-friendly", "Pop-up", "The Anchor", "Public link", "Bachata-included", "Free", "Dance party"],
  },

  // ---- Group chats ----
  {
    id: "res-sensualeros-djbat-whatsapp",
    name: "Sensualeros / DJ Bat WhatsApp group",
    category: "Group chats",
    privacyStatus: "Private group",
    description: "Private/community-known WhatsApp group connected to DJ Bat and Sensual Bachata/Boston Bachata updates. Listed for awareness only; invite link should not be public.",
    howToJoin: "Reach out to DJ Bat or a trusted community member for invite details.",
    instagramUrl: "https://www.instagram.com/djbatlive/",
    sourceStatus: "Community-known / private group",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.instagram.com/djbatlive/",
    tags: ["WhatsApp", "Sensual Bachata", "Bachata", "Event updates", "Private group"],
  },
  {
    id: "res-salsaaa-whatsapp",
    name: "Salsaaa WhatsApp group",
    category: "Group chats",
    privacyStatus: "Private group",
    description: "Private/community-known WhatsApp group for local Salsa/Bachata community updates.",
    howToJoin: "Reach out to Dexter or a trusted community member for invite details.",
    sourceStatus: "Community-known / private group",
    lastVerified: "2026-06-03",
    tags: ["WhatsApp", "Salsa", "Bachata", "Private group"],
  },

  // ---- Playlists ----
  {
    id: "res-dj-bat-playlist",
    name: "DJ Bat Bachata playlist",
    category: "Playlists",
    privacyStatus: "Public link",
    description: "Public Bachata playlist associated with DJ Bat for music discovery and practice.",
    howToJoin: "Open the public Spotify playlist.",
    websiteUrl: "https://open.spotify.com/playlist/0GBdyOSZ3NAL5M3xFhR3k4?viewMode=1",
    instagramUrl: "https://www.instagram.com/djbatlive/",
    sourceStatus: "Public Spotify playlist / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://open.spotify.com/playlist/0GBdyOSZ3NAL5M3xFhR3k4?viewMode=1",
    tags: ["Music", "Playlist", "Bachata", "Spotify", "Public link"],
  },
  {
    id: "res-dj-enshun-soundcloud",
    name: "DJ Enshun SoundCloud",
    category: "Playlists",
    privacyStatus: "Public link",
    description: "Public SoundCloud page for DJ Enshun mixes and music discovery.",
    howToJoin: "Open the public SoundCloud page.",
    websiteUrl: "https://soundcloud.com/enshun",
    instagramUrl: "https://www.instagram.com/dj_enshun/",
    sourceStatus: "Public SoundCloud / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://soundcloud.com/enshun",
    tags: ["Music", "Playlist", "SoundCloud", "Bachata", "Salsa", "Public link"],
  },
  {
    id: "res-jl-music",
    name: "J&L Dance Studio music page",
    category: "Playlists",
    privacyStatus: "Public link",
    description: "Public practice music page from J&L Dance Studio with Bachata and Salsa music sections.",
    howToJoin: "Open the public music page.",
    websiteUrl: "https://jandldancestudio.com/music",
    instagramUrl: "https://www.instagram.com/jl_dancestudio/",
    sourceStatus: "Official website",
    lastVerified: "2026-06-03",
    sourceUrl: "https://jandldancestudio.com/music",
    tags: ["Music", "Practice", "Bachata", "Salsa", "Public link"],
  },

  // ---- Online classes ----
  {
    id: "res-bachata-dance-academy-online",
    name: "Bachata Dance Academy Online",
    category: "Online classes",
    privacyStatus: "Public link",
    description: "Curated online Bachata training resource with structured lessons for partnerwork, footwork, body movement, musicality, and styling.",
    howToJoin: "Open the public website and choose a course or free mini-course if interested.",
    websiteUrl: "https://www.bachatadanceacademyonline.com/",
    sourceStatus: "Official website",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.bachatadanceacademyonline.com/",
    tags: ["Online classes", "Beginner", "Intermediate", "Practice at home", "Public link"],
  },

  // ---- Studios ----
  {
    id: "res-jl",
    name: "J&L Dance Studio",
    category: "Studios",
    privacyStatus: "Public link",
    description: "Malden/Boston-area Latin dance studio/community known for structured classes and events.",
    howToJoin: "Check official schedule before going.",
    websiteUrl: "https://jandldancestudio.com/",
    instagramUrl: "https://www.instagram.com/jl_dancestudio/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://jandldancestudio.com/classesoffered",
    tags: ["Studio", "Structured classes", "Public link"],
  },
  {
    id: "res-lili",
    name: "Lili Latin Dance",
    category: "Studios",
    privacyStatus: "Public link",
    description: "Structured Salsa/Bachata classes and monthly / occasional studio socials at 423 W Broadway, Suite 202, South Boston.",
    howToJoin: "Check official schedule and Instagram posts for the next monthly social.",
    websiteUrl: "https://www.lili.dance/",
    instagramUrl: "https://www.instagram.com/lililatindance/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.lili.dance/",
    tags: ["Beginner-friendly", "South Boston", "Monthly social", "Public link"],
  },
  {
    id: "res-rumba-y-timbal",
    name: "Rumba y Timbal",
    category: "Studios",
    privacyStatus: "Public link",
    description: "Greater Boston Latin dance studio/company offering Salsa, Bachata, and other Latin dance classes for beginners through advanced dancers.",
    howToJoin: "Check official schedule before going.",
    websiteUrl: "https://www.rumbaytimbal.com/",
    instagramUrl: "https://www.instagram.com/rumbaytimbal/",
    facebookUrl: "https://www.facebook.com/rumbaytimbalboston/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-05-22",
    sourceUrl: "https://www.rumbaytimbal.com/",
    tags: ["Studio", "Salsa", "Bachata", "Public link"],
  },
  {
    id: "res-salsa-y-control",
    name: "Salsa y Control",
    category: "Studios",
    privacyStatus: "Public link",
    description: "Boston dance company/studio offering structured instruction, performance opportunities, and weekly Salsa and Bachata classes. Salsa-first but Bachata-relevant.",
    howToJoin: "Check official schedule before going.",
    websiteUrl: "https://www.salsaycontrol.com/",
    instagramUrl: "https://www.instagram.com/sycdancestudio/",
    facebookUrl: "https://www.facebook.com/salsaycontroldance/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-05-22",
    sourceUrl: "https://www.salsaycontrol.com/",
    tags: ["Studio", "Salsa-first", "Performance teams", "Public link"],
  },
  {
    id: "res-moves-and-vibes",
    name: "Moves & Vibes",
    category: "Studios",
    privacyStatus: "Needs validation",
    description: "Offers Sensual Bachata, Brazilian Zouk, Forró, Kizomba, Samba, and related partner dance classes in Boston/Cambridge. Verify before going.",
    howToJoin: "Check official schedule before going.",
    websiteUrl: "https://movesandvibes.com/",
    sourceStatus: "Needs validation",
    lastVerified: "2026-05-22",
    sourceUrl: "https://movesandvibes.com/",
    tags: ["Sensual Bachata", "Zouk", "Kizomba", "Needs validation"],
  },
  {
    id: "res-flow-studios",
    name: "Flow Studios",
    category: "Studios",
    privacyStatus: "Public link",
    description: "Instructor-led Sensual Bachata and Latin dance classes directed by François Noel. Schedule and location may vary.",
    howToJoin: "Check official schedule before going.",
    websiteUrl: "https://flowstudios.dance/",
    instagramUrl: "https://www.instagram.com/flowstudios.dance/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://flowstudios.dance/",
    tags: ["Sensual Bachata", "Studio", "Public link"],
  },

  // ---- Venues / organizers ----
  {
    id: "res-havana-club",
    name: "Havana Club Boston",
    category: "Venues / organizers",
    privacyStatus: "Public link",
    description: "Recurring Latin social venue in Cambridge with Salsa/Bachata nights and lessons before socials.",
    howToJoin: "Check the official website or Facebook page for current schedule details.",
    websiteUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    sourceStatus: "Official website / Facebook",
    lastVerified: "2026-06-03",
    sourceUrl: "https://havanaclubsalsa.com/",
    tags: ["Venue", "Organizer", "Salsa", "Bachata", "Public link"],
  },

  // ---- Organizers ----
  {
    id: "res-bachata-room",
    name: "Bachata Room",
    category: "Organizers",
    privacyStatus: "Public link",
    description: "Weekly Bachata-heavy class and social organizer.",
    howToJoin: "Check the official website or Instagram for current details.",
    websiteUrl: "https://www.bachataroomboston.com/",
    instagramUrl: "https://www.instagram.com/bachataroom/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.bachataroomboston.com/",
    tags: ["Organizer", "Bachata", "Weekly social", "Public link"],
  },
  {
    id: "res-booze-bachata",
    name: "Booze & Bachata",
    category: "Organizers",
    privacyStatus: "Public link",
    description: "Bachata-focused pop-up/social dance organizer. Check Instagram for current announcements.",
    howToJoin: "Check Instagram for event announcements, ticket links, venue details, and age requirements.",
    instagramUrl: "https://www.instagram.com/boozeandbachata/",
    sourceStatus: "Instagram / verified",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.instagram.com/boozeandbachata/",
    tags: ["Organizer", "Pop-up", "Bachata-focused", "Public link"],
  },
  {
    id: "res-bobas",
    name: "BOBAS - Boston Outdoor Bachata And Salsa",
    category: "Organizers",
    privacyStatus: "Public link",
    description: "Free outdoor Salsa/Bachata pop-ups, weather-dependent and community-led.",
    howToJoin: "Check Facebook for the most reliable event updates; Instagram may also have updates.",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    sourceStatus: "Instagram / Facebook",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    tags: ["Organizer", "Outdoor", "Free", "Salsa", "Bachata", "Public link"],
  },
  {
    id: "res-sabor-latino",
    name: "Sabor Latino Boston",
    category: "Organizers",
    privacyStatus: "Public link",
    description: "Outdoor Latin dance events including Saborcito @ The Anchor.",
    howToJoin: "Check Instagram/Facebook or public event listings for current dates and details.",
    instagramUrl: "https://www.instagram.com/saborlatinoboston/",
    facebookUrl: "https://www.facebook.com/SaborLatinoBoston/",
    sourceStatus: "Instagram / Facebook / public listing",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.instagram.com/saborlatinoboston/",
    tags: ["Organizer", "Outdoor", "Salsa", "Bachata", "Public link"],
  },

  // ---- Shoes / apparel ----
  {
    id: "res-dance-shoes-guide",
    name: "Dance shoes + apparel guide",
    category: "Shoes / apparel",
    privacyStatus: "Public link",
    description: "Coming soon: beginner-friendly shoe and outfit guidance for social dancing.",
    howToJoin: "Contact us if you want to suggest gear resources.",
    websiteUrl: "/contact",
    sourceStatus: "WhereWeDance guide",
    lastVerified: "2026-06-03",
    sourceUrl: "/contact",
    tags: ["Shoes", "Apparel", "Coming soon"],
  },

  // ---- Blog posts ----
  {
    id: "res-beginner-guide",
    name: "Beginner Guide: Starting Bachata in Boston",
    category: "Blog posts",
    privacyStatus: "Public link",
    description: "WhereWeDance beginner guide covering where to start, what to expect, etiquette, glossary, and first-event recommendations.",
    howToJoin: "Read the guide.",
    websiteUrl: "/beginner-guide",
    sourceStatus: "WhereWeDance guide",
    lastVerified: "2026-06-03",
    sourceUrl: "/beginner-guide",
    tags: ["Beginner", "Guide", "Boston Bachata"],
  },
];

// ---------- Buddies ----------

export const buddies: Buddy[] = [
  {
    id: "bud-1",
    initials: "MA",
    name: "Marcus A.",
    lookingFor: "Drilling basic frame and turns before Wednesday's Bachata Room.",
    level: "Beginner",
    role: "Lead",
    postedAt: "2h ago",
    neighborhood: "Cambridge",
  },
  {
    id: "bud-2",
    initials: "EK",
    name: "Elena K.",
    lookingFor: "Sensual technique partner - body waves and connection drills.",
    level: "Intermediate",
    role: "Follow",
    postedAt: "5h ago",
    neighborhood: "Somerville",
  },
  {
    id: "bud-3",
    initials: "JO",
    name: "Jordan O.",
    lookingFor: "Brand new to bachata, want a patient partner for a first social.",
    level: "Brand new",
    role: "Both",
    postedAt: "1d ago",
    neighborhood: "Brookline",
  },
  {
    id: "bud-4",
    initials: "PR",
    name: "Priya R.",
    lookingFor: "Prepping for Flow Jack & Jill - looking for a rotating lead.",
    level: "Advanced",
    role: "Follow",
    postedAt: "1d ago",
    neighborhood: "Allston",
  },
];

// ---------- Values ----------

export const values: Value[] = [
  {
    id: "val-01-consent",
    title: "Ask once, accept every no",
    short: "Consent is a baseline, not a feature.",
    body: "Every dance is opt-in. A no is complete - no follow-up question, no joke, no pressure later. If someone looks uncomfortable, check in gently or give them space. Support does not need to become a scene.",
  },
  {
    id: "val-02-words",
    title: "Ask with words, not hands",
    short: "An invitation should feel clear, not physical.",
    body: "Use words first: \"Would you like to dance?\" Do not pull someone by the hand, touch someone's back from behind, or guide them onto the floor before they have said yes. A dance starts when both people agree.",
  },
  {
    id: "val-03-anyone",
    title: "Anyone can ask",
    short: "Tradition is not a rule.",
    body: "Traditionally, leads often ask follows to dance, but it can go both ways. Leads, follows, and switches can all ask respectfully. The important part is not who asks - it is that the invitation is clear, kind, and easy to decline.",
  },
  {
    id: "val-04-advanced",
    title: "Ask before dips, tricks, or advanced moves",
    short: "Consent includes the movement, not just the dance.",
    body: "Do not dip, lift, drop, throw, or surprise someone with advanced moves without asking first and knowing how to do them safely. A move you saw online can hurt someone's neck, back, shoulder, or balance. If you are not trained for it, do not try it at a social.",
  },
  {
    id: "val-05-sensual",
    title: "Check comfort for sensual dancing",
    short: "Close connection should be mutual.",
    body: "Sensual Bachata can involve closer frame, body movement, waves, isolations, and head or body-led styling. Do not assume someone is comfortable with close hold or sensual movement just because they said yes to a dance. Start with space, pay attention, and ask if you are unsure.",
  },
  {
    id: "val-06-hygiene",
    title: "Fresh is respectful",
    short: "Hygiene is part of dance etiquette.",
    body: "Social dancing is close-contact. Use deodorant, carry mints or mouth freshener, bring an extra shirt if you sweat a lot, and be mindful with strong perfume or cologne. A little care helps everyone feel more comfortable.",
  },
  {
    id: "val-07-safety",
    title: "Safety before vibe",
    short: "A safe dance is better than a flashy one.",
    body: "Floor safety, body safety, and emotional safety all matter. Give people space on the floor, adapt to the room, and avoid movements that put your partner or nearby dancers at risk. When concerns come up, they should be handled privately and respectfully whenever possible.",
  },
  {
    id: "val-08-beginners",
    title: "Every expert was new",
    short: "Welcome new faces every week.",
    body: "Everyone starts somewhere. If you are a regular, consider inviting newer dancers into the floor when it feels appropriate. One kind dance can make someone feel like they belong.",
  },
  {
    id: "val-09-cliques",
    title: "Notice the cliques you're in",
    short: "Scenes close quickly. Stay porous.",
    body: "It is natural to have friends, but if you mostly dance with the same circle, try opening that circle once in a while. Small invitations make a scene feel more welcoming.",
  },
  {
    id: "val-10-ego",
    title: "Leave the ego at coat check",
    short: "Skill is a tool, not a status.",
    body: "Unsolicited corrections, forceful leading, over-styling, and showing off at your partner's expense are not advanced - they are uncomfortable. The most respected dancers make the dance feel good for both people.",
  },
  {
    id: "val-11-culture",
    title: "Respect where this came from",
    short: "Bachata has Dominican roots. Honor that.",
    body: "Listen to traditional bachata, not just modern remixes. Learn about the artists, instruments, and history. The dance is a living culture, not just a vibe.",
  },
];

// ---------- Ask prompts ----------

export const askPrompts: AskPrompt[] = [
  {
    id: "ask-new",
    prompt: "I'm completely new. Where should I start?",
    category: "Beginner",
    answer: {
      body: "Start with structured studio classes first. J&L Dance Studio and Lili Latin Dance are better places to learn basics before jumping straight into socials. After a few classes, try Bachata Room Wednesday or Havana Saturday because both have lessons before the social.",
      sourceEventIds: ["evt-bachata-room-wed", "evt-havana-sat"],
      sourceResourceIds: ["res-jl", "res-lili"],
      showBeginnerPathway: true,
      recommendations: [
        {
          eventId: "evt-bachata-room-wed",
          label: "Top recommendation",
          whyThisFits: "Wednesday class flows directly into a Bachata-heavy social — a natural next step once you've had a few studio lessons.",
        },
        {
          eventId: "evt-havana-sat",
          label: "Also consider",
          whyThisFits: "Lessons before the party with a bigger crowd — a good class + social combo once you have basics.",
        },
      ],
      generalNote: "Studio classes (J&L, Lili) are the best place to learn basics. Bachata Room and Havana Saturday are class + social options, not pure beginner classes.",
    },
  },
  {
    id: "ask-alone",
    prompt: "I'm nervous to go alone. What should I try?",
    category: "Beginner",
    answer: {
      body: "Try a class-before-social first. Bachata Room Wednesday is a good structured mid-week option. Havana Saturday is a bigger crowd option with lessons before dancing, but can feel more nightlife/crowded. If you are brand new, take a studio class first.",
      sourceEventIds: ["evt-bachata-room-wed", "evt-havana-sat"],
      sourceResourceIds: ["res-jl", "res-lili"],
      showBeginnerPathway: true,
      recommendations: [
        {
          eventId: "evt-bachata-room-wed",
          label: "Top recommendation",
          whyThisFits: "Beginner class before the social and a Bachata-heavy crowd — good if you're going alone.",
        },
        {
          eventId: "evt-havana-sat",
          label: "Also consider",
          whyThisFits: "Lessons before the social with a bigger crowd — more nightlife feel, but easier than walking into a no-class party.",
        },
      ],
      generalNote: "If you are brand new, take a studio class at J&L or Lili first.",
    },
  },
  {
    id: "ask-heavy",
    prompt: "What's Bachata-heavy this week?",
    category: "Tonight",
    answer: {
      body: "Havana Club Monday, Havana Club Thursday, Havana Bachata Sunday, and Bachata Room Wednesday are the Bachata-heavy nights. Havana Saturday Bachata/Salsa is Bachata-included rather than purely Bachata-heavy. All Havana nights have beginner + intermediate lessons before the social. Havana is cash only — there is an ATM on site, but it may charge an extra fee, and coat check is available. Bachata Room is at La Fábrica (18+ to dance, 21+ to drink) and accepts cash/Venmo.",
      sourceEventIds: ["evt-havana-mon", "evt-havana-thu", "evt-bachata-room-wed", "evt-havana-sun", "evt-havana-sat"],
      recommendations: [
        {
          eventId: "evt-havana-mon",
          label: "Top recommendation",
          whyThisFits: "Bachata-heavy Monday, dry/no alcohol, beginner + intermediate Bachata lessons before the social.",
        },
        {
          eventId: "evt-havana-thu",
          label: "Also consider",
          whyThisFits: "Bachata-heavy Thursday, bar available, 21+, beginner + intermediate lessons before the party.",
        },
        {
          eventId: "evt-bachata-room-wed",
          label: "Also consider",
          whyThisFits: "Bachata-heavy Wednesday class + social at La Fábrica. Beginner-friendly class before social; 18+ to dance, 21+ to drink.",
        },
        {
          eventId: "evt-havana-sun",
          label: "Also consider",
          whyThisFits: "Bachata-heavy Sunday option, dry/no alcohol, lessons/practica structure.",
        },
        {
          eventId: "evt-havana-sat",
          label: "Also consider",
          whyThisFits: "Bachata-included Saturday with a large crowd and lessons before dancing — not purely Bachata-heavy.",
        },
      ],
    },
  },
  {
    id: "ask-bobas",
    prompt: "What should I know before BOBAS?",
    category: "Logistics",
    answer: {
      body: "BOBAS is a free outdoor Salsa/Bachata pop-up. It is beginner-welcome, but not beginner-structured because there is usually no class. Check Facebook for the most reliable details; Instagram may also have updates. Bring water, check weather, and go with a friend if you are completely new.",
      sourceEventIds: ["evt-bobas"],
      recommendations: [
        {
          eventId: "evt-bobas",
          label: "Top recommendation",
          whyThisFits: "Free outdoor pop-up — weather-dependent, check Facebook/Instagram, no class unless announced.",
        },
      ],
    },
  },
  {
    id: "ask-outdoor-free",
    prompt: "What outdoor/free events are happening?",
    category: "Logistics",
    answer: {
      body: "Outdoor and free options can include BOBAS, Saborcito, Bachata by the River, and community outings when currently listed. Check the event cards below and official/source links before going.",
      sourceEventIds: ["evt-bobas", "evt-saborcito", "evt-river", "event-starry-lakeside-yappin-grillin-jun-7"],
      recommendations: [
        {
          eventId: "evt-bobas",
          label: "Top recommendation",
          whyThisFits: "Free outdoor Salsa/Bachata pop-up if date-relevant — no class, weather-dependent, check Facebook/Instagram.",
        },
        {
          eventId: "evt-saborcito",
          label: "Also consider",
          whyThisFits: "Free outdoor Salsa-first/Bachata-included social at The Anchor with a beginner lesson when running.",
        },
        {
          eventId: "evt-river",
          label: "Also consider",
          whyThisFits: "Free Bachata by the River day at Magazine Beach Park with a beginner Bachata lesson before dancing.",
        },
        {
          eventId: "event-starry-lakeside-yappin-grillin-jun-7",
          label: "Also consider",
          whyThisFits: "Community outing at Shannon Beach — not a formal dance social, but a friendly way to meet dance-community folks outdoors.",
        },
      ],
      generalNote: "Outdoor and pop-up events can change quickly. Check the official/source link before going. One-off events disappear after they pass.",
    },
  },
  {
    id: "ask-no-alcohol",
    prompt: "Where can I go if I don't want alcohol?",
    category: "Logistics",
    answer: {
      body: "Havana Monday is a dry, dance-focused Bachata-heavy night with a beginner + intermediate lesson before the social — the best no-alcohol pick. Havana Sunday is also dry/no alcohol. BOBAS outdoor pop-ups at the Charles River Dock are also dry (bring water). Bachata Room is at La Fábrica with a bar (21+ to drink); you can still attend without drinking, but it's not a dry venue. For outdoor/community events, alcohol policy varies — check the source.",
      sourceEventIds: ["evt-havana-mon", "evt-havana-sun", "evt-bobas"],
      recommendations: [
        {
          eventId: "evt-havana-mon",
          label: "Top recommendation",
          whyThisFits: "Dry, Bachata-heavy Monday with a beginner class before the social.",
        },
        {
          eventId: "evt-havana-sun",
          label: "Also consider",
          whyThisFits: "Dry/no alcohol Sunday Bachata-heavy option with lessons/practica structure.",
        },
        {
          eventId: "evt-bobas",
          label: "Also consider",
          whyThisFits: "Free outdoor pop-up with no bar on site.",
        },
      ],
    },
  },
  {
    id: "ask-free-events",
    prompt: "What free events are happening?",
    category: "Logistics",
    answer: {
      body: "Free options to keep an eye on, if currently listed: BOBAS outdoor pop-ups at the Charles River Dock, Saborcito @ The Anchor when running, Bachata by the River at Magazine Beach Park, Starry Boston's Lakeside Yappin & Grillin as a community outing, and Next Level Fusion's occasional inclusive dance party at The Anchor (Bachata music included) — check the official Instagram post. One-off events disappear after they pass; check the official/source link.",
      sourceEventIds: ["evt-bobas", "evt-saborcito", "evt-river", "event-starry-lakeside-yappin-grillin-jun-7", "evt-next-level-queer-jun6"],
      sourceResourceIds: ["res-party-next-level-fusion", "res-next-level-fusion"],
      recommendations: [
        {
          eventId: "evt-bobas",
          label: "Top recommendation",
          whyThisFits: "Free outdoor Salsa/Bachata pop-up if date-relevant — weather-dependent, check Facebook/Instagram.",
        },
        {
          eventId: "evt-saborcito",
          label: "Also consider",
          whyThisFits: "Free recurring outdoor Salsa-first/Bachata-included social at The Anchor with a beginner lesson.",
        },
        {
          eventId: "evt-river",
          label: "Also consider",
          whyThisFits: "Free Bachata by the River day at Magazine Beach Park with a beginner Bachata lesson before dancing.",
        },
        {
          eventId: "event-starry-lakeside-yappin-grillin-jun-7",
          label: "Also consider",
          whyThisFits: "Community outing at Shannon Beach — not a formal dance social, useful for meeting people in the dance community.",
        },
        {
          eventId: "evt-next-level-queer-jun6",
          label: "Also consider",
          whyThisFits: "Free, queer-friendly, inclusive dance party at The Anchor — pop-up / one-off, check the official Instagram post.",
        },
      ],
      generalNote: "Pop-up and outdoor events can be cancelled or rescheduled — always check the organizer's official post. One-off events disappear after they pass.",
    },
  },
  {
    id: "ask-community-events",
    prompt: "What community events are happening?",
    category: "Community",
    answer: {
      body: "Community outings appear here only when currently listed.",
      sourceEventIds: ["event-starry-lakeside-yappin-grillin-jun-7"],
      sourceResourceIds: ["res-starry-boston"],
      recommendations: [
        {
          eventId: "event-starry-lakeside-yappin-grillin-jun-7",
          label: "Top recommendation",
          whyThisFits: "Community outing — not a dance social. Good for meeting dance-community folks outdoors when current/upcoming.",
        },
      ],
      generalNote: "Community outings are not Bachata socials. Check the official/source post before going.",
    },
  },
  {
    id: "ask-queer-friendly",
    prompt: "Are there queer-friendly dance events?",
    category: "Community",
    answer: {
      body: "Next Level Fusion is a queer-inclusive dance community. When an event is currently listed, it will appear below. Otherwise, check their official Instagram.",
      sourceEventIds: ["evt-next-level-queer-jun6"],
      sourceResourceIds: ["res-next-level-fusion", "res-party-next-level-fusion"],
      recommendations: [
        {
          eventId: "evt-next-level-queer-jun6",
          label: "Top recommendation",
          whyThisFits: "Free, queer-friendly, inclusive dance party at The Anchor with Bachata music included, hosted by Next Level Fusion.",
        },
      ],
      generalNote: "Next Level Fusion is an inclusive dance community, not a recurring weekly Bachata organizer — events are occasional / pop-up. If no event is currently listed, check the official Instagram for the next date.",
    },
  },
  {
    id: "ask-monthly-studio-social",
    prompt: "What beginner-friendly studio socials are happening?",
    category: "Beginner",
    answer: {
      body: "Lili Latin Dance hosts a monthly / occasional studio social at 423 W Broadway, Suite 202, South Boston. When date-relevant: ChaCha workshop 6:00–6:55 PM, then social and shows 7:00–10:00 PM. Music is a mix of Salsa, Bachata, Merengue, and party music — good for beginners, but not Bachata-heavy. $10 general / $5 for Lili students. Check Lili's official Instagram for the current monthly social schedule.",
      sourceEventIds: ["evt-lili-monthly-social"],
      sourceResourceIds: ["res-lili"],
      recommendations: [
        {
          eventId: "evt-lili-monthly-social",
          label: "Top recommendation",
          whyThisFits: "Beginner-welcome monthly studio social with a workshop before it — mixed Latin music, not Bachata-heavy.",
        },
      ],
      generalNote: "This is a monthly / occasional event, not a weekly recurring social.",
    },
  },
];

// ---------- Helpers ----------

/** Look up an event by its stable internal id. */
export const eventById = (id: string) => events.find((e) => e.id === id);
/** Look up an event by its URL slug (used by `/events/$id`). */
export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
/** Look up an organizer by its stable internal id. */
export const organizerById = (id: string) => organizers.find((o) => o.id === id);
/** Look up an organizer by its URL slug (used by `/organizers/$id`). */
export const organizerBySlug = (slug: string) => organizers.find((o) => o.slug === slug);
/** Look up a resource by its stable internal id. */
export const resourceById = (id: string) => resources.find((r) => r.id === id);

/**
 * Build a Google Maps URL for an event.
 *
 * Returns the explicit `mapUrl` when set, otherwise composes one from
 * `venue` + `address`. Returns `null` when the address is vague
 * (`TBA`, `Location TBA`, "check Instagram", etc.) so the UI can
 * hide the Open Maps CTA instead of linking somewhere misleading.
 */
export const mapUrlForEvent = (e: Event): string | null => {
  if (e.mapUrl) return e.mapUrl;
  if (!e.address) return null;
  const vague =
    /(DM organizer|TBD|TBA|check Instagram|check WhatsApp|check official|check source|announced|exact location|outdoor pop-up)/i;
  if (vague.test(e.address)) return null;
  const q = encodeURIComponent(`${e.venue}, ${e.address}`);
  return `https://maps.google.com/?q=${q}`;
};

// "Tonight" and "this week" are derived from the real current date in
// America/New_York. There is no simulated pilot date. "This Week" is the
// current Monday–Sunday calendar week, not a rolling 7-day window.
function resolvedEventDateInWeek(e: Event, weekStart: Date): Date | null {
  if (e.fixedDate) return parseIsoDate(e.fixedDate);
  if (e.popUp) return null; // pop-ups without a fixed date have no real date
  const d = getOccurrenceInWeek(e.dayOfWeek as DayName, weekStart);
  if (isEventCancelledOn(e, d)) return null;
  return d;
}

function toIsoLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isEventCancelledOn(e: Event, date: Date): boolean {
  if (!e.cancellations || e.cancellations.length === 0) return false;
  return e.cancellations.includes(toIsoLocalDate(date));
}

/** True if `e` happens today in Boston (America/New_York). */
export function isEventTonight(
  e: Event,
  today: Date = getTodayInBoston(),
): boolean {
  if (e.fixedDate) return isSameLocalDay(parseIsoDate(e.fixedDate), today);
  if (e.popUp) return false;
  const weekday = ([
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
  ] as const)[today.getDay()];
  if (e.dayOfWeek !== weekday) return false;
  return !isEventCancelledOn(e, today);
}

/**
 * Events whose resolved date falls inside the current Monday–Sunday
 * Boston week. Recurring weekly events resolve to their next
 * occurrence in that window; fixed-date one-offs resolve to that
 * date; pop-ups without a fixedDate are excluded.
 */
export function getThisWeekEvents(today: Date = getTodayInBoston()): Event[] {
  const weekStart = getStartOfWeekMonday(today);
  const weekEnd = getEndOfWeekSunday(today);
  const startTs = weekStart.getTime();
  const endTs = weekEnd.getTime();
  return events.filter((e) => {
    const d = resolvedEventDateInWeek(e, weekStart);
    if (!d) return false;
    const t = d.getTime();
    return t >= startTs && t <= endTs;
  });
}

/** Subset of `getThisWeekEvents` that happen today. */
export const tonightEvents = (today: Date = getTodayInBoston()) =>
  getThisWeekEvents(today).filter((e) => isEventTonight(e, today));

/**
 * True if this event is a fixed-date one-off whose date is strictly
 * before today. Used by `/events`, `/this-week`, and `AskAnswer` to
 * hide stale one-offs so past events are never recommended as
 * upcoming.
 */
export function isPastOneOff(
  e: Event,
  today: Date = getTodayInBoston(),
): boolean {
  if (!e.fixedDate) return false;
  const d = parseIsoDate(e.fixedDate);
  d.setHours(12, 0, 0, 0);
  const t = new Date(today);
  t.setHours(12, 0, 0, 0);
  return d.getTime() < t.getTime();
}

// Short logistics line for compact cards: e.g. "Cash only · Coat check · Free water".
export const logisticsSummary = (e: Event): string | null => {
  const parts: string[] = [];
  if (e.paymentNotes) {
    if (/^cash only/i.test(e.paymentNotes)) parts.push("Cash only");
    else if (/cash or venmo/i.test(e.paymentNotes)) parts.push("Cash/Venmo");
    else parts.push(e.paymentNotes.split(".")[0]);
  }
  if (e.coatCheck) {
    if (/^no coat/i.test(e.coatCheck)) parts.push("No coat check");
    else parts.push("Coat check");
  }
  if (e.amenities && e.amenities.length) {
    const water = e.amenities.find((a) => /water/i.test(a));
    if (water) {
      if (/may run out/i.test(water)) parts.push("Bring water");
      else parts.push("Free water");
    }
  }
  return parts.length ? parts.join(" · ") : null;
};

export const eventsByDay = () => {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const;
  return days.map((d) => ({ day: d, events: events.filter((e) => e.dayOfWeek === d) }));
};