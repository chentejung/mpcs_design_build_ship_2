"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSaved } from "./saved";

// Client-side Links only: a plain <a> between /movies and /movies/saved would reload and wipe the saved list.
export function Header() {
  const { ids } = useSaved();
  const onSaved = usePathname().startsWith("/movies/saved");

  return (
    <header className="sticky top-0 z-20 border-b border-(--ink)/15 bg-(--bg)/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-[5vw] py-3">
        <Link href="/movies/" aria-current={onSaved ? undefined : "page"} className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-(--accent) font-serif text-lg text-white">映</span>
          <span className="font-serif text-xl leading-none font-semibold">
            Eigakan <span className="text-(--accent)">映画館</span>
          </span>
        </Link>
        <Link
          href="/movies/saved/"
          aria-label={`Saved (${ids.length})`}
          aria-current={onSaved ? "page" : undefined}
          className={`inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-sm font-medium transition-colors ${
            onSaved ? "border-(--ink) bg-(--ink) text-(--bg)" : "border-(--accent) hover:bg-(--accent)/10"
          }`}
        >
          Saved
          <span className="min-w-6 rounded-full bg-(--accent) px-1.5 text-center text-xs leading-5 tabular-nums text-white">{ids.length}</span>
        </Link>
      </div>
    </header>
  );
}
