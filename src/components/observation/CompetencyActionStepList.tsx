
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface ActionStep {
  id: string;
  title: string;
  description: string;
}

interface CompetencyActionStepListProps {
  competency: { id: string; name: string; actionSteps: ActionStep[] };
  onBack: () => void;
  onSelectStep: (step: ActionStep) => void;
}

const CompetencyActionStepList = ({ 
  competency, 
  onBack, 
  onSelectStep 
}: CompetencyActionStepListProps) => {
  return (
    <div className="space-y-3">
      <Button 
        variant="ghost" 
        className="flex items-center text-sm font-medium mb-2 justify-start"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Tagasi kompetentside juurde
      </Button>

      <div key={competency.id} className="space-y-2">
        <h3 className="font-medium text-lg mb-3 text-left">
          {competency.name}
        </h3>
        <div className="space-y-2 pl-1">
          {competency.actionSteps.map((step) => (
            <Button
              key={step.id}
              variant="ghost"
              className="w-full justify-start text-left h-auto p-2 text-sm"
              onClick={() => onSelectStep(step)}
            >
              <div className="text-left w-full">
                <div className="font-medium text-left">{step.title}</div>
                <div className="text-xs text-muted-foreground text-left">{step.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetencyActionStepList;
