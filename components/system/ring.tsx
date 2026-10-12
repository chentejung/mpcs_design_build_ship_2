// Ben-Day's drawing kit, from "Ring! Ring!" (Mood Board 02, picture 13): the red rotary telephone, its numbered dial
// and coiled cord, the ring strokes that shake off it, and the note pad beside it. The ringing phone heads the Saved
// list (the pad notes how many films are lined up); it sits silent in the empty list; and the Saved count rings
// (shakes) whenever it changes (app/system.css).
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { Dots, Hatch } from "@/components/artifacts/print";
import { impact, Sfx } from "./pow";
import { Emanata } from "./xray";

const c = colors(benDay.board);

// A rotary phone about 160 × 130 at s = 1, its top-left at (x, y).
export function Phone({ x, y, s = 1, ringing = false, k = 2.6 }: { x: number; y: number; s?: number; ringing?: boolean; k?: number }) {
  const uid = `phone-${useId().replace(/:/g, "")}`;
  const sw = k / s;
  const holes = Array.from({ length: 10 }, (_, i) => {
    const a = ((-70 + i * 28) * Math.PI) / 180;
    const hx = 80 + 19 * Math.cos(a);
    const hy = 94 + 15.5 * Math.sin(a);
    return (
      <g key={i}>
        <ellipse cx={hx} cy={hy} rx="4.6" ry="4" fill={c.newsprint} stroke={c.ink} strokeWidth={sw * 0.55} />
        <text x={hx} y={hy + 2.4} textAnchor="middle" fontSize="6.5" fill={c.ink} stroke="none" style={{ fontFamily: "var(--font-bangers)" }}>{(i + 1) % 10}</text>
      </g>
    );
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c.ink} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <Hatch id={`${uid}-shade`} color={c.ink} width={1.4} gap={3.2} angle={-30} />
      </defs>
      {/* coiled cord */}
      <g fill="none" strokeWidth={sw * 0.9}>
        {Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={14 - i * 1.5} cy={84 + i * 7} rx="7" ry="4" fill={c.red} />)}
      </g>
      {/* body: a sloped front face under a lighter top */}
      <path d="M18 124L34 62Q80 50 126 62L142 124Z" fill={c.red} />
      <path d="M112 60Q120 61 126 62L142 124H120Z" fill={`url(#${uid}-shade)`} stroke="none" />
      <path d="M18 124L34 62Q80 50 126 62L142 124Z" fill="none" />
      <path d="M34 62Q80 50 126 62L118 50Q80 40 42 50Z" fill={c.red} />
      <path d="M40 66L28 116" stroke={c.newsprint} strokeWidth={sw * 1.1} opacity="0.75" />
      <path d="M16 124H144V130H16Z" fill={c.ink} />
      {/* dial */}
      <ellipse cx="80" cy="94" rx="27" ry="22" fill={c.newsprint} />
      {holes}
      <ellipse cx="80" cy="94" rx="10" ry="8" fill={c.red} />
      <ellipse cx="80" cy="94" rx="5" ry="4" fill={c.newsprint} strokeWidth={sw * 0.6} />
      <path d="M104 100L112 106" strokeWidth={sw * 1.2} />
      {/* cradle and handset */}
      <path d="M46 50L44 40H54L56 50M104 50L106 40H116L114 50" fill={c.red} />
      <path d="M6 44C4 24 22 18 36 26L124 26C138 18 156 24 154 44L136 50C134 42 128 38 120 40L40 40C32 38 26 42 24 50Z" fill={c.red} />
      <path d="M38 30H122" stroke={c.newsprint} strokeWidth={sw * 1.1} opacity="0.75" />
      <ellipse cx="15" cy="47" rx="11" ry="6" fill={c.red} />
      <ellipse cx="145" cy="47" rx="11" ry="6" fill={c.red} />
      {ringing && (
        <g strokeWidth={sw * 1.2}>
          <Emanata cx={80} cy={30} r={78} len={14} angles={[-170, -152, -134]} k={sw * 1.2} />
          <Emanata cx={80} cy={30} r={78} len={14} angles={[-46, -28, -10]} k={sw * 1.2} />
        </g>
      )}
    </g>
  );
}

// A note pad with a line or two in hand lettering.
export function NotePad({ x, y, lines, rotate = -8 }: { x: number; y: number; lines: string[]; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x="3" y="3" width="64" height="50" fill={c.sepia} />
      <rect width="64" height="50" fill={c.newsprint} stroke={c.ink} strokeWidth="2" />
      <path d="M8 20H58M8 32H58M8 44H58" stroke={c.peach} strokeWidth="1" />
      <g fontSize="11" fontWeight="700" fill={c.ink} style={{ fontFamily: "var(--font-comic-neue)" }}>
        {lines.map((l, i) => <text key={i} x="8" y={17 + i * 12}>{l}</text>)}
      </g>
    </g>
  );
}

// The Saved list's panel: the phone ringing in a Mustard burst on a red-dotted desk, the pad noting the count.
export function RingArt({ note }: { note: string[] }) {
  const uid = `ring-${useId().replace(/:/g, "")}`;
  return (
    <g>
      <defs>
        <Dots id={`${uid}-desk`} color={c.red} r={1.3} gap={5} angle={25} bg={c.peach} />
      </defs>
      <rect width="200" height="250" fill={c.mustard} />
      <polygon points={impact(110, 70, 120, 15, 4)} fill={c.newsprint} stroke={c.ink} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M0 168L200 150V250H0Z" fill={`url(#${uid}-desk)`} stroke={c.ink} strokeWidth="2.6" />
      <Sfx x={100} y={58} size={40} rotate={-8} depth={4}>RING!</Sfx>
      <Sfx x={124} y={98} size={34} rotate={-8} depth={4}>RING!</Sfx>
      <Phone x={26} y={106} s={0.95} ringing />
      <NotePad x={8} y={200} lines={note} />
      <path d="M128 232L188 214" stroke={c.ink} strokeWidth="6" strokeLinecap="round" />
      <path d="M180 216.5L188 214" stroke={c.mustard} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}
