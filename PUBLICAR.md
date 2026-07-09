# Publicar as landings na Vercel — passo a passo

Sem terminal, sem complicação. São 3 etapas: GitHub → Vercel → Domínio.
Tudo o que está nesta pasta já está pronto e seguro pra subir (só a chave
pública do Supabase está aqui — a secreta não está).

---

## Etapa 1 · Colocar os arquivos no GitHub (≈ 5 min)

1. Crie conta em **github.com** (se ainda não tem).
2. Clique no **+** (canto superior direito) → **New repository**.
3. Nome: `casabela-landing` · deixe **Private** marcado · clique **Create repository**.
4. Na tela seguinte, clique no link **“uploading an existing file”**.
5. **Arraste para a janela** todo o conteúdo desta pasta `landing-casabela`
   (os arquivos E as pastas `assets/`, `jornada/`, `db/` — pode selecionar tudo
   e arrastar de uma vez; o GitHub mantém a estrutura).
6. Role até embaixo e clique **Commit changes**.

> ✅ Pronto: seu código está no GitHub.

---

## Etapa 2 · Publicar na Vercel (≈ 3 min)

1. Crie conta em **vercel.com** → escolha **Continue with GitHub** (conecta as duas).
2. No painel: **Add New… → Project**.
3. Encontre o repositório **`casabela-landing`** → **Import**.
4. Nas configurações de build, deixe assim:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (a raiz — não precisa mudar)
   - Build/Output: pode deixar **em branco** (é site estático)
5. Clique **Deploy** e aguarde (~30s).

> ✅ A Vercel te dá um link tipo `casabela-landing.vercel.app`. Abra e teste!
> - Landing clássica: `…vercel.app/`
> - Landing jornada: `…vercel.app/jornada`

Faça um cadastro de teste em cada uma e confira em
**Supabase → Table Editor → leads** se os registros caíram (a coluna `origem`
mostra de qual landing veio).

---

## Etapa 3 · Ligar o domínio da Luane (≈ 5 min + propagação)

1. Na Vercel, dentro do projeto: **Settings → Domains**.
2. Digite o domínio (ex.: `casabela.com.br` ou `lista.casabela.com.br`) → **Add**.
3. A Vercel mostra **qual registro DNS criar** (um `A` ou `CNAME`).
4. Vá no painel onde o domínio foi comprado (Registro.br, GoDaddy, Hostinger…)
   e adicione esse registro exatamente como a Vercel pediu.
5. Volte na Vercel e clique **Refresh** — quando ficar verde, está no ar com o
   domínio (a propagação pode levar de minutos a algumas horas).

---

## Etapa 4 · Automação do E-mail Gratuito (Supabase + Resend)

Em vez de pagar uma VPS cara com n8n, vamos usar a nuvem do Supabase para enviar o e-mail automático assim que o lead cair no banco.

1. Crie uma conta gratuita em **resend.com** e verifique seu domínio (ou pegue a API Key de teste).
2. No Supabase, vá em **Database → Webhooks**.
3. Crie um novo Webhook:
   - Tabela: `leads`
   - Eventos: `Insert`
   - Tipo de Hook: `HTTP Request`
   - Método: `POST`
   - URL: `https://api.resend.com/emails`
   - Headers: `Authorization: Bearer resend_sua_chave`
   - Body (JSON via Edge Function ou payload simples do webhook): configure para enviar seu e-book.

> ✅ O Supabase Edge Functions é o lugar ideal para colocar o script de disparo caso precise formatar o HTML bonito do e-mail. Tudo de graça.

---

## Depois, se mudar algo

Como a Vercel está ligada ao GitHub, qualquer arquivo que você atualizar no
repositório (ou que eu te entregue atualizado) **republica sozinho**. Sem
reupload manual.

## Trocar de landing / usar as duas

- Quer testar qual converte mais? Divulgue `/` para um público e `/jornada`
  para outro — os cadastros caem na mesma lista, separados por `origem`.
- Quer que a página inicial seja a **jornada**? Me avisa que eu inverto
  (basta trocar qual arquivo fica na raiz).
