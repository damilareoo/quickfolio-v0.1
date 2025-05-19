"use client"

import Image from "next/image"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { TextReveal } from "@/components/ui/text-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"

const testimonials = [
  {
    name: "Alex Johnson",
    title: "UX Designer",
    content:
      "Quickfolio helped me create a stunning portfolio in less than an hour. The AI-generated content was spot-on and saved me hours of writing.",
    avatar: "/testimonials/alex-johnson.jpg",
  },
  {
    name: "Michael Chen",
    title: "Software Engineer",
    content:
      "As a developer, I was impressed by how easy it was to showcase my projects. The code snippet feature and GitHub integration are perfect for technical portfolios.",
    avatar: "/testimonials/michael-chen.jpg",
  },
  {
    name: "Sarah Williams",
    title: "Photographer",
    content:
      "The visual-focused templates are perfect for my photography work. The image optimization and gallery features make my portfolio look professional and load quickly.",
    avatar: "/testimonials/sarah-williams.png",
  },
  {
    name: "David Rodriguez",
    title: "Freelance Writer",
    content:
      "Quickfolio's AI helped me articulate my writing experience perfectly. The typography options and blog integration made creating my portfolio a breeze.",
    avatar: "/testimonials/david-rodriguez.png",
  },
  {
    name: "Emily Taylor",
    title: "Graphic Designer",
    content:
      "The customization options are incredible. I was able to match my portfolio exactly to my personal brand, and the design tools are intuitive even for non-designers.",
    avatar: "/testimonials/emily-taylor.png",
  },
  {
    name: "James Wilson",
    title: "Product Manager",
    content:
      "From sign-up to publishing took me just 20 minutes. The templates are professional, and the one-click deploy feature made the whole process seamless.",
    avatar: "/testimonials/james-wilson.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <ParallaxSection className="absolute inset-0 pointer-events-none" speed={0.1} direction="up">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-40" />
      </ParallaxSection>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-16">
          <TextReveal>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">What Our Users Say</h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="max-w-[85%] leading-normal text-neutral-300 sm:text-lg sm:leading-7">
              Join thousands of professionals who have created stunning portfolios with Quickfolio.
            </p>
          </TextReveal>
        </div>

        <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TextReveal key={index} delay={0.1 * (index + 2)}>
              <EnhancedCard hoverEffect="lift" borderGlow>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg text-white">{testimonial.name}</CardTitle>
                      <CardDescription className="text-neutral-400">{testimonial.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-300">"{testimonial.content}"</p>
                </CardContent>
              </EnhancedCard>
            </TextReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
