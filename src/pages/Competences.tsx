import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CompetenceList from '@/components/competences/CompetenceList';
import { 
  convertToCompetencesPageFormat, 
  convertActionStepsToCompetencesPageFormat 
} from '@/components/observation/competencyAdapter';
import { actionSteps } from '@/data/actionStepsData';
import { ActionStep } from '@/data/action-steps/types';

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [competencesWithCounts, setCompetencesWithCounts] = useState(convertToCompetencesPageFormat());
  const [actionStepsData, setActionStepsData] = useState<ActionStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug logging to check data
  console.log("Competences component rendering");
  console.log("Action steps from data module available:", Boolean(actionSteps));
  if (actionSteps) {
    console.log("Original action steps count:", actionSteps.length);
  }
  
  useEffect(() => {
    console.log("Competences useEffect running");
    try {
      setIsLoading(true);
      
      // Initialize with empty data first
      setCompetencesWithCounts(convertToCompetencesPageFormat());
      
      // Get action steps data
      const steps = convertActionStepsToCompetencesPageFormat();
      console.log("Steps from converter:", steps);
      
      if (!steps || steps.length === 0) {
        console.warn("No action steps were loaded");
      }
      
      // Update state with steps
      setActionStepsData(steps || []);
      
      // Update competence counts based on actual action steps
      const updatedCompetences = convertToCompetencesPageFormat().map(comp => {
        const stepsCount = steps ? steps.filter(step => step && step.category === comp.id).length : 0;
        console.log(`Competence ${comp.id} (${comp.title}) has ${stepsCount} steps`);
        return {
          ...comp,
          count: stepsCount
        };
      });
      
      setCompetencesWithCounts(updatedCompetences);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading competences data:", error);
      setError("Viga andmete laadimisel. Proovi lehte värskendada.");
      setIsLoading(false);
    }
  }, []);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
    
    // Log for debugging
    console.log(`Toggling category ${id}`);
    if (expandedCategory !== id) {
      const categorySteps = actionStepsData?.filter(step => step && step.category === id) || [];
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Õpieesmärgid</h1>
        </div>

        {isLoading && (
          <div className="text-center py-10">
            <p>Laadin andmeid...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <CompetenceList 
            competences={competencesWithCounts}
            actionSteps={actionStepsData}
            expandedCategory={expandedCategory}
            expandedSteps={expandedSteps}
            onToggleCategory={toggleCategory}
            onToggleStepsExpansion={toggleStepsExpansion}
          />
        )}
      </main>
    </div>
  );
}
