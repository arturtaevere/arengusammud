
import React from 'react';
import CompetenceCard from './CompetenceCard';

interface Competence {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode; // Changed from React.ElementType to React.ReactNode
}

interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  timeEstimate: string;
  resources: { title: string; url: string }[];
}

interface CompetenceListProps {
  competences: Competence[];
  actionSteps: ActionStep[];
  expandedCategory: string | null;
  expandedSteps: Record<string, boolean>;
  onToggleCategory: (id: string) => void;
  onToggleStepsExpansion: (id: string, e: React.MouseEvent) => void;
}

const CompetenceList = ({
  competences,
  actionSteps,
  expandedCategory,
  expandedSteps,
  onToggleCategory,
  onToggleStepsExpansion
}: CompetenceListProps) => {
  // Debug logging for diagnostics
  console.log("CompetenceList received action steps:", actionSteps.length);
  
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      {competences.map((competence) => {
        const categorySteps = actionSteps.filter(step => step.category === competence.id);
        console.log(`Filtering steps for category ${competence.id} (${competence.title}):`, categorySteps.length);
        const isStepsExpanded = expandedSteps[competence.id] || false;
        
        return (
          <CompetenceCard
            key={competence.id}
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
        );
      })}
    </div>
  );
};

export default CompetenceList;
