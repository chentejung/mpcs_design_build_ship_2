// Landing-page content. Figma links and the final site's source/case-study links are placeholders.
import { boards, japaneseRetro } from "./boards";
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
export const selectedBoard = "japanese-retro";

export const moodBoards: MoodBoard[] = boards.map((b) => ({
  id: b.id,
  title: b.title,
  selected: b.id === selectedBoard,
  tiles: b.tiles.map((n) => b.references[n - 1].src),
  palette: b.palette.map((p) => p.hex),
  links: [
    { label: "View board", href: `/moodboards/${b.id}/` },
    { label: "Pinterest", href: b.pinterest },
  ],
}));

export type DesignSystemCard = {
  id: string;
  label: string;
  title: string;
  selected?: boolean;
  links: { label: string; href: string }[];
};

// Landing-page cards, derived from the Design Systems in ./systems.ts.
export const designSystems: DesignSystemCard[] = systems.map((ds, i) => ({
  id: ds.id,
  label: `DESIGN SYSTEM 0${i + 1}`,
  title: ds.alt ? `${ds.name} ${ds.alt}` : ds.name,
  selected: ds.board.id === selectedBoard,
  links: [
    { label: "View system", href: `/design-systems/${ds.id}/` },
    { label: "Figma", href: `https://www.figma.com/file/${ds.id}-design-system` },
  ],
}));

// The final site is Eigakan at /movies; `preview` is a screenshot of it.
export const finalSite = {
  url: "/movies",
  preview: "/movies/preview.jpg",
  recipeImage: japaneseRetro.references[1].src,
  links: [
    { label: "Visit the live site", href: "/movies/" },
    { label: "Source code", href: "https://github.com/designbuildship/showa-studio" },
    { label: "Case study", href: "/case-study/" },
  ],
};
