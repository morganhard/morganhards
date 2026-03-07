// lib/db.ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import { PrismaClient } from './generated/prisma';

// Required for Neon serverless to work with WebSockets in Node.js
if (typeof window === 'undefined') {
    neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("DATABASE_URL environment variable is missing.");
    }

    // Create the connection pool
    const pool = new Pool({ connectionString });

    // Use 'any' to resolve the Type incompatibility between Pool and PrismaNeon
    const adapter = new PrismaNeon(pool as any);

    return new PrismaClient({
        adapter,
        // Optional: helps with debugging connection issues
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;