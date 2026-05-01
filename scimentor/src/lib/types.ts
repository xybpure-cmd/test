export type Stage =
  | 'OBSERVATION'
  | 'QUESTION'
  | 'BACKGROUND'
  | 'HYPOTHESIS'
  | 'PREDICTION'
  | 'VALIDATION'
  | 'REFLECTION';

export interface KnowledgeCard {
  id: string;
  stage: Stage;
  title: string;
  content: string;
  triggers: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  stage?: Stage;
}
