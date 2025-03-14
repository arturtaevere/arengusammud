
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface Competence {
  id: string;
  title: string;
  icon: ReactNode;
}

interface CompetencesGridProps {
  competences: Competence[];
}

const CompetencesGrid = ({ competences }: CompetencesGridProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Õpieesmärgid</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {competences.map((competence) => (
          <Link key={competence.id} to={`/competences?category=${competence.id}`}>
            <Card className="h-full hover:shadow-md transition-all border-l-4 border-l-primary">
              <CardContent className="p-4 flex items-center">
                <div className="mr-3 bg-primary/10 p-2 rounded-md">
                  {competence.icon}
                </div>
                <p className="font-medium text-sm line-clamp-2">{competence.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompetencesGrid;
