// Export every original artifact (SVG components) to a standalone file in public/moodboards/<board>/,
// named claude-NN-<title>.svg so Claude-made pictures are distinguishable from pinterest-NN-*.jpg references.
// Usage: npx tsx references/export-originals.tsx   (serve.sh runs this before every build)
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { originalsByBoard } from "@/components/artifacts";

const root = path.resolve(__dirname, "..");
// Pictures shown via <img> can't reach the page's web fonts, so embed the one web font the art uses.
const bangers = fs.readFileSync(path.join(root, "node_modules/@fontsource/bangers/files/bangers-latin-400-normal.woff2")).toString("base64");
const fontFace = `<style>@font-face{font-family:Bangers;src:url(data:font/woff2;base64,${bangers}) format("woff2");}</style>`;

let total = 0;
for (const [board, originals] of Object.entries(originalsByBoard)) {
  const dir = path.join(root, "public/moodboards", board);
  for (const stale of fs.readdirSync(dir).filter((f) => f.startsWith("claude-"))) fs.rmSync(path.join(dir, stale));
  for (const { Component, src } of originals) {
    let svg = renderToStaticMarkup(<Component />);
    const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/)!;
    svg = svg
      .replace(/^<svg /, `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `)
      .replace(/ class="[^"]*"/, "");
    if (svg.includes("Bangers")) svg = svg.replace(/<defs>/, `<defs>${fontFace}`);
    fs.writeFileSync(path.join(root, "public", src), `<?xml version="1.0" encoding="UTF-8"?>\n${svg}\n`);
    total++;
  }
}
console.log(`==> Exported ${total} originals to public/moodboards/*/claude-*.svg`);
