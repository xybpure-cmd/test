import { NextRequest } from 'next/server';
import { buildMessages } from '@/lib/promptBuilder';
import { prisma, getOrCreateProject, getProjectMessages } from '@/lib/db';
import { determineNextState } from '@/lib/stateMachine';
import { streamChat } from '@/lib/llmClient';
import { Stage } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { projectId, message } = await req.json();
  let project = projectId ? await prisma.project.findUnique({ where: { id: projectId } }) : null;
  if (!project) project = await getOrCreateProject('anonymous');
  const history = await getProjectMessages(project.id);
  const { newStage, injectScaffold } = determineNextState(project.currentStage as Stage, message, history.length);
  await prisma.project.update({ where: { id: project.id }, data: { currentStage: newStage } });
  await prisma.message.create({ data: { projectId: project.id, role: 'USER', content: message, stage: newStage } });
  const promptMessages = buildMessages(newStage, history.map(m => ({ role: m.role.toLowerCase(), content: m.content })), `${message}${injectScaffold ? '\n（我可能卡住了，请给我脚手架提示）' : ''}`);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let full = '';
      try {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: newStage, projectId: project!.id })}\n\n`));
        for await (const chunk of streamChat(promptMessages)) {
          full += chunk;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk, stage: newStage })}\n\n`));
        }
        await prisma.message.create({ data: { projectId: project!.id, role: 'ASSISTANT', content: full, stage: newStage } });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (e: any) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: e.message || 'error' })}\n\n`));
      } finally { controller.close(); }
    }
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } });
}
