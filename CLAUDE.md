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
- `app/movies/movies.css` — Japanese Retro cinema-program styling using the board's six tokens and Clay's Fraunces/Inter type: bilingual program tabs, numbered poster frames, perforated save tickets, vermilion saved stamps, and a compact night-street marquee.

## Workflow
All page tooling lives in `references/` — use these scripts rather than ad-hoc commands.

- **Serve:** after **every** change to the codebase, run `bash references/serve.sh`. It validates all 90 moodboard image files, six-color palettes, and the movie list; rebuilds; and restarts
  `python3 -m http.server 8000` serving `out/`, so the user can inspect over SSH at http://localhost:8000.
- **Inspect:** to check the rendered page, run `bash references/screenshot.sh [path] [output.png] [width] [height]`
  (defaults: `/`, `.screenshots/<timestamp>.png`, 1400, 3000), then Read the PNG it prints. It shoots the
  live port-8000 server, so run `serve.sh` first. Screenshots are only visible to Claude, not the user.
- **Inspect artifacts:** to judge original artifacts at full size, run `bash references/artifacts.sh <board-id> [start] [count]`
  (default 1, 6). It renders only the originals, 3 per row at ~580px, from a temp copy served on port 8001.
- **Browser tests:** after building, run `npm run test:movies`. Requires Firefox and `.local/bin/geckodriver` (or set `GECKODRIVER` to its path). Checks categories, save/remove behavior, navigation, reload reset, credits, mobile overflow, and the landing-page link against the static export using temporary loopback servers.

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues for `chentejung/mpcs_design_build_ship_2`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root, created only when needed. See `docs/agents/domain.md`.

## Merged component studies

- The reviewed poster iteration remains at `/design-systems/clay`, `/grid`, and `/soft`, using
  `app/design-systems/systems.ts`, `art-directions.ts`, and `components/design-system*`.
- Main's Shōwa, Ben-Day, and Haipai studies remain at `/design-systems/showa`, `/ben-day`, and `/haipai`.
  Their route body is `components/system/catalog-page.tsx`; `app/systems.ts` uses the SVG-study palettes
  in `app/catalog-boards.ts`. The `catalog-*` CSS classes isolate these components from the poster iteration.
- Preserve the current raster mood-board assets and movie-picker layout. Legacy SVG study sources/assets are
  retained for the incoming component studies; do not replace the raster exports with them.
- Native film titles and saved-runtime formatting come from `app/films.ts`; `app/movies/data.ts` retains the
  current poster paths, identifiers, and copy. `app/fonts.ts` loads fonts for both iterations.
- After merging, run `npm run test:design-systems`, `npm run test:movies`, and `npm test` against the built preview.
