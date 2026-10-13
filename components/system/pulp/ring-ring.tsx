"use client";
// Pulp's drawing kit after Ring! Ring! on the American Comics board (picture 13), a pop-art panel: the red rotary
// telephone ringing on the desk (the Thriller pictogram: a call nobody should answer) and the red lips above it
// (Romance), each on its own panel in a dot screen.
import { c, ink, Screen, useSvgId } from "./press";

// The Thriller pictogram: the red rotary telephone shaking on a Mustard panel.
export function TelephoneGlyph() {
  return (
    <g>
      <rect width="24" height="24" fill={c.mustard} />
      <path d="M2.6 5.4L4.6 6.6M21.4 5.4L19.4 6.6M12 1.6V3.4" fill="none" {...ink(1.3)} />
      <path d="M5 20.4L7 12H17L19 20.4Z" fill={c.red} {...ink(1.3)} />
      <path d="M3.4 10.6C3.2 6.6 7 5.2 12 5.2C17 5.2 20.8 6.6 20.6 10.6L17.4 11.6L16.6 9.2C14.2 8.4 9.8 8.4 7.4 9.2L6.6 11.6Z" fill={c.red} {...ink(1.3)} />
      <circle cx="12" cy="16" r="3" fill={c.newsprint} {...ink(1)} />
      <circle cx="12" cy="16" r="1" fill={c.ink} />
    </g>
  );
}

// The Romance pictogram: the red lips on a Peach panel of Hero Red dots.
export function LipsGlyph() {
  const id = useSvgId();
  return (
    <g>
      <defs><Screen id={id} color={c.red} r={0.55} gap={2.2} angle={30} /></defs>
      <rect width="24" height="24" fill={c.peach} />
      <rect width="24" height="24" fill={`url(#${id})`} opacity="0.55" />
      <path d="M3 12.2C5.6 8.2 9 7.2 12 9.4C15 7.2 18.4 8.2 21 12.2C17.4 13 6.6 13 3 12.2Z" fill={c.red} {...ink(1.2)} />
      <path d="M3 12.2C6.6 13.4 17.4 13.4 21 12.2C18.6 17 15.4 18.6 12 18.6C8.6 18.6 5.4 17 3 12.2Z" fill={c.red} {...ink(1.2)} />
      <path d="M13.6 15.6C15.2 15.4 16.4 14.8 17.2 14" fill="none" stroke={c.newsprint} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}
