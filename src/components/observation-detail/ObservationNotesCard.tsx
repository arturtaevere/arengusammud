
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StoredObservation } from '@/components/observation/storage';
import { ClipboardList } from 'lucide-react';

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
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          Vaatluse märkmed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Tunnivaatlus</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Konkreetsed, mõõdetavad, neutraalsed andmed õpetaja ja õpilaste tegude, sõnade, reaktsioonide, liikumise, ajakasutuse kohta, nt tegevuse kirjeldus, tsitaat, mõõdetud aeg (kui pikk oli paus), numbrid (mitu õpilast vastas)
          </p>
          {isEditing ? (
            <Textarea
              value={editedObservation.teacherNotes || ''}
              onChange={(e) => handleInputChange('teacherNotes', e.target.value)}
              className="min-h-[200px] border-border"
            />
          ) : (
            <div className="p-4 rounded-md bg-secondary/50 border border-border min-h-[100px] whitespace-pre-wrap">
              {observation.teacherNotes}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservationNotesCard;
