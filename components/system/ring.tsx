// Ben-Day's drawing kit, from "Ring! Ring!" (Mood Board 02, picture 13): the red rotary telephone with its dial and
// coiled cord, and the ring strokes that shake off it. The phone sits silent in the empty Saved list; the Saved
// count rings (shakes) whenever it changes (app/system.css).
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { Emanata } from "./xray";

const c = colors(benDay.board);

// A rotary phone, about 100 × 84 at s = 1, its base resting on (x, y + 84).
export function Phone({ x, y, s = 1, ringing = false, k = 2.5 }: { x: number; y: number; s?: number; ringing?: boolean; k?: number }) {
  const sw = k / s;
  const holes = Array.from({ length: 10 }, (_, i) => {
    const a = ((-60 + i * 27) * Math.PI) / 180;
    return <circle key={i} cx={50 + 10.5 * Math.cos(a)} cy={56 + 10.5 * Math.sin(a)} r={2.6} fill={c.newsprint} strokeWidth={sw * 0.6} />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c.ink} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 72q-12 4-8 10t-2 10" fill="none" />
      <path d="M14 82L24 36Q50 28 76 36L86 82Z" fill={c.red} />
      <path d="M24 36L18 64" fill="none" stroke={c.newsprint} strokeWidth={sw * 0.9} opacity="0.7" />
      <circle cx={50} cy={56} r={16} fill={c.newsprint} />
      {holes}
      <circle cx={50} cy={56} r={5} fill={c.red} />
      <path d="M62 44l6 -4" fill="none" />
      <path d="M4 28C4 12 18 8 28 13L72 13C82 8 96 12 96 28L82 31C80 25 75 23 70 25L30 25C25 23 20 25 18 31Z" fill={c.red} />
      <path d="M30 17H70" fill="none" stroke={c.newsprint} strokeWidth={sw * 0.9} opacity="0.7" />
      {ringing && (
        <>
          <Emanata cx={50} cy={22} r={50} len={12} angles={[-165, -140, -115]} k={sw} />
          <Emanata cx={50} cy={22} r={50} len={12} angles={[-65, -40, -15]} k={sw} />
        </>
      )}
    </g>
  );
}
