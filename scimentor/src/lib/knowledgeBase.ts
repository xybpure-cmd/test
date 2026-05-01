import { KnowledgeCard, Stage } from './types';

export const stageInstructions: Record<Stage, string> = {
  OBSERVATION: '引导用户详细描述观察到的现象：时间、地点、频率、变化趋势、是否可重复。',
  QUESTION: '帮助用户将现象转化为清晰、可研究、可验证的问题，避免过于宽泛。',
  BACKGROUND: '引导用户回忆已知知识、查阅方向与关键概念，并辨别信息来源可信度。',
  HYPOTHESIS: '引导用户使用“如果…那么…因为…”构建可证伪的假设，明确变量关系。',
  PREDICTION: '引导用户从假设推出可观察、可测量、可比较的具体预测结果。',
  VALIDATION: '引导用户设计验证方案：自变量、因变量、控制变量、样本、步骤与误差来源。',
  REFLECTION: '引导用户回顾流程、评估证据质量、识别局限并总结下一步改进方向。'
};

export const knowledgeCards: KnowledgeCard[] = [
  { id: 'o1', stage: 'OBSERVATION', title: '现象记录要素', content: '记录何时、何地、发生了什么、持续多久、是否重复出现。', triggers: ['看到', '发现', '现象'] },
  { id: 'q1', stage: 'QUESTION', title: '好问题标准', content: '问题应具体、可测量、有边界，例如“在X条件下，Y是否变化”。', triggers: ['问题', '为什么'] },
  { id: 'b1', stage: 'BACKGROUND', title: '背景检索框架', content: '先列关键词，再找教材、论文摘要、权威科普，区分事实与观点。', triggers: ['资料', '查', '背景'] },
  { id: 'h1', stage: 'HYPOTHESIS', title: '假设句式', content: '如果A变化，那么B会变化，因为C机制在起作用。', triggers: ['假设', '原因'] },
  { id: 'p1', stage: 'PREDICTION', title: '预测可观测', content: '预测必须能被观察或测量，并能与其他解释区分。', triggers: ['预测', '结果'] },
  { id: 'v1', stage: 'VALIDATION', title: '控制变量清单', content: '保持温度、时间、设备等不变，仅操纵一个关键因素。', triggers: ['实验', '验证'] },
  { id: 'v2', stage: 'VALIDATION', title: '常见谬误提示', content: '相关性不等于因果；样本偏差会误导结论；确认偏误会放大先入为主。', triggers: ['因果', '相关'] },
  { id: 'r1', stage: 'REFLECTION', title: '反思问题', content: '证据是否支持假设？哪些步骤最薄弱？如果重来如何优化？', triggers: ['总结', '反思'] }
];

export function getStageInstruction(stage: Stage): string { return stageInstructions[stage]; }
export function getCardsByStage(stage: Stage): KnowledgeCard[] { return knowledgeCards.filter(c => c.stage === stage); }
export function getScaffoldForStage(stage: Stage): string { return getCardsByStage(stage).map(c => `${c.title}：${c.content}`).join('；'); }
