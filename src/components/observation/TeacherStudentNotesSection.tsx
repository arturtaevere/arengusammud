
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
      <FormField
        control={form.control}
        name="teacherNotes"
        render={({ field }) => (
          <FormItem className="md:pr-1">
            <FormLabel>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Mida õpetaja tegi
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
  );
};

export default TeacherStudentNotesSection;
