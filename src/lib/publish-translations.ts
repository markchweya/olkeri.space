import { randomUUID } from 'node:crypto'

import { z } from 'zod'

import { createSlug } from '@/lib/articles'
import { dbQuery } from '@/lib/db'

export const languageEnum = z.enum(['en', 'fr', 'de', 'es'])

export const translationSchema = z.object({
  language: languageEnum,
  title: z.string().trim().min(1).max(300),
  slug: z.string().trim().max(300).optional(),
  content: z.string().trim().min(1).max(50_000),
  summary: z.string().trim().max(500).optional(),
})

export const translationGroupSchema = z.object({
  sourceLanguage: languageEnum.default('en'),
  sourceSlug: z.string().trim().min(1).max(300),
  translations: z.array(translationSchema).min(1).max(3),
})

export type TranslationGroupInput = z.infer<typeof translationGroupSchema>

type SourceArticle = {
  id: string
  slug: string
  language: string
  category: string | null
  region: string | null
  tags: string[] | null
  source_name: string | null
  source_url: string | null
  image_url: string | null
  image_credit: string | null
  author: string | null
  translation_group_id: string | null
  published_at: string | null
}

export type PublishedTranslation = { slug: string; language: string }

export type TranslationGroupResult =
  | {
      ok: true
      source: { language: string; slug: string }
      translationGroupId: string
      articles: PublishedTranslation[]
    }
  | { ok: false; error: string; status: number }

/**
 * Attaches translations to an article that is already published.
 *
 * Unlike publishing, this never rewrites the source row's content or
 * `published_at`, so adding a French edition months later does not bump the
 * original story back to the top of the feed. Everything that is not language
 * specific — imagery, credits, taxonomy, byline, publication date — is
 * inherited from the source article so each translation stays in sync with it.
 *
 * Shared by the connector endpoint and the admin importer so the two cannot
 * drift apart.
 */
export async function publishTranslationGroup(
  input: TranslationGroupInput
): Promise<TranslationGroupResult> {
  const { sourceLanguage, sourceSlug, translations } = input
  const languages = new Set(translations.map(translation => translation.language))

  if (languages.size !== translations.length) {
    return {
      ok: false,
      status: 400,
      error: 'Each language can only appear once per request.',
    }
  }

  if (languages.has(sourceLanguage)) {
    return {
      ok: false,
      status: 400,
      error: 'A translation cannot use the source language.',
    }
  }

  const sourceRows = await dbQuery<SourceArticle>(
    `select id, slug, language, category, region, tags, source_name, source_url,
            image_url, image_credit, author, translation_group_id, published_at
     from articles
     where language = $1 and slug = $2`,
    [sourceLanguage, createSlug(sourceSlug)]
  )

  if (!sourceRows) {
    return { ok: false, status: 500, error: 'Database is not configured.' }
  }

  const source = sourceRows[0]

  if (!source) {
    return {
      ok: false,
      status: 404,
      error: `No ${sourceLanguage} article found for slug "${sourceSlug}".`,
    }
  }

  let translationGroupId = source.translation_group_id

  if (!translationGroupId) {
    translationGroupId = randomUUID()

    const updated = await dbQuery(
      `update articles set translation_group_id = $1 where id = $2 returning id`,
      [translationGroupId, source.id]
    )

    if (!updated || updated.length === 0) {
      return {
        ok: false,
        status: 500,
        error: 'Could not link the source article to a translation group.',
      }
    }
  }

  const published: PublishedTranslation[] = []

  for (const translation of translations) {
    const slug = createSlug(translation.slug || translation.title)

    if (!slug) {
      return {
        ok: false,
        status: 400,
        error: `Could not derive a slug for the ${translation.language} edition.`,
      }
    }

    const rows = await dbQuery<PublishedTranslation>(
      `insert into articles (
         title, slug, content, language, summary, category, region, tags,
         source_name, source_url, image_url, image_credit, author,
         translation_group_id, published_at
       ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       on conflict (language, slug) do update set
         title = excluded.title,
         content = excluded.content,
         summary = excluded.summary,
         category = excluded.category,
         region = excluded.region,
         tags = excluded.tags,
         source_name = excluded.source_name,
         source_url = excluded.source_url,
         image_url = excluded.image_url,
         image_credit = excluded.image_credit,
         author = excluded.author,
         translation_group_id = excluded.translation_group_id,
         published_at = excluded.published_at
       returning slug, language`,
      [
        translation.title,
        slug,
        translation.content,
        translation.language,
        translation.summary ?? null,
        source.category,
        source.region,
        source.tags,
        source.source_name,
        source.source_url,
        source.image_url,
        source.image_credit,
        source.author,
        translationGroupId,
        source.published_at,
      ]
    )

    if (!rows || rows.length === 0) {
      return {
        ok: false,
        status: 500,
        error: `Could not save the ${translation.language} edition.`,
      }
    }

    published.push(rows[0])
  }

  return {
    ok: true,
    source: { language: source.language, slug: source.slug },
    translationGroupId,
    articles: published,
  }
}
