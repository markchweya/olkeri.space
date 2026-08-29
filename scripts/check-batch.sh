#!/usr/bin/env bash
# Repair Spanish tildes, then gate on the full validation.
# Exits non-zero if any batch fails, so it can guard a commit.
set -euo pipefail
python3 scripts/fix-spanish-tildes.py "$@"
for file in "$@"; do
  node scripts/publish-translations.mjs "$file" --dry-run
done
