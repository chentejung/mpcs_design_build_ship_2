// Design Systems: one extracted from each Mood Board, using only that board's Palette plus white for text on Accent
// or Selected (docs/adr/0001-one-design-system-per-mood-board.md). Every system fills the same checklist (issue #5),
// so the three can be compared side by side; no two share a value on background and texture, type, control shape,
// card shape, motif, or interaction feel.
//
// Muted and Border are Text blended into Background, resolved to solid hex here so their contrast can be checked.
// checkSystem() fails the build when a text pairing misses its contrast target; systemStyle() runs it, so no page can
// be themed by a failing system.
import { americanComics, chineseRetro, japaneseRetro, type Board } from "./boards";
import type { IconName } from "@/components/system/icons";
import type { Category } from "./films";

type Ink = string; // a Palette swatch key, or "white"

export type TypeRole = "Display" | "Heading" | "Body" | "Label" | "Meta" | "Native" | "Fine print";
export type FontRef = { family: string; variable: string }; // variable is set by app/fonts.ts
export type TypeSpec = { font: FontRef; size: number; weight: number; tracking?: number; upper?: boolean };
export type ShapePart = "control" | "card" | "poster" | "badge" | "panel";

export type DesignSystem = {
  id: string;
  name: string;
  alt?: string; // native-script name
  board: Board;
  essence: string;
  colors: {
    background: Ink;
    surface: Ink;
    text: Ink;
    accent: Ink;
    onAccent: Ink;
    selected: Ink;
    onSelected: Ink;
    focus: Ink;
    muted: number; // share of Text blended into Background
    border: number; // share of Text blended into Background
    onSurface?: Ink; // text on a dark Surface (default: Text)
    mutedOnSurface?: number; // share of onSurface blended into a dark Surface (default: Muted)
    categories: Record<Category, Ink>; // badge tint per Category
    restricted?: string; // swatches kept out of text roles, and why
  };
  type: Record<TypeRole, TypeSpec>;
  quotes?: FontRef; // a face for ’ “ ” when the system's fonts set them full-width
  shape: { radius: Record<ShapePart, number>; border: { control: number; card: number }; shadow: string; controls: string };
  icons: Record<IconName, string>; // what each icon draws (components/system/icons.tsx)
  texture: { name: string; note: string };
  motif: { name: string; note: string };
  feel: { hover: string; press: string };
};

const font = {
  dela: { family: "Dela Gothic One", variable: "--font-dela" },
  zenKaku: { family: "Zen Kaku Gothic New", variable: "--font-zen-kaku" },
  bangers: { family: "Bangers", variable: "--font-bangers" },
  comicNeue: { family: "Comic Neue", variable: "--font-comic-neue" },
  notoSansKr: { family: "Noto Sans KR", variable: "--font-noto-sans-kr" },
  zcool: { family: "ZCOOL QingKe HuangYou", variable: "--font-zcool" },
  notoSerifSc: { family: "Noto Serif SC", variable: "--font-noto-serif-sc" },
  latinQuotes: { family: "Noto Serif (quotes only)", variable: "--font-latin-quotes" },
} satisfies Record<string, FontRef>;

export const showa: DesignSystem = {
  id: "showa",
  name: "Shōwa",
  alt: "昭和",
  board: japaneseRetro,
  essence: "Shōwa-era screenprint posters: flat Hinomaru, Ai and Kinari inks worn thin on cream paper and laid in dry-brush strokes, a red sun behind Fuji, heavy gothic type, and a pictogram for every genre cut from the same posters.",
  colors: {
    background: "washi",
    surface: "kinari",
    text: "sumi",
    accent: "hinomaru",
    onAccent: "white",
    selected: "ai",
    onSelected: "white",
    focus: "ai",
    muted: 0.7,
    border: 0.22,
    categories: { thriller: "kogecha", comedy: "kinari", animation: "kinari", action: "hinomaru", "science-fiction": "ai", romance: "hinomaru", horror: "sumi" },
    restricted: "Kinari Paper never carries text or a keyline: it is only 1.34:1 from Washi, so it is always a ground under Sumi, Ai or Hinomaru — a poster panel, a pictogram's disc, a hovered face.",
  },
  type: {
    Display: { font: font.dela, size: 56, weight: 400, tracking: -0.01 },
    Heading: { font: font.dela, size: 16, weight: 400 }, // 16px keeps "Spider-Man: Into the Spider-Verse" to 2 lines at 168px
    Body: { font: font.zenKaku, size: 14, weight: 400 },
    Label: { font: font.zenKaku, size: 12, weight: 700, tracking: 0.12, upper: true },
    Meta: { font: font.zenKaku, size: 12, weight: 400 },
    Native: { font: font.dela, size: 14, weight: 400 },
    "Fine print": { font: font.zenKaku, size: 11, weight: 400 },
  },
  shape: {
    radius: { control: 6, card: 6, poster: 2, badge: 999, panel: 6 },
    border: { control: 2, card: 2 },
    shadow: "None cast. Posters are pasted on a Kinari panel 5px out from their Washi margin, as Fuji Sunrise sets its picture on an ochre ground; every printed block keeps a Washi rule inset from its edge.",
    controls: "Printed labels (ラベル), like the sake bottle's: a flat ink block with rounded corners, a Washi rule inset from its edge and the screen's specks, its icon a sun. Filter chips are pills headed by their Category's pictogram in a Kinari disc ringed by one turn of the brush. A checked box takes a ◯, the mark for “yes” on Japanese forms; radios raise a red sun out of an Ai sea; a switched-on toggle wears Nouvelle Vague's pinstripes under a red sun; the selected tab stands on the same pinstripes; the select points down from a small sun; the Saved count hangs as a paper lantern (提灯).",
  },
  icons: { save: "An unrisen sun: a ring with a plus.", saved: "The risen sun: a solid disc with the check knocked out.", remove: "A sun with a cross knocked out.", back: "A sun with an arrow knocked out, pointing back." },
  texture: { name: "Old poster paper", note: "Washi grain, yellowing to Kinari at the edges as Shiba & Sake and Ramen have; printed blocks are worn by fine specks where the ink missed and dry-brush drags where the paper shows through in streaks, and every drawn line is a tapered brushstroke." },
  motif: {
    name: "Red sun over Fuji",
    note: "From Fuji Sunrise (04), the hero is a poster of a red sun behind Ai Fuji, its snow streaking down the gullies, with bands of mist, a lake, rocks and a pine branch drawn in the brushwork of the scene that sets the four posters together; エイガ is on a title slip and EIGAKAN below; on phones it widens into a landscape with Nouvelle Vague's (08) red band carrying 上映中. The same Fuji is the brand mark and the sign-off, where the sun sets behind it between two pines. Every Category has a pictogram cut from the four posters in a brush-ringed disc, the headline's gloss is one torn stroke of red, the header is Ramen's (18) Ai ground over its bowl's rim, a 済 (“done”) seal lands on saved posters, and when nothing is saved the Shiba from Shiba & Sake (06) sits up on a rock, eyes shut, by an empty bowl.",
  },
  feel: { hover: "The face turns Kinari (or its ink deepens) and the sun rises.", press: "The label prints flat and the sun sets." },
};

export const benDay: DesignSystem = {
  id: "ben-day",
  name: "Ben-Day",
  board: americanComics,
  essence: "Golden Age comic books: Ben-Day dots, thick ink outlines, hard shadows, and lettering that shouts.",
  colors: {
    background: "newsprint",
    surface: "mustard",
    text: "ink",
    accent: "red",
    onAccent: "white",
    selected: "ink",
    onSelected: "mustard",
    focus: "ink",
    muted: 0.75,
    border: 0.9,
    categories: { thriller: "ink", comedy: "mustard", animation: "peach", action: "red", "science-fiction": "sepia", romance: "red", horror: "ink" },
    restricted: "Ben-Day Peach and Golden Age Mustard never carry text on Newsprint (1.50:1 and 1.63:1): they are fills behind Ink, or Mustard lettering on Ink.",
  },
  type: {
    Display: { font: font.bangers, size: 64, weight: 400, tracking: 0.02 },
    Heading: { font: font.bangers, size: 22, weight: 400, tracking: 0.03 },
    Body: { font: font.comicNeue, size: 15, weight: 400 },
    Label: { font: font.bangers, size: 15, weight: 400, tracking: 0.08, upper: true },
    Meta: { font: font.comicNeue, size: 12, weight: 700 },
    Native: { font: font.notoSansKr, size: 14, weight: 700 },
    "Fine print": { font: font.comicNeue, size: 11, weight: 400 },
  },
  shape: {
    radius: { control: 3, card: 0, poster: 0, badge: 0, panel: 0 },
    border: { control: 3, card: 4 },
    shadow: "Hard 4px Ink offset, no blur.",
    controls: "Buttons lean like action lettering, primary faces under a Ben-Day dot screen. Secondary buttons stand straight as mail-order coupons, a dashed cut line on Ben-Day Peach; filter chips are speech balloons with a tail.",
  },
  icons: { save: "A starburst with a plus.", saved: "A solid starburst with the check knocked out.", remove: "Scissors, to clip the coupon.", back: "A solid starburst with an arrow knocked out, pointing back." },
  texture: { name: "Ben-Day dots", note: "A halftone dot screen in Hero Red and Aged Sepia over Newsprint." },
  motif: { name: "Speech balloon", note: "Balloons carry the empty state and the filter chips; a starburst carries the Saved count and lands on saved posters as a “SAVED!” sticker." },
  feel: { hover: "Controls tilt and their shadow grows.", press: "The shadow collapses and the control slams down." },
};

export const haipai: DesignSystem = {
  id: "haipai",
  name: "Haipai",
  alt: "海派",
  board: chineseRetro,
  essence: "1930s Shanghai calendar posters: Art Deco gold rules, seal stamps, and cloud scrolls on Xuan paper.",
  colors: {
    background: "xuan",
    surface: "pine",
    text: "ink",
    accent: "jujube",
    onAccent: "xuan",
    selected: "pine",
    onSelected: "xuan",
    focus: "ink",
    muted: 0.72,
    border: 0.3,
    onSurface: "xuan",
    mutedOnSurface: 0.85,
    categories: { thriller: "ink", comedy: "jujube", animation: "pine", action: "jujube", "science-fiction": "pine", romance: "jujube", horror: "ink" },
    restricted: "Vermilion is only for seals and large display type: it misses 4.5:1 with every palette color. Antique Gold is only for rules and ornaments.",
  },
  type: {
    Display: { font: font.zcool, size: 56, weight: 400 },
    Heading: { font: font.zcool, size: 20, weight: 400 },
    Body: { font: font.notoSerifSc, size: 14, weight: 400 },
    Label: { font: font.notoSerifSc, size: 12, weight: 700, tracking: 0.16, upper: true },
    Meta: { font: font.notoSerifSc, size: 12, weight: 400 },
    Native: { font: font.zcool, size: 16, weight: 400 },
    "Fine print": { font: font.notoSerifSc, size: 11, weight: 400 },
  },
  quotes: font.latinQuotes,
  shape: {
    radius: { control: 2, card: 0, poster: 0, badge: 2, panel: 0 },
    border: { control: 1, card: 2 },
    shadow: "None on cards and panels: Gold double rules frame them. Mahjong-tile chips stand on a 4px Pine back.",
    controls: "Art Deco octagons with cut corners and a carved inner hairline, like the frames on tea and tobacco labels. Filter chips are mahjong tiles on a Pine back; radios are 方孔钱 coins with a square hole.",
  },
  icons: { save: "An uncut seal with a plus.", saved: "A stamped seal with the check knocked out.", remove: "A cancelled seal.", back: "A seal with an arrow pointing back." },
  texture: { name: "Xuan fibres", note: "Long, soft paper fibres and a faint hatch, like rice paper under ink." },
  motif: { name: "Cloud scroll and seal", note: "祥云 scrolls frame headings; a square seal carries the brand and the empty state, which stands in a moon gate (月洞门); a 藏 (“kept”) seal lands on saved posters." },
  feel: { hover: "Gold rules brighten and tiles lift off their back.", press: "Buttons stamp down like a seal; tiles press flat." },
};

export const systems = [showa, benDay, haipai];
export const systemFor = (boardId: string) => systems.find((s) => s.board.id === boardId)!;

// The fixed parts of the checklist that every system shares.
export const spacingScale = [4, 8, 12, 16, 24, 32, 48];
export const gridColumns = [
  { label: "Phone", columns: 2 },
  { label: "≥ 640px", columns: 3 },
  { label: "≥ 1024px", columns: 4 },
  { label: "≥ 1280px", columns: 5 },
];
export const SCRIM_OPACITY = 0.92;

// ----- Colors -----

const hex = (s: DesignSystem, ink: Ink) => {
  if (ink === "white") return "#ffffff";
  const swatch = s.board.palette.find((p) => p.key === ink);
  if (!swatch) throw new Error(`${s.id}: unknown swatch "${ink}"`);
  return swatch.hex;
};
const swatchName = (s: DesignSystem, ink: Ink) => (ink === "white" ? "White" : s.board.palette.find((p) => p.key === ink)!.name);

// Mix two colors in sRGB, like CSS color-mix(in srgb, a t, b).
export function mix(a: string, b: string, t: number) {
  const ch = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return `#${[0, 1, 2].map((i) => Math.round(ch(a, i) * t + ch(b, i) * (1 - t)).toString(16).padStart(2, "0")).join("")}`;
}

// WCAG 2 contrast ratio.
export function contrast(a: string, b: string) {
  const lum = (h: string) => {
    const [r, g, bl] = [0, 1, 2].map((i) => {
      const v = parseInt(h.slice(1 + i * 2, 3 + i * 2), 16) / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export type ResolvedColors = {
  background: string; surface: string; text: string; muted: string; border: string; accent: string; onAccent: string;
  selected: string; onSelected: string; focus: string; scrim: string; error: string; onSurface: string; mutedOnSurface: string;
};

export function resolveColors(s: DesignSystem): ResolvedColors {
  const c = s.colors;
  const background = hex(s, c.background);
  const surface = hex(s, c.surface);
  const text = hex(s, c.text);
  const muted = mix(text, background, c.muted);
  const onSurface = c.onSurface ? hex(s, c.onSurface) : text;
  return {
    background, surface, text, muted,
    border: mix(text, background, c.border),
    accent: hex(s, c.accent),
    onAccent: hex(s, c.onAccent),
    selected: hex(s, c.selected),
    onSelected: hex(s, c.onSelected),
    focus: hex(s, c.focus),
    scrim: background,
    error: text,
    onSurface,
    mutedOnSurface: c.mutedOnSurface ? mix(onSurface, surface, c.mutedOnSurface) : muted,
  };
}

// Badge tint per Category, with the text color that sits on it: On-Accent / text on Selected for those tints,
// otherwise whichever of Text and Background reads better.
export function categoryColors(s: DesignSystem, category: Category) {
  const r = resolveColors(s);
  const ink = s.colors.categories[category];
  const bg = hex(s, ink);
  if (ink === s.colors.accent) return { bg, fg: r.onAccent };
  if (ink === s.colors.selected) return { bg, fg: r.onSelected };
  return { bg, fg: contrast(r.text, bg) >= contrast(r.background, bg) ? r.text : r.background };
}

export type RoleRow = { role: string; hex: string; from: string; on?: { label: string; ratio: number } };

// The Color roles section: each role, where it comes from, and its contrast against what it sits on.
export function colorRoles(s: DesignSystem): RoleRow[] {
  const r = resolveColors(s);
  const c = s.colors;
  const pct = (t: number) => `${Math.round(t * 100)}%`;
  const dark = Boolean(c.onSurface);
  return [
    { role: "Background", hex: r.background, from: swatchName(s, c.background) },
    { role: "Surface", hex: r.surface, from: swatchName(s, c.surface), ...(dark && { on: { label: `${swatchName(s, c.onSurface!)} on it`, ratio: contrast(r.onSurface, r.surface) } }) },
    { role: "Text", hex: r.text, from: swatchName(s, c.text), on: { label: "on Background", ratio: contrast(r.text, r.background) } },
    { role: "Muted", hex: r.muted, from: `Text ${pct(c.muted)} into Background`, on: { label: "on Background", ratio: contrast(r.muted, r.background) } },
    { role: "Border", hex: r.border, from: `Text ${pct(c.border)} into Background`, on: { label: "on Background", ratio: contrast(r.border, r.background) } },
    { role: "Accent", hex: r.accent, from: swatchName(s, c.accent), on: { label: "as text on Background", ratio: contrast(r.accent, r.background) } },
    { role: "On-Accent", hex: r.onAccent, from: swatchName(s, c.onAccent), on: { label: "on Accent", ratio: contrast(r.onAccent, r.accent) } },
    { role: "Selected", hex: r.selected, from: swatchName(s, c.selected), on: { label: `${swatchName(s, c.onSelected)} on it`, ratio: contrast(r.onSelected, r.selected) } },
    { role: "Focus", hex: r.focus, from: `${swatchName(s, c.focus)} ring with a Background halo`, on: { label: "on Background", ratio: contrast(r.focus, r.background) } },
    { role: "Scrim", hex: r.scrim, from: `Background at ${pct(SCRIM_OPACITY)} over posters` },
    { role: "Error", hex: r.error, from: "Text, with an icon and wording (never a hue)" },
  ];
}

export type ContrastCheck = { pair: string; ratio: number; min: number };

// The pairings the build checks (issue #5): 4.5:1 for text, 3:1 for Accent as large text and for state changes.
export function contrastChecks(s: DesignSystem): ContrastCheck[] {
  const r = resolveColors(s);
  const checks: ContrastCheck[] = [
    { pair: "Text on Background", ratio: contrast(r.text, r.background), min: 4.5 },
    { pair: "Muted on Background", ratio: contrast(r.muted, r.background), min: 4.5 },
    { pair: "Text on Surface", ratio: contrast(r.onSurface, r.surface), min: 4.5 },
    { pair: "Muted on Surface", ratio: contrast(r.mutedOnSurface, r.surface), min: 4.5 },
    { pair: "On-Accent on Accent", ratio: contrast(r.onAccent, r.accent), min: 4.5 },
    { pair: "Text on Selected", ratio: contrast(r.onSelected, r.selected), min: 4.5 },
    { pair: "Accent as large text on Background", ratio: contrast(r.accent, r.background), min: 3 },
    { pair: "Selected against Background", ratio: contrast(r.selected, r.background), min: 3 },
    { pair: "Focus ring against Background", ratio: contrast(r.focus, r.background), min: 3 },
  ];
  for (const category of Object.keys(s.colors.categories) as Category[]) {
    const { bg, fg } = categoryColors(s, category);
    checks.push({ pair: `${category} badge text`, ratio: contrast(fg, bg), min: 4.5 });
  }
  return checks;
}

export function checkSystem(s: DesignSystem) {
  const failing = contrastChecks(s).filter((c) => c.ratio < c.min);
  if (failing.length)
    throw new Error(`${s.name}: contrast too low:\n- ${failing.map((c) => `${c.pair} is ${c.ratio.toFixed(2)}:1, needs ${c.min}:1`).join("\n- ")}`);
}

// CSS variables that theme components/system for one Design System.
export function systemStyle(s: DesignSystem): React.CSSProperties {
  checkSystem(s);
  const r = resolveColors(s);
  const vars: Record<string, string | number> = {
    "--ds-bg": r.background, "--ds-surface": r.surface, "--ds-text": r.text, "--ds-muted": r.muted, "--ds-border": r.border,
    "--ds-accent": r.accent, "--ds-on-accent": r.onAccent, "--ds-selected": r.selected, "--ds-on-selected": r.onSelected,
    "--ds-focus": r.focus, "--ds-scrim": `color-mix(in srgb, ${r.scrim} ${SCRIM_OPACITY * 100}%, transparent)`,
    "--ds-error": r.error, "--ds-on-surface": r.onSurface, "--ds-muted-on-surface": r.mutedOnSurface,
    "--ds-control-border": `${s.shape.border.control}px`, "--ds-card-border": `${s.shape.border.card}px`,
  };
  for (const p of s.board.palette) vars[`--ds-swatch-${p.key}`] = p.hex; // ornaments: gold rules, seals, dot screens
  for (const category of Object.keys(s.colors.categories) as Category[]) {
    const { bg, fg } = categoryColors(s, category);
    vars[`--ds-cat-${category}-bg`] = bg;
    vars[`--ds-cat-${category}-fg`] = fg;
  }
  for (const [part, px] of Object.entries(s.shape.radius)) vars[`--ds-radius-${part}`] = `${px}px`;
  for (const [role, t] of Object.entries(s.type)) {
    const key = role.toLowerCase().replace(" ", "-");
    // Inter catches Latin the CJK fonts lack (e.g. ō); Noto Sans KR / Serif TC catch Hangul and Traditional Han.
    vars[`--ds-${key}-font`] = `${s.quotes ? `var(${s.quotes.variable}), ` : ""}var(${t.font.variable}), var(--font-inter), var(--font-noto-sans-kr), var(--font-noto-serif-tc), sans-serif`;
    vars[`--ds-${key}-size`] = `${t.size}px`;
    vars[`--ds-${key}-weight`] = t.weight;
    vars[`--ds-${key}-tracking`] = `${t.tracking ?? 0}em`;
    vars[`--ds-${key}-case`] = t.upper ? "uppercase" : "none";
  }
  return vars as React.CSSProperties;
}
