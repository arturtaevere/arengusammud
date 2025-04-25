
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PreviousActionStepSectionProps {
  previousActionStep?: string;
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
}

const PreviousActionStepSection = ({ 
  previousActionStep, 
  completed,
  onCompletionChange 
}: PreviousActionStepSectionProps) => {
  if (!previousActionStep) return null;
  
  return (
    <div className="space-y-4">
      <FormLabel className="font-bold flex items-center">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Eelmine samm
      </FormLabel>
      
      <div className="p-4 rounded-md bg-secondary/50 border border-border">
        {previousActionStep}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          Palun märgi, kas õpetaja sooritas eelmise arengusammu
        </p>
        
        <ToggleGroup 
          type="single" 
          value={completed ? "completed" : "incomplete"}
          onValueChange={(value) => onCompletionChange(value === "completed")}
        >
          <ToggleGroupItem 
            value="incomplete" 
            aria-label="Ei, veel mitte"
            className="flex-1"
          >
            Ei, veel mitte
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="completed" 
            aria-label="Jah"
            className="flex-1"
          >
            Jah
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default PreviousActionStepSection;
