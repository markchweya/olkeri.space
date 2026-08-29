#!/usr/bin/env node
// Remove published articles from the database by slug.
//
// Usage:
//   DATABASE_URL=... node scripts/delete-articles.mjs --slugs a,b,c
//   DATABASE_URL=... node scripts/delete-articles.mjs --file slugs.txt
//   DATABASE_URL=... node scripts/delete-articles.mjs --slugs a,b --language en
//
// Add --dry-run to list what would be removed without deleting.
// Deletion is permanent; the article content remains in content/*.json
// so anything removed here can be republished from that batch file.

import { readFile } from 'node:fs/promises'

import { Client } from 'pg'

const args = process.argv.slice(2)

function option(name) {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? undefined : args[index + 1]
}

const dryRun = args.includes('--dry-run')
const language = option('language')
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('DATABASE_URL is not set.')
  process.exit(1)
}

let slugs = []

const slugList = option('slugs')
const slugFile = option('file')

if (slugList) {
  slugs = slugList.split(',').map(slug => slug.trim()).filter(Boolean)
} else if (slugFile) {
  const contents = await readFile(slugFile, 'utf8')
  slugs = contents.split(/\r?\n/).map(line => line.trim()).filter(Boolean)
} else {
  console.error('Provide --slugs a,b,c or --file slugs.txt')
  process.exit(1)
}

if (slugs.length === 0) {
  console.error('No slugs provided.')
  process.exit(1)
}

const client = new Client({
  connectionString,
  ssl: process.env.DATABASE_SSL === 'disable' ? undefined : { rejectUnauthorized: false },
})

await client.connect()

const where = language
  ? 'where slug = any($1) and language = $2'
  : 'where slug = any($1)'
const params = language ? [slugs, language] : [slugs]

const { rows: matches } = await client.query(
  `select slug, language, title from articles ${where} order by language, slug`,
  params
)

console.log(`${slugs.length} slug(s) requested, ${matches.length} matching article(s) found.`)

for (const row of matches) {
  console.log(`  [${row.language}] ${row.slug}  ${row.title.slice(0, 60)}`)
}

if (dryRun) {
  console.log('\nDry run: nothing deleted.')
} else if (matches.length > 0) {
  const { rowCount } = await client.query(`delete from articles ${where}`, params)
  console.log(`\nDeleted ${rowCount} article(s).`)
} else {
  console.log('\nNothing to delete.')
}

await client.end()
