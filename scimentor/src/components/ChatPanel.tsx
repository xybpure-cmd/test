'use client';
import MessageList from './MessageList';
import Composer from './Composer';
export default function ChatPanel(){ return <section className="bg-white rounded-xl p-4 shadow"><div className="h-[60vh] overflow-y-auto"><MessageList/></div><Composer/></section>; }
