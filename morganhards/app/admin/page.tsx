"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Server, Activity, Users, Database, LogOut, HardDrive, Cpu,
    Plus, Pencil, Trash2, Star, StarOff, ChevronDown, ChevronUp, X, Save
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/useProjectStore";
import { Project, ProjectCategory, ProjectType, ProjectStatus, ShowcaseStatus, ProjectVisibility, INITIAL_PROJECTS } from "@/lib/data/apps";
import { logoutAdmin } from "@/app/actions/auth";

const CATEGORIES: ProjectCategory[] = [
    "AI / ML", "Desktop Automation", "Financial", "Video Generation",
    "Coding", "Web / Full-Stack", "Embedded Systems", "Computer Vision",
];

const statusColor: Record<string, string> = {
    active: "text-emerald-400 border-emerald-500/50",
    provisioning: "text-amber-400 border-amber-500/50",
    offline: "text-zinc-500 border-zinc-700",
};

function generateId() {
    return Math.random().toString(36).slice(2, 10);
}

const EMPTY_PROJECT: Omit<Project, "id"> = {
    name: "",
    description: "",
    type: "showcase",
    category: "AI / ML",
    tags: [],
    featured: false,
    imageUri: "",
    githubUrl: "",
    liveUrl: "",
    showcaseStatus: "finished",
    visibility: "public",
    status: "offline",
    resourceCostPerMin: 0,
};

export default function AdminDashboard() {
    const router = useRouter();
    const { projects, addProject, updateProject, deleteProject, toggleFeatured } = useProjectStore();

    const [showProjectPanel, setShowProjectPanel] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Omit<Project, "id">>(EMPTY_PROJECT);
    const [tagInput, setTagInput] = useState("");

    const featuredCount = projects.filter((p) => p.featured).length;

    const handleLogout = async () => {
        await logoutAdmin();
        router.push("/");
    };

    const startEdit = (p: Project) => {
        setEditingId(p.id);
        setForm({ ...p });
        setTagInput("");
        setShowProjectPanel(true);
    };

    const startAdd = () => {
        setEditingId(null);
        setForm(EMPTY_PROJECT);
        setTagInput("");
        setShowProjectPanel(true);
    };

    const handleSave = () => {
        if (!form.name.trim()) return;
        if (editingId) {
            updateProject(editingId, form);
        } else {
            addProject({ ...form, id: generateId() });
        }
        setShowProjectPanel(false);
        setEditingId(null);
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !form.tags.includes(t)) {
            setForm((f) => ({ ...f, tags: [...f.tags, t] }));
        }
        setTagInput("");
    };

    const removeTag = (tag: string) =>
        setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800/50 pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
                        <Server className="text-primary w-8 h-8" /> Control Plane
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">Infrastructure telemetry, billing analytics, and orchestrator management.</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <LogOut className="w-4 h-4 mr-2" /> Disconnect
                </Button>
            </div>

            {/* Infra Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total K8s Nodes", value: "12 Active", sub: "EKS / GKE Hybrid", icon: Server, color: "text-emerald-400" },
                    { label: "Active Workloads", value: "47 Pods", sub: "across 3 namespaces", icon: Activity, color: "text-blue-400" },
                    { label: "Compute Load", value: "68%", sub: "AWS g4dn + local daemons", icon: Cpu, color: "text-amber-400" },
                    { label: "API Requests", value: "1.2M", sub: "This billing cycle", icon: Database, color: "text-purple-400" },
                ].map((s) => (
                    <GlassCard key={s.label} className="p-4" animateHover={false}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-zinc-400">{s.label}</span>
                            <s.icon className={`w-4 h-4 ${s.color}`} />
                        </div>
                        <div className="text-2xl font-bold text-zinc-100">{s.value}</div>
                        <div className="text-xs text-zinc-500 mt-1">{s.sub}</div>
                    </GlassCard>
                ))}
            </div>

            {/* Infrastructure + Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <GlassCard className="lg:col-span-2 p-6" animateHover={false}>
                    <h2 className="text-lg font-semibold text-zinc-200 mb-4 border-b border-zinc-800/50 pb-2">Active Deployments</h2>
                    <div className="space-y-4">
                        {[
                            { name: "UI-TARS Agent Pool", env: "Production", status: "Healthy", type: "Docker Swarm" },
                            { name: "Higgfield Video Gen", env: "Provisioning", status: "Starting", type: "g4dn.xlarge" },
                            { name: "OpenBB Finance Data", env: "Staging", status: "Degraded", type: "Kubernetes" },
                        ].map((dep, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                <div>
                                    <div className="font-medium text-zinc-200">{dep.name}</div>
                                    <div className="text-xs text-zinc-500 font-mono mt-1">{dep.type}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">{dep.env}</Badge>
                                    <Badge variant="outline" className={
                                        dep.status === "Healthy" ? "text-emerald-400 border-emerald-500/50" :
                                            dep.status === "Starting" ? "text-amber-400 border-amber-500/50" :
                                                "text-red-400 border-red-500/50"
                                    }>{dep.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6" animateHover={false}>
                    <h2 className="text-lg font-semibold text-zinc-200 mb-4 border-b border-zinc-800/50 pb-2">System Resources</h2>
                    <div className="space-y-6">
                        {[
                            { label: "Memory (RAM)", value: "112 / 128 GB", pct: 87, color: "bg-blue-500" },
                            { label: "VRAM (GPU)", value: "38 / 40 GB", pct: 95, color: "bg-purple-500" },
                            { label: "Storage (EFS)", value: "2.1 / 5.0 TB", pct: 42, color: "bg-emerald-500" },
                        ].map((r) => (
                            <div key={r.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">{r.label}</span>
                                    <span className="text-zinc-200 font-mono">{r.value}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* ─── Project Management CRUD ──────────────────────────────────────────── */}
            <GlassCard className="p-6" animateHover={false}>
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800/50 pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-zinc-100">Project Management</h2>
                        <p className="text-xs text-zinc-500 mt-1">
                            {featuredCount}/4 projects featured on homepage
                        </p>
                    </div>
                    <Button onClick={startAdd} className="bg-primary text-black hover:bg-primary/90 gap-2">
                        <Plus className="w-4 h-4" /> Add Project
                    </Button>
                </div>

                {/* Add / Edit Form */}
                {showProjectPanel && (
                    <div className="mb-6 p-5 bg-zinc-950/80 border border-zinc-700/50 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-zinc-200">{editingId ? "Edit Project" : "New Project"}</h3>
                            <button onClick={() => setShowProjectPanel(false)} className="text-zinc-500 hover:text-zinc-300">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-zinc-400">Name *</label>
                                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-zinc-400">Image URI (public/projects/…)</label>
                                <input value={form.imageUri ?? ""} onChange={(e) => setForm((f) => ({ ...f, imageUri: e.target.value }))}
                                    placeholder="/projects/my-app.png"
                                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-xs font-medium text-zinc-400">GitHub URL <span className="text-zinc-600 font-normal">(optional — shown as button on card)</span></label>
                                <input value={form.githubUrl ?? ""} onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
                                    placeholder="https://github.com/username/repo"
                                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Description *</label>
                            <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none resize-none" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-zinc-400">Type</label>
                                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ProjectType }))}
                                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none">
                                    <option value="showcase">Showcase</option>
                                    <option value="sandbox">Sandbox</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-zinc-400">Category</label>
                                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ProjectCategory }))}
                                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none">
                                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            {form.type === "sandbox" && (
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">Status</label>
                                    <select value={form.status ?? "offline"} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProjectStatus }))}
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none">
                                        <option value="active">Active</option>
                                        <option value="provisioning">Provisioning</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {form.type === "showcase" && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">Live URL</label>
                                    <input value={form.liveUrl ?? ""} onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">Progress Status</label>
                                    <select value={form.showcaseStatus ?? "finished"} onChange={(e) => setForm((f) => ({ ...f, showcaseStatus: e.target.value as ShowcaseStatus }))}
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none">
                                        <option value="finished">✅ Finished</option>
                                        <option value="unfinished">⏳ Unfinished</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">Visibility</label>
                                    <select value={form.visibility ?? "public"} onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value as ProjectVisibility }))}
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none">
                                        <option value="public">🌐 Public</option>
                                        <option value="confidential">🔒 Confidential</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {form.type === "sandbox" && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-zinc-400">Cost per minute ($)</label>
                                <input type="number" step="0.01" value={form.resourceCostPerMin ?? 0}
                                    onChange={(e) => setForm((f) => ({ ...f, resourceCostPerMin: parseFloat(e.target.value) }))}
                                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none" />
                            </div>
                        )}

                        {/* ── Architecture Docs (sandbox only) ── */}
                        {form.type === "sandbox" && (
                            <div className="border border-zinc-700/50 rounded-xl p-4 space-y-4 bg-zinc-950/60">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Architecture Docs</span>
                                    <input
                                        value={form.archDocs?.docsVersion ?? "v1.0"}
                                        onChange={(e) => setForm((f) => ({ ...f, archDocs: { ...f.archDocs!, docsVersion: e.target.value } }))}
                                        placeholder="v1.0"
                                        className="w-20 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono focus:border-primary outline-none text-right"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">Deployment Strategy</label>
                                    <textarea
                                        rows={3}
                                        value={form.archDocs?.deploymentStrategy ?? ""}
                                        onChange={(e) => setForm((f) => ({ ...f, archDocs: { ...f.archDocs!, deploymentStrategy: e.target.value } }))}
                                        placeholder="Describe how this sandbox is deployed and orchestrated..."
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none resize-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">
                                        Infrastructure Requirements <span className="text-zinc-600 font-normal">(one per line)</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={(form.archDocs?.infrastructureRequirements ?? []).join("\n")}
                                        onChange={(e) => setForm((f) => ({
                                            ...f,
                                            archDocs: {
                                                ...f.archDocs!,
                                                infrastructureRequirements: e.target.value.split("\n").filter(Boolean),
                                            }
                                        }))}
                                        placeholder={"AWS EC2 g4dn.xlarge\n16 GB RAM Sandbox Limit\nEFS Persistent Storage"}
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none resize-none font-mono"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400">Integration Code Snippet</label>
                                    <textarea
                                        rows={6}
                                        value={form.archDocs?.integrationCode ?? ""}
                                        onChange={(e) => setForm((f) => ({ ...f, archDocs: { ...f.archDocs!, integrationCode: e.target.value } }))}
                                        placeholder={`await fetch('/api/agents/dispatch', {\n  method: 'POST',\n  body: JSON.stringify({ agentId: '...', command: '...' })\n});`}
                                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:border-primary outline-none resize-none font-mono"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400">Tags</label>
                            <div className="flex gap-2">
                                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                                    placeholder="Type tag and press Enter"
                                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none" />
                                <Button variant="outline" size="sm" onClick={addTag} className="border-zinc-700 text-zinc-300">Add</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {form.tags.map((tag) => (
                                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-300">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="text-zinc-500 hover:text-red-400 ml-1"><X className="w-3 h-3" /></button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setShowProjectPanel(false)} className="text-zinc-500">Cancel</Button>
                            <Button onClick={handleSave} className="bg-primary text-black hover:bg-primary/90 gap-2">
                                <Save className="w-4 h-4" /> {editingId ? "Save Changes" : "Create Project"}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Project Table */}
                <div className="space-y-3">
                    {projects.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            {/* Image thumbnail */}
                            <div className="w-14 h-10 rounded-lg bg-zinc-800/80 overflow-hidden flex-shrink-0">
                                {p.imageUri
                                    ? <img src={p.imageUri} alt={p.name} className="w-full h-full object-cover opacity-70" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                    : <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-[8px] text-center px-1">{p.category.slice(0, 6)}</div>
                                }
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-zinc-100 text-sm truncate">{p.name}</span>
                                    <Badge variant="outline" className="text-[10px] px-2 py-0 capitalize border-zinc-700 text-zinc-500">{p.type}</Badge>
                                    {p.type === "sandbox" && p.status && (
                                        <Badge variant="outline" className={`text-[10px] px-2 py-0 capitalize ${statusColor[p.status]}`}>{p.status}</Badge>
                                    )}
                                </div>
                                <div className="text-[11px] text-zinc-500 truncate mt-0.5">{p.category} · {p.tags.slice(0, 3).join(" · ")}</div>
                            </div>

                            {p.type === "sandbox" && p.resourceCostPerMin !== undefined && (
                                <span className="text-xs font-mono text-primary font-bold flex-shrink-0">${p.resourceCostPerMin.toFixed(2)}/min</span>
                            )}

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => toggleFeatured(p.id)}
                                    title={p.featured ? "Unfeature" : featuredCount >= 4 ? "Max 4 featured" : "Feature on homepage"}
                                    className={`p-1.5 rounded-lg transition-all ${p.featured ? "text-amber-400 bg-amber-500/10 border border-amber-500/30" : "text-zinc-600 hover:text-amber-400 border border-transparent hover:border-zinc-700"}`}
                                >
                                    {p.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                                </button>
                                <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-200 hover:bg-zinc-800 transition-all">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteProject(p.id)} className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
