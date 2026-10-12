// Landing-page content shared by the overview and detail pages.
import { boards, japaneseRetro } from "./boards";
import { originalsByBoard } from "@/components/artifacts";

export type MoodBoard = {
  id: string;
  title: string;
  selected?: boolean;
  tiles: string[]; // image paths under public/

  palette: string[];
  links: { label: string; href: string }[];
};

// Landing-page cards, derived from the full boards in ./boards.ts.
const selectedBoard = "japanese-retro";

export const moodBoards: MoodBoard[] = boards.map((b) => ({
  id: b.id,
  title: b.title,
  selected: b.id === selectedBoard,
  tiles: b.tiles.map((n) => originalsByBoard[b.id][n - 1].src),
  palette: b.palette.map((p) => p.hex),
  links: [
    { label: "View board", href: `/moodboards/${b.id}/` },
    { label: "Pinterest", href: b.pinterest },
  ],
}));

export { designSystems, type DesignSystem } from "./design-systems/systems";

export const finalSite = {
  url: "/movies/",
  heroImage: "/movies-preview.png",
  recipeImage: japaneseRetro.references[1].src,
  links: [
    { label: "Visit the live site", href: "/movies/" },
    { label: "Source code", href: "https://github.com/chentejung/mpcs_design_build_ship_2" },
    { label: "Case study", href: "/case-study/" },
  ],
};
