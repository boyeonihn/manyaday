-- profiles
create table profiles (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade  not null,
  created_ts TIMESTAMP WITH TIME ZONE not null default now(),
  updated_ts TIMESTAMP WITH TIME ZONE,
  first_name text,
  last_name text,
  username text
);

alter table profiles enable row level security;
create policy "Can view own profile." on profiles for select using (auth.uid() = user_id);

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = user_id );

create or alter policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = user_id );

-- inserts a row into public.profiles
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, username)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function everytime a user is created 
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- entries
create table
  public.entries (
    id uuid not null default uuid_generate_v4 (),
    user_id uuid references auth.users not null,
    created_ts timestamp with time zone not null default now(),
    updated_ts timestamp with time zone null,
    is_private boolean not null,
    content text not null,
    month_day text
    constraint entries_pkey primary key (id),
    constraint entries_user_id_fkey foreign key (user_id) references auth.users (id)
);

alter table entries enable row level security;

-- calculates month_day and inserts into month_day column
create or replace function public.insert_month_day()
returns trigger as $$
begin
  new."month_day" := to_char(new.created_ts, 'MM-DD');
  return new;
end;
$$ language plpgsql security definer; 

-- trigger the function everytime an entry is created
create or replace trigger on_public_entry_created
  before insert on public.entries
  for each row execute function insert_month_day(); 

-- RLS policies for entries
create policy "Can view own entries and other users' public entries" on entries for
select
  using (is_private = false or auth.uid() = user_id);

create policy "Can create own entries." on entries for
insert 
  with check (auth.uid() = user_id);
  
create policy "Can update own entries." on entries for
update 
  using (auth.uid()= user_id);


-- Create index on the month_day column
create index idx_month_day ON public.entries("month_day")

-- if I want to change the index I have to drop it first 
-- drop index idx_month_day ON public.entries