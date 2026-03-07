import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/projects/featured — get featured projects (max 4)
export async function GET() {
  const featured = await prisma.project.findMany({
    where: { featured: true },
    include: { archDocs: true },
    take: 4,
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(featured);
}
