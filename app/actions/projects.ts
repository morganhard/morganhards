'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Project } from '@prisma/client';

export async function getProjects() {
    try {
        const projects = await db.project.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return projects;
    } catch (error) {
        console.error("Failed to get projects:", error);
        return [];
    }
}

export async function createProject(data: Partial<Project>) {
    try {
        const project = await db.project.create({
            // @ts-ignore Prisma JSON scalar type matching
            data: {
                ...data,
                archDocs: data.archDocs ?? undefined,
            }
        });
        revalidatePath('/');
        revalidatePath('/apps');
        revalidatePath('/admin');
        return { success: true, project };
    } catch (error: any) {
        console.error("Failed to create project:", error);
        return { success: false, error: error.message };
    }
}

export async function updateProject(id: string, data: Partial<Project>) {
    try {
        const project = await db.project.update({
            where: { id },
            // @ts-ignore
            data: {
                ...data,
                archDocs: data.archDocs ?? undefined,
            }
        });
        revalidatePath('/');
        revalidatePath('/apps');
        revalidatePath('/admin');
        return { success: true, project };
    } catch (error: any) {
        console.error("Failed to update project:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteProject(id: string) {
    try {
        await db.project.delete({
            where: { id }
        });
        revalidatePath('/');
        revalidatePath('/apps');
        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete project:", error);
        return { success: false, error: error.message };
    }
}

export async function toggleFeaturedProject(id: string, featured: boolean) {
    try {
        await db.project.update({
            where: { id },
            data: { featured }
        });
        revalidatePath('/');
        revalidatePath('/apps');
        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to toggle featured project:", error);
        return { success: false, error: error.message };
    }
}
