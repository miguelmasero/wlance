create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date not null,
  time time not null,
  duration integer not null,
  status text not null default 'pending',
  client_name text,
  client_email text,
  notes text,
  
  -- Add constraints
  constraint valid_duration check (duration in (2, 4)),
  constraint valid_status check (status in ('pending', 'confirmed', 'cancelled'))
);

-- Set up RLS (Row Level Security)
alter table public.bookings enable row level security;

-- Create policy to allow all authenticated users to read bookings
create policy "Allow authenticated users to read bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

-- Create policy to allow service role to insert bookings
create policy "Allow service role to insert bookings"
  on public.bookings
  for insert
  to service_role
  with check (true);

