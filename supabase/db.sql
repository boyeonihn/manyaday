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
create policy "Can view own account." on profiles for select using (auth.uid() = user_id);

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

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
