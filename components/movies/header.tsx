"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonClass } from "@/components/system/controls";
import { Brand, HeaderBar, SavedLabel } from "@/components/system/header";
import { useSaved } from "./saved";

// Client-side Links only: a plain <a> between /movies and /movies/saved would reload and wipe the saved list.
export function Header() {
  const { ids } = useSaved();
  const onSaved = usePathname().startsWith("/movies/saved");

  return (
    <HeaderBar
      brand={
        <Link href="/movies/" aria-current={onSaved ? undefined : "page"} className="flex min-h-11 items-center gap-2.5">
          <Brand />
        </Link>
      }
      action={
        <Link href="/movies/saved/" aria-label={`Saved (${ids.length})`} aria-current={onSaved ? "page" : undefined} className={buttonClass("secondary")}>
          <SavedLabel count={ids.length} />
        </Link>
      }
    />
  );
}
