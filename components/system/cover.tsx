// Ben-Day's drawing kit: the trade dress the board's covers share. The corner box with its publisher's bullet, price and
// issue (Joker, picture 06; Robot Invasion, 15; Space Fleet, 26), the Comics Code-style approval seal (Space Fleet, 26;
// Try Again, 12), the scalloped "Big Premiere Issue" seal (Joker, 06) and the newsstand barcode (Space: 1999, 28). They
// dress the /movies cover, the Design System page and the page's sign-off.
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { ArcText, rand } from "@/components/artifacts/print";
import { cloud, Lettering } from "./diner";

const c = colors(benDay.board);
const bangers = { fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" };

// The corner box: the publisher's bullet (映 in a red roundel), the price, and the issue.
export function CornerBox({ issue = "No. 25", month = "OCT.", price = "10¢", className = "" }: { issue?: string; month?: string; price?: string; className?: string }) {
  const uid = `corner-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 72 112" className={className}>
      <rect x="2" y="2" width="68" height="108" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <circle cx="36" cy="30" r="23" fill={c.red} stroke={c.ink} strokeWidth="2.6" />
      <circle cx="36" cy="30" r="14" fill={c.newsprint} stroke={c.ink} strokeWidth="2" />
      <ArcText id={`${uid}-arc`} cx={36} cy={30} r={17} fontSize="6.6" fill={c.newsprint} style={bangers}>EIGAKAN</ArcText>
      <ArcText id={`${uid}-arc2`} cx={36} cy={30} r={21.5} bottom fontSize="6.6" fill={c.newsprint} style={bangers}>COMICS</ArcText>
      <text x="36" y="36" textAnchor="middle" fontSize="16" fill={c.ink} style={{ fontFamily: "var(--font-noto-sans-kr)", fontWeight: 700 }}>映</text>
      <path d="M2 58H70" stroke={c.ink} strokeWidth="2.4" />
      <text x="36" y="82" textAnchor="middle" fontSize="24" fill={c.red} stroke={c.ink} strokeWidth="1.2" paintOrder="stroke" style={bangers}>{price}</text>
      <rect x="2" y="88" width="68" height="22" fill={c.ink} />
      <text x="36" y="104" textAnchor="middle" fontSize="12" fill={c.mustard} style={bangers}>{issue} · {month}</text>
    </svg>
  );
}

// The approval seal: a stamp-like box vouching for the issue, a popcorn kernel at its heart.
export function CodeSeal({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 72" className={className}>
      <rect x="2" y="2" width="56" height="68" fill={c.newsprint} stroke={c.ink} strokeWidth="2.4" />
      <rect x="6" y="6" width="48" height="60" fill="none" stroke={c.ink} strokeWidth="1" />
      <Lettering cx={30} cy={17} lines={["APPROVED", "BY THE"]} size={8} />
      <ellipse cx="30" cy="36" rx="13" ry="8" fill={c.mustard} stroke={c.ink} strokeWidth="1.6" />
      <path d={cloud(30, 36, 6, 5, 5)} fill={c.newsprint} stroke={c.ink} strokeWidth="1.2" />
      <Lettering cx={30} cy={56} lines={["POPCORN CODE", "AUTHORITY"]} size={7} />
    </svg>
  );
}

// A scalloped seal with a ring of type inside: "Big Premiere Issue".
export function PremiereSeal({ lines = ["BIG", "PREMIERE", "ISSUE"], className = "" }: { lines?: string[]; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <path d={cloud(50, 50, 44, 44, 18)} fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={c.ink} strokeWidth="1.6" />
      <Lettering cx={50} cy={50} lines={lines} size={lines.length > 2 ? 15 : 19} />
    </svg>
  );
}

// A newsstand barcode with its digits.
export function Barcode({ digits = "0 25001 99999 7", className = "" }: { digits?: string; className?: string }) {
  const rnd = rand(41);
  const bars: React.ReactNode[] = [];
  for (let x = 6; x < 74; ) {
    const w = rnd() < 0.3 ? 2.4 : 1.1;
    bars.push(<rect key={x} x={x} y="6" width={w} height={rnd() < 0.12 ? 34 : 30} />);
    x += w + (rnd() < 0.5 ? 1.2 : 2);
  }
  return (
    <svg aria-hidden viewBox="0 0 80 48" className={className}>
      <rect x="1" y="1" width="78" height="46" fill={c.newsprint} stroke={c.ink} strokeWidth="2" />
      <g fill={c.ink}>{bars}</g>
      <text x="40" y="45" textAnchor="middle" fontSize="6.5" fill={c.ink} style={{ fontFamily: "var(--font-comic-neue)", fontWeight: 700, letterSpacing: "0.06em" }}>{digits}</text>
    </svg>
  );
}
