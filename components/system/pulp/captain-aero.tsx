"use client";
// Pulp's drawing kit after Captain Aero on the American Comics board (picture 25): a rocket of the atomic age,
// cigar-bodied in Newsprint silver with a Hero Red nose and fins, a row of Mustard portholes and a Mustard flame,
// looping the sky on a long Mustard trail edged in Ink. It flies through the /bijou hero and off past THE END.
import { c, ink, ribbon } from "./press";

// A rocket nose-first along +x from (x, y), `s` = 1 for 100 units long, turned `angle` degrees.
export function Rocket({ x, y, s = 1, angle = 0, flame = true }: { x: number; y: number; s?: number; angle?: number; flame?: boolean }) {
  const w = 2.6 / Math.sqrt(s); // keyline weight, held steady as the rocket shrinks
  const body = "M0 -11C26 -17 58 -17 78 -10C90 -6 98 -2 104 0C98 2 90 6 78 10C58 17 26 17 0 11Z";
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
      {flame && (
        <g>
          <path d="M-3 -8C-18 -12 -36 -6 -58 0C-36 6 -18 12 -3 8Z" fill={c.red} {...ink(w)} />
          <path d="M-3 -5C-14 -7 -26 -3 -40 0C-26 3 -14 7 -3 5Z" fill={c.mustard} />
          <path d="M-3 -2.4C-9 -3 -15 -1 -22 0C-15 1 -9 3 -3 2.4Z" fill={c.newsprint} />
        </g>
      )}
      <path d="M8 -12L-12 -32L0 -32L30 -14Z" fill={c.red} {...ink(w)} />
      <path d="M8 12L-12 32L0 32L30 14Z" fill={c.red} {...ink(w)} />
      <rect x="-6" y="-8" width="8" height="16" rx="1.5" fill={c.sepia} {...ink(w)} />
      <path d={body} fill={c.newsprint} {...ink(w)} />
      {/* The nose cone in Hero Red, a red stripe down the side, and the shading on the belly. */}
      <path d="M80 -9.3C90 -5.6 98 -2 104 0C98 2 90 5.6 80 9.3C84 4 84 -4 80 -9.3Z" fill={c.red} {...ink(w * 0.8)} />
      <path d="M6 5.5C30 9.5 58 9.6 79 5.2" fill="none" stroke={c.red} strokeWidth={3.2} />
      <path d="M6 10C30 15 58 15 77 9.4" fill="none" stroke={c.sepia} strokeWidth={2.6} strokeLinecap="round" opacity="0.55" />
      {[24, 38, 52, 66].map((px) => (
        <circle key={px} cx={px} cy={-0.5} r={3.6} fill={c.mustard} {...ink(w * 0.75)} />
      ))}
      <path d="M2 0L-16 5L-8 7L16 3Z" fill={c.red} {...ink(w * 0.6)} />
    </g>
  );
}

// The looping trail a rocket leaves, from its flame at `b` back to `a`, narrowing as it goes.
export function Trail({ a, c1, c2, b, w = 16 }: { a: [number, number]; c1: [number, number]; c2: [number, number]; b: [number, number]; w?: number }) {
  return (
    <g>
      <path d={ribbon(a, c1, c2, b, w * 0.15, w)} fill={c.mustard} {...ink(2.2)} />
      <path d={ribbon(a, c1, c2, b, 0.4, w * 0.36)} fill={c.newsprint} opacity="0.9" />
    </g>
  );
}
