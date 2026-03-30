-- ============================================================
-- DManager – Supabase databasschema
-- Kör detta i Supabase SQL Editor
-- ============================================================

-- Aktivera Row Level Security
-- (aktiveras per tabell nedan)

-- ============================================================
-- PROFILES (utökar Supabase auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'technician', 'user')),
  department text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Admins can read all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-skapa profil vid registrering
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- DEVICES
-- ============================================================
create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  serial_number text not null unique,
  platform text not null check (platform in ('iOS', 'Android', 'Windows', 'macOS', 'Other')),
  os_version text,
  model text,
  status text not null default 'active' check (status in ('active', 'inactive', 'lost', 'wiped')),
  owner_id uuid references public.profiles(id) on delete set null,
  enrolled_at timestamptz not null default now(),
  last_seen timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.devices enable row level security;

create policy "Authenticated users can read devices" on public.devices
  for select using (auth.role() = 'authenticated');

create policy "Admins and technicians can insert devices" on public.devices
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'technician')
    )
  );

create policy "Admins and technicians can update devices" on public.devices
  for update using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'technician')
    )
  );

-- ============================================================
-- POLICIES
-- ============================================================
create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text not null default 'draft' check (status in ('active', 'draft', 'archived')),
  platform text not null default 'All',
  rules jsonb not null default '[]',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.policies enable row level security;

create policy "Authenticated users can read policies" on public.policies
  for select using (auth.role() = 'authenticated');

create policy "Admins can manage policies" on public.policies
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Kopplingstabell enhet <-> policy
create table if not exists public.device_policies (
  device_id uuid references public.devices(id) on delete cascade,
  policy_id uuid references public.policies(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (device_id, policy_id)
);

alter table public.device_policies enable row level security;

create policy "Authenticated users can read device_policies" on public.device_policies
  for select using (auth.role() = 'authenticated');

-- ============================================================
-- EXCHANGE REQUESTS (Utbytesanmälningar)
-- ============================================================
create table if not exists public.exchange_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id) on delete cascade not null,
  device_id uuid references public.devices(id) on delete set null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed')),
  new_device_model text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.exchange_requests enable row level security;

create policy "Users can read own exchange requests" on public.exchange_requests
  for select using (auth.uid() = requester_id);

create policy "Admins and technicians can read all exchange requests" on public.exchange_requests
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'technician')
    )
  );

create policy "Users can create exchange requests" on public.exchange_requests
  for insert with check (auth.uid() = requester_id);

create policy "Admins and technicians can update exchange requests" on public.exchange_requests
  for update using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'technician')
    )
  );

-- ============================================================
-- Updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_profiles before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_updated_at_devices before update on public.devices for each row execute function public.set_updated_at();
create trigger set_updated_at_policies before update on public.policies for each row execute function public.set_updated_at();
create trigger set_updated_at_exchange_requests before update on public.exchange_requests for each row execute function public.set_updated_at();

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_devices_owner_id on public.devices(owner_id);
create index if not exists idx_devices_status on public.devices(status);
create index if not exists idx_exchange_requests_status on public.exchange_requests(status);
create index if not exists idx_exchange_requests_requester on public.exchange_requests(requester_id);
