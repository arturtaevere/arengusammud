
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { convertToCompetencesPageFormat } from '@/components/observation/competencyAdapter';
import { getIconComponent } from '@/components/observation/competencyAdapter';

export default function Competences() {
  const competences = convertToCompetencesPageFormat();
  
  return (
    <div className="min-h-screen bg-orange-light/10">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Õpieesmärgid</h1>
          <p className="text-muted-foreground">
            Tutvu õpieesmärkidega, mis aitavad sul professionaalselt areneda ja toetada oma õpilaste arengut.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {competences.map((competence) => (
            <Link 
              key={competence.id} 
              to={`/competency/${competence.id}`}
              aria-label={`Vaata kompetentsi: ${competence.title}`}
            >
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
      </main>
    </div>
  );
}
