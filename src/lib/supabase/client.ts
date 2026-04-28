"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";
import { getSupabaseBrowserConfig } from "@/lib/env";

export function createClient() {
  const { url, key } = getSupabaseBrowserConfig();
  return createBrowserClient<Database>(url, key);
}
