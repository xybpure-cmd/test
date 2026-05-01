'use client';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Stage, Message, KnowledgeCard } from '@/lib/types';
import { getCardsByStage } from '@/lib/knowledgeBase';
import { v4 as uuidv4 } from 'uuid';

type State = { projectId: string; currentStage: Stage; messages: Message[]; scaffoldCard?: KnowledgeCard; loading: boolean };
const initial: State = { projectId: '', currentStage: 'OBSERVATION', messages: [], loading: false };
const Ctx = createContext<any>(null);

function reducer(state: State, action: any): State {
  switch (action.type) {
    case 'SET': return { ...state, ...action.payload };
    case 'ADD': return { ...state, messages: [...state.messages, action.payload] };
    case 'UPDATE_LAST': return { ...state, messages: [...state.messages.slice(0, -1), { ...state.messages[state.messages.length - 1], content: action.payload }] };
    default: return state;
  }
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  useEffect(() => {
    const uid = localStorage.getItem('sciMentor_userId') || uuidv4();
    localStorage.setItem('sciMentor_userId', uid);
    dispatch({ type: 'SET', payload: { projectId: localStorage.getItem('sciMentor_projectId') || '' } });
  }, []);

  const sendMessage = async (text: string) => {
    dispatch({ type: 'ADD', payload: { id: crypto.randomUUID(), role: 'user', content: text, stage: state.currentStage } });
    dispatch({ type: 'ADD', payload: { id: crypto.randomUUID(), role: 'assistant', content: '', stage: state.currentStage } });
    const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectId: state.projectId, message: text }) });
    const reader = res.body?.getReader(); if (!reader) return;
    const dec = new TextDecoder(); let acc = '';
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      const lines = dec.decode(value).split('\n').filter(Boolean);
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6); if (data === '[DONE]') continue;
        const json = JSON.parse(data); if (json.projectId) { localStorage.setItem('sciMentor_projectId', json.projectId); dispatch({ type: 'SET', payload: { projectId: json.projectId } }); }
        if (json.stage) dispatch({ type: 'SET', payload: { currentStage: json.stage, scaffoldCard: getCardsByStage(json.stage)[0] } });
        if (json.content) { acc += json.content; dispatch({ type: 'UPDATE_LAST', payload: acc }); }
      }
    }
  };

  return <Ctx.Provider value={{ ...state, sendMessage }}>{children}</Ctx.Provider>;
}
export const useProject = () => useContext(Ctx);
