'use client';
import { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
export default function Composer(){ const [v,setV]=useState(''); const { sendMessage } = useProject(); return <div className="flex gap-2"><input className="flex-1 border rounded px-3 py-2" value={v} onChange={e=>setV(e.target.value)} onKeyDown={async e=>{if(e.key==='Enter'&&v.trim()){await sendMessage(v);setV('');}}}/><button className="bg-blue-600 text-white px-4 rounded" onClick={async()=>{if(v.trim()){await sendMessage(v);setV('');}}}>发送</button></div>; }
