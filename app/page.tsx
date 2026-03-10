import { ActiveTerminal } from "@/components/landing/active-terminal";
import { TechMatrix } from "@/components/landing/tech-matrix";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, ChevronDown } from "lucide-react";
import ContactPage from "@/app/contact/page";
import { AboutMe } from "@/components/landing/about-me";
import { ExperienceTimeline } from "@/components/landing/experience-timeline";
import { TestimonialsCarousel } from "@/components/landing/testimonials-carousel";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto space-y-12">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center mt-20 pt-10 space-y-8 relative w-full">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 w-full">
          {/* ── Left: Text Content ── */}
          <div className="space-y-6 text-center md:text-left flex-1 max-w-2xl">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 tracking-widest uppercase">
              Software Engineer • 2+ Year Exp.
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-500 pb-4">
              Morgan<br />Hardjadinata
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              I am a software engineer specializing in industrial equipment automation, embedded system failure analysis, and LLM &amp; MLLM workflow automation.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a href="/Morgan_Hardjadinata_Resume.pdf" download="Morgan_Hardjadinata_Resume.pdf" className="flex items-center gap-2 bg-primary text-black font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] hover:scale-105 active:scale-95 duration-200">
                <Download className="w-5 h-5" /> Download CV
              </a>
              <a href="#contact" className="flex items-center gap-2 bg-white/5 border border-zinc-700 text-zinc-200 font-semibold px-6 py-3 rounded-xl hover:bg-white/10 hover:border-zinc-500 transition-all hover:scale-105 active:scale-95 duration-200">
                <Mail className="w-5 h-5" /> Contact Me
              </a>
            </div>
          </div>

          {/* ── Right: Portrait Image ── */}
          <div className="relative flex-shrink-0">
            <div className="relative w-80 h-96 md:w-96 md:h-[28rem] lg:w-[28rem] lg:h-[35rem] rounded-2xl overflow-hidden border border-zinc-800/60 shadow-2xl bg-zinc-900 flex items-center justify-center">
              <img src="/me.jpg" alt="Morgan" className="w-full h-full object-cover object-top" />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Available for work badge */}
            <div className="absolute -bottom-3 -left-4 bg-[#0a0a0a]/90 backdrop-blur-md border border-zinc-700 rounded-xl px-4 py-2 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-20 hover:scale-105 transition-transform cursor-default">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="text-xs font-semibold text-zinc-200 tracking-wide uppercase">Available for work</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-12 z-20 flex flex-col md:flex-row items-center md:items-center gap-8">
          <ActiveTerminal />
          <div className="hidden md:flex flex-1 justify-center mb-8">
            <div className="flex flex-col items-center gap-2 text-zinc-500 animate-bounce">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold">Scroll</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Skills Section */}
      <section className="w-full relative z-20 overflow-hidden py-2">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="flex flex-col items-center justify-center text-center mb-12 relative z-10">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3">My Toolkit</span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-200">Technology I Work With</h2>
          <p className="text-zinc-500 mt-2 max-w-md">From edge firmware to distributed AI systems — the stack I use to build at scale.</p>
        </div>
        <TechMatrix />
      </section>

      <FeaturedProjects />

      {/* About Me Section */}
      <section id="about" className="w-full relative z-20 max-w-6xl overflow-hidden py-2">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <AboutMe />
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="w-full relative z-20 max-w-6xl overflow-hidden py-2">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <ExperienceTimeline />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full relative z-20 max-w-6xl">
        <TestimonialsCarousel />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full relative z-20 max-w-6xl mb-32">
        <ContactPage />
      </section>

    </div>
  );
}