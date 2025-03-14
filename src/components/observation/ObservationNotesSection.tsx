
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';
import { useNavigate } from 'react-router-dom';
import CompetencyActionStepSelector from './CompetencyActionStepSelector';
import { useState } from 'react';
import TeacherStudentNotesSection from './TeacherStudentNotesSection';
import FeedbackNotesSection from './FeedbackNotesSection';
import NextActionStepSection from './NextActionStepSection';

interface ObservationNotesSectionProps {
  form: UseFormReturn<ObservationFormValues>;
  isSubmitting: boolean;
}

const ObservationNotesSection = ({ form, isSubmitting }: ObservationNotesSectionProps) => {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const actionStepValue = form.watch('nextActionStep');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tunnivaatluse märkmed</CardTitle>
        <CardDescription>
          Dokumenteerige tunni jooksul märgatud tegevused
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TeacherStudentNotesSection form={form} />
        
        <Separator className="my-6" />
        
        <FeedbackNotesSection form={form} />
        
        <NextActionStepSection 
          form={form}
          onOpenActionStepSelector={() => setSheetOpen(true)}
        />
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
          {isSubmitting ? "Salvestamine..." : "Salvesta vaatlus"}
        </Button>
      </CardFooter>

      <CompetencyActionStepSelector
        label="Vali järgmine arengusamm..."
        value={actionStepValue}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSelect={(step) => {
          form.setValue('nextActionStep', `${step.title}: ${step.description}`);
          setSheetOpen(false);
        }}
      />
    </Card>
  );
};

export default ObservationNotesSection;
