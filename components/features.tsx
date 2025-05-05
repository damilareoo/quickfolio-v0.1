"use client"

import { motion } from "framer-motion"
import { Icons } from "@/components/icons"

const features = [
  {
    icon: Icons.sparkles,
    title: "AI-Powered Content",
    description:
      "Generate personalized portfolio content with our AI assistant. Perfect for showcasing your skills and experience.",
  },
  {
    icon: Icons.palette,
    title: "Customizable Design",
    description: "Easily customize colors, typography, and layout to match your personal brand and style preferences.",
  },
  {
    icon: Icons.layout,
    title: "Professional Templates",
    description: "Choose from a collection of professionally designed templates for any industry or profession.",
  },
  {
    icon: Icons.globe,
    title: "Custom Domain",
    description: "Connect your own domain or use our free subdomain to make your portfolio accessible to everyone.",
  },
  {
    icon: Icons.code,
    title: "Export Code",
    description: "Download your portfolio's source code for self-hosting or further customization by developers.",
  },
  {
    icon: Icons.rocket,
    title: "One-Click Deploy",
    description: "Deploy your portfolio to Vercel with a single click, making it instantly available online.",
  },
]

export function Features() {
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
    <section id="features" className="container space-y-6 bg-slate-50 py-12 dark:bg-transparent md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Features</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Quickfolio comes packed with everything you need to create a stunning portfolio in minutes.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative overflow-hidden rounded-lg border bg-background p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
