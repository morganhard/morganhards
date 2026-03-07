"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Play, Search, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useProjectStore } from "@/store/useProjectStore";
import { CATEGORIES, CATEGORY_DISPLAY } from "@/lib/types/project";
import type { ProjectCategory } from "@/lib/types/project";

const statusColors: Record<string, string> = {
    active: "text-emerald-400 border-emerald-500/50",
    provisioning: "text-amber-400 border-amber-500/50",
    offline: "text-zinc-500 border-zinc-600/50",
};

export default function AppsPage() {
    const projects = useProjectStore((s) => s.projects);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
    const categoryLabel = (cat: ProjectCategory) => CATEGORY_DISPLAY[cat] ?? cat;
    const [activeType, setActiveType] = useState<"all" | "showcase" | "sandbox">("all");

    const filtered = projects.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchCategory = activeCategory === "All" || p.category === activeCategory;
        const matchType = activeType === "all" || p.type === activeType;
        return matchSearch && matchCategory && matchType;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <LayoutGrid className="text-primary w-7 h-7" />
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Project Catalog</h1>
                </div>
                <p className="text-zinc-400 text-sm">
                    All projects — portfolio showcases and live AI Sandbox applications.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex gap-2">
                    {(["all", "showcase", "sandbox"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setActiveType(t)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${activeType === t
                                ? "bg-primary text-black border-primary"
                                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-primary/50 hover:text-zinc-200"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
                <button
                    onClick={() => setActiveCategory("All")}
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${activeCategory === "All"
                        ? "bg-zinc-200 text-black border-zinc-200"
                        : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600"
                        }`}
                >
                    All
                </button>
                {CATEGORIES.map(([value, label]) => (
                    <button
                        key={value}
                        onClick={() => setActiveCategory(value)}
                        className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${activeCategory === value
                            ? "bg-zinc-200 text-black border-zinc-200"
                            : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-zinc-600 font-mono">No projects found.</div>
                ) : (
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white/5 dark:bg-black/40 border border-zinc-800/50 backdrop-blur-md rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden aspect-video bg-zinc-900/80">
                                    {project.imageUri ? (
                                        <img
                                            src={project.imageUri}
                                            alt={project.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-sm">
                                            [ {categoryLabel(project.category as ProjectCategory)} ]
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Hover actions */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {project.type === "sandbox" && (
                                            <Link href={`/apps/${project.id}`}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/50 text-primary text-sm font-medium hover:bg-primary hover:text-black transition-all">
                                                <Play className="w-3.5 h-3.5" /> Sandbox
                                            </Link>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                className="p-2.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white text-white hover:text-black transition-all">
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.type === "showcase" && project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                className="p-2.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-primary hover:border-primary text-white transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Sandbox status + price */}
                                    {project.type === "sandbox" && project.status && (
                                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border rounded-full px-2.5 py-0.5 text-xs font-mono capitalize ${statusColors[project.status]}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                            {project.status}
                                        </div>
                                    )}
                                    {project.type === "sandbox" && project.resourceCostPerMin != null && (
                                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-primary/30 rounded-full px-2.5 py-0.5 text-xs font-mono text-primary font-bold">
                                            ${project.resourceCostPerMin.toFixed(2)}/min
                                        </div>
                                    )}

                                    {/* Showcase status + visibility */}
                                    {project.type === "showcase" && project.showcaseStatus && (
                                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border rounded-full px-2.5 py-0.5 text-xs font-mono capitalize ${project.showcaseStatus === "finished"
                                            ? "text-emerald-400 border-emerald-500/50"
                                            : "text-zinc-400 border-zinc-600/50"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${project.showcaseStatus === "finished" ? "bg-emerald-400" : "bg-zinc-500"}`} />
                                            {project.showcaseStatus}
                                        </div>
                                    )}
                                    {project.type === "showcase" && project.visibility && (
                                        <div className={`absolute top-3 right-3 bg-black/70 backdrop-blur-sm border rounded-full px-2.5 py-0.5 text-xs font-mono font-bold ${project.visibility === "public"
                                            ? "border-sky-500/40 text-sky-400"
                                            : "border-amber-500/40 text-amber-400"
                                            }`}>
                                            {project.visibility === "public" ? "Public" : "Confidential"}
                                        </div>
                                    )}

                                    {/* Type badge bottom */}
                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                                        {project.type}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-zinc-100 group-hover:text-primary transition-colors text-base leading-snug">
                                            {project.name}
                                        </h3>
                                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {project.tags.slice(0, 4).map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider text-zinc-500 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
