"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MasidPreview() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Back to Quickfolio button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className="rounded-full border-white/20 bg-black/50 backdrop-blur">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quickfolio
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="py-16 px-8 md:px-16 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600 to-transparent opacity-20" />
        <div className="relative z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-6xl font-bold mb-6 leading-tight">Sarah Williams</h1>
            <p className="text-2xl mb-8 text-purple-300">Creative Director & Designer</p>
            <p className="text-lg max-w-xl">
              I create bold, expressive designs that push boundaries and captivate audiences.
            </p>
            <div className="flex gap-4 mt-10">
              <Button className="bg-purple-600 hover:bg-purple-700">View Work</Button>
              <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/20">
                Contact
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-16 px-8 md:px-16">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 max-w-4xl"
        >
          <h2 className="text-4xl font-bold mb-12 text-purple-300">About</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl leading-relaxed">
              With over a decade of experience in the creative industry, I specialize in brand identity, digital design,
              and art direction. My work is characterized by bold typography, vibrant colors, and innovative concepts
              that help brands stand out in today's crowded marketplace.
            </p>
            <p className="text-xl leading-relaxed">
              I believe that great design is not just about aesthetics, but about solving problems and creating
              meaningful connections between brands and their audiences. My approach combines strategic thinking with
              creative execution to deliver results that exceed expectations.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-24 max-w-4xl"
        >
          <h2 className="text-4xl font-bold mb-12 text-purple-300">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Brand Identity",
              "UI/UX Design",
              "Typography",
              "Art Direction",
              "Motion Design",
              "3D Design",
              "Illustration",
              "Creative Strategy",
              "Adobe Creative Suite",
              "Figma",
              "Blender",
              "Cinema 4D",
            ].map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-purple-900/50 rounded-md text-base">
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-24 max-w-4xl"
        >
          <h2 className="text-4xl font-bold mb-12 text-purple-300">Experience</h2>
          <div className="space-y-12">
            {[
              {
                role: "Creative Director",
                company: "Studio Masid",
                period: "2019 - Present",
                description:
                  "Leading creative direction for global brands, overseeing a team of designers, and developing innovative visual strategies.",
              },
              {
                role: "Senior Designer",
                company: "Arthaus Agency",
                period: "2015 - 2019",
                description:
                  "Created brand identities and digital experiences for clients in fashion, technology, and entertainment sectors.",
              },
              {
                role: "Visual Designer",
                company: "Digital Collective",
                period: "2012 - 2015",
                description:
                  "Designed websites, apps, and marketing materials for startups and established businesses.",
              },
            ].map((exp, index) => (
              <div key={index} className="border-l-4 border-purple-600 pl-8 py-2">
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <div className="flex items-center text-purple-300 mb-2">
                  <span>{exp.company}</span>
                  <span className="mx-2">•</span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-purple-300">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Neon Branding",
                description: "Brand identity for a tech startup with a focus on bold typography and vibrant colors.",
                image: "/preview/masid-project1.png",
              },
              {
                title: "Luxury Fashion App",
                description: "Mobile app design for a luxury fashion brand with immersive shopping experience.",
                image: "/preview/masid-project2.png",
              },
              {
                title: "Album Artwork",
                description: "Creative direction and artwork design for an electronic music artist's album release.",
                image: "/preview/masid-project3.png",
              },
              {
                title: "Immersive Exhibition",
                description: "Digital installation design for an interactive art exhibition featuring 3D elements.",
                image: "/preview/masid-project4.png",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-zinc-900 rounded-lg p-8 hover:bg-zinc-800 transition-colors"
              >
                <div className="aspect-video bg-zinc-800 rounded-md mb-6 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={340}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/20">
                  View Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-purple-300">Contact</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Interested in working together? Let's create something extraordinary.
          </p>
          <div className="flex justify-center gap-6">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Mail className="mr-2 h-5 w-5" />
              Email Me
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/20">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </Button>
          </div>
        </motion.section>
      </main>

      <footer className="py-12 px-8 md:px-16 border-t border-zinc-800 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Sarah Williams</h3>
            <p className="text-purple-300">Creative Director & Designer</p>
          </div>
          <div className="flex gap-4">
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-900/20">
              <Mail className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-900/20">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-900/20">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-900/20">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Sarah Williams. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
