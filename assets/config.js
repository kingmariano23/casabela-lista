/* ============================================================
   CASA BELA — configuração
   ------------------------------------------------------------
   Preencha os 2 valores abaixo com os dados do seu projeto
   Supabase (Project Settings → API). A "anon public key" é
   SEGURA para ficar aqui no navegador — foi feita pra isso.
   NÃO cole aqui a "service_role" (essa é secreta).
   ============================================================ */
window.CASABELA_CONFIG = {
  // Projeto: voecatavento-arch's Project
  SUPABASE_URL: "https://tsssbkdfbetudhsoougq.supabase.co",

  // Chave PUBLISHABLE (pública por design — segura no navegador).
  // NUNCA use aqui a "sb_secret_..." (essa é secreta e fica no servidor).
  SUPABASE_ANON_KEY: "sb_publishable_4J3iAHXWAH5Z12eUtLP04g_6-Wn8BLj",

  // Nome da tabela (criada pelo db/schema.sql) — não precisa mudar
  TABLE: "leads"
};
