
import React from 'react';
import { Button } from "@/components/ui/button";

interface CompetencyItem {
  id: string;
  name: string;
}

interface CompetencyListProps {
  competencies: CompetencyItem[];
  onSelect: (compId: string) => void;
}

const CompetencyList = ({ competencies, onSelect }: CompetencyListProps) => {
  return (
    <div className="space-y-1">
      {competencies.map((comp) => (
        <Button
          key={comp.id}
          variant="ghost"
          className="w-full text-left h-auto py-2 px-3 text-sm hover:bg-primary/20 hover:text-foreground flex items-start justify-start"
          onClick={() => onSelect(comp.id)}
        >
          <span className="font-medium block whitespace-normal text-left w-full">
            {comp.name}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default CompetencyList;
