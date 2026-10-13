"use client";
// Each system's signature motif, and the empty state built on it:
// Shōwa: the Fuji Sunrise poster and a Shiba waiting by an empty bowl · Pulp: The Bijou's pulp cover and Look!'s
// pointing hand under an empty balloon · Haipai: cloud scrolls and seals.
import { colors } from "@/app/boards";
import { systems } from "@/app/systems";
import { useSystemId } from "./context";
import { FujiMark, FujiPoster, SignOff as FujiSignOff, SunOrnament } from "./fuji";
import { PulpCover, TheEnd } from "./pulp/cover";
import { Blast } from "./pulp/krakoom";
import { LookPanel } from "./pulp/look";
import { PlanetMark } from "./pulp/weird-space-tales";
import { WaitingShiba } from "./shiba";

const palette = (id: string) => colors(systems.find((s) => s.id === id)!.board);

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

// The big decoration beside a page's hero heading; `wide` is the banner above it on phones (Shōwa and Pulp).
export function HeroMotif({ count, wide = false }: { count: number; wide?: boolean }) {
  const id = useSystemId();
  if (id === "showa") return <FujiPoster wide={wide} className={wide ? "block w-full" : "block w-56 md:w-64 lg:w-72"} />;
  if (id === "pulp") return <PulpCover count={count} wide={wide} className={`ds-cover ${wide ? "block w-full" : "block w-56 md:w-64 lg:w-72"}`} />;
  if (wide) return null;
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
  if (id === "pulp") return <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0"><Blast cx={12} cy={12} r={11} w={1.3} rubble={false} /></svg>;
  return <CloudScroll className="w-10 shrink-0" />;
}

// Pulp's empty state: the heading is set inside Look!'s balloon, over the drawing, so it stays real text.
function LookBalloon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto mb-3 w-full max-w-sm">
      <LookPanel className="block w-full" />
      <div className="absolute top-[9%] right-[5%] left-[15%] h-[52%] grid place-items-center px-[6%] text-center">{children}</div>
    </div>
  );
}

// "Nothing saved yet", told in each system's motif.
export function EmptyState({ action, title = "Nothing saved yet" }: { action?: React.ReactNode; title?: string }) {
  const id = useSystemId();
  const heading = <p className="ds-heading text-2xl md:text-3xl">{id === "pulp" ? `${title}!` : title}</p>;
  return (
    <div className="ds-empty">
      {id === "showa" && <WaitingShiba className="mb-2 w-60 max-w-full" />}
      {id === "haipai" && <div className="mb-3"><Seal glyph="空" stamped={false} size={64} /></div>}
      {id === "pulp" ? <LookBalloon>{heading}</LookBalloon> : heading}
      <p className="ds-body ds-muted">Tap Save on any film and it shows up here.</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// The brand mark before the site's name: Shōwa's is the Fuji poster in miniature, Pulp's the ringed planet, Haipai's
// sets 映 in a seal.
export function BrandMark() {
  const id = useSystemId();
  return (
    <span aria-hidden className="ds-brand-mark">
      {id === "showa" ? <FujiMark className="h-full w-full" /> : id === "pulp" ? <PlanetMark className="h-full w-full" /> : "映"}
    </span>
  );
}

// The closing illustration above a Final Site page's footer: Shōwa's sun setting behind Fuji, Pulp's THE END.
// Haipai closes plain.
export function SignOff() {
  const id = useSystemId();
  if (id === "showa") return <div aria-hidden className="ds-sign-off"><FujiSignOff className="block h-full w-full" /></div>;
  if (id === "pulp") return <div aria-hidden className="ds-sign-off"><TheEnd className="block h-full w-full" /></div>;
  return null;
}
