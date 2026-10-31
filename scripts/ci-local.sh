#!/usr/bin/env bash
# Local CI for portfolio-template — no workflow scope / extra tokens.
set -euo pipefail
cd "$(dirname "$0")/.."
npm ci
npm run data:validate
npm run typecheck
npm run lint
npm run build
echo "template ci-local: ok"
