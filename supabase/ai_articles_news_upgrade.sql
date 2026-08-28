-- Olkeri AI News upgrade for the ai_articles table.
-- Run this once in the Supabase SQL editor (safe to re-run).

alter table public.ai_articles
  add column if not exists translation_group_id uuid,
  add column if not exists summary text,
  add column if not exists category text,
  add column if not exists region text,
  add column if not exists tags text[],
  add column if not exists source_name text,
  add column if not exists source_url text,
  add column if not exists image_credit text;

comment on column public.ai_articles.translation_group_id is
  'Shared id linking the en/fr/de versions of the same story.';
comment on column public.ai_articles.summary is
  'Short dek/excerpt shown on cards and in meta descriptions.';
comment on column public.ai_articles.category is
  'News category slug: companies, research, policy, business, hardware, science, society.';
comment on column public.ai_articles.region is
  'Region slug: global, americas, europe, asia, africa, middle-east, oceania.';
comment on column public.ai_articles.source_url is
  'Primary source the story was reported from (shown as attribution).';

create index if not exists ai_articles_translation_group_idx
  on public.ai_articles (translation_group_id);

create index if not exists ai_articles_language_views_idx
  on public.ai_articles (language, views desc);

create index if not exists ai_articles_language_category_idx
  on public.ai_articles (language, category, published_at desc);
