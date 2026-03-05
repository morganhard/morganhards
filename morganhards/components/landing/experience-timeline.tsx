"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const experiences = [
    {
        period: "June 2025 — Sep 2025",
        role: "AI & Embedded Software Engineer",
        company: "Infineon Technologies (Tokyo & San Jose)",
        description: "Led a Multimodal AI agent built with LangChain & CrewAI for SRAM/SCAN diagnostics on PSoC microcontrollers, reducing analysis time by 40%. Engineered a 5TB data migration pipeline directly to Silicon.da for Gen AI analytics.",
        technologies: ["LangChain", "CrewAI", "Silicon.da", "Multimodal AI"],
        current: true,
    },
    {
        period: "May 2024 — Sep 2024",
        role: "Software Engineer",
        company: "Infineon Technologies (Singapore)",
        description: "Engineered a sophisticated Retrieval-Augmented Generation system on GCP's Vertex AI. Processed over 500GB of unstructured technical documents natively, boosting EFA lab automation accuracy by 50% and productivity by 30%.",
        technologies: ["Vertex AI", "RAG", "Python", "GCP"],
        current: false,
    },
    {
        period: "May 2025 — Present",
        role: "Firmware CAR 2 and Website Operator",
        company: "Badger Solar Racing (UW-Madison)",
        description: "Designed and engineered an interactive steering dashboard for CAR 2. Provided real-time data visualization parsing CAN bus signals, reducing in-race power consumption by optimizing hydraulic feedback loops.",
        technologies: ["Firmware", "C++", "Hardware UI", "CAN bus"],
        current: true,
    },
    {
        period: "July 2024 — Sep 2025",
        role: "Computer Vision Specialist",
        company: "Badger Drone Club (UW-Madison)",
        description: "Developed intelligent visual inference pipelines using OpenCV and Python. Implemented autonomous object tracking coupled with a real-time hand gesture recognition system commanding DJI Tello drones.",
        technologies: ["OpenCV", "Computer Vision", "DJI SDK", "Python"],
        current: false,
    },
    {
        period: "Jun 2023 — Dec 2023",
        role: "Full-stack Web Developer",
        company: "Bellevue College Programming Club",
        description: "Developed a web application using Python (Flask) and JavaScript (React) for course planning. Used the college's public API to provide real-time data for over 200 students.",
        technologies: ["React", "Flask", "Python", "JavaScript"],
        current: false,
    }
];

export function ExperienceTimeline() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-200">Career Journey</h2>
                <p className="text-zinc-500 mt-2">A timeline of my professional growth across AI, embedded systems, and full-stack architectures.</p>
            </div>

            <div className="relative max-w-4xl mx-auto px-4">
                {/* The Vertical Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_15px_rgba(0,112,243,0.5)]" />

                <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="relative grid md:grid-cols-2 gap-8"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[20px] md:left-1/2 top-6 w-3 h-3 bg-primary rounded-full -translate-x-1/2 md:-translate-x-1/2 z-10 border-2 border-background shadow-[0_0_10px_rgba(0,112,243,0.8)]">
                                {exp.current && (
                                    <span className="absolute inset[-2px] rounded-full bg-primary animate-ping opacity-75" />
                                )}
                            </div>

                            {/* Content Panel */}
                            <div
                                className={`pl-12 md:pl-0 ${idx % 2 === 0
                                        ? "md:pr-12 md:text-right"
                                        : "md:col-start-2 md:pl-12"
                                    }`}
                            >
                                <GlassCard className="p-6 relative border-zinc-800/50 group hover:border-primary/40 transition-colors" animateHover={false}>
                                    <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest block mb-2">
                                        {exp.period}
                                    </span>
                                    <h3 className="text-xl font-bold text-zinc-100">{exp.role}</h3>
                                    <p className="text-sm font-medium text-zinc-400 mt-1">{exp.company}</p>
                                    <p className="text-sm text-zinc-500 mt-4 leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className={`flex flex-wrap gap-2 mt-6 ${idx % 2 === 0 ? "md:justify-end" : ""}`}>
                                        {exp.technologies.map((tech, techIdx) => (
                                            <span
                                                key={techIdx}
                                                className="px-2 py-1 bg-zinc-900/80 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider rounded text-zinc-400 group-hover:border-primary/30 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
