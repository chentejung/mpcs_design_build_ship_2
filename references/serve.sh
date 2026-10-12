#!/usr/bin/env bash
# Rebuild the static site and (re)start the preview server on port 8000.
# Usage: bash references/serve.sh   (or: npm run serve)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8000
cd "$ROOT"

echo "==> Building static export into out/"
npx next build

echo "==> Stopping any existing server on port $PORT"
# Kill by listening PID (not `pkill -f`, which can match unrelated command lines).
for pid in $(ss -ltnpH "sport = :$PORT" | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u); do
  kill "$pid" 2>/dev/null || true
done
for _ in $(seq 20); do
  ss -ltn "sport = :$PORT" | grep -q LISTEN || break
  sleep 0.25
done

echo "==> Serving out/ at http://localhost:$PORT"
cd out
nohup python3 -m http.server "$PORT" > "$ROOT/.server.log" 2>&1 &
disown
sleep 1
curl -sf -o /dev/null "http://localhost:$PORT/" && echo "==> Server is up (pid $!). Log: .server.log"
