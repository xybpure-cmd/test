'use client';
import ReactMarkdown from 'react-markdown';
export default function MessageBubble({ role, content }: { role: string; content: string }) {
  const user = role === 'user';
  return <div className={`flex ${user?'justify-end':'justify-start'} mb-2`}><div className={`max-w-[80%] rounded-xl px-3 py-2 ${user?'bg-blue-600 text-white':'bg-slate-200'}`}><ReactMarkdown>{content}</ReactMarkdown></div></div>;
}
