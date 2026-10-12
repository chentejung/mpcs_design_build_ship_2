#!/usr/bin/env bash
# Close-up inspection of a board's ORIGINAL artifacts (references are skipped), 3 per row at ~580px.
# Usage: bash references/artifacts.sh <board-id> [start=1] [count=6] [output.png]
# Uses the current build in out/ (run serve.sh first). A temporary copy is served on port 8001
# so fonts load same-origin; the user's preview on port 8000 is untouched.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BOARD="${1:?board id, e.g. japanese-retro}"
START="${2:-1}"
COUNT="${3:-6}"
OUT="${4:-$ROOT/.screenshots/$BOARD-originals-$START.png}"
PORT=8001
INSPECT="$ROOT/.inspect"

[ -f "$ROOT/out/moodboards/$BOARD/index.html" ] || { echo "No build for $BOARD. Run: bash references/serve.sh" >&2; exit 1; }
rm -rf "$INSPECT" && cp -r "$ROOT/out" "$INSPECT"

python3 - "$INSPECT/moodboards/$BOARD/index.html" "$INSPECT/inspect.html" "$START" "$COUNT" <<'PY'
import re, sys
src, dst, start, count = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
html = open(src, encoding="utf-8").read()
html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)  # static markup only
figures = [f for f in re.findall(r"<figure\b.*?</figure>", html, flags=re.S) if "<img" not in f]
pick = figures[start - 1 : start - 1 + count]
head = html[: html.index("<body")]
body = ('<body style="margin:0;padding:16px;background:#777">'
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:start">'
        + "".join(pick) + "</div></body></html>")
open(dst, "w", encoding="utf-8").write(head + body)
print(f"{len(pick)} of {len(figures)} originals", file=sys.stderr)
PY

ROWS=$(( (COUNT + 2) / 3 ))
mkdir -p "$(dirname "$OUT")"
OUT="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
(cd "$INSPECT" && exec python3 -m http.server "$PORT" >/dev/null 2>&1) &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 20); do curl -sf -o /dev/null "http://localhost:$PORT/inspect.html" && break; sleep 0.25; done
timeout 90 firefox --headless --window-size="1800,$(( ROWS * 900 + 40 ))" \
  --screenshot "$OUT" "http://localhost:$PORT/inspect.html" >/dev/null 2>&1 || true
[ -s "$OUT" ] || { echo "Screenshot failed" >&2; exit 1; }
echo "$OUT"
