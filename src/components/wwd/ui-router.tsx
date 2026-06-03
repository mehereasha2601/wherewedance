/**
 * Single re-export layer for navigation primitives. Swap these imports to migrate the app off TanStack Router (e.g. to Next.js' next/link).
 */
// Single re-export layer for navigation primitives.
// To port to Next.js App Router, swap these imports for next/link + next/navigation.
export { Link, useNavigate } from "@tanstack/react-router";