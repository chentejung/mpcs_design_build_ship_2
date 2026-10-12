// Eigakan's header pieces. The caller supplies the elements: next/link on /movies, plain spans in previews.
import { Count } from "./controls";

export function HeaderBar({ brand, action, padding = "px-[5vw]" }: { brand: React.ReactNode; action: React.ReactNode; padding?: string }) {
  return (
    <header className="catalog-header">
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 py-3 ${padding}`}>
        {brand}
        {action}
      </div>
    </header>
  );
}

export function Brand() {
  return (
    <>
      <span aria-hidden className="catalog-brand-mark">映</span>
      <span className="catalog-heading text-xl leading-none">
        Eigakan <span lang="ja">映画館</span>
      </span>
    </>
  );
}

export function SavedLabel({ count }: { count: number }) {
  return (
    <>
      Saved <Count n={count} />
    </>
  );
}
