-- ============================================================
-- vivie.ai — Supabase Database Setup
-- Run this entire file once in the Supabase SQL Editor
-- ============================================================


-- 1. WAITLIST SIGNUPS TABLE
-- Stores every person who signs up on the landing page
-- ============================================================
create table if not exists public.signups (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text,
  email        text not null unique,
  username     text unique,
  created_at   timestamptz not null default now()
);

-- Index for fast email lookups (duplicate check)
create unique index if not exists signups_email_idx on public.signups (lower(email));
create unique index if not exists signups_username_idx on public.signups (lower(username));


-- 2. SECURITY: Row Level Security (RLS)
-- Prevents anyone from reading, editing, or deleting rows via the browser.
-- Only your server (service key) can do that.
-- ============================================================
alter table public.signups enable row level security;

-- Allow anyone to INSERT (sign up) — this is the public-facing action
create policy "Anyone can join waitlist"
  on public.signups
  for insert
  with check (true);

-- Block all reads from browser — only your admin dashboard can see emails
create policy "No public reads"
  on public.signups
  for select
  using (false);

-- Block all updates/deletes from browser
create policy "No public updates"
  on public.signups
  for update
  using (false);

create policy "No public deletes"
  on public.signups
  for delete
  using (false);


-- 3. ADMIN VIEW (optional but useful)
-- A clean view for you to read signups in Supabase dashboard
-- ============================================================
create or replace view public.waitlist_summary as
  select
    id,
    first_name,
    last_name,
    email,
    username,
    to_char(created_at at time zone 'UTC', 'DD Mon YYYY HH24:MI') as joined_at
  from public.signups
  order by created_at desc;


-- 4. SIGNUP COUNT FUNCTION
-- Returns total signup count — safe to call from browser (no emails exposed)
-- ============================================================
create or replace function public.get_signup_count()
returns integer
language sql
security definer
as $$
  select count(*)::integer from public.signups;
$$;

-- Allow anyone to call this function
grant execute on function public.get_signup_count() to anon;
grant execute on function public.get_signup_count() to authenticated;
