export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          cashback_percentage: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          cashback_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          cashback_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          store_id: string;
          cpf_digits: string;
          name: string;
          phone: string | null;
          email: string | null;
          cashback_balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          cpf_digits: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          cashback_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          cpf_digits?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          cashback_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      cards: {
        Row: {
          id: string;
          store_id: string;
          customer_id: string | null;
          code: string;
          status: "active" | "inactive" | "lost";
          activated_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          customer_id?: string | null;
          code: string;
          status?: "active" | "inactive" | "lost";
          activated_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          customer_id?: string | null;
          code?: string;
          status?: "active" | "inactive" | "lost";
          activated_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          store_id: string;
          customer_id: string;
          type: "credit" | "debit";
          purchase_amount: number | null;
          amount: number;
          description: string | null;
          sku: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          customer_id: string;
          type: "credit" | "debit";
          purchase_amount?: number | null;
          amount: number;
          description?: string | null;
          sku?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          customer_id?: string;
          type?: "credit" | "debit";
          purchase_amount?: number | null;
          amount?: number;
          description?: string | null;
          sku?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      plans: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price_cents: number;
          monthly_transaction_limit: number | null;
          operator_limit: number | null;
          mercado_pago_plan_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          price_cents: number;
          monthly_transaction_limit?: number | null;
          operator_limit?: number | null;
          mercado_pago_plan_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          price_cents?: number;
          monthly_transaction_limit?: number | null;
          operator_limit?: number | null;
          mercado_pago_plan_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          store_id: string;
          plan_id: string | null;
          status: "trialing" | "active" | "past_due" | "paused" | "canceled";
          mercado_pago_preapproval_id: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          trial_ends_at: string | null;
          canceled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          plan_id?: string | null;
          status?: "trialing" | "active" | "past_due" | "paused" | "canceled";
          mercado_pago_preapproval_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          trial_ends_at?: string | null;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          plan_id?: string | null;
          status?: "trialing" | "active" | "past_due" | "paused" | "canceled";
          mercado_pago_preapproval_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          trial_ends_at?: string | null;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          store_id: string;
          subscription_id: string | null;
          status: "pending" | "paid" | "failed" | "void";
          amount_cents: number;
          currency: string;
          mercado_pago_payment_id: string | null;
          hosted_invoice_url: string | null;
          due_at: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          subscription_id?: string | null;
          status?: "pending" | "paid" | "failed" | "void";
          amount_cents: number;
          currency?: string;
          mercado_pago_payment_id?: string | null;
          hosted_invoice_url?: string | null;
          due_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          subscription_id?: string | null;
          status?: "pending" | "paid" | "failed" | "void";
          amount_cents?: number;
          currency?: string;
          mercado_pago_payment_id?: string | null;
          hosted_invoice_url?: string | null;
          due_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      webhook_events: {
        Row: {
          id: string;
          provider: string;
          external_event_id: string;
          event_type: string | null;
          payload: Json;
          processed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          external_event_id: string;
          event_type?: string | null;
          payload: Json;
          processed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider?: string;
          external_event_id?: string;
          event_type?: string | null;
          payload?: Json;
          processed_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      email_logs: {
        Row: {
          id: string;
          store_id: string | null;
          customer_id: string | null;
          template: string;
          recipient: string;
          subject: string;
          status: "pending" | "sent" | "failed";
          provider_message_id: string | null;
          error_message: string | null;
          payload: Json;
          scheduled_at: string;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id?: string | null;
          customer_id?: string | null;
          template: string;
          recipient: string;
          subject: string;
          status?: "pending" | "sent" | "failed";
          provider_message_id?: string | null;
          error_message?: string | null;
          payload?: Json;
          scheduled_at?: string;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string | null;
          customer_id?: string | null;
          template?: string;
          recipient?: string;
          subject?: string;
          status?: "pending" | "sent" | "failed";
          provider_message_id?: string | null;
          error_message?: string | null;
          payload?: Json;
          scheduled_at?: string;
          sent_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      register_purchase: {
        Args: {
          p_customer_id: string;
          p_purchase_amount: number;
          p_description?: string | null;
          p_sku?: string | null;
        };
        Returns: Database["public"]["Tables"]["transactions"]["Row"];
      };
      redeem_cashback: {
        Args: {
          p_customer_id: string;
          p_amount: number;
          p_description?: string | null;
        };
        Returns: Database["public"]["Tables"]["transactions"]["Row"];
      };
    };
    Enums: {
      card_status: "active" | "inactive" | "lost";
      email_status: "pending" | "sent" | "failed";
      invoice_status: "pending" | "paid" | "failed" | "void";
      subscription_status: "trialing" | "active" | "past_due" | "paused" | "canceled";
      transaction_type: "credit" | "debit";
    };
    CompositeTypes: Record<string, never>;
  };
};
