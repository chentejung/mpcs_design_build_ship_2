// Fonts for the landing page and the three Design Systems. next/font downloads them at build time and self-hosts
// them in out/. The CJK fonts are split by unicode-range, so a page only loads the characters it uses; they are
// not preloaded. Noto Sans KR and Noto Serif TC are fallbacks for Native Titles the display fonts don't cover.
import {
  DM_Sans, Space_Grotesk, Bangers, Comic_Neue, Dela_Gothic_One, Fraunces, Inter, Noto_Sans_KR, Noto_Serif_SC, Noto_Serif_TC, ZCOOL_QingKe_HuangYou,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import localFont from "next/font/local";

// Landing page
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-space-grotesk" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-dm-sans" });

// Shōwa
const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"], variable: "--font-dela", preload: false });
const zenKaku = Zen_Kaku_Gothic_New({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-zen-kaku", preload: false });

// Ben-Day
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const comicNeue = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-comic-neue" });

// Haipai
const zcool = ZCOOL_QingKe_HuangYou({ weight: "400", subsets: ["latin"], variable: "--font-zcool", preload: false });
const notoSerifSc = Noto_Serif_SC({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-noto-serif-sc", preload: false });

// Haipai's Chinese fonts set ’ “ ” full-width, which gaps English words ("tonight’ s"); this face covers only those
// marks. No metric-adjusted fallback face: an Arial fallback without the unicode-range would capture every character.
const latinQuotes = localFont({
  src: [
    { path: "../node_modules/@fontsource/noto-serif/files/noto-serif-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/noto-serif/files/noto-serif-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-latin-quotes",
  declarations: [{ prop: "unicode-range", value: "U+2018-201F" }],
  adjustFontFallback: false,
  preload: false,
});

// Native Title fallbacks
const notoSansKr = Noto_Sans_KR({ weight: "700", subsets: ["latin"], variable: "--font-noto-sans-kr", preload: false });
const notoSerifTc = Noto_Serif_TC({ weight: "400", subsets: ["latin"], variable: "--font-noto-serif-tc", preload: false });

export const fontVariables = [fraunces, inter, spaceGrotesk, dmSans, dela, zenKaku, bangers, comicNeue, zcool, notoSerifSc, latinQuotes, notoSansKr, notoSerifTc]
  .map((f) => f.variable)
  .join(" ");
