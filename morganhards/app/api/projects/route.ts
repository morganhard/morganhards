import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

// GET /api/projects — list all projects with archDocs
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const category = searchParams.get("category");

  const where: Record<string, unknown> = {};
  if (type) where.type = type;
  if (category) where.category = category;

  const projects = await prisma.project.findMany({
    where,
    include: { archDocs: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

// POST /api/projects — create a new project (admin only)
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { archDocs, ...projectData } = body;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      archDocs: archDocs ? { create: archDocs } : undefined,
    },
    include: { archDocs: true },
  });

  return NextResponse.json(project, { status: 201 });
}
