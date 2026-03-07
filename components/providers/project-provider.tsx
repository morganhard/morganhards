"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const fetchProjects = useProjectStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return <>{children}</>;
}
