import './globals.css';
import { ProjectProvider } from '@/context/ProjectContext';

export const metadata = { title: 'SciMentor - 你的科研导师', description: '科学探究苏格拉底式导师' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body><ProjectProvider>{children}</ProjectProvider></body></html>;
}
