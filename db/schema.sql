-- Olkeri AI News — self-hosted Postgres schema.
-- Run once against your database (safe to re-run):
--   psql "$DATABASE_URL" -f db/schema.sql

create extension if not exists pgcrypto;

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  content text not null,
  language text not null check (language in ('en', 'fr', 'de', 'es')),
  summary text,
  category text,
  region text,
  tags text[],
  source_name text,
  source_url text,
  image_url text,
  image_credit text,
  translation_group_id uuid,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  unique (language, slug)
);

create index if not exists articles_language_published_idx
  on articles (language, published_at desc);

create index if not exists articles_language_views_idx
  on articles (language, views desc);

create index if not exists articles_translation_group_idx
  on articles (translation_group_id);

create index if not exists articles_search_idx
  on articles using gin (to_tsvector('simple', title || ' ' || content));

create or replace function set_articles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_updated_at on articles;
create trigger articles_updated_at
  before update on articles
  for each row execute function set_articles_updated_at();

-- Byline. Added after launch; safe to re-run.
alter table articles add column if not exists author text;

-- Spanish edition. Widens the original three-language constraint.
alter table articles drop constraint if exists articles_language_check;
alter table articles add constraint articles_language_check
  check (language in ('en', 'fr', 'de', 'es'));

-- Project enquiries and newsroom tips submitted through /contact.
-- Added when the site took on portfolio and studio duties: the form used to
-- render a button that discarded whatever a visitor typed.
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  -- Free-form, set by the form; useful for routing a project brief away
  -- from a story tip without reading every row.
  topic text,
  source_language text,
  user_agent text,
  created_at timestamptz not null default now(),
  handled_at timestamptz
);

create index if not exists contact_messages_created_idx
  on contact_messages (created_at desc);

create index if not exists contact_messages_unhandled_idx
  on contact_messages (created_at desc)
  where handled_at is null;
