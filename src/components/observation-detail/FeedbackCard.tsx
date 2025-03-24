
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StoredObservation } from '@/components/observation/storage';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionStepDialog from '@/components/observation-detail/ActionStepDialog';

interface FeedbackCardProps {
  observation: StoredObservation;
  isEditing: boolean;
  editedObservation: Partial<StoredObservation>;
  handleInputChange: (field: keyof StoredObservation, value: string) => void;
  canSeeFeedback: boolean;
}

const FeedbackCard = ({
  observation,
  isEditing,
  editedObservation,
  handleInputChange,
  canSeeFeedback
}: FeedbackCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  if (!canSeeFeedback) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tagasiside</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-700">Tunnustus ja küsimus</h3>
          <p className="text-sm text-gray-500 mb-2">
            Tõsta esile üht positiivset näidet õpetamisoskusest, mis tunnivaatlusel silma jäi ja mida õpetaja võiks edaspidi samamoodi teha. Valmista ette küsimus, mis kutsub õpetajat rääkima, mis selle mõju õpilastele oli.
          </p>
          {isEditing ? (
            <Textarea
              value={editedObservation.specificPraise || ''}
              onChange={(e) => handleInputChange('specificPraise', e.target.value)}
              className="mt-1"
              placeholder="Kirjuta siia tunnustus ja küsimus"
            />
          ) : (
            <div className="p-4 rounded-md bg-secondary/50 border border-border min-h-[100px] whitespace-pre-wrap">
              {observation.specificPraise}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-gray-700">Järgmise sammu valimine</h3>
          <p className="text-sm text-gray-500 mb-2">
            Vali mõni konkreetne märkamine tunnist, mille puhul oleks õpetaja praktika võinud tõhusam olla. Valmista ette küsimus, mis suunaks õpetajat reflekteerima ja arengule mõtlema.
          </p>
          {isEditing ? (
            <>
              <Textarea
                value={editedObservation.nextActionStep || ''}
                onChange={(e) => handleInputChange('nextActionStep', e.target.value)}
                className="mt-1"
                placeholder="Kirjelda oma märkamist"
              />
              {observation.selectedActionStepId && (
                <Textarea
                  value={editedObservation.selectedActionStepText || ''}
                  onChange={(e) => handleInputChange('selectedActionStepText', e.target.value)}
                  className="mt-3"
                  placeholder="Sammu sõnastust saad vajadusel muuta"
                />
              )}
            </>
          ) : (
            <>
              <div className="p-4 rounded-md bg-secondary/50 border border-border min-h-[100px] whitespace-pre-wrap">
                {observation.nextActionStep}
              </div>
              {observation.selectedActionStepId && (
                <>
                  <div className="p-4 mt-3 rounded-md bg-secondary/50 border border-border min-h-[80px] whitespace-pre-wrap">
                    {observation.selectedActionStepText}
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="px-0 h-auto text-xs mt-2 text-primary"
                    onClick={() => setDialogOpen(true)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Vaata sammu põhjendust, edukriteeriume ja näiteid
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
      
      {/* Action Step Details Dialog */}
      <ActionStepDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        actionStepId={observation.selectedActionStepId || null}
      />
    </Card>
  );
};

export default FeedbackCard;
