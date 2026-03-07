// lib/db.ts
import { PrismaClient } from './generated/prisma';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// ADD THIS LINE TO FIX THE 'db' IMPORTS
export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;