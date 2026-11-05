# Oficina Conexão

Aplicação web inicial construída com React, Vite e Supabase.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm
- Projeto Supabase

## Executar localmente

```bash
npm install
```

No Windows PowerShell, crie o arquivo local de ambiente:

```powershell
Copy-Item .env.example .env.local
```

Preencha `.env.local` com a URL do projeto e a chave pública (*publishable key*) do Supabase:

```env
VITE_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
```

Depois inicie o projeto:

```bash
npm run dev
```

Nunca coloque uma chave `service_role` ou secret key no frontend. Use somente a chave pública (*publishable key*).

## Preparar o banco de dados

O arquivo [supabase/schema.sql](supabase/schema.sql) contém a tabela `pessoas` e sua política inicial de segurança. Ele já foi aplicado ao projeto Supabase desta aplicação.

A tabela permite inserir nomes sem autenticação, mas não concede leitura pública dos registros.

## Scripts

- `npm run dev`: inicia o ambiente local.
- `npm run build`: gera a versão de produção em `dist/`.
- `npm run preview`: visualiza a versão de produção.

## Estrutura

```text
src/
  lib/supabase.js
  App.jsx
  main.jsx
  styles.css
supabase/
  schema.sql
```