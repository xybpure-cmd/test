import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
export const runtime = 'nodejs';

export async function GET(req: NextRequest){const id=new URL(req.url).searchParams.get('projectId'); if(!id) return NextResponse.json({error:'missing projectId'},{status:400}); const project=await prisma.project.findUnique({where:{id},include:{messages:{take:20,orderBy:{createdAt:'asc'}}}}); return NextResponse.json(project);}
export async function PUT(req: NextRequest){const {projectId,title,notes}=await req.json(); const project=await prisma.project.update({where:{id:projectId},data:{title,notes}}); return NextResponse.json(project);}
