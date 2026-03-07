import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

// GET /api/projects/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { archDocs: true },
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT /api/projects/:id (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { archDocs, id: _bodyId, createdAt: _c, updatedAt: _u, logs: _l, ...projectData } = body;

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...projectData,
      archDocs: archDocs
        ? {
            upsert: {
              create: archDocs,
              update: archDocs,
            },
          }
        : undefined,
    },
    include: { archDocs: true },
  });

  return NextResponse.json(project);
}

// DELETE /api/projects/:id (admin only)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
