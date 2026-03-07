"use client";

import { motion, Variants } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Code2, BrainCircuit, Cloud, Database } from "lucide-react";

const skillCategories = [
    {
        title: "Languages",
        icon: Code2,
        color: "text-sky-400",
        accent: "bg-sky-500/10 border-sky-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(56,189,248,0.07)]",
        pillHover: "hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-sky-300",
        items: ["Python", "Java", "C++", "JavaScript", "R", "HTML / CSS"],
    },
    {
        title: "AI / ML",
        icon: BrainCircuit,
        color: "text-violet-400",
        accent: "bg-violet-500/10 border-violet-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(167,139,250,0.07)]",
        pillHover: "hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-300",
        items: ["PyTorch", "LangChain", "LangGraph", "AutoGen", "Hugging Face", "LlamaIndex"],
    },
    {
        title: "Cloud & Infra",
        icon: Cloud,
        color: "text-emerald-400",
        accent: "bg-emerald-500/10 border-emerald-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(52,211,153,0.07)]",
        pillHover: "hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300",
        items: ["AWS", "GCP / Vertex AI", "Kubernetes", "Docker", "Apache Spark", "Hadoop"],
    },
    {
        title: "Databases",
        icon: Database,
        color: "text-amber-400",
        accent: "bg-amber-500/10 border-amber-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(251,191,36,0.07)]",
        pillHover: "hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-300",
        items: ["PostgreSQL", "SQL", "ChromaDB", "Silicon.da"],
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } },
};

export function TechMatrix() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-5xl mx-auto"
        >
            {skillCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                    <motion.div key={cat.title} variants={cardVariants}>
                        <GlassCard className={`h-full p-6 flex flex-col group transition-shadow duration-500 ${cat.glow}`}>
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className={`p-2.5 rounded-xl border ${cat.accent}`}>
                                    <Icon className={`w-5 h-5 ${cat.color}`} />
                                </div>
                                <h3 className="font-bold text-zinc-100 tracking-tight">{cat.title}</h3>
                                <span className="ml-auto text-xs font-mono text-zinc-600">{cat.items.length} skills</span>
                            </div>

                            {/* Pill grid */}
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map((item) => (
                                    <span
                                        key={item}
                                        className={`px-3 py-1.5 rounded-full text-xs font-mono border bg-zinc-900/60 border-zinc-800 text-zinc-400 cursor-default transition-all duration-200 ${cat.pillHover}`}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
