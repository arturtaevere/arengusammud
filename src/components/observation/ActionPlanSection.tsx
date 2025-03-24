
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CalendarClock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';

interface ActionPlanSectionProps {
  form: UseFormReturn<ObservationFormValues>;
}

const ActionPlanSection = ({ form }: ActionPlanSectionProps) => {
  return (
    <FormField
      control={form.control}
      name="actionPlan"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold flex items-center">
            <CalendarClock className="h-4 w-4 mr-2" />
            Tegevusplaan
          </FormLabel>
          <p className="text-sm text-gray-500 mb-2">
            Millises tunnis ja kuidas kavatseb õpetaja seda sammu kasutada
          </p>
          <FormControl>
            <Textarea 
              placeholder="Kirjutage siia konkreetne plaan, mille te olete õpetajaga tagasisidekohtumisel kokku leppinud" 
              className="min-h-[120px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ActionPlanSection;
