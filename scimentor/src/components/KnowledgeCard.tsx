'use client';
import { useState } from 'react';
export default function KnowledgeCard({title,content}:{title:string;content:string}){const [o,s]=useState(true);return <div className="border rounded p-2"><button onClick={()=>s(!o)} className="font-medium">{title}</button>{o&&<p className="text-sm mt-1">{content}</p>}</div>}
