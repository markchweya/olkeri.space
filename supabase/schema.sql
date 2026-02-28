create extension if not exists "pgcrypto";

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamptz default now(),
  image_url text,
  image_width integer,
  image_height integer,
  likes_up integer default 0,
  likes_down integer default 0,
  views integer default 0
);

alter table posts disable row level security;
