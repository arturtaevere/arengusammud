
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp } from 'lucide-react';
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
                Tunnustus ja küsimus
              </span>
            </FormLabel>
            <p className="text-sm text-gray-500 mb-2">
              Tõsta esile üht positiivset näidet õpetamisoskusest, mis tunnivaatlusel silma jäi ja mida õpetaja võiks edaspidi samamoodi teha. Valmista ette küsimus, mis kutsub õpetajat rääkima, mis selle mõju õpilastele oli.
            </p>
            <FormControl>
              <Textarea 
                placeholder="Kirjuta siia tunnustus ja küsimus" 
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
