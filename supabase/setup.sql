-- Run this file in Supabase Dashboard > SQL Editor.
-- First create your own user in Authentication > Users, then replace the
-- email in the final INSERT statement with that exact email address.

create table if not exists public.portfolio_content (
  id text primary key check (id = 'main'),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;
alter table public.portfolio_admins enable row level security;

-- Visitors can read published portfolio content.
grant select on public.portfolio_content to anon, authenticated;
create policy "Portfolio content is public to read"
on public.portfolio_content for select
to anon, authenticated
using (true);

-- This SECURITY DEFINER function checks the private allow-list without
-- exposing the admin table to browser clients.
create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.portfolio_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

-- Only allow-listed users can create or update the single published record.
grant insert, update on public.portfolio_content to authenticated;
create policy "Only portfolio admins can insert content"
on public.portfolio_content for insert
to authenticated
with check (public.is_portfolio_admin() and id = 'main');

create policy "Only portfolio admins can update content"
on public.portfolio_content for update
to authenticated
using (public.is_portfolio_admin() and id = 'main')
with check (public.is_portfolio_admin() and id = 'main');

-- Add the account created in Supabase Authentication > Users to the admin list.
-- Change this email before running the statement if you use another login email.
insert into public.portfolio_admins (user_id)
select id
from auth.users
where lower(email) = lower('mehrabboozhmehrani30@gmail.com')
on conflict (user_id) do nothing;
