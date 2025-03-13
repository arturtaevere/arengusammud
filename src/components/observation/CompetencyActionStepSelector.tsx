
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { competencies } from './competencies';
import { Input } from '@/components/ui/input';
import { Search, ClipboardList } from 'lucide-react';

interface CompetencyActionStepSelectorProps {
  onSelect: (actionStep: { id: string; title: string; description: string }) => void;
  label: string;
  value?: string;
}

const CompetencyActionStepSelector = ({ onSelect, label, value }: CompetencyActionStepSelectorProps) => {
  const [search, setSearch] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expandedAccordionItems, setExpandedAccordionItems] = useState<string[]>([]);

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
    setSheetOpen(false);
  };

  const handleAccordionChange = (value: string) => {
    setExpandedAccordionItems(prev => {
      // If it's already in the array, remove it, otherwise add it
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Set initial expanded state for the competency with ID "comp10" (Ennastjuhtiva õppija toetamine)
  // to make it easier for users to find the many action steps there
  React.useEffect(() => {
    if (expandedAccordionItems.length === 0) {
      setExpandedAccordionItems(['comp10']);
    }
  }, []);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left h-auto py-2 px-3"
        >
          <ClipboardList className="h-4 w-4 mr-2 opacity-70" />
          {value || label}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[95%] sm:max-w-md">
        <SheetHeader>
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
            <Accordion 
              type="multiple" 
              value={expandedAccordionItems}
              onValueChange={(value) => setExpandedAccordionItems(value as string[])}
              className="w-full"
            >
              {filteredCompetencies.map((comp) => (
                <AccordionItem key={comp.id} value={comp.id}>
                  <AccordionTrigger 
                    className="text-sm font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAccordionChange(comp.id);
                    }}
                  >
                    {comp.name} ({comp.actionSteps.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-1">
                      {comp.actionSteps.map((step) => (
                        <Button
                          key={step.id}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto p-2 text-sm"
                          onClick={() => handleActionStepSelect(step)}
                        >
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs text-muted-foreground">{step.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompetencyActionStepSelector;
