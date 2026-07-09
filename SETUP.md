# Casa Bela — Landing Pages de cadastro

Duas landing pages prontas, com a cara da marca, que coletam **nome, e-mail e número**
e gravam tudo numa lista no **Supabase**.

```
landing-casabela/
├── index.html          ← Landing A · "clássica" (os 3 campos na mesma tela)
├── jornada/index.html  ← Landing B · "jornada" (1 pergunta por vez)
├── assets/
│   ├── brand.css        sistema visual da marca (cores + fontes oficiais)
│   ├── config.js        ⚠️ VOCÊ preenche aqui as 2 chaves do Supabase
│   ├── app.js           validação + envio ao Supabase
│   ├── simbolo.svg      símbolo da casa
│   ├── luane-hero.jpg   foto da Luane (landing A)
│   └── fonts/           Mirage · Montserrat · Edwardian
├── db/schema.sql        cria a tabela de cadastros no Supabase
└── vercel.json          configuração da hospedagem
```

- **Landing A:** `https://seu-dominio.com/`
- **Landing B:** `https://seu-dominio.com/jornada`

(dá pra usar uma só, ou as duas em domínios/links diferentes pra testar qual converte mais.)

---

## Passo a passo (≈ 15 min)

### 1) Supabase — criar o banco
1. Crie a conta em **supabase.com** → **New project** (guarde a senha do banco).
2. Menu lateral → **SQL Editor** → **New query**.
3. Cole **todo** o conteúdo de `db/schema.sql` e clique **Run**.
   - Isso cria a tabela `leads` e libera só o **envio** do formulário (sua lista fica privada).
4. Menu → **Project Settings → API**. Copie **dois** valores:
   - **Project URL** (ex.: `https://abcd1234.supabase.co`)
   - **anon public** (a chave longa que começa com `eyJ...`)

### 2) Conectar a landing ao Supabase
Abra `assets/config.js` e cole os dois valores:
```js
SUPABASE_URL: "https://abcd1234.supabase.co",
SUPABASE_ANON_KEY: "eyJhbGciOi...sua-chave-anon...",
```
> A chave **anon public** é feita para ficar no navegador — é segura.
> **Nunca** use aqui a `service_role` (essa é secreta).

### 3) Vercel — publicar
**Opção fácil (recomendada):**
1. Suba a pasta `landing-casabela/` para um repositório no GitHub.
2. Em **vercel.com** → **Add New → Project** → importe o repositório.
3. *Framework Preset:* **Other** · *Root Directory:* a pasta da landing · **Deploy**.
4. **Settings → Domains** → adicione o domínio da Luane (a Vercel mostra o DNS a configurar).

**Opção CLI:** dentro da pasta, rode `npx vercel` e depois `npx vercel --prod`.

### 4) Ver os cadastros
Supabase → **Table Editor → leads**. Para baixar a planilha: **Export → CSV**.

---

## O que eu preciso que você me passe (e o que NÃO precisa)

Para eu deixar tudo configurado e no ar, me envie:

**Do Supabase** (depois de rodar o passo 1):
- [ ] **Project URL**
- [ ] **anon public key** *(pode mandar — é pública por design)*
- [ ] me avise se já rodou o `schema.sql` ou se prefere que eu te guie no Run

**Da hospedagem (Vercel):** escolha **um** caminho:
- [ ] **Mais seguro:** você cria o projeto na Vercel conectando o GitHub e adiciona o domínio
  — eu te passo o repositório pronto. (Não preciso de senha nenhuma.)
- [ ] **Eu publico por você:** me passe um **Vercel Access Token**
  (vercel.com → Settings → Tokens → *Create*), e o **nome do domínio**.

**NÃO me mande** (não preciso e devem ficar secretos):
- ❌ `service_role` key do Supabase
- ❌ senha do banco de dados
- ❌ senha da sua conta Vercel/GitHub/Google

> Enquanto o Supabase não estiver preenchido, as landings funcionam em **modo demonstração**
> (a tela de "cadastro recebido" aparece, mas nada é gravado). Assim que você colar as
> chaves no `config.js`, os cadastros passam a cair na tabela automaticamente.
