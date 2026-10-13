import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { selectedBoard } from "@/app/data";
import { categories, films } from "@/app/films";
import { systemFor } from "@/app/systems";
import { Credits } from "@/components/movies/credits";
import { Header } from "@/components/movies/header";
import { SavedProvider } from "@/components/movies/saved";
import { SignOff } from "@/components/system/motifs";
import { SystemTheme } from "@/components/system/theme";

const FILM_COUNT = 25;

export const metadata: Metadata = {
  title: { template: "%s — Eigakan 映画館", default: "Eigakan 映画館" },
  description: "Pick tonight's film from 25 movies across seven genres.",
};

// Build fails unless the film list is complete: count, unique ids, known categories, local posters, credits.
function checkFilms() {
  const errors: string[] = [];
  if (films.length !== FILM_COUNT) errors.push(`expected ${FILM_COUNT} films, got ${films.length}`);
  const seen = new Set<string>();
  for (const f of films) {
    if (seen.has(f.id)) errors.push(`${f.id}: duplicate id`);
    seen.add(f.id);
    if (!categories.some((c) => c.id === f.category)) errors.push(`${f.id}: unknown category "${f.category}"`);
    if (!fs.existsSync(path.join(process.cwd(), "public", f.poster))) errors.push(`${f.id}: missing poster ${f.poster}`);
    if (!f.credit.holder.trim() || !f.credit.source.startsWith("https://")) errors.push(`${f.id}: incomplete poster credit`);
  }
  if (errors.length) throw new Error(`Film list is invalid:\n- ${errors.join("\n- ")}`);
}

// The final site ships the Selected Pair: the selected Mood Board's own Design System styles every component.
export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  checkFilms();
  return (
    <SystemTheme system={systemFor(selectedBoard)} fixed className="min-h-screen">
      <SavedProvider>
        <Header />
        <main className="mx-auto max-w-7xl px-[5vw]">
          {children}
          <Credits />
        </main>
        <SignOff />
        <footer className="ds-footer ds-fine ds-muted mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-[5vw] py-8">
          <span>Eigakan 映画館 · Design Build Ship, Week 2</span>
          <a href="/" className="ds-link">← Process page</a>
        </footer>
      </SavedProvider>
    </SystemTheme>
  );
}
