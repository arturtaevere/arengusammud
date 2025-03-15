
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CompetenceList from '@/components/competences/CompetenceList';
import { 
  convertToCompetencesPageFormat, 
  convertActionStepsToCompetencesPageFormat 
} from '@/components/observation/competencyAdapter';
import { actionSteps } from '@/data/actionStepsData';
import { ActionStep } from '@/data/action-steps/types';

export default function Competences() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categoryParam);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [competencesWithCounts, setCompetencesWithCounts] = useState(convertToCompetencesPageFormat());
  const [actionStepsData, setActionStepsData] = useState<ActionStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create a ref to the category element we want to scroll to
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Debug logging to check data flow
  console.log("Competences component rendering");
  console.log("Action steps available:", actionSteps ? actionSteps.length : 0);
  
  useEffect(() => {
    console.log("Competences useEffect running");
    try {
      setIsLoading(true);
      
      // Get action steps data first
      const steps = convertActionStepsToCompetencesPageFormat();
      console.log("Steps from converter:", steps?.length || 0);
      
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

  // Auto-expand the category from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setExpandedCategory(categoryParam);
      // Also auto-expand the steps for this category
      setExpandedSteps(prev => ({
        ...prev,
        [categoryParam]: true
      }));
      
      // Add a slight delay to ensure the DOM is fully rendered
      setTimeout(() => {
        if (categoryRefs.current[categoryParam]) {
          // Scroll the category into view
          categoryRefs.current[categoryParam]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center' // Changed from 'start' to 'center' to keep the heading visible
          });
          console.log(`Scrolling to category ${categoryParam}`);
        } else {
          console.log(`Category ref for ${categoryParam} not found`);
        }
      }, 300);
    }
  }, [categoryParam, isLoading]);

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
      
      {/* Added pt-24 (padding-top) to ensure content is below the fixed navbar */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Õpieesmärgid</h1>
          <p className="text-muted-foreground mt-2">
            Tutvu õpieesmärkidega, mis aitavad sul professionaalselt areneda ja toetada oma õpilaste arengut.
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-6">
            <p>Laadin andmeid...</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
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
            categoryRefs={categoryRefs}
          />
        )}
      </main>
    </div>
  );
}
