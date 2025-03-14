
import React from 'react';
import { BookOpen } from 'lucide-react';
import ActionStepItem from './ActionStepItem';
import { ActionStep } from '@/data/action-steps/types';

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
  // Add debugging to see if steps are being passed correctly
  console.log(`ActionStepsList for competence ${competenceId} received ${steps?.length || 0} steps`);
  
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

  // Show all steps, no need for slicing or "show more" button
  return (
    <div className="space-y-2">
      {steps.map(step => (
        <ActionStepItem 
          key={step.id}
          id={step.id}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
};

export default ActionStepsList;
