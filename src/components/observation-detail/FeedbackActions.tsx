
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck, BookOpen, Check, X } from 'lucide-react';
import { useState } from 'react';
import ReflectionDialog from './ReflectionDialog';
import { StoredObservation, updateObservation } from '@/components/observation/storage';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
      {/* Feedback Meeting Toggle - only visible to coaches */}
      {!isObserved && (
        <div className="flex justify-end mt-8">
          <div className="flex items-center gap-4 p-4 border rounded-md bg-gray-50">
            <div className="flex flex-col">
              <span className="font-medium">Tagasisidekohtumine on toimunud</span>
              <span className="text-sm text-gray-500">
                Pärast valimist jagatakse märkmed õpetajaga
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md">
              <span className={`text-sm ${!feedbackProvided ? 'font-medium text-red-500' : 'text-gray-500'}`}>
                Ei
              </span>
              <Switch 
                checked={feedbackProvided}
                onCheckedChange={(checked) => {
                  if (checked) handleFeedbackProvided();
                }}
                disabled={feedbackProvided}
              />
              <span className={`text-sm ${feedbackProvided ? 'font-medium text-green-600' : 'text-gray-500'}`}>
                Jah
              </span>
            </div>
          </div>
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
