
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StoredObservation } from '@/components/observation/storage';

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
  if (!canSeeFeedback) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tagasiside</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Konkreetne kiitus</h3>
          {isEditing ? (
            <Textarea
              value={editedObservation.specificPraise || ''}
              onChange={(e) => handleInputChange('specificPraise', e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap">{observation.specificPraise}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Järgmine arengusamm</h3>
          {isEditing ? (
            <Textarea
              value={editedObservation.nextActionStep || ''}
              onChange={(e) => handleInputChange('nextActionStep', e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap">{observation.nextActionStep}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
