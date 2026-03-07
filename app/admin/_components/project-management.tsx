"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import type { ProjectWithArchDocs } from "@/lib/types/project";
import { ProjectForm } from "./project-form";
import { ProjectRow } from "./project-row";

export function ProjectManagement() {
  const { projects, addProject, updateProject, deleteProject, toggleFeatured } = useProjectStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, unknown> | undefined>(undefined);

  const featuredCount = projects.filter((p) => p.featured).length;

  const startAdd = () => {
    setEditingId(null);
    setEditData(undefined);
    setShowForm(true);
  };

  const startEdit = (p: ProjectWithArchDocs) => {
    setEditingId(p.id);
    setEditData(p as unknown as Record<string, unknown>);
    setShowForm(true);
  };

  const handleSave = async (data: Record<string, unknown>) => {
    if (editingId) {
      await updateProject(editingId, data);
    } else {
      await addProject(data);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  const handleToggleFeatured = async (id: string) => {
    await toggleFeatured(id);
  };

  return (
    <GlassCard className="p-6" animateHover={false}>
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800/50 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Project Management</h2>
          <p className="text-xs text-zinc-500 mt-1">{featuredCount}/4 projects featured on homepage</p>
        </div>
        <Button onClick={startAdd} className="bg-primary text-black hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          initialData={editData}
          editingId={editingId}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            featuredCount={featuredCount}
            onEdit={startEdit}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        ))}
      </div>
    </GlassCard>
  );
}
