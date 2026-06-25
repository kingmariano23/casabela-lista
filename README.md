# CasaBela — Landing "Lista"

Página de captação da **CasaBela** no formato de **formulário único**: o visitante
preenche nome, e-mail e telefone de uma vez e entra na lista. Lead gravado com
`origem: landing-lista`.

## Como funciona
- Site estático (`index.html` + `assets/`), publicado na **Vercel**.
- Cadastros vão para o **Supabase** (tabela `leads`), configurado em
  [assets/config.js](assets/config.js).
- A `SUPABASE_ANON_KEY` é a chave **publishable** — pública por design e segura no
  navegador. O RLS só permite inserir (não dá para ler/editar/apagar pela página).

## Banco de dados
Tabela criada pelo script [db/schema.sql](db/schema.sql). O **mesmo** projeto
Supabase atende esta landing e a `casabela-jornada` — a coluna `origem` separa de
onde veio cada lead.

## Editar e atualizar
Edite os arquivos aqui e rode:
```
git add -A && git commit -m "sua mensagem" && git push
```
A Vercel republica automaticamente a cada push.
