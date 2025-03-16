
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
                Järgmine võimalik arengusamm
              </span>
            </FormLabel>
            <div className="space-y-2">
              <div className="flex gap-2 mb-2">
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
              <FormControl>
                <Textarea 
                  placeholder="Soovi korral saad valitud sammu sõnastust muuta" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
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
