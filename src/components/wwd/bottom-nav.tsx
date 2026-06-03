/**
 * Mobile bottom navigation bar. Shown across the app shell on small viewports; uses TanStack Link so active state is route-driven.
 */
import { Link, useNavigate } from "./ui-router";
import { useRouterState } from "@tanstack/react-router";

type Tab = { to: "/" | "/this-week" | "/ask" | "/buddies" | "/more"; label: string; pulse?: boolean };

const tabs: Tab[] = [
  { to: "/", label: "Explore" },
  { to: "/this-week", label: "This Week", pulse: true },
  { to: "/ask", label: "Ask" },
  { to: "/buddies", label: "Buddies" },
  { to: "/more", label: "More" },
];

export function BottomNav() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  void navigate; // reserved for future use
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-md">
      <div className="bg-paper/90 backdrop-blur-xl border border-ink/10 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_8px_30px_rgba(43,26,26,0.15)]">
        {tabs.map((tab) => {
          const active = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`relative flex-1 text-center px-2 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${
                active ? "bg-ink text-paper" : "text-ink/55"
              }`}
            >
              {tab.label}
              {tab.pulse && !active && (
                <span className="absolute top-1.5 right-3 size-1.5 rounded-full bg-magenta animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}