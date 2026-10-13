"use client";
// Pulp's drawing kit on its Design System page, grouped by the Mood Board 02 picture each element comes from, then the
// Bijou's own marquee. Elements app/system.css draws (the extrusions, the issue box's rule, the bulbs, the snipe, the
// billing block) are shown as the live pieces.
import { categories, filmById } from "@/app/films";
import { buttonClass, Count } from "../controls";
import { Poster } from "../poster";
import { Rocket, Trail } from "./captain-aero";
import { PulpCover, TheEnd } from "./cover";
import { pulpGlyphs, PulpGenreIcon } from "./genre";
import { Scroll } from "./into-the-unknown";
import { Blast } from "./krakoom";
import { LookPanel } from "./look";
import { c, Lettering, Newsprint, useSvgId } from "./press";
import { IssueBox, Spiral } from "./space-fleet";
import { Searchlights, Skyline } from "./the-mask";
import { PlanetMark, RingedPlanet, Saucer } from "./weird-space-tales";

const box = (children: React.ReactNode, className = "h-20 w-20") => <div aria-hidden inert className={`grid place-items-center ${className}`}>{children}</div>;
// Wide drawings keep their own proportions inside the row's height.
const wideArt = (children: React.ReactNode) => <div aria-hidden inert className="flex h-40 items-end">{children}</div>;
const radio = (checked: boolean) => (
  <span className="ds-check min-h-0"><input type="radio" checked={checked} readOnly tabIndex={-1} /><span className="ds-box" /></span>
);
const label = (id: keyof typeof pulpGlyphs) => (id === "all" ? "All" : categories.find((cat) => cat.id === id)!.label);
const pictogram = (id: keyof typeof pulpGlyphs): Element => ({
  name: `${label(id)} pictogram`, note: pulpGlyphs[id].from, art: box(<PulpGenreIcon id={id} className="h-16 w-16" />),
});

// A piece of the kit on its own sheet, worn like the drawings it belongs to.
function Sample({ viewBox, ground = false, children }: { viewBox: string; ground?: boolean; children: React.ReactNode }) {
  const id = useSvgId();
  const [x, y, w, h] = viewBox.split(" ").map(Number);
  return (
    <svg aria-hidden viewBox={viewBox} className="h-full max-w-full">
      <defs><Newsprint id={id} rough={0.8} specks={0.35} /></defs>
      <g filter={`url(#${id})`}>
        {ground && <rect x={x} y={y} width={w} height={h} fill={c.ink} />}
        {children}
      </g>
    </svg>
  );
}

type Element = { name: string; note: string; art: React.ReactNode; wide?: boolean };
const groups: { picture: string; label?: string; elements: Element[] }[] = [
  {
    picture: "Space Fleet · picture 26",
    elements: [
      { name: "Cover", note: "THE BIJOU over the spiral, with the strap line, the issue box, a 25 FILMS! blurb and the scroll: the /bijou hero.",
        art: box(<PulpCover count={25} className="ds-cover h-full" />, "h-40 w-28 justify-self-start") },
      { name: "Banner", note: "The cover widened for phones, over a Mustard strap that says what's on.", art: wideArt(<PulpCover wide count={25} className="ds-cover h-full max-w-full" />), wide: true },
      { name: "Spiral", note: "Rings of Hero Red sinking into the Ink night, each a little off the last.", art: box(<Sample viewBox="0 0 80 80" ground><Spiral cx={44} cy={44} r={70} n={12} /></Sample>) },
      { name: "Issue box", note: "No. and price, ruled double. The Saved count prints as its number, and secondary buttons take its double rule.",
        art: box(<span className="flex h-20 items-center gap-4"><Sample viewBox="0 0 50 60"><IssueBox x={2} y={2} w={46} no={25} /></Sample><Count n={3} /></span>, "h-20 w-full justify-items-start") },
    ],
  },
  {
    picture: "Captain Aero · picture 25",
    elements: [
      { name: "Rocket", note: "Cigar-bodied in Newsprint silver with a Hero Red nose and fins, a row of Mustard portholes and a flame: it loops the hero and flies off past THE END.",
        art: wideArt(<Sample viewBox="-64 -36 172 72"><Rocket x={0} y={0} /></Sample>), wide: true },
      { name: "Trail", note: "A Mustard ribbon edged in Ink, swelling toward the rocket as it loops.",
        art: box(<Sample viewBox="0 0 100 70"><Trail a={[4, 64]} c1={[10, 10]} c2={[60, 70]} b={[96, 14]} w={14} /></Sample>, "h-20 w-28") },
      { name: "Masthead block", note: "Every control stands on a block with bevelled corners, as the masthead's letters stand on theirs: hover raises it, press punches it flat.",
        art: box(<span className="flex flex-wrap items-center gap-4"><span className={buttonClass("primary")}>Save</span><span className={buttonClass("secondary")}>Remove</span></span>, "h-20 w-full justify-items-start"), wide: true },
    ],
  },
  {
    picture: "Weird Space Tales · picture 03",
    elements: [
      { name: "Ringed planet", note: "Banded Peach and Hero Red, shaded in a Sepia screen, its ring tilted round it: the hero's centrepiece.",
        art: box(<Sample viewBox="0 0 120 80"><RingedPlanet cx={60} cy={40} r={26} /></Sample>, "h-20 w-28") },
      { name: "Brand mark", note: "The planet in Mustard, ringed in Hero Red, before The Bijou in the header.", art: box(<PlanetMark className="h-16 w-16" />) },
      { name: "Saucer", note: "A Newsprint disc under a Peach dome, its rim lit in Mustard, a beam beneath.",
        art: box(<Sample viewBox="0 0 80 60" ground><Saucer x={40} y={22} w={60} /></Sample>, "h-20 w-24") },
      pictogram("science-fiction"),
      { name: "Planet radio", note: "A radio's ring, and the Mustard planet a Hero Red ring swings round when chosen.", art: box(<span className="flex items-center gap-5">{radio(false)}{radio(true)}</span>) },
    ],
  },
  {
    picture: "Into the Unknown · picture 29",
    elements: [
      pictogram("horror"),
      { name: "Scroll", note: "The curling banner the cover pins its blurb on: NOW SHOWING TONIGHT! at the hero's foot.",
        art: box(<Sample viewBox="0 0 150 34"><Scroll x={2} y={4} w={146} h={22} text="NOW SHOWING TONIGHT!" size={11} /></Sample>, "h-20 w-36") },
    ],
  },
  {
    picture: "The Mask · picture 08",
    elements: [
      pictogram("comedy"),
      { name: "Skyline", note: "Towers with a few lit windows and two palms against a sunset, swept by premiere searchlights: the foot of the hero and of THE END.",
        art: wideArt(<Sample viewBox="0 0 240 90" ground><Searchlights beams={[[40, -16], [200, 14]]} y={90} length={110} /><Skyline x0={-4} x1={244} y={90} h={44} palms={[0.1, 0.88]} /></Sample>), wide: true },
      { name: "Billing block", note: "The poster credits, set as the one-sheet's foot: one centred run of condensed capitals.",
        art: (
          <ol className="ds-credits-list ds-fine ds-muted max-w-xs text-center" aria-hidden>
            {["the-shining", "die-hard", "tampopo"].map((id) => <li key={id}><span className="font-bold">{filmById[id].title}</span> ({filmById[id].year})</li>)}
          </ol>
        ) },
      { name: "The End", note: "The night over the skyline, the rocket flying off, and THE END: the foot of every page.",
        art: <div aria-hidden className="ds-sign-off !mt-0 !h-auto aspect-[1200/160] w-full"><TheEnd className="block h-full w-full" /></div>, wide: true },
    ],
  },
  {
    picture: "American Psycho · picture 20",
    elements: [
      { name: "Two-tone lettering", note: "The masthead split across the middle, Newsprint over Hero Red: the phone banner's BIJOU.",
        art: box(<Sample viewBox="0 0 150 60" ground><Lettering x={8} y={46} size={44} text="BIJOU" width={134} tone={[c.newsprint, c.red]} side={c.sepia} /></Sample>, "h-20 w-36") },
      { name: "Blurb", note: "The cover's shouted copy in condensed capitals on a Mustard caption, knocked askew: the headline's gloss.",
        art: box(<span className="ds-kicker">25 features!</span>, "h-20 w-full justify-items-start") },
    ],
  },
  {
    picture: "Pow! · picture 16",
    elements: [pictogram("action")],
  },
  {
    picture: "Look! · picture 17",
    elements: [
      pictogram("animation"),
      { name: "Pointing hand", note: "Look!'s panel pointing up at an empty balloon: the Saved page before anything is saved.",
        art: wideArt(<LookPanel className="h-full max-w-full" />), wide: true },
    ],
  },
  {
    picture: "Ring! Ring! · picture 13",
    elements: [pictogram("thriller"), pictogram("romance")],
  },
  {
    picture: "Krakoom! · picture 05",
    elements: [
      pictogram("all"),
      { name: "Blast", note: "Hero Red round Mustard round a Newsprint flash: the eyebrow's ornament, and with a cross knocked out, the Remove icon.",
        art: box(<Sample viewBox="0 0 40 40"><Blast cx={20} cy={20} r={18} w={1.6} /></Sample>, "h-16 w-16") },
    ],
  },
  {
    picture: "The Bijou",
    label: "Drawing kit · the Bijou's own marquee",
    elements: [
      { name: "Marquee board", note: "Bulbs along a chip's top and foot: dim at rest, chasing on hover, lit Mustard on Ink when selected. The header strings them along its Hero Red foot.",
        art: box(<span className="flex flex-wrap gap-3"><span className="ds-chip">Thriller</span><span className="ds-chip" aria-pressed="true">Comedy</span></span>, "h-20 w-full justify-items-start"), wide: true },
      { name: "HELD OVER!", note: "The snipe a cinema pastes across a poster kept another week: it lands on a saved film's poster.",
        art: box(<div className="ds-frame w-24"><Poster film={filmById["rear-window"]} /><span className="ds-saved-stamp" style={{ display: "grid" }} /></div>, "h-40 w-28 justify-self-start") },
    ],
  },
];

export function PulpKit() {
  return (
    <div className="grid gap-12">
      {groups.map((g) => (
        <div key={g.picture} className="grid gap-5">
          <p className="ds-label ds-muted">{g.label ?? `Drawing kit · after ${g.picture}, Mood Board 02`}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {g.elements.map((k) => (
              <li key={k.name} className={`grid min-w-0 content-start gap-2 ${k.wide ? "col-span-2" : ""}`}>
                {k.art}
                <p className="ds-label">{k.name}</p>
                <p className="ds-fine ds-muted">{k.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
