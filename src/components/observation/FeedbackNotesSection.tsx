
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, Lightbulb } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';

interface FeedbackNotesSectionProps {
  form: UseFormReturn<ObservationFormValues>;
}

const FeedbackNotesSection = ({ form }: FeedbackNotesSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default FeedbackNotesSection;
