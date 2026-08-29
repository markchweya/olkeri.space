import { z } from 'zod'

import { createSlug } from '@/lib/articles'

export const adminArticleSchema = z.object({
  title: z.string().trim().min(1).max(300),
  slug: z.string().trim().max(300).optional(),
  content: z.string().trim().min(1).max(50_000),
  language: z.enum(['en', 'fr', 'de', 'es']),
  summary: z.string().trim().max(500).optional(),
  category: z.string().trim().max(50).optional(),
  region: z.string().trim().max(50).optional(),
  sourceName: z.string().trim().max(200).optional(),
  sourceUrl: z.union([z.url().max(2000), z.literal('')]).optional(),
  imageUrl: z.union([z.url().max(2000), z.literal('')]).optional(),
  imageCredit: z.string().trim().max(200).optional(),
  author: z.string().trim().max(120).optional(),
  publishNow: z.boolean().optional(),
})

export type AdminArticleInput = z.infer<typeof adminArticleSchema>

export function toArticleRow(input: AdminArticleInput) {
  const slug = createSlug(input.slug || input.title)

  if (!slug) return null

  return {
    title: input.title,
    slug,
    content: input.content,
    language: input.language,
    summary: input.summary || null,
    category: input.category?.toLowerCase() || null,
    region: input.region?.toLowerCase() || null,
    source_name: input.sourceName || null,
    source_url: input.sourceUrl || null,
    image_url: input.imageUrl || null,
    image_credit: input.imageCredit || null,
    author: input.author || null,
  }
}
