"use client";
// Each system's signature motif, and the empty state built on it:
// Shōwa: a Yokoo rising sun (components/system/yokoo.tsx) beside an Osaka signboard (osaka.tsx), and a plain rising
// sun holding 空 for the empty state · Ben-Day: a starburst and speech balloons · Haipai: cloud scrolls and seals.
import { colors } from "@/app/boards";
import { systems } from "@/app/systems";
import { burst } from "@/components/artifacts/print";
import { useSystemId } from "./context";
import { Signboard } from "./osaka";
import { HeroSun, SmallSun } from "./yokoo";

const palette = (id: string) => colors(systems.find((s) => s.id === id)!.board);

// A Hinomaru disc with soft rays, `glyph` in white at its centre.
function Sun({ glyph, className = "" }: { glyph?: string; className?: string }) {
  const c = palette("showa");
  const ray = (i: number) => {
    const at = (deg: number) => [100 + 140 * Math.cos((deg * Math.PI) / 180), 100 + 140 * Math.sin((deg * Math.PI) / 180)].map((v) => v.toFixed(1)).join(" ");
    return `M100 100 L${at(i * 30 - 6)} L${at(i * 30 + 6)}Z`;
  };
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className}>
      <g fill={c.hinomaru} opacity="0.2">{Array.from({ length: 12 }, (_, i) => <path key={i} d={ray(i)} />)}</g>
      <circle cx="100" cy="100" r="54" fill={c.hinomaru} />
      {glyph && (
        <text x="100" y="100" dy="0.36em" textAnchor="middle" fontSize="56" fill="#fff" style={{ fontFamily: "var(--ds-display-font)" }}>
          {glyph}
        </text>
      )}
    </svg>
  );
}

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

// The big decoration beside a page's hero heading.
export function HeroMotif({ count }: { count: number }) {
  const id = useSystemId();
  if (id === "showa")
    return (
      <div aria-hidden className="pointer-events-none flex items-start gap-5 pt-2.5">
        <HeroSun className="h-32 w-32 md:h-48 md:w-48" />
        <Signboard text="上映中" stamp="映" />
      </div>
    );
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
  if (id === "showa") return <SmallSun className="h-6 w-6 shrink-0" />;
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
      {id === "showa" && <Sun glyph="空" className="mb-2 h-24 w-24" />}
      {id === "haipai" && <div className="mb-3"><Seal glyph="空" stamped={false} size={64} /></div>}
      {id === "ben-day" ? <Balloon>{heading}</Balloon> : heading}
      <p className="ds-body ds-muted">Tap Save on any film and it shows up here.</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
