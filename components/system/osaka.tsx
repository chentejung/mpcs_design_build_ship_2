"use client";
// Shōwa's drawing kit after Osaka Rainy Night on the Japanese Retro board (picture 26): the vertical signboards
// (看板) of Dōtonbori, each a framed board with a cap, and red paper lanterns (提灯). The signboard stands beside the
// hero sun, headed by a sun over waves (koi.tsx) and closed by the cinema's ringed stamp; app/system.css hangs the
// Saved count as a lantern.
import { useId } from "react";
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { SunOverWaves } from "./koi";
import { Tenneniro } from "./terebi";

const c = colors(showa.board);

// A vertical signboard: `text` set top to bottom in 天然色, `stamp` in a thin Accent ring below it.
export function Signboard({ text, stamp }: { text: string; stamp: string }) {
  return (
    <span aria-hidden lang="ja" className="ds-signboard">
      <SunOverWaves className="ds-signboard-sun" />
      <span className="ds-signboard-text"><Tenneniro text={text} /></span>
      <span className="ds-signboard-stamp">{stamp}</span>
    </span>
  );
}

// A paper lantern for the drawing kit: ribbed Hinomaru paper between Sumi caps, a glyph in Washi, on its cord.
const paper = "M22 15C6 20 6 62 22 67H38C54 62 54 20 38 15Z";

export function Lantern({ glyph = "映", className = "" }: { glyph?: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const k = 2.4;
  return (
    <svg aria-hidden viewBox="0 0 60 80" className={className}>
      <path d="M30 0V10" stroke={c.sumi} strokeWidth={k} />
      <rect x="20" y="9" width="20" height="7" rx="1.5" fill={c.sumi} />
      <clipPath id={id}><path d={paper} /></clipPath>
      <path d={paper} fill={c.hinomaru} />
      <g clipPath={`url(#${id})`} fill="none" stroke={c.sumi} strokeOpacity="0.3" strokeWidth="1.2">
        {[22, 29, 36, 43, 50, 57, 63].map((y) => <path key={y} d={`M4 ${y}Q30 ${y + 3} 56 ${y}`} />)}
      </g>
      <path d={paper} fill="none" stroke={c.sumi} strokeWidth={k} strokeLinejoin="round" />
      <text x="30" y="41" dy="0.36em" textAnchor="middle" fontSize="22" fill={c.washi} style={{ fontFamily: "var(--ds-display-font)" }}>{glyph}</text>
      <rect x="20" y="66" width="20" height="7" rx="1.5" fill={c.sumi} />
      <path d="M27 73l-1 6M30 73v7M33 73l1 6" stroke={c.hinomaru} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
