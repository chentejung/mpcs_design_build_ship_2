# Design Build Ship — Week 2

Landing page with three sections: mood boards, design systems, and the final site that combines the selected pair.

## Requirements
- Next.js (App Router) + Tailwind CSS v4, exported as a **static site** (`output: "export"` → `out/`).
- No database, accounts, external APIs, or data storage. The final movie picker uses only local poster assets and an in-memory shortlist.

## Layout
- `app/boards.ts` — the three mood boards: six-color palettes weighted against all 30 current images, Pinterest references, generated-art landing tiles.
- `app/data.ts` — landing content: mood-board cards (derived from boards), design systems, final site, `selectedBoard`.
- `app/page.tsx` — landing page; `components/ui.tsx` — shared ButtonLink/Card pieces.
- `app/moodboards/[id]/page.tsx` — one page per board, themed by its palette. Build fails unless each board has exactly 30 artifacts (references + originals).
- `app/movies/` — Eigakan 映画館, the static movie picker at `/movies` and `/movies/saved`; category filtering is single-select and saved movies clear on reload.
- `app/movies/data.ts` — the single source of truth for 25 movies, poster paths, categories, synopses, and credits. The asset validator checks the count, categories, posters, and credits at build time.
- `components/artifacts/index.ts` — titles, captions, and WebP paths for the generated original artwork.
- `components/artifacts/<board-id>.tsx` — legacy SVG source retained for reference; no longer imported by the board pages or exported during builds.
- `components/artifacts/print.tsx` — shared print toolkit: `<Print>` sheet (paper grain, ink wear, edge wobble, aging,
  fading), `Plate` (misregistration), `Dots`/`Hatch` screens, `Stipple` shading, `Fine`/`VText`/`ArcText` type helpers.
- `public/moodboards/<board-id>/` — the board's 30 pictures; file names say where each came from:
  - `pinterest-NN-<title>.jpg` — Pinterest references, 640px wide, numbered in Pinterest order.
  - `generated-NN-<title>.webp` — original raster artwork created with the built-in image generation tool, optimized as WebP.
    Art briefs are recorded in `references/moodboard-image-prompts.json`; these images are not regenerated during builds.
- `public/color_theme/1/` — earlier earth-tone images, currently unused.
- `public/movies/posters/` — one-time local poster assets for the movie picker; no poster is fetched at runtime.
- `app/movies/movies.css` — the live site's Japanese Retro treatment: board-derived washi, indigo, vermilion, kinari, and teal tokens with Clay's Fraunces/Inter type.

## Workflow
All page tooling lives in `references/` — use these scripts rather than ad-hoc commands.

- **Serve:** after **every** change to the codebase, run `bash references/serve.sh`. It validates all 90 moodboard image files, six-color palettes, and the movie list; rebuilds; and restarts
  `python3 -m http.server 8000` serving `out/`, so the user can inspect over SSH at http://localhost:8000.
- **Inspect:** to check the rendered page, run `bash references/screenshot.sh [path] [output.png] [width] [height]`
  (defaults: `/`, `.screenshots/<timestamp>.png`, 1400, 3000), then Read the PNG it prints. It shoots the
  live port-8000 server, so run `serve.sh` first. Screenshots are only visible to Claude, not the user.
- **Inspect artifacts:** to judge original artifacts at full size, run `bash references/artifacts.sh <board-id> [start] [count]`
  (default 1, 6). It renders only the originals, 3 per row at ~580px, from a temp copy served on port 8001.

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues for `chentejung/mpcs_design_build_ship_2`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root, created only when needed. See `docs/agents/domain.md`.
