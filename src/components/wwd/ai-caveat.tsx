export function AiCaveat({ inline = false }: { inline?: boolean }) {
  const text =
    "Based on currently listed WhereWeDance data. Check the organizer's own posts before going - we're a local guide, not a live source of truth.";
  if (inline) {
    return (
      <p className="text-[11px] text-ink/55 italic leading-relaxed">{text}</p>
    );
  }
  return (
    <div className="rounded-xl bg-ink/5 ring-1 ring-ink/10 px-3 py-2 text-[11px] text-ink/65 italic leading-relaxed">
      {text}
    </div>
  );
}