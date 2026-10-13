"use client";
// Icons. CheckIcon is a drawn check mark: the ✓ character is missing from several system fonts and falls back to a
// √-like glyph. Icon draws an action in the wrapping system's own style (descriptions in app/systems.ts):
// Shōwa: tapered brush marks and a ringed check · Ben-Day: starbursts and mail-order scissors ·
// Haipai: an uncut seal, a stamped seal, a cancelled seal.
import { useId } from "react";
import { burst } from "@/components/artifacts/print";
import { useSystemId } from "./context";

export function CheckIcon() {
  const showa = useSystemId() === "showa";
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="1em" height="1em" className="inline-block shrink-0">
      {showa ? <path d="m1.5 8 2-1.4 3 3.3 6.8-7.5 1.5 1.7-8.4 9.4Z" fill="currentColor" /> : <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export type IconName = "save" | "saved" | "remove" | "back";

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
const back = <path d="M11.2 8H5.2M7.9 5.2L5.1 8l2.8 2.8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />;

export function Icon({ name }: { name: IconName }) {
  const id = useSystemId();
  if (id === "showa") {
    if (name === "back") return svg(back);
    // Filled, tapered brush contours stay legible at 16px without a grain filter.
    if (name === "save") return svg(<path stroke="none" fill="currentColor" d="m6.9 1.8 2.2.3-.1 4.7 5.2.2-.3 2.3-5-.2-.3 5.2-2.1-.3.2-4.9-5-.3.2-2.2 5 .3Z" />);
    if (name === "saved") return svg(<><path d="M13.9 7.8c.3 3.9-2.6 6.4-6.1 6.3S1.6 11.5 1.9 7.6 4.6 1.5 8.2 1.8c3.2.2 5.2 2.1 5.7 6Z" strokeWidth="1.5" /><path stroke="none" fill="currentColor" d="m4 7.8 1.4-1 2 2 3.1-4.4 1.6 1.2-4.5 5.8Z" /></>);
    return svg(<path stroke="none" fill="currentColor" d="m3.6 2 4.5 4.4 4.4-4.1 1.5 1.8L9.6 8l4.1 4.6-1.9 1.3-3.9-4.4-4.6 4.2L2 12l4.4-4.1L2.2 3.5Z" />);
  }
  if (id === "ben-day") {
    const star = burst(8, 8, 7.8, 4.6, 9, 0.12);
    if (name === "save") return svg(<><polygon points={star} strokeWidth="1.3" strokeLinejoin="round" /><path d="M8 5.2v5.6M5.2 8h5.6" strokeWidth="1.8" /></>);
    if (name === "saved") return <Knockout shape={<polygon points={star} />} mark={check} />;
    if (name === "back") return <Knockout shape={<polygon points={star} />} mark={back} />;
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
  if (name === "back") return svg(<g strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{seal}<path d="M10.8 8H5.4M7.6 5.6L5.2 8l2.4 2.4" /></g>);
  return svg(<g strokeWidth="1.4">{seal}<path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" /></g>);
}
