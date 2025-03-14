import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, ThumbsUp, Lightbulb, ArrowRight, Save, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';
import { useNavigate } from 'react-router-dom';
import CompetencyActionStepSelector from './CompetencyActionStepSelector';
import { useState } from 'react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
          <FormField
            control={form.control}
            name="teacherNotes"
            render={({ field }) => (
              <FormItem className="md:pr-1">
                <FormLabel>
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Tunnivaatluse märkmed: mida õpetaja tegi
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Kirjeldage õpetaja tegevusi tunni jooksul..." 
                    className="min-h-[200px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="studentNotes"
            render={({ field }) => (
              <FormItem className="md:pl-1">
                <FormLabel>
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Tunnivaatluse märkmed: mida õpilased tegid
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Kirjeldage õpilaste tegevusi tunni jooksul..." 
                    className="min-h-[200px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator className="my-6" />
        
        <FormField
          control={form.control}
          name="specificPraise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Konkreetne kiitus
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Millega sai õpetaja hästi hakkama..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Tooge välja konkreetsed näited õpetaja tugevustest
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="improvementAreas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Mida saaks veel paremini teha
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Millised on arenemisvõimalused..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Kirjeldage konstruktiivselt, mida saaks paremini teha
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="nextActionStep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Järgmine võimalik arengusamm
                </span>
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Textarea 
                    placeholder="Milline võiks olla järgmine arengusamm..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSheetOpen(true)}
                  >
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Vali uus samm
                  </Button>
                </div>
              </div>
              <FormDescription>
                Pakkuge välja konkreetne järgmine arengusamm õpetajale
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
