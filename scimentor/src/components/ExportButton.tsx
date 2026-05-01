'use client';
import { useProject } from '@/context/ProjectContext';
export default function ExportButton(){const { projectId }=useProject(); return <button className="w-full bg-slate-800 text-white rounded px-3 py-2" onClick={async()=>{const r=await fetch(`/api/report?projectId=${projectId}`); const t=await r.text(); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([t],{type:'text/markdown'})); a.download='scimentor-report.md'; a.click();}}>导出报告</button>}
