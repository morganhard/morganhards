import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { PrismaClient } from '../lib/generated/prisma'
import { INITIAL_PROJECTS } from '../lib/data/apps'

async function main() {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) throw new Error("DATABASE_URL is missing!")
    const db = new PrismaClient()

    console.log("Seeding INITIAL_PROJECTS from lib/data/apps.ts into the database via native TCP...");

    for (const project of INITIAL_PROJECTS) {
        await db.project.upsert({
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
        console.log(`Upserted Project: ${project.name}`);
    }

    console.log("Database perfectly synced with INITIAL_PROJECTS!");
    await db.$disconnect();
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    });
