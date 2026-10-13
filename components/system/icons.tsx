"use client";
// Icons. CheckIcon is a drawn check mark: the ✓ character is missing from several system fonts and falls back to a
// √-like glyph. Icon draws an action in the wrapping system's own style (descriptions in app/systems.ts):
// Shōwa: suns — an unrisen ring with a plus, a risen sun with the check knocked out, a sun with a cross knocked out · Ben-Day: starbursts and mail-order scissors ·
// Haipai: an uncut seal, a stamped seal, a cancelled seal.
import { useId } from "react";
import { burst } from "@/components/artifacts/print";
import { useSystemId } from "./context";

export function CheckIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="1em" height="1em" className="inline-block shrink-0">
      <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type IconName = "save" | "saved" | "remove";

const svg = (children: React.ReactNode) => (
  <svg aria-hidden viewBox="0 0 16 16" width="1em" height="1em" className="ds-icon inline-block shrink-0" fill="none" stroke="currentColor">
    {children}
  </svg>
);

// A shape in currentColor with a mark knocked out of it, so the face behind shows through the mark.
function Knockout({ shape, mark }: { shape: React.ReactNode; mark: React.ReactNode }) {
  const id = `ko-${useId().replace(/:/g, "")}`;
  return svg(
    <>
      <mask id={id}>
        <rect width="16" height="16" fill="#fff" />
        <g stroke="#000">{mark}</g>
      </mask>
      <g mask={`url(#${id})`} fill="currentColor" stroke="none">{shape}</g>
    </>,
  );
}

const check = <path d="M4.6 8.3l2.3 2.3 4.6-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />;

export function Icon({ name }: { name: IconName }) {
  const id = useSystemId();
  if (id === "showa") {
    const sun = <circle cx="8" cy="8" r="7.2" />;
    if (name === "save") return svg(<><circle cx="8" cy="8" r="6.4" strokeWidth="1.6" /><path d="M8 4.6v6.8M4.6 8h6.8" strokeWidth="2" /></>);
    if (name === "saved") return <Knockout shape={sun} mark={check} />;
    return <Knockout shape={sun} mark={<path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" strokeWidth="1.9" strokeLinecap="round" />} />;
  }
  if (id === "ben-day") {
    const star = burst(8, 8, 7.8, 4.6, 9, 0.12);
    if (name === "save") return svg(<><polygon points={star} strokeWidth="1.3" strokeLinejoin="round" /><path d="M8 5.2v5.6M5.2 8h5.6" strokeWidth="1.8" /></>);
    if (name === "saved") return <Knockout shape={<polygon points={star} />} mark={check} />;
    return svg(
      <g strokeWidth="1.4" strokeLinecap="round">
        <circle cx="4.2" cy="11.6" r="2.2" />
        <circle cx="11.8" cy="11.6" r="2.2" />
        <path d="M5.6 9.9L12.4 2M10.4 9.9L3.6 2" />
      </g>,
    );
  }
  const seal = <rect x="2" y="2" width="12" height="12" rx="1.2" />;
  if (name === "save") return svg(<g strokeWidth="1.4">{seal}<path d="M8 5v6M5 8h6" /></g>);
  if (name === "saved") return <Knockout shape={seal} mark={check} />;
  return svg(<g strokeWidth="1.4">{seal}<path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" /></g>);
}
