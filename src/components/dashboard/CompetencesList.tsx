
import { ReactNode } from 'react';
import { BookOpen, ClipboardCheck, Clock, Compass, FileText, 
  Layers, MessageCircle, Users, BarChart, Brain } from 'lucide-react';
import { competences } from '@/data/competencesData';

export interface Competence {
  id: string;
  title: string;
  icon: ReactNode;
}

// Create competences list with icons for the dashboard
export const competences: Competence[] = competences.map(comp => {
  // Map of competence IDs to icons
  const iconMap: Record<string, ReactNode> = {
    '1': <BookOpen className="h-5 w-5 text-primary" />,
    '2': <ClipboardCheck className="h-5 w-5 text-primary" />,
    '3': <Clock className="h-5 w-5 text-primary" />,
    '4': <Compass className="h-5 w-5 text-primary" />,
    '5': <FileText className="h-5 w-5 text-primary" />,
    '6': <Layers className="h-5 w-5 text-primary" />,
    '7': <MessageCircle className="h-5 w-5 text-primary" />,
    '8': <Users className="h-5 w-5 text-primary" />,
    '9': <BarChart className="h-5 w-5 text-primary" />,
    '10': <Brain className="h-5 w-5 text-primary" />
  };
  
  return {
    id: comp.id,
    title: comp.title,
    icon: iconMap[comp.id] || <BookOpen className="h-5 w-5 text-primary" />
  };
});
