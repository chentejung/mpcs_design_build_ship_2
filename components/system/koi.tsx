"use client";
// Shōwa's drawing kit after the Koi Pond picture on the Japanese Retro board (picture 02), a riso print: its vertical
// label is headed by a red sun rising out of the sea, which heads the hero signboard here (osaka.tsx).
import { useId } from "react";
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";

const c = colors(showa.board);
const useSvgId = () => useId().replace(/:/g, "");

// ----- Sun over waves 日の出 -----

// The red sun rising out of the sea, its lower half cut by Washi bands, over two rows of waves (青海波).
export function SunOverWaves({ className = "" }: { className?: string }) {
  const id = useSvgId();
  const wave = (y: number) => Array.from({ length: 5 }, (_, i) => `M${4 + i * 8} ${y}a4 4 0 0 1 8 0`).join("");
  return (
    <svg aria-hidden viewBox="0 0 48 44" className={className}>
      <clipPath id={id}><rect x="0" y="0" width="48" height="26" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <circle cx="24" cy="20" r="15" fill={c.hinomaru} />
        <g fill={c.washi}>
          <rect x="6" y="21" width="36" height="1.6" />
          <rect x="6" y="24.2" width="36" height="1.9" />
        </g>
      </g>
      <g fill="none" stroke={c.ai} strokeWidth="2.4" strokeLinecap="round">
        <path d={wave(33)} />
        <path d={wave(40)} transform="translate(-4 0)" />
      </g>
    </svg>
  );
}
