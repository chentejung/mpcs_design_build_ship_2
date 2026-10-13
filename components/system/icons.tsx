"use client";
// Icons. CheckIcon is a drawn check mark: the ✓ character is missing from several system fonts and falls back to a
// √-like glyph. Icon draws an action in the wrapping system's own style (descriptions in app/systems.ts):
// Shōwa: suns — an unrisen ring with a plus, a risen sun with the check knocked out, a sun with a cross knocked out, a
// sun with an arrow knocked out pointing back · Pulp: Look!'s speech balloon with a plus, the balloon solid with the
// check knocked out, Krakoom!'s blast with a cross knocked out, the balloon with an arrow knocked out pointing back ·
// Haipai: an uncut
// seal, a stamped seal, a cancelled seal, a seal with an arrow pointing back.
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
    const sun = <circle cx="8" cy="8" r="7.2" />;
    if (name === "save") return svg(<><circle cx="8" cy="8" r="6.4" strokeWidth="1.6" /><path d="M8 4.6v6.8M4.6 8h6.8" strokeWidth="2" /></>);
    if (name === "saved") return <Knockout shape={sun} mark={check} />;
    if (name === "back") return <Knockout shape={sun} mark={back} />;
    return <Knockout shape={sun} mark={<path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" strokeWidth="1.9" strokeLinecap="round" />} />;
  }
  if (id === "pulp") {
    const balloon = "M8 1.6C12.3 1.6 15.2 4 15.2 7.1C15.2 10.2 12.3 12.6 8 12.6C7.4 12.6 6.8 12.5 6.2 12.4L2.6 15L3.5 11.4C1.8 10.4 0.8 8.8 0.8 7.1C0.8 4 3.7 1.6 8 1.6Z";
    if (name === "save") return svg(<><path d={balloon} strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 4.5v5.2M5.4 7.1h5.2" strokeWidth="1.9" /></>);
    if (name === "saved") return <Knockout shape={<path d={balloon} />} mark={<path d="M5 7.3l2.1 2.1 3.9-4.3" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />} />;
    if (name === "remove") return <Knockout shape={<polygon points={burst(8, 8, 7.9, 4.8, 9, 0.16)} />} mark={<path d="M5.9 5.9l4.2 4.2M10.1 5.9l-4.2 4.2" strokeWidth="1.7" strokeLinecap="round" />} />;
    return <Knockout shape={<path d={balloon} />} mark={<path d="M11 7.1H5.3M7.8 4.6L5.3 7.1l2.5 2.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />} />;
  }
  const seal = <rect x="2" y="2" width="12" height="12" rx="1.2" />;
  if (name === "save") return svg(<g strokeWidth="1.4">{seal}<path d="M8 5v6M5 8h6" /></g>);
  if (name === "saved") return <Knockout shape={seal} mark={check} />;
  if (name === "back") return svg(<g strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{seal}<path d="M10.8 8H5.4M7.6 5.6L5.2 8l2.4 2.4" /></g>);
  return svg(<g strokeWidth="1.4">{seal}<path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" /></g>);
}
