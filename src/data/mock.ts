// Mock data shaped like future Prisma seed data.
// No fetching, no env, no server logic — pure typed objects.

export type BachataRelevance =
  | "Bachata-heavy"
  | "Bachata-included"
  | "Salsa-first with bachata";

export type BeginnerLabel =
  | "Beginner-friendly"
  | "Beginner-welcome"
  | "Intermediate+";

export type WaterAvailability =
  | "Free water"
  | "Water for sale"
  | "BYO water"
  | "Unknown";

export type AlcoholPolicy =
  | "Bar on site"
  | "BYOB"
  | "Dry event"
  | "21+";

export type ScheduleReliability =
  | "Weekly recurring, very reliable"
  | "Recurring, occasional cancellations"
  | "One-off";

export type SourceStatus =
  | "Verified by organizer"
  | "Verified by community"
  | "From public listing"
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
  bestFor?: string;
  profileLink?: string;
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
  bachataRelevance: BachataRelevance;
  beginnerLabel: BeginnerLabel;
  classBeforeSocial: { offered: boolean; startsAt?: string; level?: string };
  waterAvailability: WaterAvailability;
  alcoholPolicy: AlcoholPolicy;
  scheduleReliability: ScheduleReliability;
  sourceStatus: SourceStatus;
  lastVerified: string; // ISO date
  goodToKnow: string[];
  communityNote?: string;
  rsvps: { count: number; initials: string[] };
  cost: string;
  tonight?: boolean;
  popUp?: boolean;
  scheduleNote?: string;
};

export type Resource = {
  id: string;
  name: string;
  description: string;
  category: "Community" | "Competition" | "Classes" | "Music" | "Wellness";
  privacyStatus: ResourcePrivacy;
  sourceStatus: SourceStatus;
  lastVerified: string;
  link?: string;
};

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
    type: "Weekly Latin social club",
    bestFor: "Bachata-heavy Mondays/Thursdays/Sundays + mixed Salsa/Bachata Tue/Fri/Sat — lessons before the social",
  },
  {
    id: "org-bachata-room",
    slug: "bachata-room",
    name: "The Bachata Room",
    bio: "Bachata-heavy Wednesday night focused on traditional and modern bachata, with a beginner class before the social.",
    values: ["Bachata-first", "Mid-week reset", "Mentorship"],
    recurringEventIds: ["evt-bachata-room-wed"],
    type: "Weekly social + class",
    bestFor: "Mid-week Bachata-heavy social with a beginner track",
  },
  {
    id: "org-jl",
    slug: "jl-underground",
    name: "J&L Underground",
    bio: "Pop-up sensual bachata nights in shifting Cambridge venues. Smaller floor, advanced crowd, strong consent culture.",
    values: ["Sensual done right", "Active consent", "Inclusive of all bodies"],
    recurringEventIds: ["evt-jl"],
    type: "Pop-up social",
    bestFor: "Intermediate+ sensual bachata with active consent",
  },
  {
    id: "org-lili",
    slug: "lili-latin",
    name: "Lili Latin Dance",
    bio: "Beginner-friendly Latin dance studio in Somerville with classes Mon–Thu and a monthly student-friendly social.",
    values: ["Pathway for new dancers", "No partner needed", "Patient teaching"],
    recurringEventIds: ["evt-lili-social"],
    type: "Dance studio",
    bestFor: "Brand-new dancers — structured classes, no partner needed",
  },
  {
    id: "org-bobas",
    slug: "bobas",
    name: "BOBAS Collective",
    bio: "Community-led free outdoor Salsa/Bachata pop-ups at the Charles River Dock. Weather-dependent and usually announced on Instagram shortly before the event.",
    values: ["Free and outdoors", "Community-led", "Bring a friend, bring water"],
    recurringEventIds: ["evt-bobas"],
    type: "Outdoor pop-up organizer",
    bestFor: "Free outdoor Salsa/Bachata, dancers who know basics, community outdoor vibes",
  },
  {
    id: "org-saborcito",
    slug: "sabor-latino-boston",
    name: "Sabor Latino Boston",
    bio: "Sabor Latino Boston runs Saborcito — a free outdoor Latin social at The Anchor with a beginner lesson.",
    values: ["Free outdoor social", "Beginner lesson included", "Salsa-first with Bachata"],
    recurringEventIds: ["evt-saborcito"],
    type: "Outdoor social",
    bestFor: "Free outdoor Salsa-first social with beginner lesson",
  },
  {
    id: "org-starry",
    slug: "starry-boston",
    name: "Starry Boston",
    bio: "Community group that publishes the local consent and safety values doc and runs occasional gatherings.",
    values: ["Consent-first", "Community-authored", "Cross-scene"],
    recurringEventIds: [],
    type: "Community group",
    bestFor: "Cross-scene values, consent, and safer-floor resources",
  },
  {
    id: "org-next-level",
    slug: "next-level-fusion",
    name: "Next Level Fusion",
    bio: "Wednesday afternoon practice group for intermediate dancers prepping for competition.",
    values: ["Practice-first", "Comp prep", "Peer feedback"],
    recurringEventIds: [],
    type: "Practice group",
    bestFor: "Intermediate dancers prepping for Jack & Jill competition",
  },
];

// ---------- Events ----------

export const events: Event[] = [
  {
    id: "evt-havana-mon",
    slug: "havana-club-monday",
    title: "Havana Club Monday — Bachata Mondays",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Monday",
    startsAt: "21:15",
    endsAt: "00:00 / 00:30",
    cover: "from-terracotta via-oxblood to-ink",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "20:15", level: "Beginner + intermediate Bachata lessons before the social" },
    waterAvailability: "Free water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-02",
    goodToKnow: [
      "Bachata-heavy Monday night (~90% Bachata / 10% Salsa where supported)",
      "Beginner + intermediate Bachata lessons before the social",
      "No partner required",
      "No alcohol / dry event · 18+",
      "More serious dancers tend to come, so complete beginners may feel more comfortable taking the class first",
      "Check Havana Club's official page before going",
    ],
    communityNote:
      "Bachata-heavy and dry — come for the dancing, not the bar. The lessons beforehand are the right entry point.",
    rsvps: { count: 47, initials: ["JS", "RL", "MK"] },
    cost: "$15",
    tonight: true,
  },
  {
    id: "evt-havana-tue",
    slug: "havana-club-tuesday",
    title: "Havana Club Tuesday — Salsa-Bachata Tuesdays",
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
    goodToKnow: [
      "Mixed Salsa/Bachata night (~60% Bachata / 40% Salsa where supported)",
      "Beginner + intermediate lessons before social",
      "No partner required",
      "No alcohol · 18+",
      "Check official source before going",
    ],
    rsvps: { count: 31, initials: ["AL", "PE", "RI"] },
    cost: "$15",
  },
  {
    id: "evt-havana-thu",
    slug: "havana-club-thursday",
    title: "Havana Club Thursday — Bachata Thursdays",
    organizerId: "org-havana",
    venue: "Havana Club",
    address: "288 Green St, Central Square, Cambridge",
    dayOfWeek: "Thursday",
    startsAt: "21:15",
    endsAt: "01:30",
    cover: "from-oxblood via-magenta to-terracotta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: true, startsAt: "20:15", level: "Beginner + intermediate Bachata lessons before the dance party" },
    waterAvailability: "Free water",
    alcoholPolicy: "Bar on site",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-02",
    goodToKnow: [
      "Bachata-heavy Thursday night (~80% Bachata / 20% Salsa where supported)",
      "Beginner + intermediate lessons before party",
      "Bar available · 21+",
      "No partner required",
      "Check official source before going",
    ],
    rsvps: { count: 58, initials: ["SI", "GA", "NO"] },
    cost: "$15",
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
    goodToKnow: [
      "Mixed Bachata/Salsa late-night party",
      "Lessons before dancing",
      "Larger party/nightlife energy · Bar available · 21+",
      "Check official source before going",
    ],
    rsvps: { count: 102, initials: ["MA", "EL", "VI"] },
    cost: "$15 / $20",
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
    goodToKnow: [
      "Bachata-heavy Sunday option",
      "No alcohol / dry event · 18+",
      "Lessons/practica structure — check official listing",
      "No partner required",
      "Check official source before going",
    ],
    rsvps: { count: 36, initials: ["DA", "NI", "CL"] },
    cost: "$15",
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
    sourceStatus: "From public listing",
    lastVerified: "2026-05-30",
    goodToKnow: [
      "Large Saturday crowd (~70% Bachata / 25% Salsa / 5% Merengue where supported)",
      "Beginner + intermediate Bachata/Salsa lessons before dancing",
      "Beginner-welcome, but bigger crowds can feel overwhelming",
      "Bar available · 21+",
      "Check official source before going",
    ],
    rsvps: { count: 132, initials: ["AN", "TP", "DV"] },
    cost: "$15 / $20",
  },
  {
    id: "evt-bachata-room-wed",
    slug: "bachata-room-wednesday",
    title: "Bachata Room Wednesday",
    organizerId: "org-bachata-room",
    venue: "Studio 7",
    address: "7 Temple St, Somerville",
    dayOfWeek: "Wednesday",
    startsAt: "19:30",
    endsAt: "23:30",
    cover: "from-oxblood via-magenta to-terracotta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "19:30", level: "Beginner + improver tracks" },
    waterAvailability: "Free water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Weekly recurring, very reliable",
    sourceStatus: "Verified by organizer",
    lastVerified: "2026-06-01",
    goodToKnow: [
      "Bachata-heavy Wednesday social with a beginner class before the social",
      "Bring water — free water may run out later in the night",
      "Good if going alone — rotations are facilitated",
    ],
    communityNote: "Beginner track is patient and welcoming. Worth the trip from anywhere on the Red Line.",
    rsvps: { count: 64, initials: ["LI", "MA", "RB"] },
    cost: "$12",
    tonight: true,
  },
  {
    id: "evt-jl",
    slug: "jl-underground",
    title: "J&L Underground",
    organizerId: "org-jl",
    venue: "Rotating Cambridge venue",
    address: "DM organizer for location",
    dayOfWeek: "Friday",
    startsAt: "22:00",
    endsAt: "02:00",
    cover: "from-ink via-oxblood to-magenta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Intermediate+",
    classBeforeSocial: { offered: false },
    waterAvailability: "Free water",
    alcoholPolicy: "BYOB",
    scheduleReliability: "Recurring, occasional cancellations",
    sourceStatus: "Verified by community",
    lastVerified: "2026-05-25",
    goodToKnow: [
      "Sensual bachata focus — explicit consent culture, ask every dance",
      "Location shared 24h before — must be on the list",
      "Small floor, ~60 dancers max",
    ],
    communityNote: "If you're new to sensual, do a class or two first. The crowd is welcoming but the dancing is close.",
    rsvps: { count: 38, initials: ["JE", "LU", "KO"] },
    cost: "$20",
  },
  {
    id: "evt-lili-social",
    slug: "lili-latin-social",
    title: "Lili Latin First-Friday Social",
    organizerId: "org-lili",
    venue: "Lili Latin Studio",
    address: "412 Highland Ave, Somerville",
    dayOfWeek: "Friday",
    startsAt: "19:00",
    endsAt: "22:30",
    cover: "from-mango via-terracotta to-oxblood",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "19:00", level: "Brand-new student review" },
    waterAvailability: "Free water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Recurring, occasional cancellations",
    sourceStatus: "Verified by organizer",
    lastVerified: "2026-05-28",
    goodToKnow: [
      "Designed for first-timers — no prior class required",
      "Studio is dry — there's a juice bar two doors down",
      "Rotations are facilitated so no one is stuck on the wall",
    ],
    rsvps: { count: 52, initials: ["SO", "NA", "EM"] },
    cost: "$10",
  },
  {
    id: "evt-bobas",
    slug: "bobas",
    title: "BOBAS: Boston Outdoor Bachata And Salsa",
    organizerId: "org-bobas",
    venue: "Charles River Dock",
    address: "Charles River Dock / Boston outdoor location",
    dayOfWeek: "Thursday",
    startsAt: "TBD",
    endsAt: "TBD",
    popUp: true,
    scheduleNote: "Weather-dependent pop-up · announced on Instagram shortly before",
    cover: "from-mango via-magenta to-terracotta",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Recurring, occasional cancellations",
    sourceStatus: "Needs validation",
    lastVerified: "2026-05-29",
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up",
      "Usually announced on Instagram shortly before — depends on weather",
      "Beginner-welcome, but not beginner-structured because there is usually no class",
      "Better if you know basics or go with a friend",
      "Bring water",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 88, initials: ["CA", "RO", "MI"] },
    cost: "Free",
  },
  {
    id: "evt-river",
    slug: "bachata-by-the-river",
    title: "Bachata by the River",
    organizerId: "org-bobas",
    venue: "Esplanade — Hatch Shell lawn",
    address: "Charles River Esplanade, Boston",
    dayOfWeek: "Sunday",
    startsAt: "16:00",
    endsAt: "19:00",
    cover: "from-mango via-terracotta to-magenta",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "16:00", level: "Beginner Bachata lesson on the lawn" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Recurring, occasional cancellations",
    sourceStatus: "From public listing",
    lastVerified: "2026-05-20",
    goodToKnow: [
      "Salsa + Bachata music — Bachata-forward overall",
      "Beginner Bachata lesson on the lawn — good first outdoor try",
      "Weather-dependent — check IG morning of",
    ],
    rsvps: { count: 71, initials: ["TI", "AL", "BE"] },
    cost: "Free",
  },
  {
    id: "evt-saborcito",
    slug: "saborcito-the-anchor",
    title: "Saborcito @ The Anchor",
    organizerId: "org-saborcito",
    venue: "The Anchor Boston",
    address: "Charlestown / The Anchor",
    dayOfWeek: "Monday",
    startsAt: "Evening",
    endsAt: "TBD",
    cover: "from-oxblood via-ink to-magenta",
    bachataRelevance: "Salsa-first with bachata",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Free beginner lesson — may be Salsa, Bachata, or both" },
    waterAvailability: "Unknown",
    alcoholPolicy: "Bar on site",
    scheduleReliability: "Recurring, occasional cancellations",
    sourceStatus: "Needs validation",
    lastVerified: "2026-05-22",
    goodToKnow: [
      "Free outdoor Latin social at The Anchor",
      "Salsa-first, but usually includes some Bachata",
      "Beginner lesson may be Salsa, Bachata, or both depending on the day",
      "Check Instagram or official organizer updates before going",
    ],
    communityNote: "Good outdoor option for beginners who want a low-pressure setting, but not a Bachata-heavy event.",
    rsvps: { count: 0, initials: [] },
    cost: "Free",
  },
];

// ---------- Resources ----------

export const resources: Resource[] = [
  {
    id: "res-starry",
    name: "Starry Boston — community values doc",
    description: "Local statement on consent, safety, and dance culture co-written by Boston organizers.",
    category: "Community",
    privacyStatus: "Public link",
    sourceStatus: "Verified by community",
    lastVerified: "2026-05-15",
    link: "#",
  },
  {
    id: "res-flow",
    name: "Flow Bachata Competition",
    description: "Regional Jack & Jill competition with a beginner division.",
    category: "Competition",
    privacyStatus: "Public link",
    sourceStatus: "Verified by organizer",
    lastVerified: "2026-05-10",
    link: "#",
  },
  {
    id: "res-next-level",
    name: "Next Level Fusion practice group",
    description: "Wednesday afternoon practice group for intermediate dancers prepping for competition.",
    category: "Classes",
    privacyStatus: "DM to join",
    sourceStatus: "Verified by community",
    lastVerified: "2026-05-18",
  },
  {
    id: "res-house-circle",
    name: "House Circle — sensual study group",
    description: "Small invite-only group rotating between members' studios for technique work.",
    category: "Classes",
    privacyStatus: "Private group",
    sourceStatus: "Verified by community",
    lastVerified: "2026-05-08",
  },
  {
    id: "res-organizer-circle",
    name: "Boston Organizer Circle",
    description: "Monthly meeting for venue owners and night runners — message an existing organizer for an intro.",
    category: "Community",
    privacyStatus: "Ask organizer",
    sourceStatus: "Verified by organizer",
    lastVerified: "2026-05-12",
  },
  {
    id: "res-djset",
    name: "DJ Reni — Boston bachata playlists",
    description: "Weekly Spotify mixes of what's being played on local floors.",
    category: "Music",
    privacyStatus: "Public link",
    sourceStatus: "Verified by community",
    lastVerified: "2026-05-19",
    link: "#",
  },
  {
    id: "res-mystery-pop",
    name: "Unverified: 'Bachata Speakeasy'",
    description: "Mentioned on a flyer at Havana — no organizer contact yet. Help us validate.",
    category: "Community",
    privacyStatus: "Needs validation",
    sourceStatus: "Needs validation",
    lastVerified: "2026-04-30",
  },
  {
    id: "res-bobas",
    name: "BOBAS — Boston Outdoor Bachata And Salsa",
    description: "Free outdoor Salsa/Bachata pop-ups in Boston, weather-dependent and community-led. Check Instagram before going.",
    category: "Community",
    privacyStatus: "Needs validation",
    sourceStatus: "Needs validation",
    lastVerified: "2026-05-29",
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
    lookingFor: "Sensual technique partner — body waves and connection drills.",
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
    lookingFor: "Prepping for Flow Jack & Jill — looking for a rotating lead.",
    level: "Advanced",
    role: "Follow",
    postedAt: "1d ago",
    neighborhood: "Allston",
  },
];

// ---------- Values ----------

export const values: Value[] = [
  {
    id: "val-consent",
    title: "Ask once, accept every no",
    short: "Consent is a baseline, not a feature.",
    body: "Every dance is opt-in. A no is complete — no follow-up question, no joke, no pressure later. If someone looks uncomfortable, check in gently or give them space. Support does not need to become a scene.",
  },
  {
    id: "val-safety",
    title: "Safety before vibe",
    short: "A safe dance is better than a flashy one.",
    body: "Floor safety, body safety, and emotional safety all matter. Do not try dips, tricks, lifts, or advanced sensual movements without training and consent. When concerns come up, they should be handled privately and respectfully whenever possible.",
  },
  {
    id: "val-beginners",
    title: "Every expert was new",
    short: "Welcome new faces every week.",
    body: "Everyone starts somewhere. If you are a regular, consider inviting newer dancers into the floor when it feels appropriate. One kind dance can make someone feel like they belong.",
  },
  {
    id: "val-cliques",
    title: "Notice the cliques you're in",
    short: "Scenes close quickly. Stay porous.",
    body: "It is natural to have friends, but if you mostly dance with the same circle, try opening that circle once in a while. Small invitations make a scene feel more welcoming.",
  },
  {
    id: "val-ego",
    title: "Leave the ego at coat check",
    short: "Skill is a tool, not a status.",
    body: "Unsolicited corrections, forceful leading, over-styling, and showing off at your partner's expense are not advanced — they are uncomfortable. The most respected dancers make the dance feel good for both people.",
  },
  {
    id: "val-culture",
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
      body: "Take a structured class first. Lili Latin Dance runs brand-new tracks Mon–Thu and J&L Dance Studio teaches partner-free fundamentals. Once you've had a few classes, Bachata Room's Wednesday beginner class flows directly into a beginner-friendly social.",
      sourceEventIds: ["evt-lili-social", "evt-bachata-room-wed"],
      showBeginnerPathway: true,
      recommendations: [
        {
          eventId: "evt-lili-social",
          label: "Top recommendation",
          whyThisFits: "Designed for brand-new dancers, no partner needed, dry studio, facilitated rotations.",
        },
        {
          eventId: "evt-bachata-room-wed",
          label: "Also consider",
          whyThisFits: "Beginner class flows directly into a Bachata-heavy social — a natural next step once you've had a few lessons.",
        },
      ],
    },
  },
  {
    id: "ask-alone",
    prompt: "I'm nervous to go alone. What should I try?",
    category: "Beginner",
    answer: {
      body: "Bachata Room Wednesday and Lili Latin's First-Friday social both facilitate rotations, so people who come alone don't get stuck on the wall. Beginner-friendly and dry — easier for a first solo trip than a late-night bar social.",
      sourceEventIds: ["evt-bachata-room-wed", "evt-lili-social"],
      showBeginnerPathway: true,
      recommendations: [
        {
          eventId: "evt-bachata-room-wed",
          label: "Top recommendation",
          whyThisFits: "Facilitated rotations and a beginner class before the social — good if you're going alone.",
        },
        {
          eventId: "evt-lili-social",
          label: "Also consider",
          whyThisFits: "Studio social aimed at first-timers, dry, rotations are run so no one is stuck on the wall.",
        },
      ],
    },
  },
  {
    id: "ask-heavy",
    prompt: "What's Bachata-heavy this week?",
    category: "Tonight",
    answer: {
      body: "Havana Club Monday, Havana Club Thursday, and Bachata Room Wednesday are the most Bachata-heavy nights. Havana Bachata Sunday is also Bachata-heavy. Havana Saturday Bachata/Salsa is Bachata-included rather than purely Bachata-heavy. All Havana nights have beginner + intermediate lessons before the social.",
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
          whyThisFits: "Bachata-heavy, beginner class before social, dry event.",
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
      body: "BOBAS is a free outdoor Salsa/Bachata pop-up. It is beginner-welcome, but because there is usually no class, complete beginners may feel more comfortable going with a friend or after taking a few classes. Check Instagram before going because it is weather-dependent and often announced close to the event. Bring water.",
      sourceEventIds: ["evt-bobas"],
      recommendations: [
        {
          eventId: "evt-bobas",
          label: "Top recommendation",
          whyThisFits: "Free outdoor pop-up — weather-dependent, no class, better if you know basics or bring a friend.",
        },
      ],
    },
  },
  {
    id: "ask-outdoor-free",
    prompt: "What outdoor/free events are happening?",
    category: "Logistics",
    answer: {
      body: "BOBAS runs free outdoor Salsa/Bachata pop-ups at the Charles River Dock, and Bachata by the River is free on Sundays at the Esplanade. Both are weather-dependent — check Instagram before going.",
      sourceEventIds: ["evt-bobas", "evt-river"],
      recommendations: [
        {
          eventId: "evt-bobas",
          label: "Top recommendation",
          whyThisFits: "Free outdoor Salsa/Bachata pop-up — no class, weather-dependent, announced on Instagram.",
        },
        {
          eventId: "evt-river",
          label: "Also consider",
          whyThisFits: "Free Sunday afternoon on the Esplanade with a beginner Bachata lesson on the lawn.",
        },
      ],
      generalNote: "Both events are announced on Instagram morning-of and may be cancelled for weather.",
    },
  },
  {
    id: "ask-no-alcohol",
    prompt: "Where can I go if I don't want alcohol?",
    category: "Logistics",
    answer: {
      body: "Bachata Room Wednesday, Lili Latin's First-Friday social, and the BOBAS outdoor nights are all dry events — no bar on site. Havana Monday is also now a dry, dance-focused night.",
      sourceEventIds: ["evt-bachata-room-wed", "evt-lili-social", "evt-bobas", "evt-havana-mon"],
      recommendations: [
        {
          eventId: "evt-havana-mon",
          label: "Top recommendation",
          whyThisFits: "Dry, Bachata-heavy Monday with a beginner class before the social.",
        },
        {
          eventId: "evt-bachata-room-wed",
          label: "Also consider",
          whyThisFits: "Dry Wednesday social with a beginner class — Bachata-heavy.",
        },
        {
          eventId: "evt-lili-social",
          label: "Also consider",
          whyThisFits: "Dry studio social aimed at first-timers, with facilitated rotations.",
        },
        {
          eventId: "evt-bobas",
          label: "Also consider",
          whyThisFits: "Free outdoor pop-up with no bar on site.",
        },
      ],
    },
  },
];

// ---------- Helpers ----------

export const eventById = (id: string) => events.find((e) => e.id === id);
export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
export const organizerById = (id: string) => organizers.find((o) => o.id === id);
export const organizerBySlug = (slug: string) => organizers.find((o) => o.slug === slug);
export const resourceById = (id: string) => resources.find((r) => r.id === id);

export const tonightEvents = () => events.filter((e) => e.tonight);
export const eventsByDay = () => {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const;
  return days.map((d) => ({ day: d, events: events.filter((e) => e.dayOfWeek === d) }));
};