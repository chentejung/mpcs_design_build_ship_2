"use client";
// Pulp's drawing kit after Look! on the American Comics board (picture 17), a pop-art panel: a Newsprint speech
// balloon over a Hero Red panel in a darker dot screen, and the sleeve and hand pointing up at it. The balloon is the
// Animation pictogram and, with a plus, a check or an arrow, the Save, Saved and Back icons; when nothing is saved,
// the whole panel points at an empty balloon.
import { c, ink, Newsprint, Screen, useSvgId } from "./press";

// The Animation pictogram: the balloon, shouting, on Look!'s red.
export function BalloonGlyph() {
  const id = useSvgId();
  return (
    <g>
      <defs><Screen id={id} color={c.ink} r={0.5} gap={2.2} angle={45} /></defs>
      <rect width="24" height="24" fill={c.red} />
      <rect width="24" height="24" fill={`url(#${id})`} opacity="0.3" />
      <path d="M12 3.2C17.4 3.2 21 6.2 21 9.8C21 13.4 17.4 16.4 12 16.4C11.2 16.4 10.4 16.3 9.6 16.2L5.6 20.8L6.6 15.4C4.4 14.2 3 12.2 3 9.8C3 6.2 6.6 3.2 12 3.2Z" fill={c.newsprint} {...ink(1.3)} />
      <path d="M12 6.2V10.4" fill="none" {...ink(2.2)} />
      <circle cx="12" cy="13.2" r="1.2" fill={c.ink} />
    </g>
  );
}

// The empty Saved page: Look!'s panel, the hand pointing at a balloon that has nothing in it yet. The caller lays the
// heading over the balloon (EmptyState in motifs.tsx), so the words stay real text.
export function LookPanel({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 320 250" className={className}>
      <defs>
        <Newsprint id={id} rough={0.9} specks={0.35} />
        <Screen id={`${id}-red`} color={c.ink} r={1.5} gap={6} angle={45} />
        <Screen id={`${id}-skin`} color={c.red} r={0.9} gap={4} angle={20} />
        <clipPath id={`${id}-p`}><rect x="4" y="4" width="312" height="242" /></clipPath>
      </defs>
      <g filter={`url(#${id})`}>
        <rect x="4" y="4" width="312" height="242" fill={c.red} />
        <g clipPath={`url(#${id}-p)`}>
          <rect x="4" y="4" width="312" height="242" fill={`url(#${id}-red)`} opacity="0.28" />
          {/* The balloon, its tail pointing down at the hand. */}
          <path d="M182 14C256 14 310 44 310 86C310 128 256 156 186 158L134 192L142 154C80 146 40 118 40 84C40 44 104 14 182 14Z" fill={c.newsprint} {...ink(4.5)} />
          {/* The sleeve: a Sepia coat cuffed in Newsprint, rising from the corner. */}
          <path d="M-16 252L34 220L60 262L0 284Z" fill={c.sepia} {...ink(4)} />
          <path d="M28 224L46 212L68 250L50 262Z" fill={c.newsprint} {...ink(3.5)} />
          {/* The hand: its finger pointing up at the balloon's tail, then the fist over the finger's root. */}
          <path d="M86 226L118 196" fill="none" stroke={c.ink} strokeWidth="16" strokeLinecap="round" />
          <path d="M86 226L118 196" fill="none" stroke={c.peach} strokeWidth="10" strokeLinecap="round" />
          <path d="M112 196.5L117 192" fill="none" {...ink(2.2)} />
          <path d="M56 236C54 220 66 210 82 212C96 214 104 226 100 238C96 250 84 256 72 254C63 252 57 246 56 236Z" fill={c.peach} {...ink(3.5)} />
          <path d="M56 236C54 220 66 210 82 212C96 214 104 226 100 238C96 250 84 256 72 254C63 252 57 246 56 236Z" fill={`url(#${id}-skin)`} opacity="0.55" />
          <path d="M64 226C70 221 80 221 87 226M98 231C94 233 88 233 84 231M97 241C93 243 87 243 83 241M92 250C89 251 85 251 82 250" fill="none" {...ink(2.6)} />
          {/* Motion ticks off the fingertip, pointing. */}
          <path d="M132 206L144 204M128 218L138 224" fill="none" {...ink(3)} />
        </g>
        <rect x="4" y="4" width="312" height="242" fill="none" {...ink(5)} />
      </g>
    </svg>
  );
}
