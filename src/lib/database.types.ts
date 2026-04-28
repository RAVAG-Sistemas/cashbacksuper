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
      transaction_type: "credit" | "debit";
    };
    CompositeTypes: Record<string, never>;
  };
};
