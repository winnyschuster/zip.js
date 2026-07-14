#!/usr/bin/env bash
# Scan a minified bundle for size regressions and minification waste.
#
# Usage: ./scan-bundle.sh [bundle.js]   (default: ../index.min.js)
#
# Reports, for the target bundle:
#   - raw / gzip / brotli sizes of every dist artifact
#   - embedded payload lines (wasm data URI, inline worker code)
#   - most frequent property accesses surviving minification, with byte cost
#   - repeated string literals (candidates for const hoisting)
#   - duplicated pretty-printed lines (candidates for source-level dedup)
#
# Requires: deno (pretty-printing), gzip. Uses brotli when available.

set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${1:-$ROOT/index.min.js}"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

echo "== Artifact sizes (raw / gzip$(command -v brotli > /dev/null && echo " / brotli")) =="
for file in "$ROOT"/index*.min.js "$ROOT"/dist/*.min.js "$ROOT"/dist/*.wasm; do
	raw=$(wc -c < "$file" | tr -d " ")
	gz=$(gzip -9 -c "$file" | wc -c | tr -d " ")
	if command -v brotli > /dev/null; then
		br=$(brotli -q 11 -c "$file" | wc -c | tr -d " ")
		printf "%-32s %8d %8d %8d\n" "$(basename "$file")" "$raw" "$gz" "$br"
	else
		printf "%-32s %8d %8d\n" "$(basename "$file")" "$raw" "$gz"
	fi
done

echo
echo "== Target: $TARGET =="
cp "$TARGET" "$WORKDIR/bundle.js"
deno fmt --line-width 120 "$WORKDIR/bundle.js" > /dev/null 2>&1
echo "pretty-printed lines: $(wc -l < "$WORKDIR/bundle.js" | tr -d " ")"

echo
echo "== Embedded payload lines (> 2000 chars) =="
awk '{ if (length($0) > 2000) printf "line %d: %d chars\n", NR, length($0) }' "$WORKDIR/bundle.js"
awk 'length($0) <= 2000' "$WORKDIR/bundle.js" > "$WORKDIR/live.js"

echo
echo "== Top property accesses (count x name = raw bytes; built-ins included) =="
grep -oE '\.[a-zA-Z_$][a-zA-Z0-9_$]{3,}' "$WORKDIR/live.js" | sort | uniq -c | sort -rn | head -30 |
	awk '{ printf "%6dx %-32s ~%d bytes\n", $1, $2, $1 * (length($2) - 2) }'

echo
echo "== Repeated string literals (>= 8 chars, >= 3 occurrences) =="
grep -oE '"[^"\\]{8,60}"' "$WORKDIR/live.js" | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -20

echo
echo "== Duplicated lines (>= 30 chars, >= 3 occurrences) =="
sed 's/^[[:space:]]*//' "$WORKDIR/live.js" | awk 'length($0) >= 30' | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -20
