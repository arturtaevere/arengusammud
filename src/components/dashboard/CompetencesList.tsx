
import { ReactNode } from 'react';
import { 
  CheckSquare,
  Layers,
  Target,
  Lightbulb,
  ClipboardCheck,
  Book,
  Activity,
  MessageSquare,
  Users,
  GraduationCap
} from 'lucide-react';

export interface Competence {
  id: string;
  title: string;
  icon: ReactNode;
}

export const competences: Competence[] = [
  {
    id: '1',
    title: 'Hooliva ja arengut toetava õpikeskkonna loomine',
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    id: '2',
    title: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: '3',
    title: 'Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt',
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: '4',
    title: 'Kaasamõtlemise ja pingutamise soodustamine',
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    id: '5',
    title: 'Iseseisva töö kavandamine',
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    id: '6',
    title: 'Õppesisu meeldejääv edasiandmine õpilastele',
    icon: <Book className="h-5 w-5" />,
  },
  {
    id: '7',
    title: 'Andmete kogumine õppematerjali omandamise kohta',
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: '8',
    title: 'Tagasiside andmine õpilastele',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: '9',
    title: 'Õpilaste kaasamine hindamisprotsessi',
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: '10',
    title: 'Ennastjuhtiva õppija toetamine',
    icon: <GraduationCap className="h-5 w-5" />,
  },
];
