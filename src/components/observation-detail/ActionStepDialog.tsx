
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, Book } from 'lucide-react';
import { getActionStepById } from '@/components/observation/competencies';

interface ActionStepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionStepId: string | null;
}

const ActionStepDialog = ({ open, onOpenChange, actionStepId }: ActionStepDialogProps) => {
  const [actionStep, setActionStep] = useState<any>(null);
  
  console.log('ActionStepDialog receiving actionStepId:', actionStepId);
  
  useEffect(() => {
    if (actionStepId && open) {
      try {
        const step = getActionStepById(actionStepId);
        console.log('Found action step:', step);
        setActionStep(step);
      } catch (error) {
        console.error('Error loading action step:', error);
        setActionStep(null);
      }
    } else {
      setActionStep(null);
    }
  }, [actionStepId, open]);
  
  if (!actionStep) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Arengusammu info</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">
            {actionStepId ? 'Arengusammu info laadimine...' : 'Arengusammu info pole saadaval'}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{actionStep.title}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Kirjeldus</h3>
              <p className="text-gray-700">{actionStep.description}</p>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Ajakulu: {actionStep.timeEstimate || 'keskmine'}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Raskusaste: {actionStep.difficulty || 'keskmine'}</span>
              </div>
            </div>
            
            {actionStep.rationale && (
              <div>
                <h3 className="font-medium mb-2">Põhjendus</h3>
                <p className="text-gray-700">{actionStep.rationale}</p>
              </div>
            )}
            
            {actionStep.examples && (
              <div>
                <h3 className="font-medium mb-2">Näited</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {Array.isArray(actionStep.examples) 
                    ? actionStep.examples.map((example: string, i: number) => (
                        <li key={i} className="text-gray-700">{example}</li>
                      ))
                    : <li className="text-gray-700">{actionStep.examples}</li>
                  }
                </ul>
              </div>
            )}
            
            {actionStep.successCriteria && (
              <div>
                <h3 className="font-medium mb-2">Edukriteeriumid</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {Array.isArray(actionStep.successCriteria) 
                    ? actionStep.successCriteria.map((criteria: string, i: number) => (
                        <li key={i} className="text-gray-700">{criteria}</li>
                      ))
                    : <li className="text-gray-700">{actionStep.successCriteria}</li>
                  }
                </ul>
              </div>
            )}
            
            {actionStep.competency && (
              <div>
                <h3 className="font-medium mb-2">Seotud pädevus</h3>
                <Badge variant="outline" className="bg-gray-100">
                  {actionStep.competency}
                </Badge>
              </div>
            )}
            
            {actionStep.resources && actionStep.resources.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Lisamaterjalid</h3>
                <ul className="space-y-2">
                  {actionStep.resources.map((resource: any, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-blue-600" />
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ActionStepDialog;
