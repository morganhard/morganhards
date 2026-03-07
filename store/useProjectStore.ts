"use client";

import { create } from "zustand";
import type { ProjectWithArchDocs } from "@/lib/types/project";

const MAX_FEATURED = 4;

interface ProjectStore {
  projects: ProjectWithArchDocs[];
  isLoading: boolean;
  error: string | null;

  fetchProjects: () => Promise<void>;
  addProject: (project: Record<string, unknown>) => Promise<void>;
  updateProject: (id: string, updates: Record<string, unknown>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  getFeatured: () => ProjectWithArchDocs[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      set({ projects: data, isLoading: false });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      set({ error: message, isLoading: false });
    }
  },

  addProject: async (project) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to create project");
    const created = await res.json();
    set((s) => ({ projects: [created, ...s.projects] }));
  },

  updateProject: async (id, updates) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update project");
    const updated = await res.json();
    set((s) => ({
      projects: s.projects.map((p) => (p.id === id ? updated : p)),
    }));
  },

  deleteProject: async (id) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
  },

  toggleFeatured: async (id) => {
    const current = get().projects.find((p) => p.id === id);
    if (!current) return;
    const featuredCount = get().projects.filter((p) => p.featured).length;
    if (!current.featured && featuredCount >= MAX_FEATURED) return;

    await get().updateProject(id, { featured: !current.featured });
  },

  getFeatured: () =>
    get()
      .projects.filter((p) => p.featured)
      .slice(0, MAX_FEATURED),
}));
