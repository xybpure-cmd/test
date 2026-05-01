'use client';
import ChatPanel from '@/components/ChatPanel';
import ProgressBar from '@/components/ProgressBar';
import SidePanel from '@/components/SidePanel';

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">SciMentor - 你的科研导师</h1>
      <ProgressBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2"><ChatPanel /></div>
        <div className="hidden md:block"><SidePanel /></div>
      </div>
    </main>
  );
}
