'use client';
import { useProject } from '@/context/ProjectContext';
import { stageOrder } from '@/lib/stateMachine';

export default function ProgressBar() {
  const { currentStage } = useProject();
  const idx = stageOrder.indexOf(currentStage);
  return <div className="flex flex-wrap gap-2">{stageOrder.map((s,i)=><div key={s} className={`px-3 py-1 rounded-full text-xs ${i<idx?'bg-green-100':i===idx?'bg-blue-600 text-white':'bg-slate-200'}`}>{i<idx?'✓ ':''}{s}</div>)}</div>;
}
