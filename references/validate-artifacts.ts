// Verify assets without regenerating or overwriting the generated artwork.
// Usage: npx tsx references/validate-artifacts.ts
import fs from "node:fs";
import path from "node:path";
import { boards } from "@/app/boards";
import { originalsByBoard } from "@/components/artifacts";
import { categories, movies } from "@/app/movies/data";

const root = path.resolve(__dirname, "..");
let generatedCount = 0;
let referenceCount = 0;
for (const board of boards) {
  if (board.palette.length !== 6) throw new Error(`${board.id}: expected exactly 6 palette colors, got ${board.palette.length}`);
  if (board.palette.reduce((total, color) => total + color.share, 0) !== 100) throw new Error(`${board.id}: palette shares must total 100%`);
  const originals = originalsByBoard[board.id];
  if (board.tiles.length !== 3 || new Set(board.tiles).size !== 3 || board.tiles.some((n) => !originals[n - 1])) {
    throw new Error(`${board.id}: landing tiles must select three distinct generated images`);
  }
  const artifacts = [...originals, ...board.references];
  if (artifacts.length !== 30) throw new Error(`${board.id}: expected 30 artifacts, got ${artifacts.length}`);
  if (new Set(artifacts.map((a) => a.src)).size !== artifacts.length) {
    throw new Error(`${board.id}: duplicate asset paths`);
  }
  for (const artifact of artifacts) {
    const file = path.join(root, "public", artifact.src);
    if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
      throw new Error(`Missing or empty moodboard image: ${artifact.src}`);
    }
  }
  for (const original of originals) {
    const bytes = fs.readFileSync(path.join(root, "public", original.src));
    if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") {
      throw new Error(`Expected WebP image: ${original.src}`);
    }
  }
  generatedCount += originals.length;
  referenceCount += board.references.length;
}
console.log(`Validated ${generatedCount} generated images and ${referenceCount} references across ${boards.length} boards.`);

if (movies.length !== 25) throw new Error(`Expected 25 movies, got ${movies.length}`);
if (new Set(movies.map((movie) => movie.id)).size !== movies.length) throw new Error("Movie ids must be unique");
for (const movie of movies) {
  if (!categories.includes(movie.category)) throw new Error(`${movie.id}: invalid category ${movie.category}`);
  const poster = path.join(root, "public", movie.poster);
  if (!fs.existsSync(poster) || fs.statSync(poster).size === 0) throw new Error(`Missing movie poster: ${movie.poster}`);
  if (!movie.creditHolder.trim() || !movie.source.startsWith("https://")) throw new Error(`Missing poster credit: ${movie.id}`);
}
console.log(`Validated ${movies.length} movies across ${categories.length} categories.`);
