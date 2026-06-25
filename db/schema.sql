-- ============================================================
-- CASA BELA — estrutura da tabela de cadastros (leads)
-- Cole TUDO isto no Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1) Tabela com a lista de pessoas cadastradas
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nome        text not null,
  email       text not null,
  telefone    text not null,
  origem      text                       -- de qual landing veio
);

-- 2) Liga a segurança por linha (Row Level Security)
alter table public.leads enable row level security;

-- 3) Permite que o formulário público (papel "anon") INSIRA cadastros,
--    mas NÃO permite ler/editar/apagar — sua lista fica privada.
drop policy if exists "form publico pode inserir" on public.leads;
create policy "form publico pode inserir"
  on public.leads
  for insert
  to anon
  with check (true);

-- ------------------------------------------------------------
-- PRONTO. A lista de cadastros aparece em:
--   Supabase → Table Editor → leads
-- Para exportar (CSV/planilha): Table Editor → leads → Export.
-- ============================================================
