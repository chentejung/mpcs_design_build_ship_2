"use client";
// Ben-Day's genre panels: one illustrated comic panel per Category, each drawn after a Mood Board 02 picture. On /movies
// they make the cover's splash: a comic page of all seven (pick a panel to filter), or, once a Category is chosen, its
// panel with a narrator's caption. A poster that fails to load shows its Category's panel.
import { categories, categoryLabel, type Category } from "@/app/films";
import { ThrillerArt } from "./meanwhile";
import { ComedyArt } from "./xray";
import { ActionArt } from "./krakoom";
import { SciFiArt } from "./robot";
import { RomanceArt } from "./tears";
import { HorrorArt } from "./unknown";
import { AnimationArt } from "./juice";

export const genreArt: Record<Category, () => React.ReactNode> = {
  thriller: ThrillerArt,
  comedy: ComedyArt,
  animation: AnimationArt,
  action: ActionArt,
  "science-fiction": SciFiArt,
  romance: RomanceArt,
  horror: HorrorArt,
};

// Which picture each panel is drawn after, and the narrator's line for it.
export const genreStory: Record<Category, { picture: string; caption: string }> = {
  romance: { picture: "Tears of Love · picture 01", caption: "Meanwhile, in a world of heartbreak…" },
  action: { picture: "Krakoom! · picture 05", caption: "Stand back! Things are about to blow…" },
  "science-fiction": { picture: "Robot Invasion · picture 15", caption: "From beyond the stars they came…" },
  thriller: { picture: "Meanwhile... · picture 07", caption: "Meanwhile, on a rain-soaked street…" },
  comedy: { picture: "X-Ray Specs Ad · picture 11", caption: "Amaze your friends! Laugh till it hurts…" },
  horror: { picture: "Adventures into the Unknown! · picture 29", caption: "Dare you enter the unknown…?" },
  animation: { picture: "Super Orange Juice · picture 30", caption: "Toons! Tunes! Popcorn!" },
};

// The page reads big panels first, then small ones, the way the board's covers stack.
const pageOrder: Category[] = ["romance", "action", "science-fiction", "thriller", "comedy", "horror", "animation"];

// One genre panel, 4:5, keyed in Ink.
export function GenrePanel({ category, className = "" }: { category: Category; className?: string }) {
  const Art = genreArt[category];
  return (
    <svg aria-hidden viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className={`ds-genre-art ${className}`}>
      <Art />
      <rect x="2" y="2" width="196" height="246" fill="none" stroke="var(--ds-text)" strokeWidth="4" />
    </svg>
  );
}

const label = (id: Category) => categoryLabel[id];

// All seven panels as a comic page. With `onPick`, each panel is a button that filters to its Category.
export function GenrePage({ counts, onPick }: { counts?: Partial<Record<Category, number>>; onPick?: (c: Category) => void }) {
  return (
    <div className="ds-genre-page" role={onPick ? "group" : undefined} aria-label={onPick ? "Genres" : undefined} aria-hidden={onPick ? undefined : true}>
      {pageOrder.map((id) => {
        const inner = (
          <>
            <GenrePanel category={id} />
            <span className="ds-genre-label ds-label">
              {label(id)}
              {counts?.[id] !== undefined && <span className="ds-genre-count"> · {counts[id]}</span>}
            </span>
          </>
        );
        return onPick ? (
          <button key={id} type="button" className="ds-genre" aria-label={`Show ${label(id)} films`} onClick={() => onPick(id)}>{inner}</button>
        ) : (
          <div key={id} className="ds-genre">{inner}</div>
        );
      })}
    </div>
  );
}

// One Category's panel, captioned by the narrator, with its film count in a burst.
export function GenreFeature({ category, count, onBack }: { category: Category; count: number; onBack?: () => void }) {
  return (
    <div className="ds-genre-feature" key={category}>
      <div className="ds-genre ds-genre--feature"><GenrePanel category={category} /></div>
      <div className="grid content-start justify-items-start gap-4">
        <p className="ds-caption ds-label">{genreStory[category].caption}</p>
        <p className="ds-genre-burst"><span>{count}</span> {label(category)} {count === 1 ? "film" : "films"}!</p>
        {onBack && <button type="button" className="ds-link ds-label" onClick={onBack}>← All genres</button>}
      </div>
    </div>
  );
}

export const genreCounts = (films: { category: Category }[]) =>
  Object.fromEntries(categories.map((cat) => [cat.id, films.filter((f) => f.category === cat.id).length])) as Record<Category, number>;
