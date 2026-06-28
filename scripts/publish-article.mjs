#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DEFAULT_URL = 'http://localhost:3000/api/articles/publish'

function loadEnvFile(path) {
  let file

  try {
    file = readFileSync(path, 'utf8')
  } catch {
    return
  }

  for (const line of file.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!match) continue

    const [, key, rawValue] = match
    const value = rawValue.replace(/^["']|["']$/g, '')

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

function parseArgs(argv) {
  const result = {}

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (!arg.startsWith('--')) continue

    const key = arg.slice(2)
    const next = argv[index + 1]

    if (!next || next.startsWith('--')) {
      result[key] = true
      continue
    }

    result[key] = next
    index += 1
  }

  return result
}

async function readStdinJson() {
  if (process.stdin.isTTY) return {}

  const chunks = []
  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }

  const input = Buffer.concat(chunks).toString('utf8').trim()
  return input ? JSON.parse(input) : {}
}

function usage() {
  console.log(`Usage:
  npm run article:publish -- --title "Title" --slug "slug" --content "Full article"
  Get-Content article.json | npm run article:publish

Options:
  --title       Article title
  --slug        Article slug. Defaults to a slug made from the title.
  --content     Full article content
  --language    en, fr, or de. Defaults to en.
  --image-url   Optional article image URL
  --draft       Store with published_at = null
  --url         Connector URL. Defaults to ${DEFAULT_URL}
  --dry-run     Print the payload without publishing
`)
}

loadEnvFile(resolve(process.cwd(), '.env.local'))

const args = parseArgs(process.argv.slice(2))
const stdinPayload = await readStdinJson()

if (args.help) {
  usage()
  process.exit(0)
}

const payload = {
  ...stdinPayload,
  title: args.title ?? stdinPayload.title,
  slug: args.slug ?? stdinPayload.slug,
  content: args.content ?? stdinPayload.content,
  language: args.language ?? stdinPayload.language ?? 'en',
  imageUrl: args['image-url'] ?? stdinPayload.imageUrl,
  publishNow: args.draft ? false : stdinPayload.publishNow,
}

if (args['dry-run']) {
  console.log(JSON.stringify(payload, null, 2))
  process.exit(0)
}

const token = process.env.OLKERI_CONNECTOR_TOKEN

if (!token) {
  console.error('Missing OLKERI_CONNECTOR_TOKEN in .env.local or the shell environment.')
  process.exit(1)
}

const response = await fetch(args.url ?? process.env.OLKERI_CONNECTOR_URL ?? DEFAULT_URL, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify(payload),
})

const result = await response.json().catch(() => ({}))

if (!response.ok) {
  console.error(result.error ?? `Publish failed with HTTP ${response.status}.`)
  process.exit(1)
}

console.log(JSON.stringify(result, null, 2))
