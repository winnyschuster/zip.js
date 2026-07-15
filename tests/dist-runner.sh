#!/usr/bin/env bash
# Run a test suite against the built index.min.js instead of the lib/ sources.
#
# Usage: ./tests/dist-runner.sh [deno|node|bun]

set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RUNNER="${1:-deno}"
trap 'git -C "$ROOT" checkout --quiet -- tests/zip-lib.js' EXIT
echo 'export * from "../index.min.js";' > "$ROOT/tests/zip-lib.js"
npm --prefix "$ROOT" run "test-$RUNNER"
