
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Video, ClipboardList, ExternalLink } from 'lucide-react';
import { getActionStepById } from './types';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '../VideoPlayer';
import { Separator } from '@/components/ui/separator';

interface ActionStepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionStepId: string | null;
}

const ActionStepDialog: React.FC<ActionStepDialogProps> = ({
  open,
  onOpenChange,
  actionStepId
}) => {
  // Get action step details
  const actionStep = actionStepId ? getActionStepById(actionStepId) : null;

  if (!actionStep) {
    return null;
  }

  // Example video URL - in a real app this would come from the database
  // This is mocked for demonstration purposes
  const videoUrl = actionStep.id === 'step10' 
    ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
    : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{actionStep.title}</DialogTitle>
          <DialogDescription className="text-base">
            {actionStep.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Category Badge */}
          {actionStep.category && (
            <Badge variant="outline" className="mb-2">
              Kategooria {actionStep.category}
            </Badge>
          )}
          
          {/* Rationale Section */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Põhjendus
            </h3>
            <p className="text-sm text-muted-foreground">
              Selgitab miks see arengusamm on oluline ja kuidas see mõjutab õpilaste õppimist.
            </p>
          </div>

          <Separator />
          
          {/* Success Criteria */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Edukriteeriumid
            </h3>
            <ul className="text-sm pl-5 list-disc space-y-1">
              {actionStep.resources.map((resource, index) => (
                <li key={index}>
                  {resource.title}
                  {resource.url && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 ml-1"
                      asChild
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Practice Tasks */}
          {actionStep.practiceTasks && actionStep.practiceTasks.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Harjutusülesanne</h3>
                <ul className="text-sm pl-5 list-decimal space-y-1">
                  {actionStep.practiceTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
          
          {/* Video Example */}
          {videoUrl && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Näidisvideo
                </h3>
                <VideoPlayer src={videoUrl} title="Arengusammu näidisvideo" />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionStepDialog;
