create extension if not exists pgcrypto;

create table if not exists public.registration_counters (
  year integer primary key,
  value integer not null default 0
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_number text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null,
  whatsapp text not null,
  normalized_whatsapp text not null,
  gender text,
  age_range text not null,
  country text not null,
  department text not null,
  city text not null,
  occupation text not null,
  education_level text not null,
  has_payment_card text not null,
  has_paypal text not null,
  has_us_address text not null,
  online_purchase_experience text not null,
  platforms text[] not null default '{}',
  main_goal text not null,
  motivation text not null,
  referral_source text not null,
  terms_accepted boolean not null default false,
  communication_consent boolean not null default false,
  status text not null default 'En attente',
  confirmation_token text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint registrations_status_check check (
    status in ('En attente', 'Confirmée', 'Contactée', 'Ajoutée au groupe', 'Refusée', 'Annulée')
  )
);

create unique index if not exists registrations_email_unique_idx on public.registrations (lower(email));
create unique index if not exists registrations_normalized_whatsapp_unique_idx on public.registrations (normalized_whatsapp);
create index if not exists registrations_city_idx on public.registrations (city);
create index if not exists registrations_status_idx on public.registrations (status);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists registrations_set_updated_at on public.registrations;
create trigger registrations_set_updated_at
before update on public.registrations
for each row execute function public.set_updated_at();

create or replace function public.generate_registration_number()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_year integer := extract(year from now())::integer;
  next_value integer;
begin
  insert into public.registration_counters(year, value)
  values (current_year, 1)
  on conflict (year)
  do update set value = public.registration_counters.value + 1
  returning value into next_value;

  return 'SCA-' || current_year || '-' || lpad(next_value::text, 5, '0');
end;
$$;

alter table public.registrations enable row level security;
alter table public.registration_counters enable row level security;

revoke all on public.registrations from anon, authenticated;
revoke all on public.registration_counters from anon, authenticated;
revoke all on function public.generate_registration_number() from public;
