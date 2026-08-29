import { NextResponse } from 'next/server'
import { z } from 'zod'

import { isConnectorAuthorized } from '@/lib/connector-auth'
import { publishTranslationGroup, translationGroupSchema } from '@/lib/publish-translations'

export const runtime = 'nodejs'

/**
 * Machine entry point for attaching translations to a published article.
 *
 * The work itself lives in `publishTranslationGroup`, which the admin importer
 * also calls, so browser and connector publishing behave identically.
 */
export async function POST(request: Request) {
  if (!process.env.OLKERI_CONNECTOR_TOKEN) {
    return NextResponse.json(
      { error: 'Connector server environment is not configured.' },
      { status: 500 }
    )
  }

  if (!isConnectorAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const parsed = translationGroupSchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request body.', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  const result = await publishTranslationGroup(parsed.data)

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({
    source: result.source,
    translationGroupId: result.translationGroupId,
    articles: result.articles,
    paths: result.articles.map(article => `/${article.language}/${article.slug}`),
  })
}
