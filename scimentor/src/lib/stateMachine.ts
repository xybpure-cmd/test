import { Stage } from './types';

export const stageOrder: Stage[] = ['OBSERVATION','QUESTION','BACKGROUND','HYPOTHESIS','PREDICTION','VALIDATION','REFLECTION'];

export function determineNextState(currentStage: Stage, userMessage: string, historyLength: number): { newStage: Stage; injectScaffold: boolean } {
  const stage = stageOrder.includes(currentStage) ? currentStage : 'OBSERVATION';
  const trimmed = userMessage.trim();
  if (!trimmed) return { newStage: stage, injectScaffold: true };
  if (trimmed.includes('[重启]')) return { newStage: 'OBSERVATION', injectScaffold: false };
  if (trimmed.includes('[回到上一步]')) {
    const prevIdx = stageOrder.indexOf(stage) - 1;
    return { newStage: prevIdx >= 0 ? stageOrder[prevIdx] : stage, injectScaffold: false };
  }
  if (detectAdvanceIntent(trimmed) && stage !== 'REFLECTION') {
    const nextIdx = stageOrder.indexOf(stage) + 1;
    return { newStage: nextIdx < stageOrder.length ? stageOrder[nextIdx] : stage, injectScaffold: true };
  }
  if (historyLength >= 4 && isMessageShortOrPassive(trimmed)) return { newStage: stage, injectScaffold: true };
  return { newStage: stage, injectScaffold: false };
}
function detectAdvanceIntent(text: string): boolean { return /我准备好了|可以下一步|继续|进入下一阶段|开始假设|开始预测|设计实验|总结/.test(text); }
function isMessageShortOrPassive(text: string): boolean { return text.length < 15 || /不知道|不会|卡住|怎么办/.test(text); }
