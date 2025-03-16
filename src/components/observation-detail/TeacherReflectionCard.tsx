
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
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            1. Kas ma olen märganud midagi konkreetset, mille põhjal võib järeldada, et see uus õpetamistehnika mõjutab positiivselt õpilaste õppimist või kaasatust?
          </h3>
          <p className="mt-1 whitespace-pre-wrap">{observation.teacherReflection.positiveImpact}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            2. Milliste raskustega puutusin kokku selle arengusammu rakendamisel ja kuidas nendega edaspidi toime tulla?
          </h3>
          <p className="mt-1 whitespace-pre-wrap">{observation.teacherReflection.challengesFaced}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            3. Mida teha, et selle arengusammu kasutamine muutuks mul harjumuspäraseks?
          </h3>
          <p className="mt-1 whitespace-pre-wrap">{observation.teacherReflection.habitFormation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherReflectionCard;
