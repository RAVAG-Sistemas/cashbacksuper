# Mercado Pago - Preparacao da Integracao

Baseado na documentacao oficial de Subscriptions do Mercado Pago:

- Overview: https://www.mercadopago.com.br/developers/en/docs/subscriptions/overview
- Plano associado: https://www.mercadopago.com.br/developers/en/docs/subscriptions/integration-configuration/subscription-associated-plan
- Assinatura pendente: https://www.mercadopago.com.br/developers/en/docs/subscriptions/integration-configuration/subscription-no-associated-plan/pending-payments
- Webhooks: https://www.mercadopago.com.br/developers/pt/docs/subscriptions/additional-content/your-integrations/notifications/webhooks

## Modelo recomendado

O Cashback Super deve usar a API de assinaturas, nao checkout avulso.

### Entidades locais

- `plans`: planos comerciais do SaaS.
- `subscriptions`: assinatura da loja.
- `invoices`: cobrancas, pagamentos e faturas.
- `webhook_events`: eventos recebidos do Mercado Pago, com idempotencia.

### Fluxo de assinatura

1. Lojista acessa `/dashboard/assinatura`.
2. Seleciona um plano.
3. App cria ou reutiliza um `preapproval_plan`.
4. App cria uma assinatura `/preapproval` com `external_reference` apontando para a loja.
5. Mercado Pago retorna link/status.
6. Webhook confirma mudancas de status.
7. App atualiza `subscriptions.status`.

### Status internos

- `trialing`
- `active`
- `past_due`
- `paused`
- `canceled`

## Webhook

Endpoint futuro:

```txt
POST /api/mercado-pago/webhook
```

Regras:

- Validar assinatura secreta enviada pelo Mercado Pago.
- Salvar evento bruto em `webhook_events`.
- Ignorar evento ja processado.
- Buscar assinatura/pagamento na API do Mercado Pago.
- Atualizar `subscriptions` e `invoices`.
- Nunca confiar apenas no payload inicial do webhook.

## Variaveis de ambiente futuras

```txt
MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_WEBHOOK_SECRET=
MERCADO_PAGO_PUBLIC_KEY=
NEXT_PUBLIC_APP_URL=
```

## Feature gating

O bloqueio final deve existir no banco, via RLS ou funcoes SQL. A interface pode esconder recursos, mas a seguranca real precisa negar escrita para lojas sem assinatura ativa.
