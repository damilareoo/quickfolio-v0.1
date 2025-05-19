"use client"
import { Icons } from "@/components/icons"

interface PortfolioPreviewProps {
  template: string
  data: {
    name: string
    description: string
    profession: string
    about: string
    skills: string
    experience: string
    projects: string
    contact: string
  }
}

export function PortfolioPreview({ template, data }: PortfolioPreviewProps) {
  // Render different preview based on template
  if (template === "minimalist") {
    return <DamilarePreview data={data} />
  } else if (template === "professional") {
    return <LayersPreview data={data} />
  } else if (template === "creative") {
    return <MasidPreview data={data} />
  } else if (template === "bento") {
    return <BentoPreview data={data} />
  }

  // Default preview
  return (
    <div className="flex items-center justify-center h-[600px] border rounded-lg">
      <div className="text-center">
        <Icons.fileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Select a template to preview</h3>
        <p className="text-sm text-muted-foreground">Choose a template from the previous step to see a preview</p>
      </div>
    </div>
  )
}

function DamilarePreview({ data }: { data: PortfolioPreviewProps["data"] }) {
  return (
    <div className="overflow-hidden border rounded-lg h-[600px] bg-white dark:bg-gray-900">
      <div className="h-full overflow-auto">
        {/* Header - D  bg-white dark:bg-gray-900">
      <div className="h-full overflow-auto">
        {/* Header - Damilare style with fixed header */}
        <header className="sticky top-0 py-4 px-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{data.name || "Your Name"}</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className="text-sm font-medium hover:text-gray-900 dark:hover:text-white">
                About
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-gray-900 dark:hover:text-white">
                Projects
              </a>
              <a href="#experience" className="text-sm font-medium hover:text-gray-900 dark:hover:text-white">
                Experience
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-gray-900 dark:hover:text-white">
                Contact
              </a>
            </nav>
            <button className="md:hidden">
              <Icons.menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Hero section */}
        <section className="py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-3">{data.profession || "Your Profession"}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {data.description || "A brief description of your portfolio"}
              </p>
              <div className="flex space-x-3">
                <button className="inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                  Contact Me
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Icons.download className="mr-2 h-4 w-4" />
                  Resume
                </button>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4">About Me</h3>
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-sm leading-relaxed">{data.about || "No information provided yet."}</p>
          </div>
        </section>

        {/* Skills section */}
        <section className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills ? (
              data.skills.split(",").map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs">
                  {skill.trim()}
                </span>
              ))
            ) : (
              <p>No skills listed yet.</p>
            )}
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4">Projects</h3>
          {data.projects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.split("\n").map((project, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800"></div>
                  <div className="p-4">
                    <h4 className="text-base font-semibold mb-2">{project.split(" - ")[0]}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{project.split(" - ")[1] || ""}</p>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Icons.externalLink className="mr-1 h-3 w-3" />
                        Live Demo
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Icons.gitHub className="mr-1 h-3 w-3" />
                        Source Code
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects listed yet.</p>
          )}
        </section>

        {/* Experience section */}
        <section id="experience" className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4">Experience</h3>
          {data.experience ? (
            <div className="space-y-4">
              {data.experience.split("\n").map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-1">
                  <h4 className="text-base font-semibold">{exp.split(" at ")[0] || exp}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{exp.split(" at ")[1] || ""}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No experience listed yet.</p>
          )}
        </section>

        {/* Contact section */}
        <section id="contact" className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Icons.mail className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Icons.linkedin className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Icons.twitter className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Icons.gitHub className="h-4 w-4" />
                </button>
              </div>
            </div>
            <form className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Message</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-transparent resize-none"
                ></textarea>
              </div>
              <button className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {data.name || "Your Name"}. All rights reserved.
            </p>
            <div className="flex space-x-3 mt-3 md:mt-0">
              <button className="text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Icons.mail className="mr-1 h-3 w-3 inline-block" />
                Contact
              </button>
              <button className="text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Icons.download className="mr-1 h-3 w-3 inline-block" />
                Resume
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function LayersPreview({ data }: { data: PortfolioPreviewProps["data"] }) {
  return (
    <div className="overflow-hidden border rounded-lg h-[600px] bg-white">
      <div className="h-full overflow-auto">
        {/* Header - Layers.to style with centered content */}
        <header className="py-12 px-8 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{data.name || "Your Name"}</h1>
          <p className="text-xl text-muted-foreground mb-6">{data.profession || "Your Profession"}</p>
          <p className="text-lg max-w-2xl mx-auto">{data.description || "A brief description of your portfolio"}</p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
              Contact Me
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              View Projects
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="py-12 px-8 max-w-3xl mx-auto">
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">About Me</h2>
            <div className="prose max-w-none">
              <p className="leading-relaxed">{data.about || "No information provided yet."}</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {data.skills ? (
                data.skills.split(",").map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p>No skills listed yet.</p>
              )}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Experience</h2>
            {data.experience ? (
              <div className="space-y-6">
                {data.experience.split("\n").map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 py-2">
                    <p>{exp}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No experience listed yet.</p>
            )}
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Projects</h2>
            {data.projects ? (
              <div className="grid gap-6 md:grid-cols-2">
                {data.projects.split("\n").map((project, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-medium mb-2">{project.split(" - ")[0]}</h3>
                    <p className="text-sm text-muted-foreground">{project.split(" - ")[1] || ""}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No projects listed yet.</p>
            )}
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
            <div className="flex justify-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Icons.mail className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Icons.linkedin className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Icons.twitter className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Icons.gitHub className="h-5 w-5" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function MasidPreview({ data }: { data: PortfolioPreviewProps["data"] }) {
  return (
    <div className="overflow-hidden border rounded-lg h-[600px] bg-black text-white">
      <div className="h-full overflow-auto">
        {/* Header - Masid.design style with bold typography and asymmetric layout */}
        <header className="py-16 px-8 md:px-16 relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600 to-transparent opacity-20" />
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">{data.name || "Your Name"}</h1>
            <p className="text-2xl mb-8 text-purple-300">{data.profession || "Your Profession"}</p>
            <p className="text-lg max-w-xl">{data.description || "A brief description of your portfolio"}</p>
            <div className="flex gap-4 mt-10">
              <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
                View Work
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-purple-600 bg-transparent px-4 py-2 text-sm font-medium text-purple-300 hover:bg-purple-900/20 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="py-16 px-8 md:px-16">
          <section className="mb-24 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-purple-300">About</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-xl leading-relaxed">{data.about || "No information provided yet."}</p>
            </div>
          </section>

          <section className="mb-24 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-purple-300">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {data.skills ? (
                data.skills.split(",").map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-900/50 rounded-md text-base">
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p>No skills listed yet.</p>
              )}
            </div>
          </section>

          <section className="mb-24 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-purple-300">Experience</h2>
            {data.experience ? (
              <div className="space-y-12">
                {data.experience.split("\n").map((exp, index) => (
                  <div key={index} className="border-l-4 border-purple-600 pl-8 py-2">
                    <p className="text-xl">{exp}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No experience listed yet.</p>
            )}
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-purple-300">Projects</h2>
            {data.projects ? (
              <div className="grid gap-8 md:grid-cols-2">
                {data.projects.split("\n").map((project, index) => (
                  <div key={index} className="bg-zinc-900 rounded-lg p-8 hover:bg-zinc-800 transition-colors">
                    <h3 className="text-2xl font-bold mb-4">{project.split(" - ")[0]}</h3>
                    <p className="text-gray-400">{project.split(" - ")[1] || ""}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects listed yet.</p>
            )}
          </section>

          <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-purple-300">Contact</h2>
            <div className="flex justify-center gap-6">
              <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
                <Icons.mail className="mr-2 h-5 w-5" />
                Email Me
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-purple-600 bg-transparent px-4 py-2 text-sm font-medium text-purple-300 hover:bg-purple-900/20 transition-colors">
                <Icons.linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function BentoPreview({ data }: { data: PortfolioPreviewProps["data"] }) {
  return (
    <div className="overflow-hidden border rounded-lg h-[600px] bg-zinc-50 dark:bg-zinc-900">
      <div className="h-full overflow-auto">
        {/* Header - Bento.me/RecentWork style with grid layout */}
        <header className="p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <h1 className="text-3xl font-bold mb-2">{data.name || "Your Name"}</h1>
              <p className="text-lg text-muted-foreground mb-4">{data.profession || "Your Profession"}</p>
              <p>{data.description || "A brief description of your portfolio"}</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm flex flex-col justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-700 mb-4"></div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <Icons.twitter className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <Icons.gitHub className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <Icons.linkedin className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icons.user className="mr-2 h-5 w-5" />
                About Me
              </h2>
              <p className="leading-relaxed">{data.about || "No information provided yet."}</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icons.zap className="mr-2 h-5 w-5" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills ? (
                  data.skills.split(",").map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm">
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <p>No skills listed yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Icons.briefcase className="mr-2 h-5 w-5" />
              Experience
            </h2>
            {data.experience ? (
              <div className="space-y-4">
                {data.experience.split("\n").map((exp, index) => (
                  <div key={index} className="border-l-2 border-zinc-300 dark:border-zinc-600 pl-4 py-1">
                    <p>{exp}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No experience listed yet.</p>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Icons.layout className="mr-2 h-5 w-5" />
            Projects
          </h2>
          {data.projects ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.projects.split("\n").map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium mb-2">{project.split(" - ")[0]}</h3>
                  <p className="text-sm text-muted-foreground">{project.split(" - ")[1] || ""}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects listed yet.</p>
          )}
        </main>
      </div>
    </div>
  )
}
