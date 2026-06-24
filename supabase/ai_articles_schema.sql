create extension if not exists "pgcrypto";

create table if not exists ai_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  content text not null,
  language text not null check (language in ('en', 'fr', 'de')),
  image_url text,
  views integer not null default 0,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz not null default now(),
  unique (language, slug)
);

create index if not exists ai_articles_language_published_at_idx
  on ai_articles(language, published_at desc);

create index if not exists ai_articles_search_idx
  on ai_articles using gin (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(content, ''))
  );

alter table ai_articles
  add column if not exists views integer not null default 0;

create or replace function set_ai_articles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists ai_articles_updated_at on ai_articles;

create trigger ai_articles_updated_at
before update on ai_articles
for each row
execute function set_ai_articles_updated_at();

alter table ai_articles enable row level security;

drop policy if exists "Published AI articles are public" on ai_articles;
drop policy if exists "Authenticated users can create AI articles" on ai_articles;
drop policy if exists "Authenticated users can update AI articles" on ai_articles;
drop policy if exists "Authenticated users can delete AI articles" on ai_articles;

create policy "Published AI articles are public"
on ai_articles
for select
using (published_at is not null);

create policy "Authenticated users can create AI articles"
on ai_articles
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Authenticated users can update AI articles"
on ai_articles
for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "Authenticated users can delete AI articles"
on ai_articles
for delete
to authenticated
using (auth.uid() = author_id);

create or replace function increment_ai_article_views(article_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update ai_articles
  set views = coalesce(views, 0) + 1
  where id = article_id
    and published_at is not null;
end;
$$;

grant execute on function increment_ai_article_views(uuid) to anon, authenticated;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'article-images',
  'article-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Article images are public" on storage.objects;
drop policy if exists "Authenticated users can upload article images" on storage.objects;
drop policy if exists "Authenticated users can update own article images" on storage.objects;
drop policy if exists "Authenticated users can delete own article images" on storage.objects;

create policy "Article images are public"
on storage.objects
for select
using (bucket_id = 'article-images');

create policy "Authenticated users can upload article images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'article-images'
  and owner = auth.uid()
);

create policy "Authenticated users can update own article images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'article-images'
  and owner = auth.uid()
)
with check (
  bucket_id = 'article-images'
  and owner = auth.uid()
);

create policy "Authenticated users can delete own article images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'article-images'
  and owner = auth.uid()
);
