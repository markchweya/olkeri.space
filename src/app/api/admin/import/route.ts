import { NextResponse } from 'next/server'
import { z } from 'zod'

import { adminArticleSchema, toArticleRow } from '@/lib/admin-articles'
import { isAdminAuthenticated } from '@/lib/auth'
import { dbQuery } from '@/lib/db'
import { publishTranslationGroup, translationGroupSchema } from '@/lib/publish-translations'

export const runtime = 'nodejs'

const bodySchema = z
  .object({
    articles: z.array(adminArticleSchema).max(100).optional(),
    translations: z.array(translationGroupSchema).max(100).optional(),
  })
  .refine(
    body => (body.articles?.length ?? 0) + (body.translations?.length ?? 0) > 0,
    { message: 'Provide at least one article or translation group.' }
  )

type ImportResult = {
  label: string
  published: string[]
  error?: string
}

/**
 * Bulk publishing straight from the browser.
 *
 * This exists so content never has to travel through the repository. Committing
 * articles to git meant every story triggered a full site rebuild, which is both
 * wasteful and the wrong source of truth: the database is. Paste a batch here
 * and it goes to the database directly, no deploy involved.
 *
 * Accepts either shape, or both at once:
 *   { "articles":     [ { title, content, language, ... } ] }
 *   { "translations": [ { sourceSlug, translations: [ ... ] } ] }
 *
 * Partial success is normal and reported per entry: one bad row does not
 * discard the rest of the batch.
 */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid import batch.', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  const results: ImportResult[] = []

  for (const [index, article] of (parsed.data.articles ?? []).entries()) {
    const label = article.title || `article ${index + 1}`
    const row = toArticleRow(article)

    if (!row) {
      results.push({ label, published: [], error: 'Could not derive a slug.' })
      continue
    }

    const rows = await dbQuery<{ slug: string; language: string }>(
      `insert into articles (
         title, slug, content, language, summary, category, region, tags,
         source_name, source_url, image_url, image_credit, author, published_at
       ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       on conflict (language, slug) do update set
         title = excluded.title,
         content = excluded.content,
         summary = excluded.summary,
         category = excluded.category,
         region = excluded.region,
         source_name = excluded.source_name,
         source_url = excluded.source_url,
         image_url = excluded.image_url,
         image_credit = excluded.image_credit,
         author = coalesce(excluded.author, articles.author),
         tags = coalesce(excluded.tags, articles.tags)
       returning slug, language`,
      [
        row.title,
        row.slug,
        row.content,
        row.language,
        row.summary,
        row.category,
        row.region,
        row.tags,
        row.source_name,
        row.source_url,
        row.image_url,
        row.image_credit,
        row.author,
        article.publishNow === false ? null : new Date().toISOString(),
      ]
    )

    if (!rows || rows.length === 0) {
      results.push({ label, published: [], error: 'Could not save the article.' })
      continue
    }

    results.push({
      label,
      published: rows.map(saved => `/${saved.language}/${saved.slug}`),
    })
  }

  for (const [index, group] of (parsed.data.translations ?? []).entries()) {
    const label = group.sourceSlug || `translation group ${index + 1}`
    const result = await publishTranslationGroup(group)

    if (!result.ok) {
      results.push({ label, published: [], error: result.error })
      continue
    }

    results.push({
      label,
      published: result.articles.map(article => `/${article.language}/${article.slug}`),
    })
  }

  const failed = results.filter(result => result.error)

  return NextResponse.json({
    results,
    published: results.reduce((total, result) => total + result.published.length, 0),
    succeeded: results.length - failed.length,
    failed: failed.length,
  })
}
