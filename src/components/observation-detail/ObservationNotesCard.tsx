
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
          <h3 className="text-sm font-medium">Tunnivaatlus</h3>
          <p className="text-sm text-gray-500 mb-2">
            Konkreetsed, mõõdetavad, neutraalsed andmed õpetaja ja õpilaste tegude, sõnade, reaktsioonide, liikumise, ajakasutuse kohta, nt tegevuse kirjeldus, tsitaat, mõõdetud aeg (kui pikk oli paus), numbrid (mitu õpilast vastas)
          </p>
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
