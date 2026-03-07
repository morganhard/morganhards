"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import { CATEGORIES, CATEGORY_DISPLAY } from "@/lib/types/project";
import type { ProjectCategory } from "@/lib/types/project";

interface ProjectFormData {
  name: string;
  description: string;
  type: "showcase" | "sandbox";
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  imageUri: string;
  githubUrl: string;
  liveUrl: string;
  showcaseStatus: "finished" | "unfinished";
  visibility: "public" | "confidential";
  status: "active" | "provisioning" | "offline";
  resourceCostPerMin: number;
  archDocs?: {
    deploymentStrategy: string;
    infrastructureRequirements: string[];
    integrationCode: string;
    docsVersion: string;
  };
}

const EMPTY_FORM: ProjectFormData = {
  name: "",
  description: "",
  type: "showcase",
  category: "AI_ML" as ProjectCategory,
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

interface ProjectFormProps {
  initialData?: Record<string, unknown>;
  editingId: string | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ initialData, editingId, onSave, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>(
    initialData ? { ...EMPTY_FORM, ...initialData } as ProjectFormData : EMPTY_FORM
  );
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setIsSaving(true);
    try {
      await onSave(form as unknown as Record<string, unknown>);
    } finally {
      setIsSaving(false);
    }
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
    <div className="mb-6 p-5 bg-zinc-950/80 border border-zinc-700/50 rounded-2xl space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-zinc-200">
          {editingId ? "Edit Project" : "New Project"}
        </h3>
        <button onClick={onCancel} className="text-zinc-500 hover:text-zinc-300">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Image URI (public/projects/...)</label>
          <input
            value={form.imageUri ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, imageUri: e.target.value }))}
            placeholder="/projects/my-app.png"
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-zinc-400">
            GitHub URL <span className="text-zinc-600 font-normal">(optional)</span>
          </label>
          <input
            value={form.githubUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
            placeholder="https://github.com/username/repo"
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-400">Description *</label>
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none resize-none"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "showcase" | "sandbox" }))}
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          >
            <option value="showcase">Showcase</option>
            <option value="sandbox">Sandbox</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ProjectCategory }))}
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          >
            {CATEGORIES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {form.type === "sandbox" && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Status</label>
            <select
              value={form.status ?? "offline"}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "active" | "provisioning" | "offline" }))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
            >
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
            <input
              value={form.liveUrl ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Progress Status</label>
            <select
              value={form.showcaseStatus ?? "finished"}
              onChange={(e) => setForm((f) => ({ ...f, showcaseStatus: e.target.value as "finished" | "unfinished" }))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
            >
              <option value="finished">Finished</option>
              <option value="unfinished">Unfinished</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Visibility</label>
            <select
              value={form.visibility ?? "public"}
              onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value as "public" | "confidential" }))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
            >
              <option value="public">Public</option>
              <option value="confidential">Confidential</option>
            </select>
          </div>
        </div>
      )}

      {form.type === "sandbox" && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Cost per minute ($)</label>
          <input
            type="number"
            step="0.01"
            value={form.resourceCostPerMin ?? 0}
            onChange={(e) => setForm((f) => ({ ...f, resourceCostPerMin: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          />
        </div>
      )}

      {/* Architecture Docs (sandbox only) */}
      {form.type === "sandbox" && (
        <div className="border border-zinc-700/50 rounded-xl p-4 space-y-4 bg-zinc-950/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Architecture Docs</span>
            <input
              value={form.archDocs?.docsVersion ?? "v1.0"}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  archDocs: { ...f.archDocs!, docsVersion: e.target.value },
                }))
              }
              placeholder="v1.0"
              className="w-20 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono focus:border-primary outline-none text-right"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Deployment Strategy</label>
            <textarea
              rows={3}
              value={form.archDocs?.deploymentStrategy ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  archDocs: { ...f.archDocs!, deploymentStrategy: e.target.value },
                }))
              }
              placeholder="Describe how this sandbox is deployed and orchestrated..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">
              Infrastructure Requirements{" "}
              <span className="text-zinc-600 font-normal">(one per line)</span>
            </label>
            <textarea
              rows={4}
              value={(form.archDocs?.infrastructureRequirements ?? []).join("\n")}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  archDocs: {
                    ...f.archDocs!,
                    infrastructureRequirements: e.target.value.split("\n").filter(Boolean),
                  },
                }))
              }
              placeholder={"AWS EC2 g4dn.xlarge\n16 GB RAM Sandbox Limit\nEFS Persistent Storage"}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none resize-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Integration Code Snippet</label>
            <textarea
              rows={6}
              value={form.archDocs?.integrationCode ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  archDocs: { ...f.archDocs!, integrationCode: e.target.value },
                }))
              }
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
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Type tag and press Enter"
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-primary outline-none"
          />
          <Button variant="outline" size="sm" onClick={addTag} className="border-zinc-700 text-zinc-300">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-300"
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="text-zinc-500 hover:text-red-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onCancel} className="text-zinc-500">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-black hover:bg-primary/90 gap-2"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : editingId ? "Save Changes" : "Create Project"}
        </Button>
      </div>
    </div>
  );
}
