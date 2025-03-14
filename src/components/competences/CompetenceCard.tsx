
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
        <CardHeader className="py-2 px-4 cursor-pointer">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  {icon}
                </div>
                <div>
                  <CardTitle className="text-base font-medium">{title}</CardTitle>
                </div>
              </div>
              <ChevronRight 
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-2 pb-3 px-4">
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
