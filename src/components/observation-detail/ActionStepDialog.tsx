
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Video, CheckSquare, BookOpen, ListTodo, ExternalLink } from 'lucide-react';
import { getActionStepById } from '@/components/observation/types';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '../VideoPlayer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

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
  console.log('ActionStepDialog receiving actionStepId:', actionStepId);
  
  // Get action step details
  const actionStep = actionStepId ? getActionStepById(actionStepId) : null;
  
  console.log('Retrieved actionStep:', actionStep);

  if (!actionStep) {
    console.log('No action step found with id:', actionStepId);
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
          
          <Tabs defaultValue="reason" className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="reason" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Põhjendus
              </TabsTrigger>
              <TabsTrigger value="criteria" className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2" />
                Edukriteeriumid
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center">
                <ListTodo className="h-4 w-4 mr-2" />
                Harjutusülesanne
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Näited
              </TabsTrigger>
              {videoUrl && (
                <TabsTrigger value="video" className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="reason" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium mb-4">Põhjendus</h3>
                    <p className="text-sm text-muted-foreground">
                      Selgitab miks see arengusamm on oluline ja kuidas see mõjutab õpilaste õppimist.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="criteria" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Edukriteeriumid</h3>
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="practice" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Harjutusülesanne</h3>
                  {actionStep.practiceTasks && actionStep.practiceTasks.length > 0 ? (
                    <ul className="text-sm pl-5 list-decimal space-y-1">
                      {actionStep.practiceTasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Harjutusülesanne pole veel lisatud
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="examples" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Näited</h3>
                  <p className="text-sm text-muted-foreground">
                    Praktilised näited arengusammu rakendamisest
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {videoUrl && (
              <TabsContent value="video" className="animate-fade-in">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Näidisvideo</h3>
                    <VideoPlayer src={videoUrl} title="Arengusammu näidisvideo" />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionStepDialog;
