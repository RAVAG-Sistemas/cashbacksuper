# Cashback Super - Roadmap SaaS Empresarial

Este documento transforma a visao do produto em fases de implementacao. A ideia e evoluir o MVP atual sem quebrar o que ja funciona.

## Estado atual

- Landing page e paginas institucionais publicadas.
- Painel do lojista com cadastro de cliente, compra, resgate e configuracao basica.
- Consulta publica de saldo por CPF ou cartao.
- Supabase com tabelas principais, RLS e funcoes de compra/resgate.
- Resend instalado e envio basico de cashback.
- Vercel Analytics e Speed Insights ativos.

## Fase 1 - SaaS operavel

- Navegacao premium no dashboard.
- Rotas internas: clientes, transacoes, cartoes, equipe, configuracoes e assinatura.
- Estados vazios com linguagem de produto.
- Templates de e-mail transacionais em HTML premium.
- Documentacao inicial de billing com Mercado Pago.

## Fase 2 - Billing e planos

- Tabelas: plans, subscriptions, invoices e webhook_events.
- Rota `/api/mercado-pago/webhook` com idempotencia.
- Pagina `/dashboard/assinatura` com plano atual, faturas e CTA de upgrade.
- Feature gating por status da assinatura.
- Env vars para credenciais Mercado Pago.

## Fase 3 - Retencao e comunicacao

- Fila de notificacoes com email_logs.
- E-mails para cliente: cashback ganho, saldo expirando, resgate concluido.
- E-mails para lojista: boas-vindas, trial expirando, assinatura vencida, resumo semanal.
- Logs de entrega e reenvio.

## Fase 4 - Operacao e governanca

- RBAC para donos e operadores.
- Portal LGPD para titular dos dados.
- Consentimento versionado.
- Auditoria de alteracoes em clientes e transacoes.
- Painel interno `/admin`.

## Fase 5 - Crescimento

- Blog/SEO com CMS ou MDX estruturado.
- Sitemap dinamico e metadata por pagina.
- WhatsApp via Evolution API.
- Gamificacao e indicacoes.
- OCR de recibos para reduzir digitacao no caixa.
