
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, AlertTriangle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';

interface FeedbackNotesSectionProps {
  form: UseFormReturn<ObservationFormValues>;
}

const FeedbackNotesSection = ({ form }: FeedbackNotesSectionProps) => {
  return (
    <div className="space-y-6">
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
                <AlertTriangle className="h-4 w-4 mr-2" />
                Parendusettepanekud
              </span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Milliseid konkreetseid muutusi võiks õpetaja kaaluda..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FeedbackNotesSection;
