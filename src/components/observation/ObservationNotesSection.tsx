
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CombinedNotesSection from './CombinedNotesSection';
import FeedbackNotesSection from './FeedbackNotesSection';
import NextActionStepSection from './NextActionStepSection';
import ActionPlanSection from './ActionPlanSection';
import PreviousActionStepSection from './PreviousActionStepSection';
import CompetencyActionStepSelector from './CompetencyActionStepSelector';

interface ObservationNotesSectionProps {
  form: UseFormReturn<ObservationFormValues>;
  isSubmitting: boolean;
}

const ObservationNotesSection = ({ form, isSubmitting }: ObservationNotesSectionProps) => {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [previousStepCompleted, setPreviousStepCompleted] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tunnivaatluse märkmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CombinedNotesSection form={form} />
        
        <Separator className="my-6" />
        
        <FeedbackNotesSection form={form} />

        <PreviousActionStepSection
          previousActionStep={form.getValues().selectedActionStepText}
          completed={previousStepCompleted}
          onCompletionChange={setPreviousStepCompleted}
        />
        
        <NextActionStepSection 
          form={form}
          onOpenActionStepSelector={() => setSheetOpen(true)}
        />

        <Separator className="my-6" />
        
        <ActionPlanSection form={form} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/observations')}
        >
          Tühista
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Salvestamine..." : "Salvesta märkmed"}
        </Button>
      </CardFooter>

      <CompetencyActionStepSelector
        label="Vali järgmine arengusamm..."
        value={form.watch('selectedActionStepText')}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSelect={(step) => {
          form.setValue('selectedActionStepText', `${step.title}: ${step.description}`);
          form.setValue('selectedActionStepId', step.id);
          setSheetOpen(false);
        }}
      />
    </Card>
  );
};

export default ObservationNotesSection;
