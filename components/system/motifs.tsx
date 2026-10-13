"use client";
// Each system's signature motif, and the empty state built on it:
// Shōwa: the Fuji Sunrise print and a Shiba waiting by an empty bowl · Ben-Day: a starburst and speech balloons ·
// Haipai: cloud scrolls and seals.
import { colors } from "@/app/boards";
import { systems } from "@/app/systems";
import { burst } from "@/components/artifacts/print";
import { useSystemId } from "./context";
import { FujiMark, FujiPoster, SignOff as FujiSignOff, SunOrnament } from "./fuji";
import { WaitingShiba } from "./shiba";

const palette = (id: string) => colors(systems.find((s) => s.id === id)!.board);

function Starburst({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  const c = palette("ben-day");
  return (
    <svg aria-hidden viewBox="0 0 220 220" className={className}>
      <polygon points={burst(110, 110, 106, 70, 14, 0.12)} fill={c.mustard} stroke={c.ink} strokeWidth="5" strokeLinejoin="round" />
      <polygon points={burst(110, 110, 70, 52, 14, 0.1)} fill={c.red} />
      {children}
    </svg>
  );
}

// 祥云: a cloud of three spiral curls on a trailing line.
function CloudScroll({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const c = palette("haipai");
  const curl = (cx: number, cy: number, r: number) =>
    `M${cx + r} ${cy} A${r} ${r} 0 0 0 ${cx - r} ${cy} A${r * 0.75} ${r * 0.75} 0 0 0 ${cx + r * 0.5} ${cy} A${r * 0.33} ${r * 0.33} 0 0 0 ${cx - r * 0.16} ${cy}`;
  return (
    <svg aria-hidden viewBox="0 0 160 70" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <g fill="none" stroke={c.gold} strokeWidth="3.5" strokeLinecap="round">
        <path d={curl(40, 40, 22)} />
        <path d={curl(80, 32, 18)} />
        <path d={curl(114, 42, 14)} />
        <path d="M4 62 H150" />
      </g>
    </svg>
  );
}

// A square seal; `stamped={false}` leaves only its outline, as if not yet pressed.
function Seal({ glyph, stamped = true, size = 64 }: { glyph: string; stamped?: boolean; size?: number }) {
  const c = palette("haipai");
  return (
    <span
      aria-hidden
      className="grid place-items-center rounded-[3px]"
      style={{
        width: size,
        height: size,
        fontFamily: "var(--ds-display-font)",
        fontSize: size * 0.56, // large display type: Vermilion needs at least 24px
        background: stamped ? c.vermilion : "transparent",
        color: stamped ? c.xuan : c.vermilion,
        boxShadow: stamped ? `inset 0 0 0 3px ${c.vermilion}, inset 0 0 0 4px ${c.xuan}` : `inset 0 0 0 2px ${c.vermilion}`,
        border: stamped ? undefined : `2px dashed ${c.vermilion}`,
      }}
    >
      {glyph}
    </span>
  );
}

// The big decoration beside a page's hero heading; `wide` is the banner above it on phones (Shōwa only).
export function HeroMotif({ count, wide = false }: { count: number; wide?: boolean }) {
  const id = useSystemId();
  if (id === "showa") return <FujiPoster wide={wide} className={wide ? "block w-full" : "block w-56 md:w-64 lg:w-72"} />;
  if (wide) return null;
  if (id === "ben-day")
    return (
      <Starburst className="h-32 w-32 -rotate-6 md:h-44 md:w-44">
        <text x="110" y="104" textAnchor="middle" fontSize="40" fill="#fff" style={{ fontFamily: "var(--ds-display-font)" }}>{count}</text>
        <text x="110" y="136" textAnchor="middle" fontSize="24" fill="#fff" style={{ fontFamily: "var(--ds-display-font)" }}>FILMS!</text>
      </Starburst>
    );
  return (
    <div aria-hidden className="pointer-events-none flex flex-col items-center gap-2">
      <Seal glyph="映" size={72} />
      <CloudScroll className="w-28 md:w-36" />
    </div>
  );
}

// Small ornament before a section heading or eyebrow.
export function Ornament() {
  const id = useSystemId();
  if (id === "showa") return <SunOrnament className="h-6 w-6 shrink-0" />;
  if (id === "ben-day") return <Starburst className="h-6 w-6 shrink-0" />;
  return <CloudScroll className="w-10 shrink-0" />;
}

function Balloon({ children }: { children: React.ReactNode }) {
  const c = palette("ben-day");
  return (
    <div className="relative mx-auto w-full max-w-xs">
      <svg aria-hidden viewBox="0 0 320 170" className="block w-full">
        <path d="M160 8C250 8 312 40 312 78C312 116 252 144 170 148L118 168L128 146C60 140 8 112 8 78C8 40 70 8 160 8Z" fill={c.newsprint} stroke={c.ink} strokeWidth="5" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-x-8 top-0 bottom-[16%] grid place-items-center text-center">{children}</div>
    </div>
  );
}

// "Nothing saved yet", told in each system's motif.
export function EmptyState({ action, title = "Nothing saved yet" }: { action?: React.ReactNode; title?: string }) {
  const id = useSystemId();
  const heading = <p className="ds-heading text-2xl md:text-3xl">{id === "ben-day" ? `${title}!` : title}</p>;
  return (
    <div className="ds-empty">
      {id === "showa" && <WaitingShiba className="mb-4 w-80 max-w-full" />}
      {id === "haipai" && <div className="mb-3"><Seal glyph="空" stamped={false} size={64} /></div>}
      {id === "ben-day" ? <Balloon>{heading}</Balloon> : heading}
      <p className="ds-body ds-muted">Tap Save on any film and it shows up here.</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// The brand mark before "Eigakan 映画館": Shōwa's is the Fuji print in miniature, the others set 映 in their own frame.
export function BrandMark() {
  const id = useSystemId();
  return (
    <span aria-hidden className="ds-brand-mark">
      {id === "showa" ? <FujiMark className="h-full w-full" /> : "映"}
    </span>
  );
}

// The closing illustration above an Eigakan page's footer: Shōwa's sun setting behind Fuji. Other systems close plain.
export function SignOff() {
  if (useSystemId() !== "showa") return null;
  return <div aria-hidden className="ds-sign-off"><FujiSignOff className="block h-full w-full" /></div>;
}
