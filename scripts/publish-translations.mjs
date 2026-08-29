#!/usr/bin/env node
// Attach French / German / Spanish editions to articles already published on
// olkeri.space.
//
// Usage:
//   OLKERI_CONNECTOR_TOKEN=... node scripts/publish-translations.mjs batch.json
//
// Options:
//   --site https://www.olkeri.space   target site (default)
//   --dry-run                         validate and print, publish nothing
//   --start N / --limit N             publish a slice of the file
//   --delay MS                        pause between requests (default 400ms)
//
// The input file is a JSON array of one entry per source article:
//   {
//     "sourceSlug": "english-article-slug",
//     "sourceLanguage": "en",            // optional, defaults to "en"
//     "translations": [
//       { "language": "fr", "title": "...", "slug": "...",
//         "summary": "...", "content": "..." },
//       ...
//     ]
//   }
//
// Imagery, credits, taxonomy, byline and publication date are inherited from
// the source article by the API, so they are not repeated here. Publishing is
// idempotent: the endpoint upserts on (language, slug).

import { readFile } from 'node:fs/promises'

const args = process.argv.slice(2)
const file = args.find(arg => !arg.startsWith('--'))

function option(name, fallback) {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? fallback : args[index + 1]
}

const site = (option('site', 'https://www.olkeri.space') ?? '').replace(/\/$/, '')
const dryRun = args.includes('--dry-run')
const start = Number.parseInt(option('start', '0'), 10)
const limit = Number.parseInt(option('limit', '0'), 10)
const delay = Number.parseInt(option('delay', '400'), 10)
const token = process.env.OLKERI_CONNECTOR_TOKEN

if (!file) {
  console.error('Usage: node scripts/publish-translations.mjs <batch.json> [--dry-run]')
  process.exit(1)
}

if (!token && !dryRun) {
  console.error('OLKERI_CONNECTOR_TOKEN is not set.')
  process.exit(1)
}

const all = JSON.parse(await readFile(file, 'utf8'))
const batch = all.slice(start, limit > 0 ? start + limit : undefined)

const problems = []

for (const [index, entry] of batch.entries()) {
  if (!entry.sourceSlug) {
    problems.push(`entry ${index}: missing sourceSlug`)
    continue
  }

  if (!Array.isArray(entry.translations) || entry.translations.length === 0) {
    problems.push(`${entry.sourceSlug}: no translations`)
    continue
  }

  for (const translation of entry.translations) {
    for (const key of ['language', 'title', 'content']) {
      if (!translation[key]) {
        problems.push(`${entry.sourceSlug} (${translation.language ?? '?'}): missing ${key}`)
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`${problems.length} invalid entr(ies):`)
  for (const problem of problems.slice(0, 20)) console.error(`  ${problem}`)
  process.exit(1)
}

// Words that are only ever correct with a diacritic. An unaccented spelling is
// either a different word or not a word at all, so it is always a mistake —
// unlike "de" or "el", which are valid both ways and cannot be checked here.
const MISSPELLINGS = {
  fr: {
    modele: 'modèle',
    donnees: 'données',
    systeme: 'système',
    apres: 'après',
    tres: 'très',
    deja: 'déjà',
    meme: 'même',
    etre: 'être',
    entrainement: 'entraînement',
    developpement: 'développement',
    securite: 'sécurité',
    societe: 'société',
    economie: 'économie',
    strategie: 'stratégie',
    energie: 'énergie',
    reseau: 'réseau',
  },
  de: {
    fur: 'für',
    uber: 'über',
    konnen: 'können',
    grosste: 'größte',
    Grosse: 'Größe',
    zunachst: 'zunächst',
    wahrend: 'während',
    naechste: 'nächste',
    Unternehmern: 'Unternehmen',
    Massnahmen: 'Maßnahmen',
    Behorde: 'Behörde',
    Marktfuhrer: 'Marktführer',
    europaische: 'europäische',
    zusatzlich: 'zusätzlich',
    Erklarung: 'Erklärung',
  },
  es: {
    ano: 'año',
    anos: 'años',
    pequeno: 'pequeño',
    pequena: 'pequeña',
    diseno: 'diseño',
    disenar: 'diseñar',
    disenado: 'diseñado',
    disenada: 'diseñada',
    disenadas: 'diseñadas',
    disenados: 'diseñados',
    disenan: 'diseñan',
    disenaron: 'diseñaron',
    senal: 'señal',
    senales: 'señales',
    companias: 'compañías',
    compania: 'compañía',
    ensena: 'enseña',
    manana: 'mañana',
    espanol: 'español',
    Espana: 'España',
    tecnologia: 'tecnología',
    articulo: 'artículo',
    articulos: 'artículos',
    politica: 'política',
    economia: 'economía',
    energia: 'energía',
    tambien: 'también',
    segun: 'según',
    millon: 'millón',
    ademas: 'además',
    despues: 'después',
    asi: 'así',
    mas: 'más',
  },
}

const misspelt = []

for (const entry of batch) {
  for (const translation of entry.translations) {
    const table = MISSPELLINGS[translation.language]

    if (!table) continue

    const text = `${translation.title} ${translation.summary ?? ''} ${translation.content}`
    const found = new Set()

    for (const [wrong, right] of Object.entries(table)) {
      // \b is ASCII-only in JavaScript, so it would find "tres" inside
      // "paramètres". Use Unicode letter look-arounds instead.
      const boundary = new RegExp(`(?<!\\p{L})${wrong}(?!\\p{L})`, 'u')

      if (boundary.test(text)) found.add(`${wrong} -> ${right}`)
    }

    if (found.size > 0) {
      misspelt.push(`${entry.sourceSlug} (${translation.language}): ${[...found].join(', ')}`)
    }
  }
}

if (misspelt.length > 0) {
  console.error(`${misspelt.length} translation(s) are missing diacritics:`)
  for (const problem of misspelt.slice(0, 30)) console.error(`  ${problem}`)
  process.exit(1)
}

const editions = batch.reduce((total, entry) => total + entry.translations.length, 0)

console.log(
  `${dryRun ? 'Validating' : 'Publishing'} ${editions} translation(s) for ` +
    `${batch.length} article(s) -> ${site}`
)

const failures = []
let done = 0
let target = site

// A redirect between hosts (olkeri.space -> www.olkeri.space) makes fetch drop
// the Authorization header, which the API then reports as a 401. Post with
// redirects disabled and re-target the canonical origin instead.
async function post(entry) {
  const response = await fetch(`${target}/api/articles/translate`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  })

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')

    if (!location) return response

    const redirected = new URL(location, `${target}/`).origin

    if (redirected === target) return response

    console.log(`  redirected to ${redirected}, retrying there`)
    target = redirected

    return post(entry)
  }

  return response
}

for (const [index, entry] of batch.entries()) {
  const langs = entry.translations.map(translation => translation.language).join('/')
  const label = `[${index + 1}/${batch.length}] ${entry.sourceSlug} (${langs})`

  if (dryRun) {
    const words = entry.translations
      .map(translation => translation.content.split(/\s+/).length)
      .join('/')
    console.log(`${label}  ok (${words} words)`)
    done += 1
    continue
  }

  try {
    const response = await post(entry)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error(`${label}  FAILED ${response.status}: ${data.error ?? ''}`)
      failures.push({ slug: entry.sourceSlug, status: response.status, error: data.error })
    } else {
      console.log(`${label}  published ${(data.paths ?? []).join(' ')}`)
      done += 1
    }
  } catch (error) {
    console.error(`${label}  ERROR: ${error.message}`)
    failures.push({ slug: entry.sourceSlug, error: error.message })
  }

  if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay))
}

console.log(`\nDone: ${done} succeeded, ${failures.length} failed.`)

if (failures.length > 0) {
  console.log('Failed slugs:', failures.map(failure => failure.slug).join(', '))
  process.exit(1)
}
