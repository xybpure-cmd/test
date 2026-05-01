import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getOrCreateProject(userId: string) {
  const existing = await prisma.project.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  if (existing) return existing;
  return prisma.project.create({ data: { userId, currentStage: 'OBSERVATION' } });
}

export async function getProjectMessages(projectId: string) {
  return prisma.message.findMany({ where: { projectId }, orderBy: { createdAt: 'asc' }, take: 50 });
}
