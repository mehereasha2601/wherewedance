import type { BachataRelevance, BeginnerLabel } from "@/data/mock";

const sceneStyles: Record<BachataRelevance, string> = {
  "Bachata-heavy": "bg-magenta text-paper -rotate-2",
  "Bachata-forward": "bg-oxblood text-paper rotate-1",
  "Bachata-included": "bg-mango text-ink rotate-1",
  "Salsa-first with Bachata": "bg-paper text-ink ring-1 ring-ink/20 -rotate-1",
  "Mixed Latin": "bg-paper text-ink ring-1 ring-ink/20 rotate-1",
  "Dance party / mixed styles": "bg-ink text-paper -rotate-1",
};

const beginnerStyles: Record<BeginnerLabel, string> = {
  "Beginner-friendly": "bg-paper text-ink ring-1 ring-ink/15 rotate-1",
  "Beginner-welcome": "bg-paper text-ink ring-1 ring-ink/15 -rotate-1",
  "Intermediate+": "bg-ink text-paper rotate-1",
};

export function SceneTag({ value }: { value: BachataRelevance }) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ring-1 ring-black/5 ${sceneStyles[value]}`}
    >
      {value}
    </span>
  );
}

export function BeginnerTag({ value }: { value: BeginnerLabel }) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${beginnerStyles[value]}`}
    >
      {value}
    </span>
  );
}