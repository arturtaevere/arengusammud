
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StoredObservation } from '@/components/observation/storage';
import { format } from 'date-fns';

interface TeacherReflectionCardProps {
  observation: StoredObservation;
  isObserved: boolean;
}

const TeacherReflectionCard = ({ observation, isObserved }: TeacherReflectionCardProps) => {
  if (!observation.teacherReflection) return null;
  
  const formattedDate = observation.teacherReflection.submittedAt 
    ? format(new Date(observation.teacherReflection.submittedAt), 'dd.MM.yyyy')
    : '';

  return (
    <Card className={isObserved ? "border-green-200 bg-green-50" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Õpetaja refleksioon</span>
          {formattedDate && <span className="text-sm font-normal text-gray-500">Lisatud: {formattedDate}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap">{observation.teacherReflection.reflection}</div>
      </CardContent>
    </Card>
  );
};

export default TeacherReflectionCard;
