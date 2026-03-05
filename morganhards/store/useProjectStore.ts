import { create } from "zustand";
import { Project, INITIAL_PROJECTS } from "@/lib/data/apps";

const MAX_FEATURED = 4;

interface ProjectStore {
    projects: Project[];
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    toggleFeatured: (id: string) => void;
    getFeatured: () => Project[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: INITIAL_PROJECTS,

    addProject: (project) =>
        set((s) => ({ projects: [...s.projects, project] })),

    updateProject: (id, updates) =>
        set((s) => ({
            projects: s.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

    deleteProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

    toggleFeatured: (id) =>
        set((s) => {
            const current = s.projects.find((p) => p.id === id);
            if (!current) return s;
            const featuredCount = s.projects.filter((p) => p.featured).length;
            // Block adding a 5th featured
            if (!current.featured && featuredCount >= MAX_FEATURED) return s;
            return {
                projects: s.projects.map((p) =>
                    p.id === id ? { ...p, featured: !p.featured } : p
                ),
            };
        }),

    getFeatured: () => get().projects.filter((p) => p.featured).slice(0, MAX_FEATURED),
}));
