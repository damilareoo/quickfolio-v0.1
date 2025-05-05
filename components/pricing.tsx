"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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
    <section id="pricing" className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Simple, Transparent Pricing</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose the plan that's right for you and start building your portfolio today.
        </p>

        <div className="flex items-center space-x-2 mt-6">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === "annual"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
          />
          <Label htmlFor="billing-cycle" className="flex items-center">
            Annual
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-100">
              Save 20%
            </span>
          </Label>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-12 grid max-w-screen-lg gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {plans.map((plan, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className={cn("flex h-full flex-col", plan.popular && "border-primary shadow-md")}>
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader className={cn(plan.popular && "pt-8")}>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price[billingCycle]}</span>
                  <span className="text-muted-foreground">{plan.price[billingCycle] > 0 ? "/month" : ""}</span>
                  {billingCycle === "annual" && plan.price.annual > 0 && (
                    <p className="text-sm text-muted-foreground">Billed annually (${plan.price.annual * 12}/year)</p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
