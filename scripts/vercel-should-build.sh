#!/usr/bin/env bash
# Vercel "Ignored Build Step".
#
# Exit 1 => build. Exit 0 => skip. (Vercel's contract, and yes it reads backwards.)
#
# The site's content lives in the database, not in this repository, so a commit
# that only touches content, one-off scripts or CI config cannot change what the
# deployed site renders. Building for those wasted deployments and once exhausted
# the daily quota, taking real code changes down with it.
#
# This defaults to BUILDING. It only skips when it is certain every changed path
# is content-only, so the failure mode is a harmless extra build rather than a
# code change that silently never ships.
set -uo pipefail

# Paths that cannot affect the built site.
CONTENT_ONLY='^(translations/|content/|scripts/|\.github/|docs/|README\.md$|\.gitignore$)'

base="${VERCEL_GIT_PREVIOUS_SHA:-}"

if [ -z "$base" ]; then
  # First build of a branch, or Vercel did not supply the previous SHA.
  if git rev-parse --verify --quiet HEAD^ >/dev/null 2>&1; then
    base="HEAD^"
  else
    echo "No previous commit to compare against — building."
    exit 1
  fi
fi

if ! changed=$(git diff --name-only "$base" HEAD 2>/dev/null); then
  # A shallow clone may not contain the base object.
  echo "Could not diff against $base — building."
  exit 1
fi

if [ -z "$changed" ]; then
  echo "No file changes — skipping build."
  exit 0
fi

if printf '%s\n' "$changed" | grep -qvE "$CONTENT_ONLY"; then
  echo "Code changed — building:"
  printf '%s\n' "$changed" | grep -vE "$CONTENT_ONLY" | head -20
  exit 1
fi

echo "Content-only change — skipping build:"
printf '%s\n' "$changed" | head -20
exit 0
