
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
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
                placeholder="Üks asi, millega õpetaja sai hästi hakkama ja mida ta võiks edaspidi samamoodi teha..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
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
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FeedbackNotesSection;
