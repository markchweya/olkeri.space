#!/usr/bin/env node
// Apply db/schema.sql to the database in DATABASE_URL.
// Safe to run repeatedly: every statement is CREATE ... IF NOT EXISTS
// or an idempotent replace.
//
// Usage:
//   DATABASE_URL="postgresql://..." npm run db:setup
// or pass it directly:
//   npm run db:setup -- "postgresql://..."

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { Client } from 'pg'

const connectionString = process.argv[2] || process.env.DATABASE_URL

if (!connectionString) {
  console.error('Set DATABASE_URL, or pass the connection string as an argument.')
  console.error('Example: npm run db:setup -- "postgresql://user:pass@host/db"')
  process.exit(1)
}

const schemaPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'db', 'schema.sql')
const schema = await readFile(schemaPath, 'utf8')

const client = new Client({
  connectionString,
  ssl: process.env.DATABASE_SSL === 'disable' ? undefined : { rejectUnauthorized: false },
})

try {
  await client.connect()
  console.log('Connected. Applying db/schema.sql...')

  await client.query(schema)

  const { rows } = await client.query(
    "select count(*)::int as count from information_schema.columns where table_name = 'articles'"
  )
  const { rows: articles } = await client.query('select count(*)::int as count from articles')

  console.log(`Schema applied: articles table has ${rows[0].count} columns.`)
  console.log(`Articles currently stored: ${articles[0].count}`)
} catch (error) {
  console.error('Failed:', error.message)
  process.exitCode = 1
} finally {
  await client.end().catch(() => undefined)
}
