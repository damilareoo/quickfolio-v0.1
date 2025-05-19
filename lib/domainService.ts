import { createServerSupabaseClient } from "@/lib/supabase"

export type DomainStatus = {
  configured: boolean
  status: "valid" | "invalid" | "pending"
  message?: string
}

export type DomainVerification = {
  type: "CNAME" | "A" | "TXT"
  name: string
  value: string
}

/**
 * Add a custom domain to a portfolio
 */
export async function addCustomDomain(
  portfolioId: string,
  domain: string,
): Promise<{ success: boolean; message: string; verifications?: DomainVerification[] }> {
  try {
    // Validate domain format
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i
    if (!domainRegex.test(domain)) {
      return {
        success: false,
        message: "Invalid domain format",
      }
    }

    // Check if domain is already in use
    const supabase = createServerSupabaseClient()
    const { data: existingDomain } = await supabase.from("portfolios").select("id").eq("custom_domain", domain).single()

    if (existingDomain) {
      return {
        success: false,
        message: "Domain is already in use by another portfolio",
      }
    }

    // Update portfolio with custom domain
    const { error } = await supabase.from("portfolios").update({ custom_domain: domain }).eq("id", portfolioId)

    if (error) {
      throw error
    }

    // Return verification instructions
    return {
      success: true,
      message: "Domain added successfully. Please configure the following DNS records:",
      verifications: [
        {
          type: "CNAME",
          name: domain,
          value: "quickfolio-domains.vercel.app",
        },
        {
          type: "TXT",
          name: `_quickfolio-verify.${domain}`,
          value: `portfolio=${portfolioId}`,
        },
      ],
    }
  } catch (error) {
    console.error("Error adding custom domain:", error)
    return {
      success: false,
      message: "Failed to add custom domain",
    }
  }
}

/**
 * Get the status of a custom domain
 */
export async function getDomainStatus(
  portfolioId: string,
): Promise<{ domain: string | null; status: DomainStatus | null }> {
  try {
    const supabase = createServerSupabaseClient()
    const { data: portfolio } = await supabase.from("portfolios").select("custom_domain").eq("id", portfolioId).single()

    if (!portfolio?.custom_domain) {
      return {
        domain: null,
        status: null,
      }
    }

    // In a real implementation, this would check DNS records and certificate status
    // For this example, we'll simulate a successful verification
    return {
      domain: portfolio.custom_domain,
      status: {
        configured: true,
        status: "valid",
        message: "Domain is properly configured and SSL certificate is active",
      },
    }
  } catch (error) {
    console.error("Error getting domain status:", error)
    return {
      domain: null,
      status: null,
    }
  }
}

/**
 * Remove a custom domain from a portfolio
 */
export async function removeDomain(portfolioId: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("portfolios").update({ custom_domain: null }).eq("id", portfolioId)

    if (error) {
      throw error
    }

    return {
      success: true,
      message: "Custom domain removed successfully",
    }
  } catch (error) {
    console.error("Error removing custom domain:", error)
    return {
      success: false,
      message: "Failed to remove custom domain",
    }
  }
}
