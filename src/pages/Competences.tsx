
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
import { actionSteps } from '@/data/actionStepsData';

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [competencesWithCounts, setCompetencesWithCounts] = useState(convertToCompetencesPageFormat());
  const [actionStepsData, setActionStepsData] = useState(convertActionStepsToCompetencesPageFormat());

  // Debug logging to check data
  console.log("Action steps from data module:", actionSteps);
  console.log("Original action steps count:", actionSteps.length);
  console.log("Converted action steps data:", actionStepsData);
  console.log("Number of action steps after conversion:", actionStepsData.length);
  
  useEffect(() => {
    // Make sure we're getting fresh data
    const steps = convertActionStepsToCompetencesPageFormat();
    console.log("Steps from converter:", steps);
    setActionStepsData(steps);
    
    // Update competence counts based on actual action steps
    const updatedCompetences = convertToCompetencesPageFormat().map(comp => {
      const stepsCount = steps.filter(step => step.category === comp.id).length;
      console.log(`Competence ${comp.id} (${comp.title}) has ${stepsCount} steps`);
      return {
        ...comp,
        count: stepsCount
      };
    });
    
    setCompetencesWithCounts(updatedCompetences);
  }, []);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
    
    // Log for debugging
    console.log(`Toggling category ${id}`);
    if (expandedCategory !== id) {
      const categorySteps = actionStepsData.filter(step => step.category === id);
      console.log(`Category ${id} has ${categorySteps.length} steps:`, categorySteps);
    }
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
          actionSteps={actionStepsData}
          expandedCategory={expandedCategory}
          expandedSteps={expandedSteps}
          onToggleCategory={toggleCategory}
          onToggleStepsExpansion={toggleStepsExpansion}
        />
      </main>
    </div>
  );
}
