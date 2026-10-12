"use client";
// Ben-Day's drawing kit on its Design System page: the seven genre panels, then every element grouped by the Mood
// Board 02 picture it is drawn after. Elements app/system.css draws (caption boxes, the shout chip, the coupon, the
// LOOK! balloon, the brand mark) are shown as the live pieces.
import { colors } from "@/app/boards";
import { categories, filmById } from "@/app/films";
import { benDay } from "@/app/systems";
import { Planet, PriceBox, Rocket, Stars, Swoosh } from "./aero";
import { Button, Chip, Count } from "./controls";
import { Barcode, CodeSeal, CornerBox, PremiereSeal } from "./cover";
import { Gasp, ThoughtBalloon } from "./diner";
import { FilmCard } from "./film-card";
import { GenrePanel, genreStory } from "./genres";
import { Glove, PopcornPal } from "./juice";
import { Block, Smoke } from "./krakoom";
import { Rooftops, Streetlamp, Walker } from "./meanwhile";
import { PosterArt } from "./motifs";
import { DotRamp, Impact, Sfx, SpeedLines } from "./pow";
import { NotePad, Phone } from "./ring";
import { Robot, Saucer } from "./robot";
import { Eye, Tear } from "./tears";
import { MonsterHand } from "./unknown";
import { Emanata, PriceBurst, Rays, Specs, SpiralLens } from "./xray";

const c = colors(benDay.board);

const tile = (children: React.ReactNode, viewBox = "0 0 100 100") => <svg aria-hidden viewBox={viewBox} className="h-32 w-32">{children}</svg>;
const wide = (children: React.ReactNode, viewBox: string) => <svg aria-hidden viewBox={viewBox} className="h-32 w-52">{children}</svg>;
const live = (children: React.ReactNode) => <div aria-hidden inert className="grid min-h-32 min-w-32 place-items-center">{children}</div>;
const poster = (state: "loading" | "error", category: "horror" | "science-fiction") => (
  <div className="ds-poster w-[74px]" data-poster={state}><div className="ds-poster-fallback"><PosterArt state={state} category={category} /></div></div>
);

type Element = { name: string; note: string; art: React.ReactNode };
const groups: { picture: string; elements: Element[] }[] = [
  {
    picture: "Tears of Love · picture 01",
    elements: [
      { name: "Eye", note: "A Lichtenstein close-up: almond lid, sepia iris, a heavy lash line and an arched brow, on peach skin.",
        art: tile(<><rect x="-20" y="40" width="240" height="120" fill={c.peach} /><Eye uid="kit-eye" /></>, "84 56 110 80") },
      { name: "Tear", note: "A stream from the eye's inner corner swelling into a drop.", art: tile(<Tear x={50} y={12} s={1.1} />) },
    ],
  },
  {
    picture: "Krakoom! · picture 05",
    elements: [
      { name: "Masonry", note: "Blocks in oblique view, lit on top and shaded on the side, flying out of the blast.",
        art: tile(<><Block x={14} y={40} w={34} rotate={-18} /><Block x={56} y={60} w={26} rotate={24} /><Block x={40} y={14} w={16} rotate={8} /></>) },
      { name: "Smoke", note: "Red scalloped puffs with a lighter heart roll in at the blast's corners.", art: tile(<Smoke cx={50} cy={52} r={40} />) },
    ],
  },
  {
    picture: "Meanwhile... · picture 07",
    elements: [
      { name: "Caption box", note: "The narrator's voice: Mustard, keyed in Ink. It carries the eyebrow, the result status, the Saved total, the toast and each genre's line.",
        art: live(<span className="ds-caption ds-label">Meanwhile…</span>) },
      { name: "The walker", note: "A man in a fedora and trench coat, suitcase in hand, rim-lit in Mustard.",
        art: tile(<><rect width="100" height="100" fill={c.sepia} /><Walker x={46} y={96} s={0.95} /></>) },
      { name: "Streetlamp", note: "A gas lamp and its pool of light on the wet street.", art: tile(<><rect width="100" height="100" fill={c.ink} /><Streetlamp x={50} y={96} h={80} /></>) },
      { name: "Rooftops", note: "Buildings, water towers and lit windows: the noir skyline, and the sign-off at every page's foot.",
        art: tile(<><rect width="100" height="100" fill={c.newsprint} /><circle cx="74" cy="26" r="11" fill={c.mustard} stroke={c.ink} strokeWidth="2" /><Rooftops w={110} ground={100} min={24} max={60} seed={9} towers={0.6} lit={0.4} /></>) },
    ],
  },
  {
    picture: "X-Ray Specs Ad · picture 11",
    elements: [
      { name: "X-ray specs", note: "Red cardboard frame, twinkles and a bolt, black arms folding back into depth.", art: wide(<Specs x={0} y={-30} s={0.5} />, "-2 -12 104 66") },
      { name: "Spiral lens", note: "An Ink and a Hero Red spiral wound together. It turns while a poster loads.", art: tile(<SpiralLens />) },
      { name: "Rays", note: "Fine wedges fanning from the product, behind the Comedy and Action panels.",
        art: tile(<><Rays cx={50} cy={50} r={72} n={30} /><circle cx={50} cy={50} r={12} fill={c.mustard} stroke={c.ink} strokeWidth={3} /></>) },
      { name: "Price burst", note: "ONLY $1, stacked in a Mustard burst.", art: tile(<PriceBurst cx={50} cy={50} r={46} />) },
      { name: "Emanata", note: "Surprise strokes flying off whatever's amazing; the phone rings with them.",
        art: tile(<><circle cx={50} cy={60} r={22} fill={c.peach} stroke={c.ink} strokeWidth={3} /><circle cx={42} cy={56} r={3} fill={c.ink} /><circle cx={58} cy={56} r={3} fill={c.ink} /><ellipse cx={50} cy={70} rx={5} ry={6} fill={c.ink} /><Emanata cx={50} cy={60} r={28} len={12} angles={[-160, -130, -90, -50, -20]} k={3} /></>) },
      { name: "Coupon", note: "Secondary buttons stand straight as mail-order coupons: a dashed cut line, scissors, a red dot screen on Peach.",
        art: live(<Button variant="secondary" icon="remove" tabIndex={-1}>Remove</Button>) },
    ],
  },
  {
    picture: "Ring! Ring! · picture 13",
    elements: [
      { name: "Telephone", note: "A red rotary phone: numbered dial, cradled handset, coiled cord. Silent in the empty Saved list.",
        art: wide(<Phone x={0} y={0} s={1} />, "-4 10 168 126") },
      { name: "Ringing", note: "Ring strokes shake off it at the head of the Saved list; the Saved count rings like it whenever it changes.",
        art: <div aria-hidden className="flex h-32 items-center gap-3"><svg aria-hidden viewBox="-4 -26 168 162" className="h-32 w-36"><Phone x={0} y={0} s={1} ringing /></svg><Count n={3} /></div> },
      { name: "Note pad", note: "Hand-lettered: it notes how many films are lined up for tonight.", art: tile(<NotePad x={16} y={26} lines={["3 films", "tonight!"]} rotate={-8} />) },
    ],
  },
  {
    picture: "Robot Invasion · picture 15",
    elements: [
      { name: "Robot", note: "Glass dome with its works showing, glowing eyes, a mouth grille and rows of rivets.",
        art: wide(<><rect width="200" height="250" fill={c.red} /><Robot /></>, "0 36 200 128") },
      { name: "Saucer", note: "A Mustard dome over a row of red lights, hovering in the searchlights.",
        art: tile(<><rect width="100" height="100" fill={c.ink} /><path d="M40 52L28 100H72L60 52Z" fill={c.mustard} opacity="0.35" /><Saucer x={50} y={46} s={1.6} /></>) },
    ],
  },
  {
    picture: "Look! · picture 17",
    elements: [
      { name: "LOOK! balloon", note: "Pops up over a card as you hover it, while the card leans forward and its poster takes a red dot screen.",
        art: live(<div className="w-24 pt-4"><FilmCard film={filmById["arrival"]} headingLevel={4} state="hover" /></div>) },
    ],
  },
  {
    picture: "Dish from the Diner! · picture 21",
    elements: [
      { name: "Thought balloon", note: "A scalloped cloud with a trail of bubbles: the heroine's unsaid line, and the empty state's heading.",
        art: tile(<ThoughtBalloon cx={56} cy={38} rx={40} ry={26} tx={14} ty={92} k={2.5} />) },
      { name: "GASP!", note: "A shout balloon for bad news, over a failed poster.", art: tile(<Gasp cx={50} cy={50} r={44} />) },
      { name: "Failed poster", note: "Its Category's genre panel, a GASP! and the title in caption boxes.", art: live(poster("error", "horror")) },
      { name: "Loading poster", note: "The spiral lens turning over a red dot screen.", art: live(poster("loading", "science-fiction")) },
    ],
  },
  {
    picture: "Sweet Dreams, Baby! · picture 22",
    elements: [
      { name: "Impact burst", note: "Hand-cut spikes of uneven length with a flash at the heart.", art: tile(<Impact cx={50} cy={50} r={48} seed={5} />) },
      { name: "SFX lettering", note: "A colored face keyed in Ink on an Ink extrusion, set at a tilt.",
        art: tile(<><Impact cx={50} cy={52} r={46} seed={9} flash={c.mustard} /><Sfx x={50} y={62} size={34}>POW!</Sfx></>) },
      { name: "Speed lines", note: "Wedges that thin to a point behind whatever moves: the rocket in the sign-off.",
        art: tile(<><SpeedLines x={66} y={56} length={60} n={6} gap={9} width={6} angle={-20} /><circle cx={72} cy={46} r={18} fill={c.red} stroke={c.ink} strokeWidth={3} /></>) },
      { name: "Dot ramp", note: "Ben-Day dots swell from light to heavy to model a form: night skies, the empty panel's shadow.",
        art: tile(<DotRamp x={6} y={6} w={88} h={88} gap={8} to={3.6} />) },
      { name: "Shout balloon", note: "A chosen filter chip shouts: an Ink burst balloon over a Hero Red one, lettered in Mustard.",
        art: live(<Chip label="Horror" count={3} aria-pressed tabIndex={-1} />) },
    ],
  },
  {
    picture: "Captain Aero Comics · picture 25",
    elements: [
      { name: "Masthead", note: "Display type: Hero Red letters keyed in Ink, standing on an Ink extrusion.",
        art: <span aria-hidden className="ds-display grid h-32 place-items-center justify-self-start text-[64px] leading-none">AERO!</span> },
      { name: "Ringed planet", note: "A Mustard globe with sepia craters inside a Hero Red ring.", art: tile(<Planet cx={50} cy={52} r={24} />) },
      { name: "Rocket", note: "Finned, with portholes and a two-tone flame, riding a looping exhaust trail across the sign-off.",
        art: tile(<><Swoosh d="M-6 92C30 40 60 96 78 40" w={8} /><Rocket x={74} y={34} s={0.9} rotate={-62} /></>) },
      { name: "Star dots", note: "Space printed as scattered dots of red, mustard and paper.",
        art: tile(<><rect width={100} height={100} fill={c.ink} /><Stars x={4} y={4} w={92} h={92} n={22} /></>) },
      { name: "Price box", note: "The cover's corner box. Eigakan's brand mark is one: 映 over 10¢.",
        art: <div aria-hidden className="flex h-32 items-center gap-4">{tile(<PriceBox x={22} y={20} w={56} h={60} />)}<span className="ds-brand-mark">映</span></div> },
    ],
  },
  {
    picture: "Cover trade dress · pictures 06, 12, 15, 26, 28",
    elements: [
      { name: "Corner box", note: "Publisher's bullet, price and issue, beside the /movies masthead (Joker, Robot Invasion).", art: live(<CornerBox className="w-16" />) },
      { name: "Approval seal", note: "Stamped on the splash's corner, vouched for by the Popcorn Code (Space Fleet, Try Again).", art: live(<CodeSeal className="w-16" />) },
      { name: "Premiere seal", note: "A scalloped seal shouting the issue's size (Joker).", art: live(<PremiereSeal lines={["BIG", "25-FILM", "ISSUE!"]} className="w-24" />) },
      { name: "Barcode", note: "The newsstand barcode, in the sign-off beside “To be continued…” (Space: 1999).", art: live(<Barcode className="w-24" />) },
    ],
  },
  {
    picture: "Adventures into the Unknown! · picture 29",
    elements: [
      { name: "Monster hand", note: "Gnarled Mustard fingers mottled Sepia, clawed, creased at the knuckles and dripping.",
        art: wide(<><rect width="200" height="250" fill={c.red} /><MonsterHand /></>, "0 92 200 124") },
    ],
  },
  {
    picture: "Super Orange Juice · picture 30",
    elements: [
      { name: "Popcorn pal", note: "A rubber-hose cartoon: pie-cut eyes, a wide-open grin, hose limbs and big shoes.",
        art: tile(<><circle cx="100" cy="150" r="86" fill={c.mustard} /><PopcornPal /></>, "14 66 172 182") },
      { name: "Glove", note: "Four fingers and a rolled cuff, the way 1930s cartoons wave.", art: tile(<Glove x={50} y={78} s={2.2} rotate={-8} />) },
    ],
  },
];

export function BenDayKit() {
  return (
    <div className="grid gap-12">
      <div className="grid gap-5">
        <p className="ds-label ds-muted">Genre panels · one per Category, each drawn after a picture on the board</p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 xl:grid-cols-7">
          {categories.map((cat) => (
            <li key={cat.id} className="grid content-start gap-2">
              <div className="ds-genre"><GenrePanel category={cat.id} /><span className="ds-genre-label ds-label">{cat.label}</span></div>
              <p className="ds-fine ds-muted">{genreStory[cat.id].picture}</p>
            </li>
          ))}
        </ul>
        <p className="ds-body ds-muted max-w-3xl">
          On /movies they make the cover&rsquo;s splash, a comic page of all seven: pick a panel to filter, and its panel takes the
          narrator&rsquo;s caption and a burst counting its films. A poster that fails to load shows its Category&rsquo;s panel.
        </p>
      </div>
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
