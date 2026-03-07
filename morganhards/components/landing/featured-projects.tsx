"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, ExternalLink, Play } from "lucide-react";
import Link from "next/link";
import { useProjectStore } from "@/store/useProjectStore";
import { useShallow } from "zustand/react/shallow";
import { CATEGORY_DISPLAY } from "@/lib/types/project";
import type { ProjectCategory } from "@/lib/types/project";

const statusColors: Record<string, string> = {
    active: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    provisioning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    offline: "bg-zinc-600",
};

export function FeaturedProjects() {
    const featured = useProjectStore(
        useShallow((s) => s.projects.filter((p) => p.featured).slice(0, 4))
    );

    return (
        <section className="w-full relative z-20 max-w-5xl">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800/50 pb-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-200">Featured Work</h2>
                    <p className="text-zinc-500 mt-1">Selected projects from my portfolio.</p>
                </div>
                <Link href="/apps" className="group flex items-center text-sm font-medium text-primary hover:text-blue-400 transition-colors">
                    View All Projects <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {featured.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white/5 dark:bg-black/40 border border-zinc-800/50 backdrop-blur-md rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-500"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-video bg-zinc-900/80">
                            {project.imageUri ? (
                                <img
                                    src={project.imageUri}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 text-zinc-700 font-mono text-sm">
                                    [ {CATEGORY_DISPLAY[project.category as ProjectCategory] ?? project.category} ]
                                </div>
                            )}

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            {/* Hover action icons — unified */}
                            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {project.type === "sandbox" && (
                                    <Link
                                        href={`/apps/${project.id}`}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/50 text-primary font-medium text-sm hover:bg-primary hover:text-black transition-all"
                                    >
                                        <Play className="w-4 h-4" /> Launch Sandbox
                                    </Link>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white text-white hover:text-black transition-all hover:scale-110"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {project.type === "showcase" && project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-primary hover:border-primary text-white transition-all hover:scale-110"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>

                            {/* Sandbox status + price */}
                            {project.type === "sandbox" && project.status && (
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5">
                                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusColors[project.status]}`} />
                                    <span className="text-[10px] font-mono capitalize text-zinc-300">{project.status}</span>
                                </div>
                            )}
                            {project.type === "sandbox" && project.resourceCostPerMin != null && (
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-primary/30 rounded-full px-2.5 py-0.5 text-xs font-mono text-primary font-bold">
                                    ${project.resourceCostPerMin.toFixed(2)}/min
                                </div>
                            )}

                            {/* Showcase status + visibility */}
                            {project.type === "showcase" && project.showcaseStatus && (
                                <div className={`absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border rounded-full px-2.5 py-0.5 text-[10px] font-mono capitalize ${project.showcaseStatus === "finished"
                                    ? "text-emerald-400 border-emerald-500/50"
                                    : "text-zinc-400 border-zinc-600/50"
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${project.showcaseStatus === "finished" ? "bg-emerald-400" : "bg-zinc-500"}`} />
                                    {project.showcaseStatus}
                                </div>
                            )}
                            {project.type === "showcase" && project.visibility && (
                                <div className={`absolute top-3 right-3 bg-black/70 backdrop-blur-sm border rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${project.visibility === "public"
                                    ? "border-sky-500/40 text-sky-400"
                                    : "border-amber-500/40 text-amber-400"
                                    }`}>
                                    {project.visibility === "public" ? "Public" : "Confidential"}
                                </div>
                            )}
                        </div>

                        {/* card body */}
                        <div className="p-6 space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-primary transition-colors">
                                    {project.name}
                                </h3>
                                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 bg-zinc-900/80 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider text-zinc-400 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
