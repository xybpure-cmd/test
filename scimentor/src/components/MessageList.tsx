'use client';
import { useProject } from '@/context/ProjectContext';
import MessageBubble from './MessageBubble';
export default function MessageList(){ const { messages } = useProject(); return <div>{messages.filter((m:any)=>m.role!=='system').map((m:any)=><MessageBubble key={m.id} role={m.role} content={m.content}/> )}</div>; }
