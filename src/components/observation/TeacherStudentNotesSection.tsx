
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';

interface TeacherStudentNotesSectionProps {
  form: UseFormReturn<ObservationFormValues>;
}

const TeacherStudentNotesSection = ({ form }: TeacherStudentNotesSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-0 overflow-hidden">
      <FormField
        control={form.control}
        name="combinedNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-2" />
                Tunnivaatlus
              </span>
            </FormLabel>
            <p className="text-sm text-gray-500 mb-2">
              Konkreetsed, mõõdetavad, neutraalsed andmed õpetaja ja õpilaste tegude, sõnade, reaktsioonide, liikumise, ajakasutuse kohta, nt tegevuse kirjeldus, tsitaat, mõõdetud aeg (kui pikk oli paus), numbrid (mitu õpilast vastas)
            </p>
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
    </div>
  );
};

export default TeacherStudentNotesSection;
