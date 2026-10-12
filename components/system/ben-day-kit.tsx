"use client";
// Ben-Day's drawing kit on its Design System page, grouped by the Mood Board 02 picture each element comes from.
// Elements app/system.css draws (caption boxes, the shout chip, the coupon, the corner box) are shown as the live pieces.
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { Planet, PriceBox, Rocket, Stars, Swoosh } from "./aero";
import { Button, Chip, Count } from "./controls";
import { Gasp, ThoughtBalloon } from "./diner";
import { Skyline } from "./meanwhile";
import { DotRamp, Impact, Sfx, SpeedLines } from "./pow";
import { PosterArt } from "./motifs";
import { Phone } from "./ring";
import { Emanata, PriceBurst, Rays, SpiralLens } from "./xray";

const c = colors(benDay.board);

const tile = (children: React.ReactNode, viewBox = "0 0 100 100") => <svg aria-hidden viewBox={viewBox} className="h-24 w-24">{children}</svg>;
const live = (children: React.ReactNode) => <div aria-hidden inert className="grid h-24 min-w-24 place-items-center">{children}</div>;

type Element = { name: string; note: string; art: React.ReactNode };
const groups: { picture: string; elements: Element[] }[] = [
  {
    picture: "Sweet Dreams, Baby! · picture 22",
    elements: [
      { name: "Impact burst", note: "Hand-cut spikes of uneven length with a Hero Red flash at the heart. It counts the films on the cover splash.",
        art: tile(<Impact cx={50} cy={50} r={48} seed={5} />) },
      { name: "SFX lettering", note: "A colored face keyed in Ink on an Ink extrusion, set at a tilt.",
        art: tile(<><Impact cx={50} cy={52} r={46} seed={9} flash={c.mustard} /><Sfx x={50} y={62} size={34}>POW!</Sfx></>) },
      { name: "Speed lines", note: "Wedges that thin to a point behind whatever moves.",
        art: tile(<><SpeedLines x={66} y={56} length={60} n={6} gap={9} width={6} angle={-20} /><circle cx={72} cy={46} r={18} fill={c.red} stroke={c.ink} strokeWidth={3} /><path d="M62 40a12 12 0 0 1 10 -6" fill="none" stroke={c.newsprint} strokeWidth={3} strokeLinecap="round" /></>) },
      { name: "Dot ramp", note: "Ben-Day dots swell from light to heavy to model a form; one shades the empty Saved panel.",
        art: tile(<DotRamp x={6} y={6} w={88} h={88} gap={8} to={3.6} />) },
      { name: "Shout balloon", note: "A chosen filter chip shouts: an Ink burst balloon over a Hero Red one, lettered in Mustard.",
        art: live(<Chip label="Horror" count={3} aria-pressed tabIndex={-1} />) },
    ],
  },
  {
    picture: "Captain Aero Comics · picture 25",
    elements: [
      { name: "Masthead", note: "Display type: Hero Red letters keyed in Ink, standing on an Ink extrusion.",
        art: <span aria-hidden className="ds-display grid h-24 place-items-center justify-self-start text-[56px] leading-none">AERO!</span> },
      { name: "Ringed planet", note: "A Mustard globe with sepia craters inside a Hero Red ring.", art: tile(<Planet cx={50} cy={52} r={24} />) },
      { name: "Rocket", note: "Finned, with portholes and a two-tone flame; it loops past the planet on the cover splash.",
        art: tile(<><Swoosh d="M-6 92C30 40 60 96 78 40" w={8} /><Rocket x={74} y={34} s={0.9} rotate={-62} /></>) },
      { name: "Star dots", note: "Space printed as scattered dots of red, mustard and paper.",
        art: tile(<><rect width={100} height={100} fill={c.ink} /><Stars x={4} y={4} w={92} h={92} n={22} /></>) },
      { name: "Price box", note: "The cover's corner box. Eigakan's brand mark is one: 映 over 10¢.",
        art: <div aria-hidden className="flex h-24 items-center gap-4">{tile(<PriceBox x={22} y={20} w={56} h={60} />)}<span className="ds-brand-mark">映</span></div> },
    ],
  },
  {
    picture: "X-Ray Specs Ad · picture 11",
    elements: [
      { name: "Spiral lens", note: "An Ink and a Hero Red spiral wound together. It turns while a poster loads.",
        art: tile(<SpiralLens />) },
      { name: "Rays", note: "Fine wedges fanning from the product; behind the cover splash and a failed poster.",
        art: tile(<><Rays cx={50} cy={50} r={72} n={30} /><circle cx={50} cy={50} r={12} fill={c.mustard} stroke={c.ink} strokeWidth={3} /></>) },
      { name: "Price burst", note: "ONLY $1, stacked in a Mustard burst.", art: tile(<PriceBurst cx={50} cy={50} r={46} />) },
      { name: "Emanata", note: "Surprise strokes flying off an amazed face; the phone rings with them.",
        art: tile(<><circle cx={50} cy={60} r={22} fill={c.peach} stroke={c.ink} strokeWidth={3} /><circle cx={42} cy={56} r={3} fill={c.ink} /><circle cx={58} cy={56} r={3} fill={c.ink} /><ellipse cx={50} cy={70} rx={5} ry={6} fill={c.ink} /><Emanata cx={50} cy={60} r={28} len={12} angles={[-160, -130, -90, -50, -20]} k={3} /></>) },
      { name: "Coupon", note: "Secondary buttons stand straight as mail-order coupons: a dashed cut line, scissors, a red dot screen on Peach.",
        art: live(<Button variant="secondary" icon="remove" tabIndex={-1}>Remove</Button>) },
    ],
  },
  {
    picture: "Ring! Ring! · picture 13",
    elements: [
      { name: "Telephone", note: "A red rotary phone with its dial and coiled cord. It sits silent in the empty Saved list.",
        art: tile(<Phone x={0} y={6} s={1} />) },
      { name: "Ringing", note: "The same phone shaking with ring strokes. The Saved count rings like it whenever it changes.",
        art: <div aria-hidden className="flex h-24 items-center gap-4">{tile(<Phone x={6} y={12} s={0.88} ringing />)}<Count n={3} /></div> },
    ],
  },
  {
    picture: "Dish from the Diner! · picture 21",
    elements: [
      { name: "Thought balloon", note: "A scalloped cloud with a trail of bubbles; it holds the empty state's heading.",
        art: tile(<ThoughtBalloon cx={56} cy={38} rx={40} ry={26} tx={14} ty={92} k={2.5} />) },
      { name: "GASP!", note: "A shout balloon for bad news: a poster that failed to load.", art: tile(<Gasp cx={50} cy={50} r={44} />) },
      { name: "Failed poster", note: "Rays and a GASP! behind the title, set in caption boxes.",
        art: live(<div className="ds-poster w-16" data-poster="error"><div className="ds-poster-fallback"><PosterArt state="error" /></div></div>) },
      { name: "Loading poster", note: "The spiral lens turning over a red dot screen.",
        art: live(<div className="ds-poster w-16" data-poster="loading"><div className="ds-poster-fallback"><PosterArt state="loading" /></div></div>) },
    ],
  },
  {
    picture: "Meanwhile... · picture 07",
    elements: [
      { name: "Caption box", note: "The narrator's voice: Mustard, keyed in Ink. It carries the eyebrow, the result status, the Saved total and the toast.",
        art: live(<span className="ds-caption ds-label">Meanwhile…</span>) },
      { name: "Skyline", note: "Rooftops, water towers and lit windows under a Mustard moon close every Eigakan page, under “To be continued…”.",
        art: <Skyline w={300} h={96} seed={3} className="h-24 w-56" /> },
    ],
  },
];

export function BenDayKit() {
  return (
    <div className="grid gap-10">
      <p className="ds-label ds-muted">Drawing kit · grouped by the Mood Board 02 picture each element comes from</p>
      {groups.map((g) => (
        <div key={g.picture} className="grid gap-5">
          <p className="ds-caption ds-label">{g.picture}</p>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {g.elements.map((e) => (
              <li key={e.name} className="grid content-start justify-items-start gap-2">
                {e.art}
                <p className="ds-heading">{e.name}</p>
                <p className="ds-body ds-muted">{e.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
