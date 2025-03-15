
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { getEnrichedCompetencies } from './data/competencyHelpers';
import ActionStepSearch from './ActionStepSearch';
import CompetencyList from './CompetencyList';
import CompetencyActionStepList from './CompetencyActionStepList';

interface CompetencyActionStepSelectorProps {
  onSelect: (actionStep: { id: string; title: string; description: string }) => void;
  label: string;
  value?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CompetencyActionStepSelector = ({ onSelect, value, open, onOpenChange }: CompetencyActionStepSelectorProps) => {
  const [search, setSearch] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const [competencies, setCompetencies] = useState<any[]>([]);
  
  // Load enriched competencies on mount
  useEffect(() => {
    const enrichedCompetencies = getEnrichedCompetencies();
    console.log("Loaded enriched competencies with action steps:", 
      enrichedCompetencies.map(c => ({ id: c.id, name: c.name, stepCount: c.actionSteps?.length || 0 }))
    );
    setCompetencies(enrichedCompetencies);
  }, []);
  
  // Sync internal state with external control if provided
  useEffect(() => {
    if (open !== undefined) {
      setInternalOpen(open);
    }
  }, [open]);

  // Handle internal state changes and propagate them if needed
  const handleOpenChange = (newOpen: boolean) => {
    setInternalOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }

    // Reset search and selection when closing
    if (!newOpen) {
      setSearch('');
      setSelectedCompetency(null);
    }
  };

  // Filter competencies and action steps based on search
  const filteredCompetencies = search.trim() === '' 
    ? competencies // If no search, show all competencies
    : competencies.map(comp => ({
        ...comp,
        actionSteps: comp.actionSteps?.filter(step => 
          step.title.toLowerCase().includes(search.toLowerCase()) || 
          step.description.toLowerCase().includes(search.toLowerCase())
        ) || []
      })).filter(comp => (comp.actionSteps?.length > 0) || comp.name.toLowerCase().includes(search.toLowerCase()));

  const handleActionStepSelect = (step: { id: string; title: string; description: string }) => {
    onSelect(step);
    handleOpenChange(false);
    setSelectedCompetency(null);
  };

  const handleCompetencySelect = (compId: string) => {
    setSelectedCompetency(compId);
  };

  const handleBackToCompetencies = () => {
    setSelectedCompetency(null);
  };

  return (
    <Sheet open={internalOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="w-[95%] sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Vali järgmine arengusamm</SheetTitle>
          <SheetDescription>
            Sirvige kompetentside ja arengusammude nimekirja või kasutage otsingut
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-4 space-y-4">
          <ActionStepSearch 
            value={search}
            onChange={setSearch}
          />
          
          <ScrollArea className="h-[70vh]">
            {selectedCompetency ? (
              <CompetencyActionStepList
                competency={filteredCompetencies.find(comp => comp.id === selectedCompetency)!}
                onBack={handleBackToCompetencies}
                onSelectStep={handleActionStepSelect}
              />
            ) : (
              <CompetencyList
                competencies={filteredCompetencies}
                onSelect={handleCompetencySelect}
              />
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompetencyActionStepSelector;
