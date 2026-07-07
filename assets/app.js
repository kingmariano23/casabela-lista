/* ============================================================
   CASA BELA — utilidades de formulário + envio ao Supabase
   ============================================================ */

/* validações simples */
const CB = {
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  // aceita (00) 00000-0000, +55..., só dígitos etc. — exige >= 10 dígitos
  fone: v => (v.replace(/\D/g, "").length >= 10),
  vazio: v => v.trim().length >= 2
};

/* máscara leve de telefone BR enquanto digita */
function mascaraFone(el){
  el.addEventListener("input", () => {
    let d = el.value.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6)      el.value = `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    else if (d.length > 2) el.value = `(${d.slice(0,2)}) ${d.slice(2)}`;
    else if (d.length > 0) el.value = `(${d}`;
    else                   el.value = d;
  });
}

/* grava o lead. Resolve sempre — se não houver Supabase configurado,
   entra em "modo demonstração" (não quebra a tela). */
async function salvarLead({ nome, email, telefone, origem, estilo }){
  const c = window.CASABELA_CONFIG;
  const naoConfig = !c || /SEU-PROJETO|SUA-ANON/.test(c.SUPABASE_URL + c.SUPABASE_ANON_KEY);

  if (naoConfig){
    console.warn("[Casa Bela] Supabase ainda não configurado — modo demonstração. Lead:", { nome, email, telefone, origem, estilo });
    await new Promise(r => setTimeout(r, 600)); // simula latência
    return { demo: true };
  }

  const res = await fetch(`${c.SUPABASE_URL}/rest/v1/${c.TABLE}`, {
    method: "POST",
    headers: {
      "apikey": c.SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${c.SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({ nome, email, telefone, origem, estilo_preferido: estilo })
  });

  if (!res.ok){
    const txt = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${txt}`);
  }
  return { ok: true };
}
