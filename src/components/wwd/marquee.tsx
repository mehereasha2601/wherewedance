export function MarqueeTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-ink/10 py-3 overflow-hidden whitespace-nowrap bg-mango/15">
      <div className="flex gap-10 animate-marquee w-max">
        {doubled.map((label, i) => (
          <span
            key={i}
            className="font-display font-medium uppercase text-sm tracking-widest italic text-ink"
          >
            {label} <span className="text-terracotta">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}