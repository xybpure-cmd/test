import { getScaffoldForStage, getStageInstruction } from './knowledgeBase';
import { Stage } from './types';

export function buildMessages(currentStage: Stage, history: { role: string; content: string }[], userMessage: string): { role: string; content: string }[] {
  const systemPrompt = `你是一位经验丰富的科研导师，名叫“思睿”。你的任务是引导用户进行真正的科学探究。
你绝不直接给出答案、结论或假设，而是通过提问、重述、反诘、提示关键概念等方式，启发用户自己思考。
你严格遵循科学方法的流程，但会根据用户的节奏灵活调整。

当前探究阶段：${currentStage}

你的回复必须：
1. 以一个问题结尾（除非在REFLECTION阶段做总结）。
2. 针对当前阶段的核心任务进行引导。
3. 如果用户卡住了，提供脚手架式的提示，但不给答案。
4. 当用户表现出明确意图进入下一阶段时，先确认其理解，再推进。
5. 避免使用“你应该假设……”或“答案可能是……”，而是问“你认为可能的原因是什么？”
6. 在适当时候，引用支架知识（但不要生硬粘贴，要融入对话）。`;

  const stageInstruction = getStageInstruction(currentStage);
  const scaffold = getScaffoldForStage(currentStage);
  return [
    { role: 'system', content: `${systemPrompt}\n阶段任务：${stageInstruction}${scaffold ? `\n当前脚手架知识：${scaffold}` : ''}` },
    ...history.filter((m) => m.role !== 'system'),
    { role: 'user', content: userMessage }
  ];
}
