
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StoredObservation } from '@/components/observation/storage';

interface ObservationNotesCardProps {
  observation: StoredObservation;
  isEditing: boolean;
  editedObservation: Partial<StoredObservation>;
  handleInputChange: (field: keyof StoredObservation, value: string) => void;
}

const ObservationNotesCard = ({
  observation,
  isEditing,
  editedObservation,
  handleInputChange
}: ObservationNotesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vaatluse märkmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Tunnivaatluse märkmed</h3>
          {isEditing ? (
            <Textarea
              value={editedObservation.teacherNotes || ''}
              onChange={(e) => handleInputChange('teacherNotes', e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap">{observation.teacherNotes}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservationNotesCard;
