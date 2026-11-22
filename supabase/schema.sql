-- RankAI schema. Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once.

-- 1) Profiles: user apni exam settings khud badal sakta hai
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  exam text default 'jee_main',
  target_score text,
  hours int default 4,
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_insert_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id);
create policy profiles_update_own on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- 2) Subscriptions: user sirf padh sakta hai. Insert/update ki policy NAHI hai,
--    isliye koi khud ko Pro nahi bana sakta. Sirf grant_pro() se (SQL Editor se) hota hai.
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null,
  expires_at timestamptz not null,
  updated_at timestamptz default now()
);
alter table public.subscriptions enable row level security;
drop policy if exists subs_select_own on public.subscriptions;
create policy subs_select_own on public.subscriptions for select using (auth.uid() = user_id);

-- 3) Payment requests: user UTR daalta hai, aap check karke approve karte ho
create table if not exists public.payment_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  plan_id text not null check (plan_id in ('pro_monthly')),
  amount int not null check (amount = 499),
  utr text not null check (utr ~ '^[0-9]{12}$'),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now(),
  unique (utr)
);
alter table public.payment_requests enable row level security;
drop policy if exists pay_select_own on public.payment_requests;
drop policy if exists pay_insert_own on public.payment_requests;
create policy pay_select_own on public.payment_requests for select using (auth.uid() = user_id);
create policy pay_insert_own on public.payment_requests for insert
  with check (auth.uid() = user_id and status = 'pending');

-- 4) Roz ki doubt limit (free: 3, Pro: 50). Table par koi policy nahi, sirf function se chalta hai.
create table if not exists public.doubt_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  n int not null default 0,
  primary key (user_id, day)
);
alter table public.doubt_usage enable row level security;

create or replace function public.consume_doubt() returns boolean
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  lim int;
  cur int;
begin
  if uid is null then return false; end if;
  select case when exists (
    select 1 from public.subscriptions where user_id = uid and expires_at > now()
  ) then 50 else 3 end into lim;
  insert into public.doubt_usage (user_id, day, n)
  values (uid, (now() at time zone 'Asia/Kolkata')::date, 1)
  on conflict (user_id, day) do update set n = public.doubt_usage.n + 1
    where public.doubt_usage.n < lim
  returning n into cur;
  return cur is not null;
end $$;
revoke all on function public.consume_doubt() from public, anon;
grant execute on function public.consume_doubt() to authenticated;

-- 5) Pro dene ka function. Sirf aap SQL Editor se chala sakte ho, app se nahi.
--    Use:  select public.grant_pro('student@email.com');
create or replace function public.grant_pro(p_email text, p_plan text default 'pro_monthly', p_days int default 30)
returns text language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  select id into uid from auth.users where lower(email) = lower(p_email);
  if uid is null then return 'user not found'; end if;
  insert into public.subscriptions (user_id, plan, expires_at)
  values (uid, p_plan, now() + make_interval(days => p_days))
  on conflict (user_id) do update
    set plan = excluded.plan,
        expires_at = greatest(public.subscriptions.expires_at, now()) + make_interval(days => p_days),
        updated_at = now();
  update public.payment_requests set status = 'approved' where user_id = uid and status = 'pending';
  return 'ok';
end $$;
revoke all on function public.grant_pro(text, text, int) from public, anon, authenticated;
