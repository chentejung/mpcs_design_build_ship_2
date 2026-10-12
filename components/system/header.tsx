// Eigakan's header pieces. The caller supplies the elements: next/link on /movies, plain spans in previews.
import { Count } from "./controls";
import { Tenneniro } from "./terebi";

export function HeaderBar({ brand, action, padding = "px-[5vw]" }: { brand: React.ReactNode; action: React.ReactNode; padding?: string }) {
  return (
    <header className="ds-header">
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
      <span aria-hidden className="ds-brand-mark">映</span>
      <span className="ds-heading text-xl leading-none">
        Eigakan <span lang="ja"><Tenneniro text="映画館" /></span>
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
