
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';

interface CombinedNotesSectionProps {
  form: UseFormReturn<ObservationFormValues>;
}

const CombinedNotesSection = ({ form }: CombinedNotesSectionProps) => {
  return (
    <FormField
      control={form.control}
      name="combinedNotes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <span className="flex items-center mb-1">
              <MessageSquare className="h-6 w-6 mr-2" />
              Konkreetsed, mõõdetavad, neutraalsed andmed õpetaja ja õpilaste tegude, sõnade, reaktsioonide, liikumise, ajakasutuse kohta, nt tegevuse kirjeldus, tsitaat, mõõdetud aeg (kui pikk oli paus), numbrid (mitu õpilast vastas)
            </span>
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Kirjeldage oma märkamisi..." 
              className="min-h-[300px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CombinedNotesSection;
