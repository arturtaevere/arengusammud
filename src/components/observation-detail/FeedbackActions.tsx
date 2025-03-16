
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

interface FeedbackActionsProps {
  isObserved: boolean;
  feedbackProvided: boolean;
  handleFeedbackProvided: () => void;
  observation: { hasFeedback: boolean };
}

const FeedbackActions = ({
  isObserved,
  feedbackProvided,
  handleFeedbackProvided,
  observation
}: FeedbackActionsProps) => {
  return (
    <>
      {/* Feedback Meeting Button - only visible to coaches */}
      {!isObserved && (
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleFeedbackProvided}
            disabled={feedbackProvided}
            className="gap-2"
          >
            <CalendarCheck className="h-4 w-4" />
            {feedbackProvided 
              ? "Tagasisidekohtumine toimunud" 
              : "Märgi tagasisidekohtumine toimunuks"}
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
    </>
  );
};

export default FeedbackActions;
