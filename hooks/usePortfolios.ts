"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"

export type Portfolio = {
  id: string
  name: string
  description: string | null
  template_id: string
  published: boolean
  slug: string
  created_at: string
  updated_at: string
  custom_domain: string | null
  seo?: {
    title: string
    description: string
    keywords: string[]
    og_image: string | null
  } | null
}

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchPortfolios = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data: user } = await supabase.auth.getUser()

      if (!user.user) {
        setIsLoading(false)
        setError("User not authenticated")
        return
      }

      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.user.id)
        .order("updated_at", { ascending: false })

      if (error) {
        throw error
      }

      setPortfolios(data || [])
    } catch (err) {
      console.error("Error fetching portfolios:", err)
      setError("Failed to fetch portfolios")
    } finally {
      setIsLoading(false)
    }
  }

  const createPortfolio = async (portfolioData: Omit<Portfolio, "id" | "created_at" | "updated_at">) => {
    try {
      const { data: user } = await supabase.auth.getUser()

      if (!user.user) {
        throw new Error("User not authenticated")
      }

      const { data, error } = await supabase
        .from("portfolios")
        .insert([
          {
            ...portfolioData,
            user_id: user.user.id,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      // Refresh the portfolios list
      await fetchPortfolios()

      return data?.[0]
    } catch (err) {
      console.error("Error creating portfolio:", err)
      throw err
    }
  }

  const updatePortfolio = async (id: string, updates: Partial<Portfolio>) => {
    try {
      const { error } = await supabase.from("portfolios").update(updates).eq("id", id)

      if (error) {
        throw error
      }

      // Refresh the portfolios list
      await fetchPortfolios()
    } catch (err) {
      console.error("Error updating portfolio:", err)
      throw err
    }
  }

  const deletePortfolio = async (id: string) => {
    try {
      const { error } = await supabase.from("portfolios").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Refresh the portfolios list
      await fetchPortfolios()
    } catch (err) {
      console.error("Error deleting portfolio:", err)
      throw err
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  return {
    portfolios,
    isLoading,
    error,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  }
}
