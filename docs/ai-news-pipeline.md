# Olkeri AI News pipeline

Olkeri (olkeri.space) is a multilingual AI-news publication. Every story is
published in English, French and German, linked together by a shared
`translation_group_id`.

## How stories get published

A scheduled Claude session (a claude.ai/code Routine) runs several times a day.
Each run:

1. **Gathers candidates** — fetches AI-news RSS feeds and searches the web for
   AI stories published since the last run, from every region (Americas,
   Europe, Asia, Africa, Middle East, Oceania).
2. **Dedupes** — reads the most recent published slugs/titles/sources from the
   public Supabase REST API and skips stories already covered.
3. **Writes** — for each selected story, writes an **original** English news
   article (never copied text; reporting rewritten fully in our own words, with
   the primary source credited), then full French and German versions.
4. **Illustrates** — attaches an image with a safe license (see below).
5. **Publishes** — one POST per story to the publish endpoint, carrying the
   English article plus its `translations`, so all three land with a shared
   `translation_group_id`.

## Editorial rules

- Original writing only. Read the source, then report the facts in fresh
  wording. No paragraph may be a near-copy of the source.
- 400–700 words per article. Lead paragraph answers who/what/when/where/why.
  Optional short section headings end with a colon (`Why it matters:`).
- Plain text, paragraphs separated by blank lines (no markdown syntax — the
  site renders plain text).
- Always set `sourceName` + `sourceUrl` to the primary source.
- `summary`: one sentence, ≤ 200 characters, no clickbait.
- `category`: one of `companies`, `research`, `policy`, `business`,
  `hardware`, `science`, `society`.
- `region`: one of `global`, `americas`, `europe`, `asia`, `africa`,
  `middle-east`, `oceania`.
- `tags`: 3–6 lowercase keywords (e.g. `nvidia`, `llm`, `regulation`).
- French and German versions are real translations of the English article
  (title, summary and body all translated; slug re-slugified from the
  translated title).

## Image rules (copyright-safe)

Only use, in order of preference:

1. Official press/newsroom/product images published by the company the story
   is about (their own press kit, blog or newsroom).
2. Wikimedia Commons media with a free license.
3. Unsplash or Pexels photos matching the topic.

Never hotlink photographs from other news publishers. Always set
`imageCredit` (e.g. `NVIDIA`, `Unsplash / Jane Doe`).

## Feed list (starting set)

- https://techcrunch.com/category/artificial-intelligence/feed/
- https://www.theverge.com/rss/ai-artificial-intelligence/index.xml
- https://venturebeat.com/category/ai/feed/
- https://www.technologyreview.com/topic/artificial-intelligence/feed
- https://arstechnica.com/ai/feed/
- https://the-decoder.com/feed/ (EU)
- https://www.actuia.com/feed/ (France, French-language)
- https://www.heise.de/thema/Kuenstliche-Intelligenz/rss.xml (Germany, German-language)
- https://techcabal.com/feed/ (Africa)
- https://restofworld.org/feed/latest/ (Global South)
- Google News RSS queries for regional coverage, e.g.
  `https://news.google.com/rss/search?q=artificial+intelligence+when:1d&hl=en`
  (repeat with region keywords: Africa, India, China, Japan, Korea, Middle
  East, Latin America, Europe).

Diversity target per day: not everything from the US — aim for stories from at
least 3 continents.

## Publish endpoint

`POST https://olkeri.space/api/articles/publish`
Header: `Authorization: Bearer $OLKERI_CONNECTOR_TOKEN`

```json
{
  "title": "…",
  "slug": "kebab-case-slug",
  "content": "Paragraphs separated by blank lines…",
  "language": "en",
  "summary": "One-sentence dek.",
  "category": "companies",
  "region": "americas",
  "tags": ["nvidia", "chips"],
  "sourceName": "NVIDIA Newsroom",
  "sourceUrl": "https://…",
  "imageUrl": "https://…",
  "imageCredit": "NVIDIA",
  "translations": [
    { "title": "…", "content": "…", "language": "fr", "summary": "…" },
    { "title": "…", "content": "…", "language": "de", "summary": "…" }
  ]
}
```

The endpoint upserts on `(language, slug)` and links all three versions with a
shared `translationGroupId` (accepted as input, generated when omitted).

## Dedupe query (public, read-only)

```
GET https://cxgqiutgebdovtiralom.supabase.co/rest/v1/ai_articles
    ?select=slug,title,source_url
    &language=eq.en
    &order=published_at.desc
    &limit=200
Header: apikey: <NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY>
```

## Required environment

- On the site host (Vercel): `OLKERI_CONNECTOR_TOKEN`,
  `SUPABASE_SERVICE_ROLE_KEY`.
- In the claude.ai/code environment that runs the Routine:
  `OLKERI_CONNECTOR_TOKEN` (same value as on the site host).
- One-time database migration: run `supabase/ai_articles_news_upgrade.sql` in
  the Supabase SQL editor.
