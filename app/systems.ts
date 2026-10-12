// Design Systems: one extracted from each Mood Board, using only that board's Palette plus white for text on Accent
// or Selected (docs/adr/0001-one-design-system-per-mood-board.md). Every system fills the same checklist (issue #5),
// so the three can be compared side by side; no two share a value on background and texture, type, control shape,
// card shape, motif, or interaction feel.
//
// Muted and Border are Text blended into Background, resolved to solid hex here so their contrast can be checked.
// checkSystem() fails the build when a text pairing misses its contrast target; systemStyle() runs it, so no page can
// be themed by a failing system.
import { americanComics, chineseRetro, japaneseRetro, type Board } from "./catalog-boards";
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
  shape: { radius: Record<ShapePart, number>; border: { control: number; card: number }; shadow: string };
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
  essence: "Shōwa-era poster print: fat gothic type, a rising sun, and color plates that never quite line up.",
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
    categories: { thriller: "ai", comedy: "kinari", animation: "kinari", action: "hinomaru", "science-fiction": "ai", romance: "hinomaru", horror: "sumi" },
    restricted: "Koke Moss stays out of text roles: it reaches only 4.39:1 with Sumi and 3.47:1 on Washi.",
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
    radius: { control: 4, card: 2, poster: 2, badge: 999, panel: 4 },
    border: { control: 2, card: 4 },
    shadow: "None. A red plate sits 3px out of register behind each control, like a misaligned print layer.",
  },
  texture: { name: "Washi grain", note: "Fine paper fibres over Washi Cream, from the print toolkit's grain filter." },
  motif: { name: "Rising sun", note: "A Hinomaru disc with rays behind the hero and the empty state; 上映中 set vertically." },
  feel: { hover: "The red plate drifts further out of register.", press: "The plate snaps into register." },
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
    selected: "cyan",
    onSelected: "ink",
    focus: "cyan",
    muted: 0.75,
    border: 0.9,
    categories: { thriller: "ink", comedy: "mustard", animation: "cyan", action: "red", "science-fiction": "cyan", romance: "red", horror: "sepia" },
    restricted: "White text never sits on Halftone Cyan: it reaches only 4.28:1, so Selected uses Ink.",
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
  },
  texture: { name: "Ben-Day dots", note: "A halftone dot screen in Hero Red and Halftone Cyan over Newsprint." },
  motif: { name: "Speech balloon", note: "Balloons carry the empty state; a starburst carries the Saved count." },
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
    shadow: "None. Gold double rules frame cards and panels instead.",
  },
  texture: { name: "Xuan fibres", note: "Long, soft paper fibres and a faint hatch, like rice paper under ink." },
  motif: { name: "Cloud scroll and seal", note: "祥云 scrolls frame headings; a square seal carries the brand and the empty state." },
  feel: { hover: "Gold rules brighten.", press: "The control stamps down like a seal." },
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
