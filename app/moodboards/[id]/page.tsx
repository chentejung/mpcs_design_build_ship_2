import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { boards, type Board, type Reference } from "@/app/boards";
import { resolveColors, systemFor } from "@/app/systems";
import { originalsByBoard } from "@/components/artifacts";
import type { ExportedOriginal } from "@/components/artifacts";
import { ButtonLink } from "@/components/ui";

const ARTIFACT_COUNT = 30;

export const dynamicParams = false;
export const generateStaticParams = () => boards.map((b) => ({ id: b.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `${boards.find((b) => b.id === id)!.title} — Mood Board` };
}

type Artifact = ({ kind: "reference" } & Reference) | ({ kind: "original" } & ExportedOriginal);

// Interleave originals and references so the board reads as one collage.
function collage(board: Board): Artifact[] {
  const originals = originalsByBoard[board.id];
  const out: Artifact[] = [];
  for (let i = 0; i < Math.max(board.references.length, originals.length); i++) {
    if (originals[i]) out.push({ kind: "original", ...originals[i] });
    if (board.references[i]) out.push({ kind: "reference", ...board.references[i] });
  }
  if (out.length !== ARTIFACT_COUNT) throw new Error(`${board.id}: expected ${ARTIFACT_COUNT} artifacts, got ${out.length}`);
  const missing = out.filter((a) => !fs.existsSync(path.join(process.cwd(), "public", a.src)));
  if (missing.length) throw new Error(`${board.id}: missing pictures ${missing.map((a) => a.src).join(", ")}`);
  return out;
}

export default async function MoodBoardPage({ params }: Props) {
  const { id } = await params;
  const index = boards.findIndex((b) => b.id === id);
  const board = boards[index];
  const artifacts = collage(board);
  const originalCount = artifacts.length - board.references.length;

  // Each board page takes its colors and title font from the Design System extracted from it.
  const system = systemFor(board.id);
  const roles = resolveColors(system);
  const theme = { "--bg": roles.background, "--ink": roles.text, "--accent": roles.accent } as React.CSSProperties;

  return (
    <main style={theme} className="min-h-screen bg-(--bg) text-(--ink)">
      <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-(--ink)/15 px-[6vw] py-4">
        <ButtonLink href="/#moodboards" variant="secondary">← Back to overview</ButtonLink>
        <div className="flex flex-wrap gap-2">
          {boards.map((b, i) => (
            <ButtonLink key={b.id} href={`/moodboards/${b.id}/`} variant={b.id === id ? "primary" : "secondary"}>0{i + 1}</ButtonLink>
          ))}
          <ButtonLink href={board.pinterest} variant="secondary">Pinterest board</ButtonLink>
        </div>
      </nav>

      <header className="px-[6vw] pt-20 pb-14">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-(--accent)">Mood Board 0{index + 1}</div>
        <h1 className="mt-3 text-[min(13vw,3.75rem)] leading-[1.05] break-words md:text-8xl" style={{ fontFamily: `var(${system.type.Display.font.variable}), var(--font-noto-sans-kr), var(--font-noto-serif-tc)` }}>
          {board.title} <span className="text-(--accent)">{board.altTitle}</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {[`${artifacts.length} artifacts`, `${board.references.length} references`, `${originalCount} originals`, `${board.palette.length} colors`].map((t) => (
            <span key={t} className="rounded-full border border-(--ink)/20 px-3 py-1">{t}</span>
          ))}
        </div>
      </header>

      <section className="border-t border-(--ink)/15 px-[6vw] py-16">
        <h2 className="mb-6 font-serif text-3xl">Color Palette</h2>
        {/* Bar widths = share of reference pixels nearest each color. */}
        <div className="mb-8 flex h-12 overflow-hidden rounded-lg ring-1 ring-(--ink)/20">
          {board.palette.map((p) => <span key={p.key} style={{ background: p.hex, flexGrow: p.share }} title={`${p.name} ${p.share}%`} />)}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {board.palette.map((p) => (
            <div key={p.key} className="overflow-hidden rounded-xl border border-(--ink)/15 bg-white/40">
              <div className="h-24 border-b border-(--ink)/10" style={{ background: p.hex }} />
              <div className="p-3 text-sm">
                <div className="font-semibold">{p.name} {p.alt && <span className="opacity-60">{p.alt}</span>}</div>
                <div className="font-mono text-xs uppercase">{p.hex}</div>
                <div className="text-xs opacity-60">{p.share}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-(--ink)/15 px-[6vw] py-16">
        <h2 className="mb-6 font-serif text-3xl">Artifacts</h2>
        <div className="columns-2 gap-4 md:columns-3 xl:columns-5">
          {artifacts.map((a, i) => (
            <figure key={`${a.kind}-${a.title}`} className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-(--ink)/15 bg-white/40">
              <img src={a.src} alt={a.title} className="block w-full" />
              <figcaption className="flex items-center justify-between gap-2 px-3 py-2.5 text-xs">
                <span>
                  <span className="mr-1.5 font-mono text-(--accent)">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold">{a.title}</span>
                </span>
                {a.kind === "reference" ? (
                  <ButtonLink href={a.href} variant="secondary" className="shrink-0 !px-2.5 !py-1 !text-xs">Pin ↗</ButtonLink>
                ) : (
                  <span className="shrink-0 rounded-full bg-(--ink) px-2.5 py-1 text-(--bg)">{a.note}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
