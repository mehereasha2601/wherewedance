// Mock data shaped like future Prisma seed data.
// No fetching, no env, no server logic - pure typed objects.

export type BachataRelevance =
  | "Bachata-heavy"
  | "Bachata-forward"
  | "Bachata-included"
  | "Salsa-first with bachata";

export type BeginnerLabel =
  | "Beginner-friendly"
  | "Beginner-welcome"
  | "Intermediate+";

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
  popUp?: boolean;
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
    bio: "Community-led free outdoor Salsa/Bachata pop-ups at the Charles River Dock. Weather-dependent and usually announced on Instagram shortly before the event.",
    values: ["Free and outdoors", "Community-led", "Bring a friend, bring water"],
    recurringEventIds: ["evt-bobas"],
    type: "Outdoor pop-up organizer",
    typeFilter: "Outdoor pop-up organizer",
    bestFor: "Free outdoor Salsa/Bachata pop-ups, community outdoor dancing, dancers who know basics",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    sourceUrl: "https://www.instagram.com/bobas.dance/",
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
    values: ["Free outdoor social", "Beginner lesson included", "Salsa-first with Bachata"],
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
    recurringEventIds: [],
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
    bio: "Next Level Fusion is a Boston-based inclusive dance community/team founded by Tina Cavicchio. Their work centers inclusion, access, safety, creativity, and empowerment, especially for queer/trans/LGBTQIA+ dancers. Styles include Bachata, Salsa, Hip Hop, Waacking, Commercial Jazz, and more.",
    values: ["Queer-inclusive", "Access and safety", "Afro-Latin and fusion"],
    recurringEventIds: [],
    type: "Queer-inclusive dance team / inclusive dance community",
    typeFilter: "Queer-inclusive dance community",
    secondaryTags: ["Inclusive", "Community", "Bachata/Salsa-adjacent"],
    bestFor: "Queer-inclusive dance community, fusion performance, Afro-Latin dance, Bachata/Salsa-adjacent programming, inclusion/access/safety work",
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
    bio: "Booze & Bachata is a Bachata-forward pop-up/social dance organizer. Check Instagram for current event dates, venues, class details, tickets, and age requirements.",
    values: ["Bachata-forward", "Pop-up socials", "Social/nightlife setting"],
    recurringEventIds: [],
    type: "Pop-up Bachata social organizer",
    typeFilter: "Pop-up Bachata social organizer",
    secondaryTags: ["Pop-up", "Bachata-forward", "Social dance events", "Check Instagram"],
    bestFor: "Bachata-forward pop-up socials, intimate social dance events, and dancers looking for a Bachata event in a social/nightlife setting",
    instagramUrl: "https://www.instagram.com/boozeandbachata/",
    sourceUrl: "https://www.instagram.com/boozeandbachata/",
    sourceStatus: "Instagram / verified",
    lastVerified: "2026-06-03",
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
    endsAt: "00:00 / 00:30",
    cover: "from-terracotta via-oxblood to-ink",
    bachataRelevance: "Bachata-heavy",
    beginnerLabel: "Beginner-welcome",
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
      "More serious dancers tend to come, so complete beginners may feel intimidated - taking the class first helps a lot",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check available.",
      "Free water available.",
      "Check Havana Club's official page before going.",
    ],
    communityNote:
      "Bachata-heavy and dry - come for the dancing, not the bar. The lessons beforehand are the right entry point.",
    rsvps: { count: 47, initials: ["JS", "RL", "MK"] },
    cost: "$15",
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
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check available.",
      "Free water available.",
      "Check official source before going.",
    ],
    rsvps: { count: 58, initials: ["SI", "GA", "NO"] },
    cost: "$15",
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
    sourceStatus: "From public listing",
    lastVerified: "2026-05-30",
    goodToKnow: [
      "Large Saturday crowd (~70% Bachata / 25% Salsa / 5% Merengue where supported)",
      "Beginner + intermediate Bachata/Salsa lessons before dancing",
      "Beginner-welcome, but bigger crowds can feel overwhelming",
      "Bar available · 21+",
      "Cash only.",
      "ATM available on site, but it may charge an extra fee.",
      "Coat check available.",
      "Free water available.",
      "Check official source before going.",
    ],
    rsvps: { count: 132, initials: ["AN", "TP", "DV"] },
    cost: "$15 / $20",
    officialUrl: "https://havanaclubsalsa.com/",
    facebookUrl: "https://www.facebook.com/HavanaClubBoston/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=288%20Green%20St%2C%20Cambridge%2C%20MA%2002139",
    paymentNotes: "Cash only. ATM available on site, but it may charge an extra fee.",
    coatCheck: "Coat check available",
    amenities: ["Free water", "Coat check available", "ATM on site"],
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
      "Cash or Venmo accepted.",
      "No coat check.",
      "Bring water because free water may run out.",
      "Beginner class before social.",
      "Good if going alone because class/rotations help people meet dancers.",
      "Bachata-heavy Wednesday social.",
    ],
    communityNote: "Beginner track is patient and welcoming.",
    rsvps: { count: 64, initials: ["LI", "MA", "RB"] },
    cost: "$12",
    officialUrl: "https://www.bachataroomboston.com/",
    instagramUrl: "https://www.instagram.com/bachataroom/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=450%20Massachusetts%20Avenue%2C%20Cambridge%2C%20MA",
    paymentNotes: "Cash or Venmo accepted.",
    coatCheck: "No coat check",
    amenities: ["Free water may run out", "No coat check"],
  },
  {
    id: "evt-jl",
    slug: "jl-underground",
    title: "J&L Underground Social",
    organizerId: "org-jl",
    venue: "J&L Dance Studio or announced venue - check official source",
    address: "75 Pleasant Street, #125, Malden, MA 02148 (if at studio) - otherwise check official source",
    dayOfWeek: "Friday",
    startsAt: "TBD",
    endsAt: "TBD",
    popUp: true,
    scheduleNote: "Monthly / occasional - check official source",
    cover: "from-ink via-oxblood to-magenta",
    bachataRelevance: "Bachata-forward",
    beginnerLabel: "Beginner-welcome",
    classBeforeSocial: { offered: false, level: "Check official event listing" },
    waterAvailability: "Check official source",
    alcoholPolicy: "Unknown - check official source",
    scheduleReliability: "Monthly / occasional - check official source",
    sourceStatus: "Check official source",
    lastVerified: "2026-06-03",
    goodToKnow: [
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
    id: "evt-lili-social",
    slug: "lili-latin-social",
    title: "Lili Latin First-Friday Social",
    organizerId: "org-lili",
    venue: "Lili Latin Dance - check official source",
    address: "Check official source for current studio/event location",
    dayOfWeek: "Friday",
    startsAt: "19:00",
    endsAt: "22:30",
    cover: "from-mango via-terracotta to-oxblood",
    bachataRelevance: "Bachata-included",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, startsAt: "19:00", level: "Brand-new student review" },
    waterAvailability: "Check official source",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Check official source",
    sourceStatus: "Needs validation",
    lastVerified: "2026-06-03",
    goodToKnow: [
      "Lili Latin Dance is a structured Salsa/Bachata class provider.",
      "Good option for brand-new dancers.",
      "Check official schedule before going.",
      "First-Friday Social details not verified - check the organizer before going.",
    ],
    rsvps: { count: 52, initials: ["SO", "NA", "EM"] },
    cost: "Check official source",
    officialUrl: "https://www.lili.dance/",
    instagramUrl: "https://www.instagram.com/lililatindance/",
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
    scheduleReliability: "Weather-dependent pop-up - check Instagram",
    sourceStatus: "Needs validation",
    lastVerified: "2026-05-29",
    goodToKnow: [
      "Free outdoor Salsa/Bachata pop-up",
      "Usually announced on Instagram shortly before - depends on weather",
      "Beginner-welcome, but not beginner-structured because there is usually no class",
      "Better if you know basics or go with a friend",
      "Bring water",
    ],
    communityNote: "Managed by community dancers who love dancing. Great outdoor vibe, but can feel socially intimidating if you go alone as a complete beginner.",
    rsvps: { count: 88, initials: ["CA", "RO", "MI"] },
    cost: "Free",
    officialUrl: "https://www.instagram.com/bobas.dance/",
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
    bachataRelevance: "Bachata-forward",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Beginner Bachata lesson before dancing" },
    waterAvailability: "BYO water",
    alcoholPolicy: "Dry event",
    scheduleReliability: "Monthly / seasonal - check official source",
    sourceStatus: "From public listing",
    lastVerified: "2026-06-03",
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
    mapUrl: "https://www.google.com/maps/search/?api=1&query=668%20Memorial%20Dr%2C%20Cambridge%2C%20MA",
  },
  {
    id: "evt-saborcito",
    slug: "saborcito-the-anchor",
    title: "Saborcito @ The Anchor",
    organizerId: "org-saborcito",
    venue: "The Anchor Boston",
    address: "1 Shipyard Park, Charlestown, MA 02129",
    dayOfWeek: "Monday",
    startsAt: "Evening - check official source",
    endsAt: "TBD",
    scheduleNote: "Seasonal outdoor recurring - check official source",
    cover: "from-oxblood via-ink to-magenta",
    bachataRelevance: "Salsa-first with bachata",
    beginnerLabel: "Beginner-friendly",
    classBeforeSocial: { offered: true, level: "Free beginner lesson (Salsa, Bachata, or both - varies by date)" },
    waterAvailability: "Food/drinks at venue - bring water recommended",
    alcoholPolicy: "Bar on site - venue serves drinks",
    scheduleReliability: "Seasonal outdoor recurring - check official source",
    sourceStatus: "Needs validation",
    lastVerified: "2026-06-03",
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
];

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
    description: "Beginner-friendly Latin dance studio in Somerville with classes Mon-Thu and a monthly student-friendly social.",
    howToJoin: "Check official schedule before going.",
    websiteUrl: "https://www.lili.dance/",
    instagramUrl: "https://www.instagram.com/lililatindance/",
    sourceStatus: "Official website / Instagram",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.lili.dance/",
    tags: ["Beginner-friendly", "Somerville", "Public link"],
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
    description: "Bachata-forward pop-up/social dance organizer. Check Instagram for current announcements.",
    howToJoin: "Check Instagram for event announcements, ticket links, venue details, and age requirements.",
    instagramUrl: "https://www.instagram.com/boozeandbachata/",
    sourceStatus: "Instagram / verified",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.instagram.com/boozeandbachata/",
    tags: ["Organizer", "Pop-up", "Bachata-forward", "Public link"],
  },
  {
    id: "res-bobas",
    name: "BOBAS - Boston Outdoor Bachata And Salsa",
    category: "Organizers",
    privacyStatus: "Public link",
    description: "Free outdoor Salsa/Bachata pop-ups, weather-dependent and community-led.",
    howToJoin: "Check Instagram for weather-dependent announcements and exact location.",
    instagramUrl: "https://www.instagram.com/bobas.dance/",
    facebookUrl: "https://www.facebook.com/p/Boston-Outdoor-Bachata-And-Salsa-61551665503735/",
    sourceStatus: "Instagram / Facebook",
    lastVerified: "2026-06-03",
    sourceUrl: "https://www.instagram.com/bobas.dance/",
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
    description: "WhereWeDance guide for beginner-friendly shoe and outfit choices: comfortable shoes first, then dance shoes when you continue.",
    howToJoin: "Read the guide.",
    websiteUrl: "/guides/dance-shoes-apparel",
    sourceStatus: "WhereWeDance guide",
    lastVerified: "2026-06-03",
    sourceUrl: "/guides/dance-shoes-apparel",
    tags: ["Shoes", "Apparel", "Beginner guide"],
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
      body: "Take a structured class first. Lili Latin Dance runs brand-new tracks Mon–Thu and J&L Dance Studio teaches partner-free fundamentals. Once you've had a few classes, Bachata Room's Wednesday beginner class flows directly into a beginner-friendly social. Bachata Room accepts cash/Venmo, has no coat check, and free water may run out, so bring water.",
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
          whyThisFits: "Beginner class flows directly into a Bachata-heavy social - a natural next step once you've had a few lessons.",
        },
      ],
    },
  },
  {
    id: "ask-alone",
    prompt: "I'm nervous to go alone. What should I try?",
    category: "Beginner",
    answer: {
      body: "Bachata Room Wednesday and Lili Latin's First-Friday social both facilitate rotations, so people who come alone don't get stuck on the wall. Beginner-friendly and dry - easier for a first solo trip than a late-night bar social. Bachata Room accepts cash/Venmo, has no coat check, and free water may run out, so bring water.",
      sourceEventIds: ["evt-bachata-room-wed", "evt-lili-social"],
      showBeginnerPathway: true,
      recommendations: [
        {
          eventId: "evt-bachata-room-wed",
          label: "Top recommendation",
          whyThisFits: "Facilitated rotations and a beginner class before the social - good if you're going alone.",
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
      body: "Havana Club Monday, Havana Club Thursday, and Bachata Room Wednesday are the most Bachata-heavy nights. Havana Bachata Sunday is also Bachata-heavy. Havana Saturday Bachata/Salsa is Bachata-included rather than purely Bachata-heavy. All Havana nights have beginner + intermediate lessons before the social. Havana is cash only - there is an ATM on site, but it may charge an extra fee, and coat check is available. Bachata Room accepts cash/Venmo, has no coat check, and free water may run out, so bring water.",
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
          whyThisFits: "Bachata-included Saturday with a large crowd and lessons before dancing - not purely Bachata-heavy.",
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
          whyThisFits: "Free outdoor pop-up - weather-dependent, no class, better if you know basics or bring a friend.",
        },
      ],
    },
  },
  {
    id: "ask-outdoor-free",
    prompt: "What outdoor/free events are happening?",
    category: "Logistics",
    answer: {
      body: "BOBAS runs free outdoor Salsa/Bachata pop-ups at the Charles River Dock, and Bachata by the River is free on Sundays at the Esplanade. Both are weather-dependent - check Instagram before going.",
      sourceEventIds: ["evt-bobas", "evt-river"],
      recommendations: [
        {
          eventId: "evt-bobas",
          label: "Top recommendation",
          whyThisFits: "Free outdoor Salsa/Bachata pop-up - no class, weather-dependent, announced on Instagram.",
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
      body: "Bachata Room Wednesday, Lili Latin's First-Friday social, and the BOBAS outdoor nights are all dry events - no bar on site. Havana Monday is also now a dry, dance-focused night. Havana is cash only with an on-site ATM that may charge an extra fee, and coat check is available. Bachata Room accepts cash/Venmo and has no coat check, so bring water.",
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
          whyThisFits: "Dry Wednesday social with a beginner class - Bachata-heavy.",
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

// Build a Google Maps URL for an event. Returns the explicit mapUrl when set,
// otherwise composes one from venue + address. Returns null when neither is usable.
export const mapUrlForEvent = (e: Event): string | null => {
  if (e.mapUrl) return e.mapUrl;
  if (!e.address || /DM organizer|TBD/i.test(e.address)) return null;
  const q = encodeURIComponent(`${e.venue}, ${e.address}`);
  return `https://maps.google.com/?q=${q}`;
};

// "Tonight" is derived from today's weekday so only events that actually
// happen today get the Tonight label - never multiple unrelated weekdays.
// Pop-ups (no fixed weekday) are excluded.
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const isEventTonight = (e: Event): boolean => {
  if (e.popUp) return false;
  const today = WEEKDAYS[new Date().getDay()];
  return e.dayOfWeek === today;
};

export const tonightEvents = () => events.filter(isEventTonight);

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