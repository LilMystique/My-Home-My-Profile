-- Leads from the portfolio contact form.
-- Run once in the Supabase SQL editor.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 7 and 20),
  need text check (need is null or char_length(need) <= 40),
  budget text check (budget is null or char_length(budget) <= 40),
  message text check (message is null or char_length(message) <= 2000),
  lang text check (lang is null or lang in ('en', 'sw')),
  source text check (source is null or char_length(source) <= 80),
  contacted boolean not null default false
);

alter table public.leads enable row level security;

-- The public (anon) key may only insert. It cannot read, update or delete leads.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- Server-side rate limit: at most 3 submissions per phone number per 10 minutes.
create or replace function public.leads_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.leads
      where phone = new.phone and created_at > now() - interval '10 minutes') >= 3 then
    raise exception 'rate limit' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists leads_rate_limit_trg on public.leads;
create trigger leads_rate_limit_trg
  before insert on public.leads
  for each row execute function public.leads_rate_limit();

-- Review leads in the Supabase table editor and tick "contacted" as you follow up.
-- For an instant email or WhatsApp alert, add a Database Webhook on INSERT for
-- public.leads that calls an Edge Function.
