'use client';
import { useProject } from '@/context/ProjectContext';
import { getCardsByStage, stageInstructions } from '@/lib/knowledgeBase';
import ScaffoldCard from './ScaffoldCard';
import KnowledgeCard from './KnowledgeCard';
import ExportButton from './ExportButton';
export default function SidePanel(){const { currentStage }=useProject(); const cards=getCardsByStage(currentStage); return <aside className="space-y-3"><ScaffoldCard title={currentStage} content={stageInstructions[currentStage]} />{cards.map(c=><KnowledgeCard key={c.id} title={c.title} content={c.content} />)}<ExportButton/></aside>}
