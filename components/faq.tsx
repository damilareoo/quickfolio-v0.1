"use client"

import { motion } from "framer-motion"

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
  return (
    <section id="faq" className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Frequently Asked Questions</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Find answers to common questions about Quickfolio.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 max-w-3xl"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
