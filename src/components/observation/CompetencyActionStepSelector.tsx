
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from '@/components/ui/input';
import { Search, ClipboardList, ArrowLeft } from 'lucide-react';
import { competencies } from './competencies';

interface CompetencyActionStepSelectorProps {
  onSelect: (actionStep: { id: string; title: string; description: string }) => void;
  label: string;
  value?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CompetencyActionStepSelector = ({ onSelect, label, value, open, onOpenChange }: CompetencyActionStepSelectorProps) => {
  const [search, setSearch] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null);
  
  // Control the sheet state
  const [internalOpen, setInternalOpen] = useState(false);
  
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
        actionSteps: comp.actionSteps.filter(step => 
          step.title.toLowerCase().includes(search.toLowerCase()) || 
          step.description.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(comp => comp.actionSteps.length > 0 || comp.name.toLowerCase().includes(search.toLowerCase()));

  // Check if all action steps are being shown by logging their count
  console.log('Total action steps across all competencies:', competencies.reduce((total, comp) => total + comp.actionSteps.length, 0));
  console.log('Filtered action steps:', filteredCompetencies.reduce((total, comp) => total + comp.actionSteps.length, 0));

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
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Otsi arengusamme..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="h-[70vh] overflow-y-auto">
            {selectedCompetency ? (
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="flex items-center text-sm font-medium mb-2 justify-start"
                  onClick={handleBackToCompetencies}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Tagasi kompetentside juurde
                </Button>

                {filteredCompetencies
                  .filter(comp => comp.id === selectedCompetency)
                  .map(comp => (
                    <div key={comp.id} className="space-y-2">
                      <h3 className="font-medium text-lg mb-3 text-left">
                        {comp.name}
                      </h3>
                      <div className="space-y-2 pl-1">
                        {comp.actionSteps.map((step) => (
                          <Button
                            key={step.id}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-2 text-sm"
                            onClick={() => handleActionStepSelect(step)}
                          >
                            <div className="text-left w-full">
                              <div className="font-medium text-left">{step.title}</div>
                              <div className="text-xs text-muted-foreground text-left">{step.description}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCompetencies.map((comp) => (
                  <Button
                    key={comp.id}
                    variant="ghost"
                    className="w-full text-left h-auto py-2 px-3 text-sm hover:bg-muted flex items-start justify-start"
                    onClick={() => handleCompetencySelect(comp.id)}
                  >
                    <span className="font-medium block whitespace-normal text-left w-full">
                      {comp.name}
                    </span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompetencyActionStepSelector;
