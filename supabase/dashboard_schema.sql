create extension if not exists "pgcrypto";

create table if not exists dashboard_projects (
  id uuid primary key default gen_random_uuid(),
  access_key text not null unique,
  name text not null,
  client_name text not null,
  summary text not null default '',
  status text not null default 'Discovery'
    check (status in ('Discovery', 'Build', 'Review', 'Launch')),
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  next_milestone text not null default '',
  shared_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists dashboard_variables (
  id text primary key,
  project_id uuid not null references dashboard_projects(id) on delete cascade,
  label text not null,
  value text not null,
  category text not null default 'Delivery',
  worked_this_week boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists dashboard_questions (
  id text primary key,
  project_id uuid not null references dashboard_projects(id) on delete cascade,
  author text not null check (author in ('client', 'developer')),
  question text not null,
  answer text,
  created_at timestamptz not null default now()
);

create index if not exists dashboard_projects_access_key_idx
  on dashboard_projects(access_key);

create index if not exists dashboard_variables_project_id_idx
  on dashboard_variables(project_id);

create index if not exists dashboard_questions_project_id_idx
  on dashboard_questions(project_id);

alter table dashboard_projects disable row level security;
alter table dashboard_variables disable row level security;
alter table dashboard_questions disable row level security;

insert into dashboard_projects (
  access_key,
  name,
  client_name,
  summary,
  status,
  progress,
  next_milestone,
  shared_notes
)
values (
  'olkeri-demo-client',
  'Client Portal Launch',
  'Olkeri Partner',
  'A secure project dashboard for weekly delivery visibility, shared decisions, and direct client questions.',
  'Build',
  68,
  'Client feedback pass and deployment checklist',
  'Keep notes concise and decision-oriented. Add open questions, approvals, blockers, and links that both teams should see.'
)
on conflict (access_key) do nothing;

insert into dashboard_variables (
  id,
  project_id,
  label,
  value,
  category,
  worked_this_week
)
select
  seed.id,
  dashboard_projects.id,
  seed.label,
  seed.value,
  seed.category,
  seed.worked_this_week
from dashboard_projects
cross join (
  values
    (
      'var-1',
      'Project phase',
      'Dashboard foundation and client collaboration flow',
      'Delivery',
      true
    ),
    (
      'var-2',
      'Primary risk',
      'Confirming access model before production data goes live',
      'Risk',
      true
    ),
    (
      'var-3',
      'Next client action',
      'Review shared notes and add any launch requirements',
      'Client',
      false
    )
) as seed(id, label, value, category, worked_this_week)
where dashboard_projects.access_key = 'olkeri-demo-client'
on conflict (id) do nothing;

insert into dashboard_questions (
  id,
  project_id,
  author,
  question,
  answer
)
select
  'question-1',
  dashboard_projects.id,
  'client',
  'Can we use this same link with the leadership team?',
  'Yes. The share link is designed for client-side visibility. We should add role-based auth before sensitive documents are attached.'
from dashboard_projects
where dashboard_projects.access_key = 'olkeri-demo-client'
on conflict (id) do nothing;
