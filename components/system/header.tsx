// The Final Site's header pieces. The caller supplies the elements: next/link on /bijou, plain spans in previews.
import { finalSite } from "@/app/data";
import { Count } from "./controls";
import { BrandMark } from "./motifs";

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
      <BrandMark />
      <span className="ds-brand-name ds-heading text-xl leading-none">{finalSite.name}</span>
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
