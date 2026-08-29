#!/usr/bin/env node
// Publish a batch of prepared articles to olkeri.space.
//
// Usage:
//   OLKERI_CONNECTOR_TOKEN=... node scripts/publish-batch.mjs articles.json
//
// Options:
//   --site https://olkeri.space   target site (default)
//   --dry-run                     validate and print, publish nothing
//   --start N / --limit N         publish a slice of the file
//   --delay MS                    pause between requests (default 400ms)
//
// The input file is a JSON array of publish payloads:
//   { title, slug, content, language, summary, category, region, tags,
//     sourceName?, sourceUrl?, imageUrl?, imageCredit?, translations?[] }
//
// Publishing is idempotent: the endpoint upserts on (language, slug), so a
// re-run updates rather than duplicating.

import { readFile } from 'node:fs/promises'

const args = process.argv.slice(2)
const file = args.find(arg => !arg.startsWith('--'))

function option(name, fallback) {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? fallback : args[index + 1]
}

const site = (option('site', 'https://olkeri.space') ?? '').replace(/\/$/, '')
const dryRun = args.includes('--dry-run')
const start = Number.parseInt(option('start', '0'), 10)
const limit = Number.parseInt(option('limit', '0'), 10)
const delay = Number.parseInt(option('delay', '400'), 10)
const token = process.env.OLKERI_CONNECTOR_TOKEN

if (!file) {
  console.error('Usage: node scripts/publish-batch.mjs <articles.json> [--dry-run]')
  process.exit(1)
}

if (!token && !dryRun) {
  console.error('OLKERI_CONNECTOR_TOKEN is not set.')
  process.exit(1)
}

const all = JSON.parse(await readFile(file, 'utf8'))
const batch = all.slice(start, limit > 0 ? start + limit : undefined)

const required = ['title', 'slug', 'content', 'language']
const invalid = batch.filter(article => required.some(key => !article[key]))

if (invalid.length > 0) {
  console.error(`${invalid.length} payload(s) missing required fields, e.g.:`)
  console.error(JSON.stringify(invalid[0], null, 1).slice(0, 400))
  process.exit(1)
}

console.log(
  `${dryRun ? 'Validating' : 'Publishing'} ${batch.length} article(s) -> ${site}`
)

const failures = []
let published = 0
let target = site

// A redirect between hosts (olkeri.space -> www.olkeri.space) makes fetch
// drop the Authorization header, which the API then reports as a 401. Post
// with redirects disabled and re-target the canonical origin instead.
async function post(article) {
  const response = await fetch(`${target}/api/articles/publish`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')

    if (!location) return response

    const redirected = new URL(location, `${target}/`).origin

    if (redirected === target) return response

    console.log(`  redirected to ${redirected}, retrying there`)
    target = redirected

    return post(article)
  }

  return response
}

for (const [index, article] of batch.entries()) {
  const label = `[${index + 1}/${batch.length}] ${article.slug}`

  if (dryRun) {
    console.log(`${label}  ok (${article.content.split(/\s+/).length} words)`)
    published += 1
    continue
  }

  try {
    const response = await post(article)

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error(`${label}  FAILED ${response.status}: ${data.error ?? ''}`)
      failures.push({ slug: article.slug, status: response.status, error: data.error })
    } else {
      console.log(`${label}  published ${(data.paths ?? [data.path]).join(' ')}`)
      published += 1
    }
  } catch (error) {
    console.error(`${label}  ERROR: ${error.message}`)
    failures.push({ slug: article.slug, error: error.message })
  }

  if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay))
}

console.log(`\nDone: ${published} succeeded, ${failures.length} failed.`)

if (failures.length > 0) {
  console.log('Failed slugs:', failures.map(failure => failure.slug).join(', '))
  process.exit(1)
}
