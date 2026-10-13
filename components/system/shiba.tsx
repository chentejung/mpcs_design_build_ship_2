"use client";
// Shōwa's drawing kit after Shiba & Sake on the Japanese Retro board (picture 06), a worn red poster: a Shiba dozing
// over a striped bowl, a sake bottle, and a pair of chopsticks laid beside it. The Shiba's face is the
// Animation pictogram and the chopsticks, crossed like swords, the Action one (genre-icons.tsx); the dozing Shiba
// and the empty bowl (ramen.tsx) tell the Saved page that nothing is saved yet.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { useSvgId, Wear } from "./screenprint";
import { Bowl } from "./ramen";

const c = colors(showa.board);

// Animation: the Shiba's face, eyes shut, ears up: a Kinari coat, the white urajiro (裏白) over its muzzle and
// cheeks, and the two pale eyebrow dots (麻呂眉).
export const ShibaGlyph = () => (
  <g strokeLinejoin="round" strokeLinecap="round">
    <path d="M5.6 10.4L6.6 4.6L10.6 8ZM18.4 10.4L17.4 4.6L13.4 8Z" fill={c.kinari} stroke={c.sumi} strokeWidth="1.1" />
    <path d="M7.2 8.6L7.5 6.4L9.2 7.8ZM16.8 8.6L16.5 6.4L14.8 7.8Z" fill={c.washi} />
    <ellipse cx="12" cy="13.3" rx="7.4" ry="6" fill={c.kinari} stroke={c.sumi} strokeWidth="1.1" />
    <path d="M5.4 14.2C7.6 12.2 10 12.2 12 13.4C14 12.2 16.4 12.2 18.6 14.2C17.6 17.6 15 19.2 12 19.2C9 19.2 6.4 17.6 5.4 14.2Z" fill={c.washi} />
    <ellipse cx="12" cy="13.3" rx="7.4" ry="6" fill="none" stroke={c.sumi} strokeWidth="1.1" />
    <circle cx="9.3" cy="10" r="0.9" fill={c.washi} />
    <circle cx="14.7" cy="10" r="0.9" fill={c.washi} />
    <path d="M8.2 12Q9.4 13 10.6 12M13.4 12Q14.6 13 15.8 12" fill="none" stroke={c.sumi} strokeWidth="1" />
    <ellipse cx="12" cy="14.7" rx="1.4" ry="1" fill={c.sumi} />
    <path d="M12 15.7V16.5M10.7 17Q12 17.9 13.3 17" fill="none" stroke={c.sumi} strokeWidth="0.9" />
  </g>
);

// Action: the chopsticks crossed like two swords, red lacquer with Sumi grips.
export const ChopsticksGlyph = () => (
  <g strokeLinecap="round">
    <path d="M6 5L18.4 19.4M18 5L5.6 19.4" stroke={c.hinomaru} strokeWidth="2.1" />
    <path d="M6 5L8.3 7.7M18 5L15.7 7.7" stroke={c.sumi} strokeWidth="2.7" />
  </g>
);

// The Shiba asleep against a Hinomaru sun beside an empty bowl and its chopsticks.
export function SleepingShiba({ className = "" }: { className?: string }) {
  const id = useSvgId();
  const line = { stroke: c.sumi, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
  return (
    <svg aria-hidden viewBox="0 0 260 150" className={className}>
      <defs><Wear id={id} rough={1.4} /></defs>
      <g filter={`url(#${id})`}>
        <circle cx="118" cy="78" r="70" fill={c.hinomaru} />
        <rect x="18" y="132" width="226" height="6" rx="3" fill={c.kogecha} />
        {/* body, curled, Kinari over a white belly, the tail curled over its back */}
        <path d="M38 132C30 104 50 80 88 78C112 77 130 86 138 104L144 132Z" fill={c.kinari} />
        <path d="M52 132C62 120 96 114 132 122L136 132Z" fill={c.washi} />
        <path d="M58 92C42 92 38 72 54 70C66 68 70 82 60 86" stroke={c.kinari} strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M58 92C46 91 43 76 54 74" stroke={c.washi} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* head resting on its paws: Kinari coat, white urajiro, pale eyebrow dots */}
        <path d="M124 94L129 68L148 81ZM176 94L171 68L152 81Z" fill={c.kinari} />
        <path d="M130 86L131.6 74.5L140 81ZM170 86L168.4 74.5L160 81Z" fill={c.washi} />
        <path d="M118 108C116 88 131 78 150 78C169 78 184 88 182 108C180 122 166 128 150 128C134 128 120 122 118 108Z" fill={c.kinari} />
        <path d="M121 113C128 104 140 102 150 107C160 102 172 104 179 113C175 123 164 128 150 128C136 128 125 123 121 113Z" fill={c.washi} />
        <ellipse cx="139" cy="92" rx="2.6" ry="2" fill={c.washi} />
        <ellipse cx="161" cy="92" rx="2.6" ry="2" fill={c.washi} />
        <path d="M132 101Q137.5 105.5 143 101M157 101Q162.5 105.5 168 101" {...line} strokeWidth="2.4" />
        <ellipse cx="150" cy="111" rx="4.6" ry="3.3" fill={c.sumi} />
        <path d="M150 114V117.5M145.5 118.5Q150 122 154.5 118.5" {...line} strokeWidth="1.6" />
        <rect x="128" y="123" width="22" height="9" rx="4.5" fill={c.washi} />
        <rect x="152" y="123" width="22" height="9" rx="4.5" fill={c.washi} />
        <path d="M139 125V130M163 125V130" {...line} strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Zzz, in Sumi katakana-style strokes */}
        <path d="M176 58H184L176 66H184M188 46H194L188 52H194" {...line} strokeWidth="2.2" />
        <Bowl x={226} y={106} w={50} />
        <path d="M198 96L254 110M200 92L256 106" stroke={c.kogecha} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
