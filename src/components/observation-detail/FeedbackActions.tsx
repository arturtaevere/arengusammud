
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck, BookOpen } from 'lucide-react';
import { useState } from 'react';
import ReflectionDialog from './ReflectionDialog';
import { StoredObservation, updateObservation } from '@/components/observation/storage';
import { useToast } from '@/hooks/use-toast';

interface FeedbackActionsProps {
  isObserved: boolean;
  feedbackProvided: boolean;
  handleFeedbackProvided: () => void;
  observation: StoredObservation;
  setObservation: (observation: StoredObservation) => void;
}

const FeedbackActions = ({
  isObserved,
  feedbackProvided,
  handleFeedbackProvided,
  observation,
  setObservation
}: FeedbackActionsProps) => {
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const { toast } = useToast();

  const hasReflection = !!observation.teacherReflection;

  const saveReflection = (reflection: {
    reflection: string;
  }) => {
    const updatedObservation = {
      ...observation,
      teacherReflection: {
        ...reflection,
        submittedAt: new Date().toISOString(),
      }
    };

    updateObservation(updatedObservation);
    setObservation(updatedObservation);
    
    toast({
      title: "Refleksioon salvestatud",
      description: "Sinu refleksioon on edukalt salvestatud",
    });
  };

  return (
    <>
      {/* Feedback Meeting Button - only visible to coaches */}
      {!isObserved && (
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleFeedbackProvided}
            disabled={feedbackProvided}
            className="gap-2 bg-pink-500 hover:bg-pink-600 text-white"
          >
            <CalendarCheck className="h-4 w-4" />
            {feedbackProvided 
              ? "Tagasisidekohtumine toimunud" 
              : "Märgi tagasisidekohtumine toimunuks"}
          </Button>
        </div>
      )}
      
      {/* Teacher Reflection Button - only visible to teachers after feedback is provided */}
      {isObserved && observation.hasFeedback && (
        <div className="flex justify-end mt-8">
          <Button
            onClick={() => setReflectionOpen(true)}
            variant={hasReflection ? "outline" : "default"}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            {hasReflection 
              ? "Vaata/muuda refleksiooni" 
              : "Lisa refleksioon"}
          </Button>
        </div>
      )}
      
      {/* Message for teachers when feedback is not yet provided */}
      {isObserved && !observation.hasFeedback && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-800">
              Tagasiside kuvatakse siin pärast seda, kui õpipartner on märkinud tagasisidekohtumise toimunuks.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reflection Dialog */}
      <ReflectionDialog
        open={reflectionOpen}
        onOpenChange={setReflectionOpen}
        observation={observation}
        saveReflection={saveReflection}
      />
    </>
  );
};

export default FeedbackActions;
