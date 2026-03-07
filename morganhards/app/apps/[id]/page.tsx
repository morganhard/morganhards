"use client";

import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Server, Activity, ArrowLeft, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import { UsageMeter } from "./usage-meter";
import { useProjectStore } from "@/store/useProjectStore";
import { use } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function AppPortalPage({ params }: PageProps) {
    const { id } = use(params);
    const projects = useProjectStore((s) => s.projects);
    const app = projects.find((a) => a.id === id && a.type === "sandbox");

    if (!app) return notFound();

    const statusClass =
        app.status === "active" ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" :
            app.status === "provisioning" ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                "border-zinc-500/50 text-zinc-400 bg-zinc-500/10";

    const docs = app.archDocs;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

            <Link href="/apps" className="inline-flex items-center text-sm text-zinc-400 hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start justify-between mb-8 border-b border-zinc-800/50 pb-8">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">{app.name}</h1>
                        {app.status && (
                            <Badge variant="outline" className={statusClass}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                        )}
                        {app.resourceCostPerMin != null && (
                            <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 font-mono">
                                ${app.resourceCostPerMin.toFixed(2)}/min
                            </Badge>
                        )}
                    </div>
                    <p className="text-zinc-400 max-w-2xl">{app.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {app.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-zinc-900/80 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider text-zinc-400 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-auto min-w-[300px]">
                    <UsageMeter costPerSec={(app.resourceCostPerMin ?? 0) / 60} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 mb-2 text-sm text-zinc-300 font-mono">
                        <Activity className="w-4 h-4 text-primary" /> Live VNC Sandbox
                    </div>
                    <GlassCard className="w-full aspect-[4/3] bg-black/90 border-zinc-800 flex items-center justify-center p-0 overflow-hidden">
                        {app.status === "offline" ? (
                            <div className="text-zinc-600 font-mono text-sm flex flex-col items-center">
                                <Server className="w-8 h-8 mb-4 opacity-50" />
                                Container Stopped
                            </div>
                        ) : (
                            <div className="w-full h-full p-4 font-mono text-sm text-emerald-400/70 overflow-y-auto">
                                <p>{">"} connection established...</p>
                                <p>{">"} initializing orchestration engine...</p>
                                <p className="mt-4 break-words text-zinc-500">
                                    This interface simulates a live WebSocket VNC tunnel to the local daemon
                                    hosting the isolated Docker payload. In production, this canvas renders an
                                    interactive stream.
                                </p>
                                <div className="mt-8 flex items-center text-zinc-300">
                                    <TerminalIcon className="w-4 h-4 mr-2 text-amber-500" /> Waiting for input...
                                    <span className="inline-block w-2 h-4 bg-zinc-400 ml-1 animate-pulse" />
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2 text-sm text-zinc-300 font-mono">
                        <span>Architecture Docs</span>
                        <span className="text-zinc-500">{docs?.docsVersion ?? "v1.0"}</span>
                    </div>
                    <GlassCard className="p-6 h-[calc(100%-2rem)] prose prose-zinc prose-invert max-w-none text-sm leading-relaxed overflow-y-auto">
                        {docs ? (
                            <>
                                <h3 className="text-zinc-200 font-semibold text-base mb-2">Deployment Strategy</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{docs.deploymentStrategy}</p>

                                {docs.infrastructureRequirements.length > 0 && (
                                    <>
                                        <h4 className="text-zinc-300 font-medium text-sm mb-2">Infrastructure Requirements</h4>
                                        <ul className="space-y-1 mb-4">
                                            {docs.infrastructureRequirements.map((req, i) => (
                                                <li key={i} className="text-zinc-400 text-xs flex items-start gap-2">
                                                    <span className="text-primary mt-0.5">›</span> {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                <h4 className="text-zinc-300 font-medium text-sm mb-2">Integration Code</h4>
                                <pre className="p-4 bg-zinc-900 rounded-lg text-xs overflow-x-auto border border-zinc-800">
                                    <code className="text-zinc-300">{docs.integrationCode}</code>
                                </pre>
                            </>
                        ) : (
                            <p className="text-zinc-500 text-sm italic">No architecture docs configured. Add them from the Admin Dashboard.</p>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
