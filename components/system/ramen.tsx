"use client";
// Shōwa's drawing kit after Ramen on the Japanese Retro board (picture 18), a woodblock-rough poster on an Ai ground:
// a bowl seen from above in rings of Hinomaru, Washi and Sumi, noodles, nori, and a halved egg whose red yolk sits in
// its white like a planet in its ring. The egg is the Sci-Fi pictogram (genre-icons.tsx); the bowl, empty, sits by
// the dozing Shiba (shiba.tsx); app/system.css takes the bowl's rim rings for the rule under the header.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";

const c = colors(showa.board);

// Sci-Fi: the halved egg as a planet, its Ai ring passing behind and coming round in front.
export const EggGlyph = () => (
  <g fill="none">
    <ellipse cx="12" cy="12" rx="9.4" ry="3" transform="rotate(-20 12 12)" stroke={c.ai} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="5.6" fill={c.washi} stroke={c.sumi} strokeWidth="1" />
    <circle cx="12.3" cy="12.2" r="3.1" fill={c.hinomaru} />
    <circle cx="11.2" cy="11.1" r="0.8" fill={c.washi} />
    <path d="M3.17 15.22A9.4 3 -20 0 0 20.83 8.78" stroke={c.ai} strokeWidth="1.6" strokeLinecap="round" />
  </g>
);

// A bowl in profile, centred on x with its rim at y: Ai body with a red band, Washi rim, empty Sumi well.
export function Bowl({ x, y, w }: { x: number; y: number; w: number }) {
  const h = w * 0.52;
  const r = w / 2;
  return (
    <g>
      <path d={`M${x - r} ${y}H${x + r}C${x + r * 0.94} ${y + h * 0.8} ${x + r * 0.5} ${y + h} ${x} ${y + h}C${x - r * 0.5} ${y + h} ${x - r * 0.94} ${y + h * 0.8} ${x - r} ${y}Z`} fill={c.ai} />
      <path d={`M${x - r * 0.96} ${y + h * 0.28}H${x + r * 0.96}`} stroke={c.hinomaru} strokeWidth={h * 0.14} />
      <path d={`M${x - r * 0.3} ${y + h}H${x + r * 0.3}`} stroke={c.sumi} strokeWidth={h * 0.12} strokeLinecap="round" />
      <ellipse cx={x} cy={y} rx={r} ry={h * 0.2} fill={c.washi} />
      <ellipse cx={x} cy={y + h * 0.02} rx={r * 0.86} ry={h * 0.14} fill={c.sumi} />
    </g>
  );
}

// The bowl from above, for the drawing kit: rim rings, noodles, nori and the egg.
export function RamenBowl({ className = "" }: { className?: string }) {
  const noodles = Array.from({ length: 7 }, (_, i) => `M${16 + i * 3} ${30 + i * 4}C${30 + i * 2} ${22 + i * 5} ${48 - i} ${44 - i * 2} ${62 - i * 2} ${34 + i * 3}`).join("");
  return (
    <svg aria-hidden viewBox="0 0 80 80" className={className}>
      <rect width="80" height="80" rx="6" fill={c.ai} />
      <circle cx="40" cy="42" r="34" fill={c.washi} />
      <circle cx="40" cy="42" r="31" fill={c.hinomaru} />
      <circle cx="40" cy="42" r="26" fill={c.kogecha} />
      <path d={noodles} fill="none" stroke={c.kinari} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44 18L64 24L58 46L40 40Z" fill={c.sumi} />
      <circle cx="34" cy="50" r="11" fill={c.washi} />
      <circle cx="34" cy="50" r="7" fill={c.hinomaru} />
    </svg>
  );
}
