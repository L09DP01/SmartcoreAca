alter table public.registrations
add column if not exists pay_now boolean default false,
add column if not exists payment_status text default 'not_paid',
add column if not exists payment_amount integer default 1400,
add column if not exists amount_paid integer default 0,
add column if not exists payment_currency text default 'HTG',
add column if not exists kobara_payment_id text,
add column if not exists kobara_checkout_url text,
add column if not exists payment_attempted_at timestamptz,
add column if not exists paid_at timestamptz,
add column if not exists registration_status text default 'draft',
add column if not exists confirmed_at timestamptz;

create table if not exists public.kobara_webhook_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  kobara_payment_id text,
  amount integer,
  payload jsonb not null,
  created_at timestamptz default now()
);

create index if not exists registrations_payment_status_idx on public.registrations (payment_status);
create index if not exists registrations_registration_status_idx on public.registrations (registration_status);
create index if not exists registrations_kobara_payment_id_idx on public.registrations (kobara_payment_id);
create index if not exists kobara_webhook_events_payment_id_idx on public.kobara_webhook_events (kobara_payment_id);

alter table public.kobara_webhook_events enable row level security;
revoke all on public.kobara_webhook_events from anon, authenticated;
