-- CASHBACK SUPER - Supabase schema
-- Run this in the Supabase SQL editor before connecting the app.

create extension if not exists pgcrypto;

create type public.card_status as enum ('active', 'inactive', 'lost');
create type public.transaction_type as enum ('credit', 'debit');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'paused', 'canceled');
create type public.invoice_status as enum ('pending', 'paid', 'failed', 'refunded', 'canceled');
create type public.email_status as enum ('pending', 'sent', 'delivered', 'bounced', 'failed');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  cashback_percentage numeric(5,2) not null default 5.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint stores_cashback_percentage_range check (
    cashback_percentage >= 0 and cashback_percentage <= 100
  ),
  constraint stores_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  cpf_digits text not null,
  name text not null,
  phone text,
  email text,
  cashback_balance numeric(12,2) not null default 0.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_cpf_digits_format check (cpf_digits ~ '^[0-9]{11}$'),
  constraint customers_cashback_balance_non_negative check (cashback_balance >= 0),
  constraint customers_unique_cpf_per_store unique (store_id, cpf_digits)
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  code text not null unique,
  status public.card_status not null default 'active',
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cards_code_length check (char_length(code) between 4 and 40)
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  type public.transaction_type not null,
  purchase_amount numeric(12,2),
  amount numeric(12,2) not null,
  description text,
  sku text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint transactions_amount_valid check (
    (type = 'credit' and amount >= 0) or (type = 'debit' and amount > 0)
  ),
  constraint transactions_purchase_amount_positive check (
    purchase_amount is null or purchase_amount > 0
  )
);

create index customers_store_id_idx on public.customers(store_id);
create index customers_cpf_digits_idx on public.customers(cpf_digits);
create index cards_store_id_idx on public.cards(store_id);
create index cards_customer_id_idx on public.cards(customer_id);
create index cards_code_idx on public.cards(code);
create index transactions_store_customer_created_idx
  on public.transactions(store_id, customer_id, created_at desc);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_cents integer not null,
  monthly_transaction_limit integer,
  operator_limit integer,
  mercado_pago_plan_id text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint plans_price_cents_non_negative check (price_cents >= 0)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  plan_id uuid references public.plans(id) on delete set null,
  status public.subscription_status not null default 'trialing',
  mercado_pago_preapproval_id text unique,
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_ends_at timestamptz,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  status public.invoice_status not null default 'pending',
  amount_cents integer not null,
  currency text not null default 'BRL',
  mercado_pago_payment_id text unique,
  hosted_invoice_url text,
  due_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  constraint invoices_amount_cents_non_negative check (amount_cents >= 0)
);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  external_event_id text not null,
  event_type text,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint webhook_events_provider_external_unique unique (provider, external_event_id)
);

create table public.email_logs (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  template text not null,
  recipient text not null,
  subject text not null,
  status public.email_status not null default 'pending',
  provider_message_id text,
  error_message text,
  payload jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz not null default now(),
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index subscriptions_store_id_idx on public.subscriptions(store_id);
create index invoices_store_created_idx on public.invoices(store_id, created_at desc);
create index email_logs_status_scheduled_idx on public.email_logs(status, scheduled_at);

create trigger stores_set_updated_at
before update on public.stores
for each row execute function public.set_updated_at();

create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

create trigger cards_set_updated_at
before update on public.cards
for each row execute function public.set_updated_at();

alter table public.stores enable row level security;
alter table public.customers enable row level security;
alter table public.cards enable row level security;
alter table public.transactions enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.invoices enable row level security;
alter table public.webhook_events enable row level security;
alter table public.email_logs enable row level security;

create policy "Store owners can view stores"
on public.stores for select to authenticated
using (owner_id = (select auth.uid()));

create policy "Store owners can create stores"
on public.stores for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy "Store owners can update stores"
on public.stores for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Store owners can delete stores"
on public.stores for delete to authenticated
using (owner_id = (select auth.uid()));

create policy "Store owners can view customers"
on public.customers for select to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = customers.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can create customers"
on public.customers for insert to authenticated
with check (
  exists (
    select 1 from public.stores
    where stores.id = customers.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can update customers"
on public.customers for update to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = customers.store_id
      and stores.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.stores
    where stores.id = customers.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can manage cards"
on public.cards for all to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = cards.store_id
      and stores.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.stores
    where stores.id = cards.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can view transactions"
on public.transactions for select to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = transactions.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can create transactions"
on public.transactions for insert to authenticated
with check (
  exists (
    select 1 from public.stores
    where stores.id = transactions.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Authenticated users can view active plans"
on public.plans for select to authenticated
using (is_active = true);

create policy "Store owners can view subscriptions"
on public.subscriptions for select to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = subscriptions.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can view invoices"
on public.invoices for select to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = invoices.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create policy "Store owners can view email logs"
on public.email_logs for select to authenticated
using (
  exists (
    select 1 from public.stores
    where stores.id = email_logs.store_id
      and stores.owner_id = (select auth.uid())
  )
);

create or replace function public.register_purchase(
  p_customer_id uuid,
  p_purchase_amount numeric,
  p_description text default null,
  p_sku text default null
)
returns public.transactions
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_customer public.customers;
  v_store public.stores;
  v_cashback numeric(12,2);
  v_transaction public.transactions;
begin
  if p_purchase_amount <= 0 then
    raise exception 'O valor da compra deve ser maior que zero.';
  end if;

  select * into v_customer
  from public.customers
  where id = p_customer_id;

  if not found then
    raise exception 'Cliente nao encontrado.';
  end if;

  select * into v_store
  from public.stores
  where id = v_customer.store_id;

  if not found then
    raise exception 'Loja nao encontrada.';
  end if;

  v_cashback := round(p_purchase_amount * (v_store.cashback_percentage / 100), 2);

  update public.customers
  set cashback_balance = cashback_balance + v_cashback
  where id = p_customer_id;

  insert into public.transactions (
    store_id,
    customer_id,
    type,
    purchase_amount,
    amount,
    description,
    sku,
    created_by
  )
  values (
    v_store.id,
    v_customer.id,
    'credit',
    p_purchase_amount,
    v_cashback,
    p_description,
    p_sku,
    (select auth.uid())
  )
  returning * into v_transaction;

  return v_transaction;
end;
$$;

create or replace function public.redeem_cashback(
  p_customer_id uuid,
  p_amount numeric,
  p_description text default null
)
returns public.transactions
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_customer public.customers;
  v_transaction public.transactions;
begin
  if p_amount <= 0 then
    raise exception 'O valor de resgate deve ser maior que zero.';
  end if;

  select * into v_customer
  from public.customers
  where id = p_customer_id
  for update;

  if not found then
    raise exception 'Cliente nao encontrado.';
  end if;

  if v_customer.cashback_balance < p_amount then
    raise exception 'Saldo insuficiente para resgate.';
  end if;

  update public.customers
  set cashback_balance = cashback_balance - p_amount
  where id = p_customer_id;

  insert into public.transactions (
    store_id,
    customer_id,
    type,
    amount,
    description,
    created_by
  )
  values (
    v_customer.store_id,
    v_customer.id,
    'debit',
    p_amount,
    p_description,
    (select auth.uid())
  )
  returning * into v_transaction;

  return v_transaction;
end;
$$;

grant execute on function public.register_purchase(uuid, numeric, text, text) to authenticated;
grant execute on function public.redeem_cashback(uuid, numeric, text) to authenticated;
