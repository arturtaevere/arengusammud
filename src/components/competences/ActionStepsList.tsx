
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';
import ActionStepItem from './ActionStepItem';
import { Link } from 'react-router-dom';

interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  timeEstimate: string;
  resources: { title: string; url: string }[];
}

interface ActionStepsListProps {
  steps: ActionStep[];
  competenceId: string;
  isExpanded: boolean;
  onToggleExpansion: (id: string, e: React.MouseEvent) => void;
}

const ActionStepsList = ({ 
  steps, 
  competenceId, 
  isExpanded, 
  onToggleExpansion 
}: ActionStepsListProps) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
        <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-2" />
        <p className="text-slate-500">
          Selle kategooria alla pole veel arengusamme lisatud.
        </p>
      </div>
    );
  }

  const displayedSteps = isExpanded ? steps : steps.slice(0, 3);

  return (
    <div className="space-y-2">
      {displayedSteps.map(step => (
        <ActionStepItem 
          key={step.id}
          id={step.id}
          title={step.title}
          description={step.description}
        />
      ))}
      
      {steps.length > 3 && (
        <div className="flex justify-between mt-2">
          <Button 
            variant="ghost" 
            className="text-sm text-primary hover:text-primary-foreground"
            onClick={(e) => onToggleExpansion(competenceId, e)}
          >
            {isExpanded 
              ? "Näita vähem" 
              : `+ ${steps.length - 3} muud arengusammu`}
          </Button>
          
          <Link to={`/action-steps?category=${competenceId}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-3 w-3" />
              Kõik sammud
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ActionStepsList;
