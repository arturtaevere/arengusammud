
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeftRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';
import ActionStepDialog from './ActionStepDialog';

interface NextActionStepSectionProps {
  form: UseFormReturn<ObservationFormValues>;
  onOpenActionStepSelector: () => void;
}

const NextActionStepSection = ({ form, onOpenActionStepSelector }: NextActionStepSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedActionStepId = form.getValues().selectedActionStepId;
  const actionStepText = form.watch('nextActionStep');
  
  return (
    <>
      <FormField
        control={form.control}
        name="nextActionStep"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-2" />
                Järgmise sammu valimine
              </span>
            </FormLabel>
            <p className="text-sm text-gray-500 mb-2">
              Vali mõni konkreetne märkamine tunnist, mille puhul oleks õpetaja praktika võinud tõhusam olla. Valmista ette küsimus, mis suunaks õpetajat reflekteerima ja arengule mõtlema.
            </p>
            <div className="space-y-2 mt-2">
              <FormControl>
                <Textarea 
                  placeholder="Kirjelda oma märkamist" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onOpenActionStepSelector}
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Vali uus samm
                </Button>
              </div>
              
              {/* Box for selected action step */}
              {selectedActionStepId && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Sammu sõnastust saad vajadusel muuta"
                    className="min-h-[80px]"
                    value={actionStepText || ""}
                    onChange={(e) => form.setValue('nextActionStep', e.target.value)}
                  />
                </div>
              )}
              
              {selectedActionStepId && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="px-0 h-auto text-xs"
                  onClick={() => setDialogOpen(true)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Vaata sammu põhjendust, edukriteeriume ja näiteid
                </Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Action Step Details Dialog */}
      <ActionStepDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        actionStepId={selectedActionStepId}
      />
    </>
  );
};

export default NextActionStepSection;
