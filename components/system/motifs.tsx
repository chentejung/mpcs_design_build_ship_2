"use client";
// Each system's signature motif, and the empty state built on it:
// Shōwa: a rising sun and vertical 上映中 · Ben-Day: a comic cover, its splash a page of genre panels, and a phone that
// rings for the Saved list and sits silent when it's empty (drawing kit: see components/system/ben-day-kit.tsx) ·
// Haipai: cloud scrolls and seals.
import { colors } from "@/app/boards";
import type { Category } from "@/app/films";
import { systems } from "@/app/systems";
import { burst } from "@/components/artifacts/print";
import { useSystemId } from "./context";
import { Planet, Rocket, Swoosh } from "./aero";
import { Barcode, CodeSeal, CornerBox, PremiereSeal } from "./cover";
import { Gasp, ThoughtBalloon } from "./diner";
import { GenreFeature, genreArt, GenrePage } from "./genres";
import { Skyline } from "./meanwhile";
import { DotRamp, SpeedLines } from "./pow";
import { NotePad, Phone, RingArt } from "./ring";
import { Spiral } from "./xray";

const palette = (id: string) => colors(systems.find((s) => s.id === id)!.board);

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

// The big decoration beside a page's hero heading. Ben-Day's is a comic page of its seven genre panels.
export function HeroMotif({ count }: { count: number }) {
  const id = useSystemId();
  if (id === "showa")
    return (
      <div aria-hidden className="pointer-events-none flex items-start gap-3">
        <Sun className="h-28 w-28 md:h-44 md:w-44" />
        <span lang="ja" className="ds-native text-(--ds-accent)" style={{ writingMode: "vertical-rl", fontSize: 30 }}>上映中</span>
      </div>
    );
  if (id === "ben-day")
    return (
      <div className="ds-splash">
        <GenrePage />
        <CodeSeal className="ds-code-seal" />
      </div>
    );
  return (
    <div aria-hidden className="pointer-events-none flex flex-col items-center gap-2">
      <Seal glyph="映" size={72} />
      <CloudScroll className="w-28 md:w-36" />
    </div>
  );
}

// The /movies hero's splash. Ben-Day's follows the filter: all seven genre panels (pick one to filter), or the chosen
// Category's panel. Other systems show their hero motif from 640px up (never in a phone-width preview).
export function Splash({ filter, counts, onPick }: {
  filter: Category | "all";
  counts: Record<Category, number>;
  onPick: (filter: Category | "all") => void;
}) {
  const id = useSystemId();
  if (id !== "ben-day")
    return (
      <div className="hidden shrink-0 sm:block @max-md:hidden">
        <HeroMotif count={Object.values(counts).reduce((a, b) => a + b, 0)} />
      </div>
    );
  return (
    <div className="ds-splash">
      {filter === "all" ? <GenrePage counts={counts} onPick={onPick} /> : <GenreFeature category={filter} count={counts[filter]} onBack={() => onPick("all")} />}
      <CodeSeal className="ds-code-seal" />
    </div>
  );
}

// Beside the hero heading (Ben-Day only): the cover's corner box.
export function CoverDress() {
  const id = useSystemId();
  if (id !== "ben-day") return null;
  return <CornerBox className="ds-corner-box" />;
}

// Under the hero's intro (Ben-Day only, from 640px): a premiere seal and the cover's shouted contents.
export function CoverBlurb() {
  const id = useSystemId();
  if (id !== "ben-day") return null;
  return (
    <div aria-hidden className="ds-cover-blurb">
      <PremiereSeal lines={["BIG", "25-FILM", "ISSUE!"]} />
      <p><span>Thrills!</span> <span>Laughs!</span> <span>Robots!</span><br /><span>Heartbreak!</span> <span>Monsters!</span></p>
    </div>
  );
}

// Beside the Saved list's heading (Ben-Day only): the phone ringing, the pad noting what's lined up.
export function SavedSplash({ count }: { count: number }) {
  const id = useSystemId();
  if (id !== "ben-day" || count === 0) return null;
  return (
    <svg aria-hidden viewBox="0 0 200 250" className="ds-saved-splash">
      <RingArt note={[`${count} ${count === 1 ? "film" : "films"}`, "tonight!"]} />
      <rect x="2" y="2" width="196" height="246" fill="none" stroke="var(--ds-text)" strokeWidth="4" />
    </svg>
  );
}

// Small ornament before a section heading or eyebrow.
export function Ornament() {
  const id = useSystemId();
  if (id === "showa") return <Sun className="h-5 w-5 shrink-0" />;
  if (id === "ben-day") return <Starburst className="h-6 w-6 shrink-0" />;
  return <CloudScroll className="w-10 shrink-0" />;
}

// Ben-Day's empty Saved list is a comic panel: "Meanwhile…", a silent phone, and the heading in its thought balloon.
function EmptyPanel({ heading }: { heading: React.ReactNode }) {
  const c = palette("ben-day");
  return (
    <div className="ds-empty-panel relative mx-auto w-full max-w-md">
      <svg aria-hidden viewBox="0 0 360 250" className="block w-full">
        <rect x="4" y="4" width="352" height="242" fill={c.newsprint} />
        <DotRamp x={12} y={150} w={150} h={90} gap={7} from={2.4} to={0.2} />
        <ThoughtBalloon cx={214} cy={98} rx={124} ry={58} tx={84} ty={160} />
        <Phone x={14} y={150} s={0.62} />
        <NotePad x={250} y={184} lines={["Pick a", "film!"]} rotate={6} />
        <rect x="4" y="4" width="352" height="242" fill="none" stroke={c.ink} strokeWidth="6" />
        <rect x="4" y="4" width="128" height="30" fill={c.mustard} stroke={c.ink} strokeWidth="4" />
        <text x="16" y="27" fontSize="20" fill={c.ink} style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.04em" }}>MEANWHILE…</text>
      </svg>
      <div className="absolute top-[20%] right-[8%] bottom-[38%] left-[30%] grid place-items-center text-center">{heading}</div>
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
      {id === "ben-day" ? <EmptyPanel heading={heading} /> : heading}
      <p className="ds-body ds-muted">Tap Save on any film and it shows up here.</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// Drawn behind a poster's fallback while it loads or after it fails (Ben-Day only): the X-ray spiral turns while it
// loads; a failed poster shows its Category's genre panel, with a GASP!
export function PosterArt({ state, category }: { state: string; category: Category }) {
  const id = useSystemId();
  if (id !== "ben-day" || state === "loaded") return null;
  if (state === "loading") return <Spiral className="ds-poster-spiral" />;
  const Art = genreArt[category];
  return (
    <svg aria-hidden viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="ds-poster-art">
      <svg y="25" width="200" height="250" viewBox="0 0 200 250"><Art /></svg>
      <rect width="200" height="25" fill="var(--ds-text)" /><rect y="275" width="200" height="25" fill="var(--ds-text)" />
      <Gasp cx={150} cy={52} r={40} />
    </svg>
  );
}

// The foot of each Eigakan page (Ben-Day only): the skyline under a "To be continued…" caption.
export function SignOff() {
  const id = useSystemId();
  if (id !== "ben-day") return null;
  return (
    <div aria-hidden className="ds-sign-off">
      <div className="flex w-full max-w-7xl items-end justify-between gap-4 px-[5vw]">
        <span className="ds-caption ds-label">To be continued…</span>
        <Barcode className="w-24 shrink-0" />
      </div>
      <Skyline className="block h-24 w-full">
        <Planet cx={300} cy={30} r={11} k={2} />
        <Swoosh d="M380 64C430 30 470 52 520 34" w={5} k={2} />
        <SpeedLines x={500} y={36} length={60} n={4} gap={5} width={3} angle={-12} />
        <Rocket x={536} y={30} s={0.55} rotate={-14} k={2} />
      </Skyline>
    </div>
  );
}
