import type {
  Project as PrismaProject,
  ArchDocs as PrismaArchDocs,
  ProjectType,
  ProjectCategory,
  ProjectStatus,
  ShowcaseStatus,
  ProjectVisibility,
} from "@/lib/generated/prisma/client";

// Re-export Prisma enums for use in components
export type { ProjectType, ProjectCategory, ProjectStatus, ShowcaseStatus, ProjectVisibility };

// Application-level Project type with archDocs included
export type ProjectWithArchDocs = PrismaProject & {
  archDocs: PrismaArchDocs | null;
};

// ─── Enum Display Mappings ───────────────────────────────────────────────────

export const CATEGORY_DISPLAY: Record<ProjectCategory, string> = {
  AI_ML: "AI / ML",
  DESKTOP_AUTO: "Desktop Automation",
  FINANCIAL: "Financial",
  VIDEO_GEN: "Video Generation",
  CODING: "Coding",
  WEB_FULLSTACK: "Web / Full-Stack",
  EMBEDDED: "Embedded Systems",
  COMPUTER_VISION: "Computer Vision",
};

export const CATEGORIES = Object.entries(CATEGORY_DISPLAY) as [ProjectCategory, string][];

export const STATUS_DISPLAY: Record<ProjectStatus, string> = {
  active: "Active",
  provisioning: "Provisioning",
  offline: "Offline",
};

export const SHOWCASE_STATUS_DISPLAY: Record<ShowcaseStatus, string> = {
  finished: "Finished",
  unfinished: "Unfinished",
};

export const VISIBILITY_DISPLAY: Record<ProjectVisibility, string> = {
  public: "Public",
  confidential: "Confidential",
};
