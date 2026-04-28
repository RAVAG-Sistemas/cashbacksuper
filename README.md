# Cashback Super

Micro-SaaS de cashback para lojistas, feito com Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase e Resend.

## Rotas

- `/dashboard`: painel autenticado do lojista para configurar loja, cadastrar clientes, ativar cartao PVC, registrar compras e resgatar saldo.
- `/consulta`: pagina publica para o cliente consultar saldo por CPF ou codigo do cartao.
- `/login`: login com Supabase Auth.

## Setup

1. Copie `.env.example` para `.env.local`.
2. Preencha as chaves do Supabase e Resend.
3. Rode o SQL de `supabase/schema.sql` no SQL editor do Supabase.
4. Inicie o projeto:

```bash
npm run dev
```

## Entregaveis principais

- Schema Supabase com RLS: `supabase/schema.sql`
- Server Actions: `src/app/actions.ts`
- Painel do lojista: `src/app/dashboard/page.tsx` e `src/components/dashboard-client.tsx`
- Consulta publica: `src/app/consulta/page.tsx` e `src/components/balance-search.tsx`
- Gerador de URL de QR Code: `src/lib/qr.ts`

## Observacoes de seguranca

- A consulta publica usa `SUPABASE_SERVICE_ROLE_KEY` somente no servidor. Nunca exponha essa chave com prefixo `NEXT_PUBLIC_`.
- CPF e telefone sao dados pessoais. Para producao, revise politica de retencao, consentimento e mascaramento de dados conforme LGPD.
- Dados de nome por CPF nao foram buscados automaticamente porque APIs gratuitas geralmente nao retornam dados de pessoa fisica por restricoes de privacidade.
