
import React from 'react';
import CompetenceCard from './CompetenceCard';
import { ActionStep } from '@/data/action-steps/types';

interface Competence {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

interface CompetenceListProps {
  competences: Competence[];
  actionSteps: ActionStep[];
  expandedCategory: string | null;
  expandedSteps: Record<string, boolean>;
  onToggleCategory: (id: string) => void;
  onToggleStepsExpansion: (id: string, e: React.MouseEvent) => void;
  categoryRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

const CompetenceList = ({
  competences,
  actionSteps,
  expandedCategory,
  expandedSteps,
  onToggleCategory,
  onToggleStepsExpansion,
  categoryRefs
}: CompetenceListProps) => {
  // Check if we have data
  console.log("CompetenceList rendered");
  console.log("Competences:", competences?.length || 0);
  console.log("Action steps received:", actionSteps?.length || 0);
  
  if (!competences || competences.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Kompetentse ei leitud.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-2">
      {competences.map((competence) => {
        // Make sure we handle undefined actionSteps
        const categorySteps = actionSteps?.filter(step => 
          step && step.category === competence.id
        ) || [];
        
        console.log(`Filtering steps for category ${competence.id} (${competence.title}):`, categorySteps.length);
        const isStepsExpanded = expandedSteps[competence.id] || false;
        
        return (
          <div 
            key={competence.id}
            ref={el => {
              if (categoryRefs && categoryRefs.current) {
                categoryRefs.current[competence.id] = el;
              }
            }}
          >
            <CompetenceCard
              id={competence.id}
              title={competence.title}
              description={competence.description}
              icon={competence.icon}
              count={competence.count}
              isExpanded={expandedCategory === competence.id}
              isStepsExpanded={isStepsExpanded}
              steps={categorySteps}
              onToggleExpansion={onToggleCategory}
              onToggleStepsExpansion={onToggleStepsExpansion}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CompetenceList;
