-- Estrutura inicial do cadastro de pessoas da Oficina Conexão.
-- Execute este arquivo no SQL Editor do projeto Supabase.

create table if not exists public.pessoas (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) between 1 and 120),
  created_at timestamptz not null default now()
);

alter table public.pessoas enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.pessoas to anon, authenticated;

create policy "Permitir cadastro público de pessoas"
on public.pessoas
for insert
to anon, authenticated
with check (char_length(trim(nome)) between 1 and 120);