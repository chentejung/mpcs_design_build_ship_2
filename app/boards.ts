// Mood board content: palettes, Pinterest references, and landing-card tiles.
//
// Palettes: six colors per board, chosen from the hand-curated swatches (k-means over the references)
// as the set that best represents all 30 pictures (references + originals): lowest mean CIEDE2000
// distance, weighting all pixels and saturated pixels (chroma > 30) equally so small vivid inks
// aren't outvoted by paper. The paper, ink and lead red swatches are always kept.
// `share` = % of pixels across the 30 pictures (each weighted equally) nearest this color, rounded to sum to 100.

export type Swatch = {
  key: string;
  name: string;
  alt?: string; // native-language color name
  hex: string;
  share: number;
};

export type Reference = { title: string; src: string; href: string };

export type Board = {
  id: string;
  title: string;
  altTitle: string;
  pinterest: string;
  palette: Swatch[];
  references: Reference[];
  tiles: [number, number, number]; // reference numbers (1-based) used on the landing card
};

// File names say where a picture came from: pinterest-NN-<title>.jpg for references,
// claude-NN-<title>.svg for originals drawn by Claude (see components/artifacts).
export const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const fileName = (source: "pinterest" | "claude", n: number, title: string, ext: string) =>
  `${source}-${String(n).padStart(2, "0")}-${slug(title)}.${ext}`;

function refs(id: string, pins: string[], titles: string[]): Reference[] {
  return pins.map((pin, i) => ({
    title: titles[i],
    src: `/moodboards/${id}/${fileName("pinterest", i + 1, titles[i], "jpg")}`,
    href: `https://www.pinterest.com/pin/${pin}/`,
  }));
}

export const japaneseRetro: Board = {
  id: "japanese-retro",
  title: "Japanese Retro",
  altTitle: "日本レトロ",
  pinterest: "https://www.pinterest.com/e12e/japanese-retro-poster-aesthetic/",
  tiles: [2, 12, 5],
  palette: [
    { key: "hinomaru", name: "Hinomaru Red", alt: "日の丸", hex: "#c7381c", share: 17 },
    { key: "sumi", name: "Sumi Ink", alt: "墨", hex: "#161816", share: 16 },
    { key: "washi", name: "Washi Cream", alt: "和紙", hex: "#f3eddd", share: 20 },
    { key: "kinari", name: "Kinari Paper", alt: "生成", hex: "#ebcb85", share: 23 },
    { key: "ai", name: "Ai Indigo", alt: "藍", hex: "#1f4a66", share: 15 },
    { key: "koke", name: "Koke Moss", alt: "苔", hex: "#788355", share: 9 },
  ],
  references: refs(
    "japanese-retro",
    [
      "365495326033803270", "365495326033803277", "365495326033803271", "365495326033803274",
      "365495326033803285", "365495326033803300", "365495326033803286", "365495326033803267",
      "365495326033803278", "365495326033803292", "365495326033803273", "365495326033803279",
      "365495326033803276",
    ],
    [
      "Koi Pond", "Fuji Sunrise", "Shiba & Sake", "Nouvelle Vague", "Whisky", "Supercolor Cassette",
      "Famicom Ad", "Tokyo 1980", "Ramen", "Topboy Shampoo", "Tadanori Yokoo", "Sento Bathhouse", "Osaka Rainy Night",
    ],
  ),
};

export const americanComics: Board = {
  id: "american-comics",
  title: "American Comics",
  altTitle: "POW!",
  pinterest: "https://www.pinterest.com/e12e/american-comics-aesthetic/",
  tiles: [3, 14, 17],
  palette: [
    { key: "red", name: "Hero Red", hex: "#dc2a24", share: 16 },
    { key: "ink", name: "Ink Black", hex: "#0d0c0d", share: 21 },
    { key: "newsprint", name: "Newsprint", hex: "#f2eddd", share: 25 },
    { key: "cyan", name: "Halftone Cyan", hex: "#10869c", share: 9 },
    { key: "mustard", name: "Golden Age Mustard", hex: "#d3bc2c", share: 13 },
    { key: "sepia", name: "Aged Sepia", hex: "#5b4b3c", share: 16 },
  ],
  references: refs(
    "american-comics",
    [
      "365495326033803326", "365495326033803338", "365495326033803329", "365495326033803370",
      "365495326033803348", "365495326033803354", "365495326033803359", "365495326033803346",
      "365495326033803337", "365495326033803331", "365495326033803372", "365495326033803363",
      "365495326033803350", "365495326033803339", "365495326033803369", "365495326033803358",
      "365495326033803332", "365495326033803361", "365495326033803336", "365495326033803367",
      "365495326033803349", "365495326033803343",
    ],
    [
      "Captain America", "Wonder Woman", "Joker", "The Mask", "The Flash", "Try Again", "Vigilante", "Pow!",
      "Look!", "Superman", "Cosmo-X Lounge", "American Psycho", "Dish from the Diner", "Sweet Dreams, Baby",
      "Busted!", "Infinity Gauntlet", "Captain Aero", "Space Fleet", "Super Dope", "Space: 1999",
      "Into the Unknown", "Super Orange Juice",
    ],
  ),
};

export const chineseRetro: Board = {
  id: "chinese-retro",
  title: "Chinese Retro",
  altTitle: "老上海 · 港風",
  pinterest: "https://www.pinterest.com/e12e/chinese-retro-aesthetic/",
  tiles: [7, 20, 14],
  palette: [
    { key: "vermilion", name: "Vermilion", alt: "朱红", hex: "#e14b32", share: 20 },
    { key: "ink", name: "Ink", alt: "墨", hex: "#2b2836", share: 11 },
    { key: "xuan", name: "Xuan Paper", alt: "宣纸", hex: "#f4efe6", share: 27 },
    { key: "gold", name: "Antique Gold", alt: "古金", hex: "#c9b13c", share: 17 },
    { key: "pine", name: "Pine Green", alt: "松绿", hex: "#3b5b4e", share: 17 },
    { key: "jujube", name: "Jujube Red", alt: "枣红", hex: "#8d3c30", share: 8 },
  ],
  references: refs(
    "chinese-retro",
    [
      "365495326033803407", "365495326033803405", "365495326033803378", "365495326033803412",
      "365495326033803390", "365495326033803395", "365495326033803410", "365495326033803376",
      "365495326033803384", "365495326033803377", "365495326033803411", "365495326033803396",
      "365495326033803400", "365495326033803398", "365495326033803389", "365495326033803382",
      "365495326033803391", "365495326033803380", "365495326033803408", "365495326033803381",
      "365495326033803403",
    ],
    [
      "Seven Star Lemonade", "Old Flame", "Tomato Sauce Girl", "Great Times Club", "Hing Lee Hong Bell",
      "Globe Cigarettes", "Tiger Balm", "Kwong Man Lung Firecrackers", "Double Dragon Hotel", "Kam Fuk Hung Firecrackers",
      "Winter Solstice Calendar", "Kwong Man Loong Tiger", "Gourd Medicine Label", "Longevity Matches",
      "Duck Brand Fireworks", "Florida Water", "In the Mood for Love", "Golden Dragon Cigarettes",
      "Folk Song Concert", "Guangming Herbal Tea", "Keenien Cigarettes",
    ],
  ),
};

export const boards = [japaneseRetro, americanComics, chineseRetro];

// Look up palette colors by key inside artifact drawings, e.g. colors(japaneseRetro).hinomaru
export const colors = (b: Board) => Object.fromEntries(b.palette.map((p) => [p.key, p.hex])) as Record<string, string>;
