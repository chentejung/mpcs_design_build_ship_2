"use client";
// Shōwa's drawing kit after Fuji Sunrise on the Japanese Retro board (picture 04), a screenprint in three inks on
// cream: a Kinari panel in a wide paper margin, a Hinomaru sun, Fuji in Ai with a dry-brushed Washi snowcap, its name
// in katakana above (フジ) and in heavy Latin capitals below (FUJI). Here the poster says エイガ ("movie") and
// EIGAKAN, leads /movies and this system's page, shrinks to the brand mark and the All pictogram, and sets as the
// sign-off at the foot of every Eigakan page.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { useSvgId, Wear } from "./screenprint";

const c = colors(showa.board);
const display = { fontFamily: "var(--ds-display-font)" };

// Fuji with its snowcap and brush streaks, standing on `base` with its notched summit at (x, top). `w` is the
// half-width of the base; the snow comes a third of the way down.
function Fuji({ x, top, base, w, k = 1 }: { x: number; top: number; base: number; w: number; k?: number }) {
  const h = base - top;
  const p = (dx: number, dy: number) => `${(x + dx * w).toFixed(1)} ${(top + dy * h).toFixed(1)}`;
  const slope = `M${p(-1, 1)}C${p(-0.62, 0.86)} ${p(-0.34, 0.5)} ${p(-0.14, 0.03)}L${p(-0.06, 0.06)}L${p(0, 0)}L${p(0.07, 0.05)}L${p(0.14, 0.02)}C${p(0.34, 0.5)} ${p(0.62, 0.86)} ${p(1, 1)}Z`;
  // The snow's lower edge runs in ragged tongues, as the brush lifted off.
  const snow = `M${p(-0.14, 0.03)}L${p(-0.06, 0.06)}L${p(0, 0)}L${p(0.07, 0.05)}L${p(0.14, 0.02)}C${p(0.18, 0.12)} ${p(0.22, 0.22)} ${p(0.27, 0.32)}L${p(0.21, 0.3)}L${p(0.19, 0.42)}L${p(0.14, 0.31)}L${p(0.1, 0.48)}L${p(0.05, 0.32)}L${p(0.01, 0.52)}L${p(-0.04, 0.33)}L${p(-0.09, 0.45)}L${p(-0.13, 0.3)}L${p(-0.18, 0.38)}L${p(-0.2, 0.27)}L${p(-0.27, 0.32)}C${p(-0.22, 0.22)} ${p(-0.18, 0.12)} ${p(-0.14, 0.03)}Z`;
  const streak = (a: [number, number], b: [number, number]) => `M${p(...a)}L${p(...b)}`;
  return (
    <g>
      <path d={slope} fill={c.ai} />
      <path d={snow} fill={c.washi} />
      <g stroke={c.washi} strokeWidth={1.6 * k} strokeLinecap="round" fill="none">
        <path d={[streak([-0.18, 0.38], [-0.27, 0.52]), streak([-0.09, 0.45], [-0.13, 0.6]), streak([0.01, 0.52], [0.01, 0.68]), streak([0.1, 0.48], [0.14, 0.62]), streak([0.19, 0.42], [0.27, 0.54])].join("")} />
      </g>
      <g stroke={c.ai} strokeWidth={1.1 * k} strokeLinecap="round" fill="none">
        <path d={[streak([0.02, 0.08], [0.01, 0.24]), streak([0.09, 0.1], [0.13, 0.24]), streak([-0.07, 0.12], [-0.11, 0.24])].join("")} />
      </g>
      <path d={`M${p(0.3, 0.55)}C${p(0.5, 0.78)} ${p(0.72, 0.9)} ${p(0.95, 0.97)}`} stroke={c.sumi} strokeOpacity="0.28" strokeWidth={2.2 * k} fill="none" strokeLinecap="round" />
    </g>
  );
}

// A small red seal (落款) with 映 knocked out in Washi.
const Hanko = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx={s * 0.08} fill={c.hinomaru} />
    <rect x={x + s * 0.1} y={y + s * 0.1} width={s * 0.8} height={s * 0.8} fill="none" stroke={c.washi} strokeWidth={s * 0.05} />
    <text x={x + s / 2} y={y + s / 2} dy="0.36em" textAnchor="middle" fontSize={s * 0.6} fill={c.washi} style={display}>映</text>
  </g>
);

// The /movies hero: tall beside the heading, wide (with Nouvelle Vague's red band carrying 上映中) above it on phones.
export function FujiPoster({ wide = false, className = "" }: { wide?: boolean; className?: string }) {
  const id = useSvgId();
  if (wide)
    return (
      <svg aria-hidden viewBox="0 0 360 150" className={className}>
        <defs><Wear id={id} rough={1.4} /></defs>
        <g filter={`url(#${id})`}>
          <rect x="6" y="6" width="348" height="138" fill={c.kinari} />
          <circle cx="238" cy="74" r="52" fill={c.hinomaru} />
          <Fuji x={238} top={86} base={144} w={170} k={0.8} />
          <rect x="6" y="6" width="50" height="138" fill={c.hinomaru} />
          {[...`上映中`].map((ch, i) => (
            <text key={ch} x="31" y={44 + i * 38} textAnchor="middle" fontSize="30" fill={c.washi} style={display}>{ch}</text>
          ))}
          <text x="120" y="62" textAnchor="middle" fontSize="36" fill={c.hinomaru} style={display}>エイガ</text>
          <Hanko x={318} y={110} s={24} />
        </g>
      </svg>
    );
  return (
    <svg aria-hidden viewBox="0 0 300 420" className={className}>
      <defs><Wear id={id} rough={1.8} /></defs>
      <g filter={`url(#${id})`}>
        <rect x="14" y="14" width="272" height="300" fill={c.kinari} />
        <text x="150" y="88" textAnchor="middle" fontSize="62" fill={c.hinomaru} style={display}>エイガ</text>
        <circle cx="150" cy="190" r="84" fill={c.hinomaru} />
        <Fuji x={150} top={206} base={314} w={136} />
        <Hanko x={26} y={276} s={28} />
        <text x="150" y="390" textAnchor="middle" fontSize="54" textLength="272" lengthAdjust="spacingAndGlyphs" fill={c.ai} style={display}>EIGAKAN</text>
      </g>
    </svg>
  );
}

// Fuji and its sun in 24 units, for the All pictogram and the section ornament.
export const FujiGlyph = () => (
  <g>
    <circle cx="12" cy="10" r="5.2" fill={c.hinomaru} />
    <path d="M4 18.5L9.6 11.6H14.4L20 18.5Z" fill={c.ai} />
    <path d="M9.6 11.6H14.4L15.8 13.4L14.6 14.3L13.6 13.2L12.4 14.8L11.2 13.2L10 14.3L8.4 13.4Z" fill={c.washi} />
  </g>
);

export const SunOrnament = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden viewBox="2 2 20 20" className={className}><FujiGlyph /></svg>
);

// The brand mark: the poster in 40 units, a Kinari panel in its Washi margin.
export function FujiMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <rect width="40" height="40" rx="6" fill={c.washi} />
      <rect x="3.5" y="3.5" width="33" height="33" rx="2.5" fill={c.kinari} />
      <circle cx="20" cy="18" r="9.5" fill={c.hinomaru} />
      <Fuji x={20} top={21} base={36.5} w={16.5} k={0.35} />
    </svg>
  );
}

// The sign-off: the sun going down behind Fuji and its foothills, cropped from the middle on narrow screens.
export function SignOff({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 1200 130" preserveAspectRatio="xMidYMax slice" className={className}>
      <defs><Wear id={id} rough={2.4} specks={0.6} scale={1.6} /></defs>
      <g filter={`url(#${id})`}>
        <circle cx="600" cy="84" r="50" fill={c.hinomaru} />
        <path d="M0 130V112C120 94 230 92 330 104C370 108 400 116 430 130Z" fill={c.kogecha} />
        <path d="M1200 130V108C1080 92 960 94 860 106C820 110 790 118 760 130Z" fill={c.kogecha} />
        <Fuji x={600} top={74} base={130} w={170} k={0.9} />
      </g>
    </svg>
  );
}
