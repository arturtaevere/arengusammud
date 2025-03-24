
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck, BookOpen, Check, X } from 'lucide-react';
import { useState } from 'react';
import ReflectionDialog from './ReflectionDialog';
import { StoredObservation, updateObservation } from '@/components/observation/storage';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
  const { user } = useAuth();

  const hasReflection = !!observation.teacherReflection;
  
  // Determine if current user is a coach (not the observed teacher)
  const isCoach = !isObserved;

  const saveReflection = async (reflection: {
    reflection: string;
  }) => {
    try {
      const updatedObservation = {
        ...observation,
        teacherReflection: {
          ...reflection,
          submittedAt: new Date().toISOString(),
        }
      };

      // Save the updated observation
      await updateObservation(updatedObservation);
      
      // Update the UI state
      setObservation(updatedObservation);
      
      toast({
        title: "Refleksioon salvestatud",
        description: "Sinu refleksioon on edukalt salvestatud",
      });
    } catch (error) {
      console.error('Error saving reflection:', error);
      toast({
        title: "Viga",
        description: "Refleksiooni salvestamine ebaõnnestus",
        variant: "destructive",
      });
    }
  };

  console.log("FeedbackActions rendering:", { isObserved, feedbackProvided, isCoach });

  return (
    <>
      {/* Feedback Meeting Toggle - only visible to coaches */}
      {isCoach && (
        <div className="p-6 bg-secondary rounded-lg border border-border mt-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-medium text-lg text-primary">Tagasisidekohtumine on toimunud</span>
              <span className="text-sm text-muted-foreground">
                Pärast valimist jagatakse märkmed õpetajaga
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md">
              <span className={`text-sm ${!feedbackProvided ? 'font-medium text-red-500' : 'text-muted-foreground'}`}>
                Ei
              </span>
              <Switch 
                checked={feedbackProvided}
                onCheckedChange={(checked) => {
                  if (checked) handleFeedbackProvided();
                }}
                disabled={feedbackProvided}
              />
              <span className={`text-sm ${feedbackProvided ? 'font-medium text-green-600' : 'text-muted-foreground'}`}>
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
        <Card className="mt-8 border-orange-light bg-orange/5">
          <CardContent className="p-6">
            <p className="text-orange-foreground">
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
