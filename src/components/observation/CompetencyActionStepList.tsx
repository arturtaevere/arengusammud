
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
  const hasActionSteps = competency.actionSteps && competency.actionSteps.length > 0;
  
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
        
        {hasActionSteps ? (
          <div className="space-y-3 pl-1">
            {competency.actionSteps.map((step) => (
              <Button
                key={step.id}
                variant="ghost"
                className="w-full justify-start text-left h-auto py-3 px-3 text-sm"
                onClick={() => onSelectStep(step)}
              >
                <div className="text-left w-full space-y-1">
                  <div className="font-medium text-left">{step.title}</div>
                  <div className="text-xs text-muted-foreground text-left whitespace-normal">{step.description}</div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-slate-50 rounded-lg">
            <p className="text-muted-foreground">Sellel kompetentsil pole veel arengusamme.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetencyActionStepList;
