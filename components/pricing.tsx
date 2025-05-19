"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: { monthly: 0, annual: 0 },
    features: ["1 portfolio site", "Basic templates", "Quickfolio subdomain", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For professionals and freelancers",
    price: { monthly: 12, annual: 9 },
    features: [
      "5 portfolio sites",
      "All templates",
      "Custom domain",
      "AI content generation",
      "Analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    description: "For agencies and teams",
    price: { monthly: 29, annual: 24 },
    features: [
      "20 portfolio sites",
      "All templates",
      "Custom domains",
      "AI content generation",
      "Advanced analytics",
      "Team collaboration",
      "Dedicated support",
      "White labeling",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="pricing" className="py-24 relative" ref={ref}>
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
          <Badge variant="outline" className="mb-2">
            Pricing
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground md:text-lg">
            Choose the plan that's right for you and start building your portfolio today.
          </p>

          <div className="flex items-center space-x-2 mt-6 bg-surface-muted rounded-full p-1 border border-white/5">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                billingCycle === "monthly" ? "bg-white text-black" : "text-muted-foreground hover:text-white",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2",
                billingCycle === "annual" ? "bg-white text-black" : "text-muted-foreground hover:text-white",
              )}
            >
              <span>Annual</span>
              <span className="bg-green-900 text-green-100 text-xs px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants} className={cn("card-hover", plan.popular && "lg:-mt-8")}>
              <div
                className={cn(
                  "relative rounded-xl border border-white/5 bg-surface p-6 h-full flex flex-col",
                  plan.popular && "border-white/20 bg-surface-bright",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                    <Badge className="bg-white text-black">Most Popular</Badge>
                  </div>
                )}

                <div className={cn("mb-6", plan.popular && "pt-4")}>
                  <h3 className="text-xl font-medium">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price[billingCycle]}</span>
                    <span className="text-muted-foreground ml-1">{plan.price[billingCycle] > 0 ? "/month" : ""}</span>
                  </div>

                  {billingCycle === "annual" && plan.price.annual > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                </div>

                <div className="mb-8 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-white shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={cn("w-full", plan.popular ? "bg-white text-black hover:bg-white/90" : "variant-outline")}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
