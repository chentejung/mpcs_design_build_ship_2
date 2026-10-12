# Design Build Ship — Week 2

Landing page with three sections: mood boards, design systems, and the final site that combines the selected pair.

## Requirements
- Next.js (App Router) + Tailwind CSS v4, exported as a **static site** (`output: "export"` → `out/`).
- No database, accounts, external APIs, or data storage. Links to subpages/Pinterest/Figma are placeholders.

## Layout
- `app/boards.ts` — the three mood boards: palette (measured from the references), Pinterest references, landing tiles.
- `app/data.ts` — landing content: mood-board cards (derived from boards), design systems, final site, `selectedBoard`.
- `app/page.tsx` — landing page; `components/ui.tsx` — shared ButtonLink/Card pieces.
- `app/moodboards/[id]/page.tsx` — one page per board, themed by its palette. Build fails unless each board has exactly 30 artifacts (references + originals).
- `components/artifacts/<board-id>.tsx` — original SVG artifacts for each board, drawn in that board's print style
  using only its palette via `colors(board)`.
- `components/artifacts/print.tsx` — shared print toolkit: `<Print>` sheet (paper grain, ink wear, edge wobble, aging,
  fading), `Plate` (misregistration), `Dots`/`Hatch` screens, `Stipple` shading, `Fine`/`VText`/`ArcText` type helpers.
- `public/moodboards/<board-id>/ref-NN.jpg` — reference images, 640px wide, numbered in Pinterest order.
- `public/color_theme/1/` — earlier earth-tone images, currently unused.

## Workflow
All page tooling lives in `references/` — use these scripts rather than ad-hoc commands.

- **Serve:** after **every** change to the codebase, run `bash references/serve.sh`. It rebuilds and restarts
  `python3 -m http.server 8000` serving `out/`, so the user can inspect over SSH at http://localhost:8000.
- **Inspect:** to check the rendered page, run `bash references/screenshot.sh [path] [output.png] [width] [height]`
  (defaults: `/`, `.screenshots/<timestamp>.png`, 1400, 3000), then Read the PNG it prints. It shoots the
  live port-8000 server, so run `serve.sh` first. Screenshots are only visible to Claude, not the user.
- **Inspect artifacts:** to judge original artifacts at full size, run `bash references/artifacts.sh <board-id> [start] [count]`
  (default 1, 6). It renders only the originals, 3 per row at ~580px, from a temp copy served on port 8001.
