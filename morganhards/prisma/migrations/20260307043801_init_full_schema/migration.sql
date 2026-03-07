-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('showcase', 'sandbox');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('AI_ML', 'DESKTOP_AUTO', 'FINANCIAL', 'VIDEO_GEN', 'CODING', 'WEB_FULLSTACK', 'EMBEDDED', 'COMPUTER_VISION');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('active', 'provisioning', 'offline');

-- CreateEnum
CREATE TYPE "ShowcaseStatus" AS ENUM ('finished', 'unfinished');

-- CreateEnum
CREATE TYPE "ProjectVisibility" AS ENUM ('public', 'confidential');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "category" "ProjectCategory" NOT NULL,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUri" TEXT,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "showcaseStatus" "ShowcaseStatus",
    "visibility" "ProjectVisibility",
    "status" "ProjectStatus",
    "resourceCostPerMin" DOUBLE PRECISION,
    "tokensPerInteraction" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchDocs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "deploymentStrategy" TEXT NOT NULL,
    "infrastructureRequirements" TEXT[],
    "integrationCode" TEXT NOT NULL,
    "docsVersion" TEXT,

    CONSTRAINT "ArchDocs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "computeSeconds" INTEGER NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Project_type_idx" ON "Project"("type");

-- CreateIndex
CREATE INDEX "Project_featured_idx" ON "Project"("featured");

-- CreateIndex
CREATE INDEX "Project_category_idx" ON "Project"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ArchDocs_projectId_key" ON "ArchDocs"("projectId");

-- CreateIndex
CREATE INDEX "ArchDocs_projectId_idx" ON "ArchDocs"("projectId");

-- CreateIndex
CREATE INDEX "UsageLog_userId_idx" ON "UsageLog"("userId");

-- CreateIndex
CREATE INDEX "UsageLog_projectId_idx" ON "UsageLog"("projectId");

-- AddForeignKey
ALTER TABLE "ArchDocs" ADD CONSTRAINT "ArchDocs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageLog" ADD CONSTRAINT "UsageLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageLog" ADD CONSTRAINT "UsageLog_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
