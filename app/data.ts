// Landing-page content.
import { americanComics, boards } from "./boards";
import { systems } from "./systems";

export type MoodBoard = {
  id: string;
  title: string;
  selected?: boolean;
  tiles: string[]; // image paths under public/

  palette: string[];
  links: { label: string; href: string }[];
};

// Landing-page cards, derived from the full boards in ./boards.ts.
export const selectedBoard = "american-comics";

export const moodBoards: MoodBoard[] = boards.map((b) => ({
  id: b.id,
  title: b.title,
  selected: b.id === selectedBoard,
  tiles: b.tiles.map((n) => b.references[n - 1].src),
  palette: b.palette.map((p) => p.hex),
  links: [
    { label: "View board", href: `/moodboards/${b.id}/` },
  ],
}));

export type DesignSystemCard = {
  id: string;
  label: string;
  title: string;
  displayFont: string; // CSS variable of the system's display font
  selected?: boolean;
  links: { label: string; href: string }[];
};

// Landing-page cards, derived from the Design Systems in ./systems.ts.
export const designSystems: DesignSystemCard[] = systems.map((ds, i) => ({
  id: ds.id,
  label: `DESIGN SYSTEM 0${i + 1}`,
  title: ds.alt ? `${ds.name} ${ds.alt}` : ds.name,
  displayFont: ds.type.Display.font.variable,
  selected: ds.board.id === selectedBoard,
  links: [
    { label: "View system", href: `/design-systems/${ds.id}/` },
  ],
}));

// The final site is The Bijou at /bijou; `preview` is a screenshot of it.
export const finalSite = {
  name: "The Bijou",
  url: "/bijou",
  preview: "/bijou/preview.jpg",
  recipeImage: americanComics.references[17].src, // Space Fleet
  live: { label: "Visit the live site", href: "/bijou/" },
};
