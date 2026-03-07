"use client";

import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Star, StarOff } from "lucide-react";
import { CATEGORY_DISPLAY } from "@/lib/types/project";
import type { ProjectWithArchDocs, ProjectCategory } from "@/lib/types/project";

const statusColor: Record<string, string> = {
  active: "text-emerald-400 border-emerald-500/50",
  provisioning: "text-amber-400 border-amber-500/50",
  offline: "text-zinc-500 border-zinc-700",
};

interface ProjectRowProps {
  project: ProjectWithArchDocs;
  featuredCount: number;
  onEdit: (project: ProjectWithArchDocs) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

export function ProjectRow({ project: p, featuredCount, onEdit, onDelete, onToggleFeatured }: ProjectRowProps) {
  const categoryLabel = CATEGORY_DISPLAY[p.category as ProjectCategory] ?? p.category;

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
      {/* Image thumbnail */}
      <div className="w-14 h-10 rounded-lg bg-zinc-800/80 overflow-hidden flex-shrink-0">
        {p.imageUri ? (
          <img
            src={p.imageUri}
            alt={p.name}
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-[8px] text-center px-1">
            {categoryLabel.slice(0, 6)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-100 text-sm truncate">{p.name}</span>
          <Badge variant="outline" className="text-[10px] px-2 py-0 capitalize border-zinc-700 text-zinc-500">
            {p.type}
          </Badge>
          {p.type === "sandbox" && p.status && (
            <Badge variant="outline" className={`text-[10px] px-2 py-0 capitalize ${statusColor[p.status]}`}>
              {p.status}
            </Badge>
          )}
        </div>
        <div className="text-[11px] text-zinc-500 truncate mt-0.5">
          {categoryLabel} · {p.tags.slice(0, 3).join(" · ")}
        </div>
      </div>

      {p.type === "sandbox" && p.resourceCostPerMin !== undefined && p.resourceCostPerMin !== null && (
        <span className="text-xs font-mono text-primary font-bold flex-shrink-0">
          ${p.resourceCostPerMin.toFixed(2)}/min
        </span>
      )}

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onToggleFeatured(p.id)}
          title={p.featured ? "Unfeature" : featuredCount >= 4 ? "Max 4 featured" : "Feature on homepage"}
          className={`p-1.5 rounded-lg transition-all ${
            p.featured
              ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
              : "text-zinc-600 hover:text-amber-400 border border-transparent hover:border-zinc-700"
          }`}
        >
          {p.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
        </button>
        <button
          onClick={() => onEdit(p)}
          className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-200 hover:bg-zinc-800 transition-all"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(p.id)}
          className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
