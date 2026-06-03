import type { ResourceCategory } from "@/data/mock";
import type { FilterKey } from "@/components/wwd/event-filters";

export type CategoryParam = ResourceCategory | "Needs validation";

const ALLOWED_CATEGORIES: CategoryParam[] = [
  "Group chats",
  "Playlists",
  "Online classes",
  "Studios",
  "Organizers",
  "Venues / organizers",
  "Shoes / apparel",
  "Blog posts",
  "Safety / values",
  "Competitions",
  "Practice spaces",
  "Needs validation",
];

const ALLOWED_FILTERS: FilterKey[] = [
  "tonight",
  "weekend",
  "bachata-heavy",
  "beginner-friendly",
  "free",
  "no-alcohol",
  "class-before-social",
];

// Friendly aliases that don't map 1:1 to the FilterKey union.
const FILTER_ALIASES: Record<string, FilterKey> = {
  "outdoor-free": "free",
};

function safeDecode(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeCategoryParam(value: unknown): CategoryParam | undefined {
  const decoded = safeDecode(value);
  if (!decoded) return undefined;
  return ALLOWED_CATEGORIES.find((c) => c.toLowerCase() === decoded.toLowerCase());
}

export function normalizeFilterParam(value: unknown): FilterKey | undefined {
  const decoded = safeDecode(value);
  if (!decoded) return undefined;
  const lower = decoded.toLowerCase();
  if (FILTER_ALIASES[lower]) return FILTER_ALIASES[lower];
  return ALLOWED_FILTERS.find((f) => f === lower);
}