// Choose each board's Palette (method in app/boards.ts) from its 30 pictures (pinterest-*.jpg + generated-*.webp):
// keep paper, ink and lead red; choose the other 3 from the hand-curated pool by lowest mean CIEDE2000
// distance, weighting all pixels and saturated pixels (chroma > 30) equally; each picture weighted equally.
// Usage: node references/palette.mjs   (prints each board's six swatches and shares for app/boards.ts)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const sharp = createRequire(path.join(root, "package.json"))("sharp");

// Each board's hand-curated swatches (k-means over the references, then curated by hand).
const pools = {
  "japanese-retro": { keep: ["hinomaru", "sumi", "washi"], pool: { hinomaru: "#c7381c", sumi: "#161816", washi: "#f3eddd", kinari: "#ebcb85", ai: "#1f4a66", karashi: "#e0b54d", kaki: "#d9663f", seiji: "#3f8a92", koke: "#788355", momo: "#e8919a", kogecha: "#4e4430" } },
  "american-comics": { keep: ["red", "ink", "newsprint"], pool: { red: "#dc2a24", ink: "#0d0c0d", newsprint: "#f2eddd", pulp: "#e3c6a9", blue: "#105c88", yellow: "#f4ec36", orange: "#d15337", cyan: "#10869c", mustard: "#d3bc2c", peach: "#ebba8a", sepia: "#5b4b3c" } },
  "chinese-retro": { keep: ["vermilion", "ink", "xuan"], pool: { vermilion: "#e14b32", ink: "#2b2836", xuan: "#f4efe6", rice: "#daccb5", cobalt: "#184e7f", imperial: "#f2d63c", gold: "#c9b13c", pine: "#3b5b4e", willow: "#819b4a", celadon: "#7b9d96", peach: "#d9997e", jujube: "#8d3c30" } },
};

function lab([r, g, b]) {
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const X = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047, Y = 0.2126 * R + 0.7152 * G + 0.0722 * B, Z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}
function de2000([L1, a1, b1], [L2, a2, b2]) {
  const rad = Math.PI / 180, C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const a1p = a1 * (1 + G), a2p = a2 * (1 + G), C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
  const h = (a, b) => { const x = Math.atan2(b, a) / rad; return x < 0 ? x + 360 : x; };
  const h1p = h(a1p, b1), h2p = h(a2p, b2);
  const dL = L2 - L1, dC = C2p - C1p;
  let dh = h2p - h1p; if (C1p * C2p === 0) dh = 0; else if (dh > 180) dh -= 360; else if (dh < -180) dh += 360;
  const dH = 2 * Math.sqrt(C1p * C2p) * Math.sin((dh / 2) * rad);
  const Lb = (L1 + L2) / 2, Cbp = (C1p + C2p) / 2;
  let hb = h1p + h2p; if (C1p * C2p !== 0) hb = Math.abs(h1p - h2p) > 180 ? (h1p + h2p + (h1p + h2p < 360 ? 360 : -360)) / 2 : (h1p + h2p) / 2;
  const T = 1 - 0.17 * Math.cos((hb - 30) * rad) + 0.24 * Math.cos(2 * hb * rad) + 0.32 * Math.cos((3 * hb + 6) * rad) - 0.2 * Math.cos((4 * hb - 63) * rad);
  const SL = 1 + (0.015 * (Lb - 50) ** 2) / Math.sqrt(20 + (Lb - 50) ** 2), SC = 1 + 0.045 * Cbp, SH = 1 + 0.015 * Cbp * T;
  const RT = -2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7)) * Math.sin(60 * Math.exp(-(((hb - 275) / 25) ** 2)) * rad);
  return Math.sqrt((dL / SL) ** 2 + (dC / SC) ** 2 + (dH / SH) ** 2 + RT * (dC / SC) * (dH / SH));
}
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const combos = (arr, k) => (k === 0 ? [[]] : arr.flatMap((x, i) => combos(arr.slice(i + 1), k - 1).map((c) => [x, ...c])));

for (const [board, { keep, pool }] of Object.entries(pools)) {
  const dir = path.join(root, "public/moodboards", board);
  const files = fs.readdirSync(dir).filter((f) => /^pinterest-.*\.jpg$|^generated-.*\.webp$/.test(f)).sort();
  if (files.length !== 30) throw new Error(`${board}: ${files.length} pictures`);
  const keys = Object.keys(pool), sw = keys.map((k) => lab(hexRgb(pool[k])));
  // Per picture: distance from every sampled pixel to every pool swatch, and which pixels are saturated.
  const pics = [];
  for (const f of files) {
    const { data, info } = await sharp(path.join(dir, f)).removeAlpha().resize(72, 72, { fit: "inside" }).raw().toBuffer({ resolveWithObject: true });
    const n = info.width * info.height, d = new Float32Array(n * keys.length), sat = new Uint8Array(n);
    for (let p = 0; p < n; p++) {
      const L = lab([data[p * 3], data[p * 3 + 1], data[p * 3 + 2]]);
      sat[p] = Math.hypot(L[1], L[2]) > 30 ? 1 : 0;
      for (let s = 0; s < keys.length; s++) d[p * keys.length + s] = de2000(L, sw[s]);
    }
    pics.push({ f, n, d, sat });
  }
  const score = (set) => {
    const idx = set.map((k) => keys.indexOf(k));
    let total = 0;
    for (const { n, d, sat } of pics) {
      let all = 0, sAll = 0, sN = 0;
      for (let p = 0; p < n; p++) {
        let m = Infinity; for (const s of idx) m = Math.min(m, d[p * keys.length + s]);
        all += m; if (sat[p]) { sAll += m; sN++; }
      }
      total += (all / n + (sN ? sAll / sN : all / n)) / 2;
    }
    return total / pics.length;
  };
  const rest = keys.filter((k) => !keep.includes(k));
  const ranked = combos(rest, 3).map((c) => ({ set: [...keep, ...c], score: score([...keep, ...c]) })).sort((a, b) => a.score - b.score);
  const best = ranked[0].set, idx = best.map((k) => keys.indexOf(k));
  // Share: % of pixels (each picture weighted equally) nearest each chosen color, rounded to sum to 100.
  const share = new Array(best.length).fill(0);
  for (const { n, d } of pics) for (let p = 0; p < n; p++) {
    let m = Infinity, at = 0; idx.forEach((s, i) => { const v = d[p * keys.length + s]; if (v < m) { m = v; at = i; } });
    share[at] += 1 / n / pics.length;
  }
  const raw = share.map((s) => s * 100), floor = raw.map(Math.floor);
  let left = 100 - floor.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - floor[i], i]).sort((a, b) => b[0] - a[0]).slice(0, left).forEach(([, i]) => floor[i]++);
  console.log(`\n${board}: best ${best.join(", ")} (mean ΔE ${ranked[0].score.toFixed(3)})`);
  best.forEach((k, i) => console.log(`  ${k.padEnd(10)} ${pool[k]}  ${floor[i]}%`));
  console.log("  runners-up:", ranked.slice(1, 5).map((r) => `${r.set.slice(3).join("+")} ${r.score.toFixed(3)}`).join(" | "));
}
