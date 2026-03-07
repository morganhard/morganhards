// lib/db.ts
import { PrismaClient } from './generated/prisma'; // ⚠️ Ensure this matches your custom output path exactly, DO NOT use '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;