"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the AI content generation work?",
    answer:
      "Our AI analyzes your input information and generates personalized content for your portfolio. It can create project descriptions, professional bios, and skill summaries based on your experience and industry.",
  },
  {
    question: "Can I use my own domain name?",
    answer:
      "Yes! You can connect your own custom domain to your Quickfolio site on the Pro and Team plans. We provide easy instructions for setting up DNS records, or you can use our free subdomain (yourname.quickfolio.com).",
  },
  {
    question: "How customizable are the templates?",
    answer:
      "All templates are fully customizable. You can change colors, fonts, layouts, and content to match your personal brand. Pro and Team plans offer additional customization options like custom CSS and advanced layout controls.",
  },
  {
    question: "Can I export my portfolio code?",
    answer:
      "Yes, Pro and Team plans allow you to export your portfolio's source code for self-hosting or further customization. The exported code is clean, well-documented, and ready for deployment.",
  },
  {
    question: "How do I deploy my portfolio?",
    answer:
      "Quickfolio offers one-click deployment to Vercel. Your portfolio will be instantly available online with a secure HTTPS connection and global CDN distribution for fast loading times worldwide.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes, we offer a free plan that includes basic templates and hosting on a Quickfolio subdomain. It's perfect for getting started and testing the platform before upgrading to a paid plan.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" className="py-24 relative" ref={ref}>
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-16">
          <span className="inline-block rounded-full border border-white/10 bg-black px-3 py-1 text-xs text-white mb-2">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="max-w-[85%] leading-normal text-white/70 md:text-lg">
            Find answers to common questions about Quickfolio.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-white/5 bg-black px-6 py-2"
              >
                <AccordionTrigger className="text-base font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-white/70">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
