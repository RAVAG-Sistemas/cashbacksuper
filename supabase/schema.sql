-- CASHBACK SUPER - Supabase schema
-- Run this in the Supabase SQL editor before connecting the app.

create extension if not exists pgcrypto;

create type public.card_status as enum ('active', 'inactive', 'lost');
create type public.transaction_type as enum ('credit', 'debit');

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
