#!/usr/bin/env bash
# Capture a full-page screenshot of the running preview server for inspection.
# Usage: bash references/screenshot.sh [path] [output.png] [width] [height]
#   path    URL path to capture (default: /)
#   output  PNG destination (default: .screenshots/<timestamp>.png)
#   width   viewport width (default: 1400); height: capture height (default: 3000)
# Requires the server from references/serve.sh to be running on port 8000 (or on $PORT, if set).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-8000}"
URL_PATH="${1:-/}"
OUT="${2:-$ROOT/.screenshots/$(date +%Y%m%d-%H%M%S).png}"
WIDTH="${3:-1400}"
HEIGHT="${4:-3000}"

if ! curl -sf -o /dev/null "http://localhost:$PORT/"; then
  echo "No server on port $PORT. Run: bash references/serve.sh" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
# Firefox resolves relative paths against its own cwd, so pass an absolute one.
OUT="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
timeout 60 firefox --headless --window-size="$WIDTH,$HEIGHT" \
  --screenshot "$OUT" "http://localhost:$PORT$URL_PATH" >/dev/null 2>&1 || true

[ -s "$OUT" ] || { echo "Screenshot failed" >&2; exit 1; }
echo "$OUT"
