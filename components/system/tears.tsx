// Ben-Day's drawing kit, from "Tears of Love" (Mood Board 02, picture 01): a Lichtenstein close-up of a heroine's eye,
// her black hair in brush waves, a fat tear, red lips, and the thought balloon she can't say aloud. It is the Romance
// panel (components/system/genres.tsx), drawn on a 200 × 250 panel like every genre panel.
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { Dots } from "@/components/artifacts/print";
import { ThoughtBalloon } from "./diner";

const c = colors(benDay.board);

// A tear: a stream from the eye's inner corner swelling into a drop.
export function Tear({ x, y, s = 1, k = 2.2 }: { x: number; y: number; s?: number; k?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={k / s} stroke={c.ink} strokeLinejoin="round">
      <path d="M0 0C-4 14 0 26-4 40C-8 52-15 58-12 68C-9 78 5 77 5 66C5 56-1 50 1 38C3 24 5 12 0 0Z" fill={c.newsprint} />
      <path d="M-6 60C-6 66-3 70 1 70" fill="none" stroke={c.peach} strokeWidth={2.4 / s} strokeLinecap="round" />
    </g>
  );
}

// The heroine's eye, glancing back over her shoulder: almond lid, sepia iris, heavy upper lash line and an arched brow.
export function Eye({ uid }: { uid: string }) {
  const almond = "M90 118C106 98 142 90 176 104C160 122 120 132 90 118Z";
  const lashes: [number, number, number, number][] = [
    [128, 95, 129, 84], [138, 93, 141, 81], [148, 93, 154, 80], [158, 94, 166, 82], [167, 97, 177, 87], [175, 101, 187, 94],
  ];
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <clipPath id={`${uid}-almond`}><path d={almond} /></clipPath>
      </defs>
      <path d="M94 82C116 64 152 58 182 70C154 66 124 72 98 88Z" fill={c.ink} />
      <path d="M100 101C120 86 150 82 172 90" fill="none" stroke={c.ink} strokeWidth="2" />
      <path d={almond} fill={c.newsprint} />
      <g clipPath={`url(#${uid}-almond)`}>
        <circle cx="140" cy="110" r="16" fill={c.sepia} stroke={c.ink} strokeWidth="2.5" />
        <circle cx="140" cy="110" r="7" fill={c.ink} />
        <circle cx="134.5" cy="104.5" r="3.4" fill={c.newsprint} />
        <circle cx="146" cy="116" r="1.6" fill={c.newsprint} />
        <path d="M90 104C112 96 146 92 178 100" fill="none" stroke={c.ink} strokeWidth="5" opacity="0.35" />
      </g>
      <path d="M86 120C104 96 142 88 180 102L190 95" fill="none" stroke={c.ink} strokeWidth="6" />
      {lashes.map(([x1, y1, x2, y2]) => <path key={x1} d={`M${x1} ${y1}Q${x1 + 1} ${(y1 + y2) / 2} ${x2} ${y2}`} fill="none" stroke={c.ink} strokeWidth="2.6" />)}
      <path d="M95 121C120 131 152 125 172 110" fill="none" stroke={c.ink} strokeWidth="2" />
      {[[118, 128], [130, 128], [142, 126], [154, 121]].map(([x, y]) => <path key={x} d={`M${x} ${y}l-1 6`} stroke={c.ink} strokeWidth="1.6" />)}
    </g>
  );
}

// The Romance panel.
export function RomanceArt() {
  const uid = `tears-${useId().replace(/:/g, "")}`;
  return (
    <g>
      <defs>
        <Dots id={`${uid}-skin`} color={c.red} r={1.25} gap={5} angle={20} bg={c.peach} />
        <Dots id={`${uid}-shade`} color={c.sepia} r={1.5} gap={5} angle={20} />
      </defs>
      <rect width="200" height="250" fill={`url(#${uid}-skin)`} />
      <path d="M40 120C60 160 70 200 110 250H0V120Z" fill={`url(#${uid}-shade)`} opacity="0.5" />
      {/* hair: an Ink mass in brush waves, lit by Newsprint streaks */}
      <path
        d="M0 0H200V34C186 46 168 40 150 50C128 62 104 54 84 70C66 84 62 104 54 124C46 146 52 172 40 196C32 214 18 230 0 242Z"
        fill={c.ink}
      />
      <g fill="none" stroke={c.newsprint} strokeLinecap="round" opacity="0.85">
        <path d="M14 46C40 26 80 22 112 30" strokeWidth="3" />
        <path d="M20 70C34 56 52 50 70 50" strokeWidth="2.4" />
        <path d="M10 112C16 92 26 80 40 74" strokeWidth="2.6" />
        <path d="M12 176C20 158 24 142 26 124" strokeWidth="2.2" />
        <path d="M128 20C150 14 170 16 186 24" strokeWidth="2.2" />
      </g>
      <g fill={c.ink}>
        <path d="M58 116C66 108 78 108 84 116C76 114 68 116 62 124Z" />
        <path d="M50 166C56 156 66 152 74 156C66 158 60 164 56 174Z" />
      </g>
      <Eye uid={uid} />
      <Tear x={97} y={124} />
      <Tear x={114} y={150} s={0.45} />
      {/* nose and lips at the panel's edge */}
      <path d="M194 128C186 148 188 166 199 174" fill="none" stroke={c.ink} strokeWidth="2.6" strokeLinecap="round" />
      <g stroke={c.ink} strokeWidth="2.6" strokeLinejoin="round">
        <path d="M110 232C124 220 138 222 148 228C156 220 172 222 190 230C170 236 132 240 110 232Z" fill={c.red} />
        <path d="M112 236C136 254 170 254 190 232C170 240 132 242 112 236Z" fill={c.red} />
        <path d="M110 233C134 240 168 238 190 231" fill="none" />
      </g>
      <path d="M140 244C154 246 166 244 174 239" fill="none" stroke={c.newsprint} strokeWidth="2.4" strokeLinecap="round" />
      <ThoughtBalloon cx={136} cy={32} rx={56} ry={22} tx={192} ty={78} k={2.4} />
      <g fill={c.ink} textAnchor="middle" fontSize="13" style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" }}>
        <text x="136" y="30">I SHOULD HAVE</text>
        <text x="136" y="44">TOLD YOU!</text>
      </g>
    </g>
  );
}
