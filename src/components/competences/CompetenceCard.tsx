
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ActionStepsList from './ActionStepsList';
import { ActionStep } from '@/data/action-steps/types';

interface CompetenceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  isExpanded: boolean;
  isStepsExpanded: boolean;
  steps: ActionStep[];
  onToggleExpansion: (id: string) => void;
  onToggleStepsExpansion: (id: string, e: React.MouseEvent) => void;
}

const CompetenceCard = ({
  id,
  title,
  description,
  icon,
  count,
  isExpanded,
  isStepsExpanded,
  steps,
  onToggleExpansion,
  onToggleStepsExpansion
}: CompetenceCardProps) => {
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={() => onToggleExpansion(id)}
      className="w-full"
    >
      <Card className="w-full hover:shadow-md transition-all">
        <CardHeader className="pb-2 cursor-pointer">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </div>
              </div>
              <ChevronRight 
                className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-4">
            <ActionStepsList 
              steps={steps}
              competenceId={id}
              isExpanded={isStepsExpanded}
              onToggleExpansion={onToggleStepsExpansion}
            />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CompetenceCard;
