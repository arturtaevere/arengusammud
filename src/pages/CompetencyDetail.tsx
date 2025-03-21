
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { convertToCompetencesPageFormat, convertActionStepsToCompetencesPageFormat } from '@/components/observation/competencyAdapter';
import { getCompetencyDescription } from '@/components/observation/competencyAdapter';
import ActionStepItem from '@/components/competences/ActionStepItem';

export default function CompetencyDetail() {
  const { id } = useParams<{ id: string }>();
  const [competency, setCompetency] = useState<any>(null);
  const [actionSteps, setActionSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // Get all competencies and find the current one
      const allCompetencies = convertToCompetencesPageFormat();
      const currentCompetency = allCompetencies.find(comp => comp.id === id);
      
      // Get all action steps and filter for this competency
      const allSteps = convertActionStepsToCompetencesPageFormat();
      const competencySteps = allSteps.filter(step => step && step.category === id);
      
      setCompetency(currentCompetency);
      setActionSteps(competencySteps);
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-orange-light/10">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <p>Laadin andmeid...</p>
        </main>
      </div>
    );
  }
  
  if (!competency) {
    return (
      <div className="min-h-screen bg-orange-light/10">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <p>Kompetentsi ei leitud</p>
          <Link to="/competences">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tagasi kompetentside juurde
            </Button>
          </Link>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-orange-light/10">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <Link to="/competences" className="inline-block mb-6">
          <Button variant="ghost" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tagasi kompetentside juurde
          </Button>
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2.5 rounded-md">
              {competency.icon}
            </div>
            <h1 className="text-3xl font-bold">{competency.title}</h1>
          </div>
          
          <p className="text-muted-foreground">
            {getCompetencyDescription(`comp${competency.id}`)}
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Arengusammud</h2>
        
        {actionSteps.length === 0 ? (
          <Card className="p-6 text-center bg-slate-50">
            <p>Selle kompetentsi jaoks pole veel arengusamme lisatud.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {actionSteps.map(step => (
              <ActionStepItem
                key={step.id}
                id={step.id}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
