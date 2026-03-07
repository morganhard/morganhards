import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { INITIAL_PROJECTS } from '@/lib/data/apps';

export async function GET() {
    try {
        console.log("Seeding INITIAL_PROJECTS into the database via Next.js API...");

        const results = [];
        for (const project of INITIAL_PROJECTS) {
            const upserted = await db.project.upsert({
                where: { id: project.id },
                update: {
                    name: project.name,
                    description: project.description,
                    type: project.type,
                    category: project.category,
                    tags: project.tags,
                    featured: project.featured,
                    imageUri: project.imageUri,
                    githubUrl: project.githubUrl,
                    liveUrl: project.liveUrl,
                    showcaseStatus: project.showcaseStatus,
                    visibility: project.visibility,
                    status: project.status,
                    resourceCostPerMin: project.resourceCostPerMin,
                    tokensPerInteraction: project.tokensPerInteraction,
                    archDocs: project.archDocs ? (project.archDocs as any) : undefined,
                },
                create: {
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    type: project.type,
                    category: project.category,
                    tags: project.tags,
                    featured: project.featured,
                    imageUri: project.imageUri,
                    githubUrl: project.githubUrl,
                    liveUrl: project.liveUrl,
                    showcaseStatus: project.showcaseStatus,
                    visibility: project.visibility,
                    status: project.status,
                    resourceCostPerMin: project.resourceCostPerMin,
                    tokensPerInteraction: project.tokensPerInteraction,
                    archDocs: project.archDocs ? (project.archDocs as any) : undefined,
                }
            });
            results.push(upserted.name);
            console.log(`Upserted Project: ${project.name}`);
        }

        return NextResponse.json({ success: true, message: "Database perfectly synced with INITIAL_PROJECTS!", projects: results });
    } catch (e: any) {
        console.error("SEED API ERROR:", e);
        return NextResponse.json({ success: false, error: e.message || String(e) }, { status: 500 });
    }
}
