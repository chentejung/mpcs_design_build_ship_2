# Design Build Ship — Week 2

Landing page with three sections: mood boards, design systems, and the final site that combines the selected pair
(American Comics + Pulp) — **The Bijou**, a movie picker at `/bijou` (spec: GitHub issue #3, written for it as Eigakan
映画館 at `/movies`). One Design System is extracted from each mood board (spec: issue #5; why:
`docs/adr/0001-one-design-system-per-mood-board.md`); terms are defined in `CONTEXT.md`.

## Requirements
- Next.js (App Router) + Tailwind CSS v4, exported as a **static site** (`output: "export"` → `out/`).
- No database, accounts, external APIs, or data storage. Links to subpages/Pinterest/Figma are placeholders.
- The Bijou's saved list is React state only (no localStorage/sessionStorage/cookies/URL): it survives client-side
  navigation between `/bijou` and `/bijou/saved` and is empty after any full page load. Posters were downloaded once
  into `public/`; the site never fetches remote images.

## Layout
- `app/boards.ts` — the three mood boards: 6-color palette (the set that best represents all 30 pictures; method in
  the file header, chosen by `references/palette.mjs`), Pinterest references, landing tiles.
- `app/data.ts` — landing content: mood-board and design-system cards (derived from boards and systems), final site
  (its name, read by the header brand and page titles), `selectedBoard`.
- `app/systems.ts` — the three Design Systems (Shōwa, Pulp, Haipai): how each maps its board's swatches to color roles
  (Muted/Border are blends), type roles, shape (incl. each system's control shapes), icons, texture, motif, feel.
  `systemStyle()` turns one into `--ds-*` CSS
  variables and fails the build when a text pairing misses its contrast target (4.5:1 text, 3:1 large accent/states).
- `app/fonts.ts` — every web font, self-hosted by `next/font` at build time (CJK fonts are unicode-range split, not
  preloaded). `app/system.css` — the shared components' styles, with each system's own controls, frames and feel.
- `app/design-systems/[id]/page.tsx` — one page per Design System, themed by it: color roles, type roles, spacing and
  shape, texture and motif, components, control states, UI states, applied (a phone-width `/bijou`).
- `components/system/` — components shared by the Final Site and the Design System pages (`SystemTheme`, controls, film card,
  poster, header, motifs, empty state, icons). Shōwa's drawing kit is one file per Mood Board 01 picture, each drawn
  in flat screenprint inks in the brushwork of `references/showa-brushwork.jpg` (the scene that sets the four posters
  together): `screenprint.tsx` holds the `Wear` filter (specks, dry-brush drags) and the seeded brush helpers
  (`stroke`, `needles`, `band`) so every build draws the same strokes. `fuji.tsx` (04: the Fuji poster hero and its
  phone banner, brand mark, sign-off, and the landscape pieces `Pine`, `Mist`, `Shore`), `shiba.tsx` (06: the Shiba
  waiting by an empty bowl in the empty state, Shiba and chopsticks pictograms), `nouvelle.tsx` (08: eye, lips, heart and bob pictograms, the portrait), `ramen.tsx` (18: bowl, egg
  pictogram) and `osaka.tsx` (26: the lantern); `genre-icons.tsx` sets one pictogram per Category (plus All) in the
  chips and badges, and `drawing-kit.tsx` shows them all on Shōwa's page. The ink specks and drags on controls (`--ds-wear`),
  the brushed kicker (`--ds-brush`), pinstripes, red band, sunrise radios and lantern count are CSS in `app/system.css`. Style them through `app/system.css`, not per-page classes; frozen
  hover/focus/pressed states use `data-state`. Each system gives the same controls its own shape (Shōwa printed labels
  and pictogram pills, Pulp masthead blocks on 3D extrusions, issue boxes and marquee boards, Haipai Deco octagons and mahjong tiles), drawn on
  `::before`/`::after` with masks so the element itself keeps its focus ring; `Icon` draws Save/Saved/Remove/Back in the
  wrapping system's style, and new icons must stay `aria-hidden` (tests find controls by accessible name).
- `components/system/pulp/` — Pulp's drawing kit, one file per Mood Board 02 picture, inked in heavy Ink keylines and
  dot screens on worn newsprint (`press.tsx`: the `Newsprint` filter, `Screen` dot patterns, `ribbon` trails, and
  `Lettering`, masthead type extruded in 3D and fitted to a measure): `space-fleet.tsx` (26: spiral, issue box),
  `captain-aero.tsx` (25: rocket, trail), `weird-space-tales.tsx` (03: ringed planet and brand mark, saucer),
  `into-the-unknown.tsx` (29: claw, scroll), `the-mask.tsx` (08: grin, skyline, searchlights), `pow.tsx` (16: fist),
  `look.tsx` (17: balloon, the empty state's pointing hand), `ring-ring.tsx` (13: telephone, lips) and `krakoom.tsx`
  (05: blast). `cover.tsx` sets them into the `/bijou` hero, its phone banner and the THE END sign-off; `genre.tsx`
  frames one pictogram per Category as a pop-art panel; `kit.tsx` shows them all on Pulp's page. The extrusions
  (`--ds-depth`, `--ds-block`), the issue box's double rule, marquee bulbs, HELD OVER! snipe, issue-number count,
  planet radios and billing-block credits are CSS in `app/system.css`.
- `app/films.ts` — The Bijou's 25 films (one category each), Native Titles, poster paths, and poster credits.
- `app/bijou/layout.tsx` — shared layout for `/bijou` and `/bijou/saved`: themed by the selected board's Design
  System (Pulp), holds the saved-list provider, poster credits and the sign-off (Pulp's THE END). Build fails unless the film list is valid (25 films, unique ids,
  known categories, poster files present, credits filled in).
- `components/movies/` — The Bijou's wiring (filter, saved list, header links) around `components/system/`. Links between
  the `/bijou` pages must be `next/link`; a plain `<a>` reloads the page and wipes the saved list.
- `app/page.tsx` — landing page; `components/ui.tsx` — shared ButtonLink/Card pieces.
- `app/moodboards/[id]/page.tsx` — one page per board, colored by its Design System, title in the system's display font. Build fails unless each board has exactly 30 artifacts (references + originals) and every picture file is present.
- `components/artifacts/index.ts` — each board's originals, in order, as shown on its board page: the AI-generated
  `generated-*.webp` pictures (art briefs in `references/moodboard-image-prompts.json`).
- `components/artifacts/<board-id>.tsx` — earlier originals for each board (SVG components drawn by Claude in that
  board's print style, using its palette via `colors(board)`, with swatches that have since left the palette pinned in
  the file), still exported but no longer shown.
- `components/artifacts/print.tsx` — shared print toolkit: `<Print>` sheet (paper grain, ink wear, edge wobble, aging,
  fading), `Grain` paper filter, `Plate` (misregistration), `Dots`/`Hatch` screens, `Stipple` shading,
  `Fine`/`VText`/`ArcText` type helpers. The Design Systems' textures reuse it.
- `public/moodboards/<board-id>/` — the board's pictures; file names say where each came from:
  - `pinterest-NN-<title>.jpg` — Pinterest references, 640px wide, numbered in Pinterest order.
  - `generated-NN-<title>.webp` — AI-generated originals, the ones board pages show (references + these = 30).
  - `claude-NN-<title>.svg` — earlier originals created by Claude, not shown; generated by `references/export-originals.tsx`
    (don't hand-edit; edit the component and re-run `serve.sh`, which exports before building).
- `public/movies/posters/<film-id>.jpg` — 300×450 posters from Wikipedia; `public/bijou/preview.jpg` — screenshot of
  `/bijou` (1400×900 shot, saved at 1120×720) shown on the landing page.
- `tests/` — Playwright browser tests for The Bijou and the Design System pages (`playwright.config.ts`: desktop and
  phone Firefox); `layout.spec.ts` checks every page at 320/360/390px for sideways scrolling and colliding parts.
- `public/color_theme/1/` — earlier earth-tone images, currently unused.

## Workflow
All page tooling lives in `references/` — use these scripts rather than ad-hoc commands.

- **Serve:** after **every** change to the codebase, run `bash references/serve.sh`. It exports the SVG originals to files, rebuilds, and restarts
  `python3 -m http.server 8000` serving `out/`, so the user can inspect over SSH at http://localhost:8000.
  `PORT=<n>` serves on another port (with `screenshot.sh` too); browsers refuse 6665–6669, so headless Firefox can't
  shoot or test a server there.
- **Inspect:** to check the rendered page, run `bash references/screenshot.sh [path] [output.png] [width] [height]`
  (defaults: `/`, `.screenshots/<timestamp>.png`, 1400, 3000), then Read the PNG it prints. It shoots the
  live port-8000 server, so run `serve.sh` first. Screenshots are only visible to Claude, not the user.
- **Test:** `npm test` runs the browser tests against the port-8000 server, so run `serve.sh` first
  (`BASE_URL=http://localhost:PORT npm test` to target another server).
- **Inspect artifacts:** to judge original artifacts at full size, run `bash references/artifacts.sh <board-id> [start] [count]`
  (default 1, 6). It renders only the originals, 3 per row at ~580px, from a temp copy served on port 8001.
- **Palette:** when a board's pictures change, run `node references/palette.mjs` and copy its six swatches and shares
  into `app/boards.ts`; then re-map any Design System roles that used a swatch that left. `app/systems.ts` throws on an
  unknown swatch, but `components/system/texture.tsx`, `motifs.tsx`, Shōwa's kit files (`fuji.tsx`, `shiba.tsx`,
  `nouvelle.tsx`, `ramen.tsx`, `osaka.tsx`, `genre-icons.tsx`) and Pulp's (`components/system/pulp/`) read `colors(board)` keys directly, and
  `app/system.css` reads `--ds-swatch-<key>`, so grep them.

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues for `chentejung/mpcs_design_build_ship_2`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root, created only when needed. See `docs/agents/domain.md`.
