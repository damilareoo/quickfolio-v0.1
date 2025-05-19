import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Types for our database
export type Database = {
  public: {
    tables: {
      portfolios: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          description: string | null
          template_id: string
          published: boolean
          slug: string
          content: any
          custom_domain: string | null
          seo: {
            title: string
            description: string
            keywords: string[]
            og_image: string | null
          } | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          description?: string | null
          template_id: string
          published?: boolean
          slug: string
          content?: any
          custom_domain?: string | null
          seo?: {
            title: string
            description: string
            keywords: string[]
            og_image: string | null
          } | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          name?: string
          description?: string | null
          template_id?: string
          published?: boolean
          slug?: string
          content?: any
          custom_domain?: string | null
          seo?: {
            title: string
            description: string
            keywords: string[]
            og_image: string | null
          } | null
        }
      }
      templates: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          preview_image: string | null
          category: string | null
          featured: boolean
        }
      }
      analytics: {
        Row: {
          id: string
          portfolio_id: string
          page_views: number
          unique_visitors: number
          avg_time_on_page: number
          bounce_rate: number
          created_at: string
          updated_at: string
        }
      }
    }
  }
}

// Create a Supabase client for use on the client side
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Create a Supabase client for use on the server side
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  })
}
