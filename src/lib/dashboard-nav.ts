import {
  BadgeDollarSign,
  CreditCard,
  IdCard,
  LayoutDashboard,
  ReceiptText,
  Settings2,
  UserCog,
  Users,
} from "lucide-react";

export const dashboardNavItems = [
  {
    href: "/dashboard",
    label: "Visao geral",
    description: "KPIs e operacao do caixa",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/clientes",
    label: "Clientes",
    description: "Saldos, CPF e historico",
    icon: Users,
  },
  {
    href: "/dashboard/transacoes",
    label: "Transacoes",
    description: "Creditos e resgates",
    icon: ReceiptText,
  },
  {
    href: "/dashboard/cartoes",
    label: "Cartoes",
    description: "PVC, QR Code e status",
    icon: IdCard,
  },
  {
    href: "/dashboard/equipe",
    label: "Equipe",
    description: "Operadores e permissoes",
    icon: UserCog,
  },
  {
    href: "/dashboard/configuracoes",
    label: "Configuracoes",
    description: "Regras da loja",
    icon: Settings2,
  },
  {
    href: "/dashboard/assinatura",
    label: "Assinatura",
    description: "Planos e cobrancas",
    icon: CreditCard,
  },
];

export const dashboardBrand = {
  name: "CASHBACK SUPER",
  icon: BadgeDollarSign,
};
