import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
export const runtime = 'nodejs';
const sections = [['OBSERVATION','观察到的现象'],['QUESTION','研究问题'],['BACKGROUND','已知背景与资料'],['HYPOTHESIS','假设'],['PREDICTION','预测'],['VALIDATION','验证方案'],['REFLECTION','反思与收获']] as const;
export async function GET(req: NextRequest){const id=new URL(req.url).searchParams.get('projectId'); if(!id) return new Response('missing projectId',{status:400}); const msgs=await prisma.message.findMany({where:{projectId:id,role:'USER'},orderBy:{createdAt:'asc'}}); let md='# 我的科学研究报告\n\n'; sections.forEach(([k,t],i)=>{ const content=msgs.filter(m=>m.stage===k).map(m=>`- ${m.content}`).join('\n')||'（待补充）'; md+=`## ${i+1}. ${t}\n${content}\n\n`;}); return new Response(md,{headers:{'Content-Type':'text/markdown; charset=utf-8'}})}
