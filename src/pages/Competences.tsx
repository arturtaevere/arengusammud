
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CompetenceList from '@/components/competences/CompetenceList';
import { 
  convertToCompetencesPageFormat, 
  convertActionStepsToCompetencesPageFormat 
} from '@/components/observation/competencyAdapter';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [competencesWithCounts, setCompetencesWithCounts] = useState(convertToCompetencesPageFormat());
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [actionSteps, setActionSteps] = useState(convertActionStepsToCompetencesPageFormat());

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const toggleStepsExpansion = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Õpieesmärgid</h1>
            <p className="text-muted-foreground">
              Siit leiad erinevatesse kategooriatesse jaotatud arengusammud, mis aitavad õpetamisoskusi arendada.
            </p>
          </div>
          <Link to="/action-steps">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Kõik arengusammud
            </Button>
          </Link>
        </div>

        <CompetenceList 
          competences={competencesWithCounts}
          actionSteps={actionSteps}
          expandedCategory={expandedCategory}
          expandedSteps={expandedSteps}
          onToggleCategory={toggleCategory}
          onToggleStepsExpansion={toggleStepsExpansion}
        />
      </main>
    </div>
  );
}
